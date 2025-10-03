  import React, { createContext, useContext, ReactNode,useState,useEffect } from 'react';
  import { CartItem, Product } from '../types';
  import { api } from '../services/api';
  import { useAuth } from './AuthContext';
  interface CartContextType {
    cartItems:CartItem[];
    cartTotal:number;
    addToCart: (product: Product, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    getCart: () => Promise<CartItem[]>;
  }


  const CartContext = createContext<CartContextType | undefined>(undefined);
  export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { isAuthenticated, loading } = useAuth();

    // Fetch cart from server
    const refreshCart = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await api.get('/cart');
        if (response.status === 200) {
          setCartItems(response.data.items || []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setCartItems([]);
      }
    };

    // One effect to handle auth + cart refresh
    useEffect(() => {
      if (loading) return; // wait until auth status is resolved

      if (isAuthenticated) {
        refreshCart();
      } else {
        setCartItems([]);
      }
    }, [isAuthenticated, loading]); // runs only when auth is resolved

    const cartTotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Add product to cart
    const addToCart = async (product: Product, quantity: number) => {
      try {
        const response = await api.post('/cart/add', { product_id: product.id, quantity });
        if (response.status === 200) await refreshCart();
      } catch (err) {
        console.error(err);
      }
    };

    const removeFromCart = async (productId: string) => {
      try {
        const response = await api.delete(`/cart/remove/${productId}`);
        if (response.status === 200) await refreshCart();
      } catch (err) {
        console.error(err);
      }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
      setCartItems(prev =>
        prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
      );
      try {
        const response = await api.put(`/cart/update/${productId}`, { quantity });
        if (response.status !== 200) await refreshCart();
      } catch (err) {
        console.error(err);
        await refreshCart();
      }
    };

    const clearCart = async () => {
      try {
        const response = await api.delete('/cart/clear');
        if (response.status === 200) await refreshCart();
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <CartContext.Provider value={{ addToCart, removeFromCart, updateQuantity, clearCart, cartItems, cartTotal, refreshCart }}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };
