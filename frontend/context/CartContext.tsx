import React, { createContext, useContext, ReactNode,useState,useEffect } from 'react';
import { CartItem, Product } from '../types';
import { api } from '../services/api';

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
  const [cartItems,setCartItems]=useState<CartItem[]>([]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const refreshCart = async () => {
    try {
      const response = await api.get('/cart');
      if (response.status === 200) {
        setCartItems(response.data.items);
      } else {
        console.warn("⚠️ Failed to fetch cart:", response.data);
      }
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  };

  useEffect(() => {
    refreshCart(); // load once when provider mounts
  }, []);


  // Add product to cart
  const addToCart = async (product: Product, quantity: number) => {
    try {
      const response = await api.post('/cart/add', { product_id: product.id, quantity });
      await refreshCart();
      if (response.status !== 200) {
        console.warn("⚠️ Failed to add item:", response.data);
      }
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId: string) => {
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      await refreshCart();
      if (response.status !== 200) {
        console.warn("⚠️ Failed to remove item:", response.data);
      }
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
    }
  };

 // Optimistic UI update
const updateQuantity = async (productId: string, quantity: number) => {
  if (!cartItems) return;

  // Update local state immediately
  setCartItems(prev =>
    prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    )
  );

  // Call backend
  try {
    const response = await api.put(`/cart/update/${productId}`, { quantity });
    if (response.status !== 200) {
      console.warn("⚠️ Failed to update quantity:", response.data);
      await refreshCart(); // fallback to refresh cart from server
    }
    await refreshCart();
  } catch (error) {
    console.error("❌ Error updating cart quantity:", error);
    await refreshCart(); // fallback to refresh cart
  }
};

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await api.post(`/cart/clear`);
      await refreshCart();
      if (response.status !== 200) {
        console.warn("⚠️ Failed to clear cart:", response.data);
      }
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  // // Fetch cart items
  // const getCart = async (): Promise<CartItem[]> => {
  //   try {
  //     const response = await api.get(`/cart`);
  //     if (response.status === 200) {
  //       console.log("CART:",response.data);
  //       return response.data;
  //     } else {
  //       console.warn("⚠️ Failed to fetch cart:", response.data);
  //       return [];
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching cart:", error);
  //     return [];
  //   }
  // };

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, updateQuantity, clearCart, cartItems,cartTotal,refreshCart }}>
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
