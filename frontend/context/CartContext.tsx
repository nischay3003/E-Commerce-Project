import React, { createContext, useContext, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { api } from '../services/api';

interface CartContextType {
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCart: () => Promise<CartItem[]>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Add product to cart
  const addToCart = async (product: Product, quantity: number) => {
    try {
      const response = await api.post('/cart/add', { product_id: product.id, quantity });
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
      if (response.status !== 200) {
        console.warn("⚠️ Failed to remove item:", response.data);
      }
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await api.put(`/cart/update/${productId}`, { quantity });
      if (response.status !== 200) {
        console.warn("⚠️ Failed to update quantity:", response.data);
      }
    } catch (error) {
      console.error("❌ Error updating cart quantity:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await api.post(`/cart/clear`);
      if (response.status !== 200) {
        console.warn("⚠️ Failed to clear cart:", response.data);
      }
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  // Fetch cart items
  const getCart = async (): Promise<CartItem[]> => {
    try {
      const response = await api.get(`/cart`);
      if (response.status === 200) {
        return response.data;
      } else {
        console.warn("⚠️ Failed to fetch cart:", response.data);
        return [];
      }
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
      return [];
    }
  };

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, updateQuantity, clearCart, getCart }}>
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
