// src/api.ts
import { Product, Category, User, Order, Address } from '../types';
import axios from 'axios';

export const api = axios.create({
  baseURL:"http://localhost:3000/api",
  withCredentials: true, // sends HttpOnly cookies automatically
});

// -------------------- AUTH --------------------

export const registerUser = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number:string
}): Promise<User> => {
  const res = await api.post('/users/register', userData);
  return res.data;
};
export const getDashboard = async (): Promise<{
  user: User;
  orders: Order[];
  cart: any;
  addresses: any[];
}> => {
  const res = await api.get('/dashboard'); // maps to backend /api/dashboard
  console.log("dashboard data: ",res.data);
  return res.data; // { user, orders, cart, addresses }
};
export const getRecentOrders=async ():Promise<{
  recentOrders:Order[];
}>=>{
  const limit=5;
  const res=await api.get(`/orders/recent?limit=${limit}`);
  console.log("recent orders:",res.data);
  return res.data; 
}

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post('/users/login', credentials);
  return res.data.user;
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const res = await api.post('/users/logout');
  return res.data;
};

// export const refreshToken = async (): Promise<{ accessToken: string }> => {
//   const res = await api.post('/auth/refresh');
//   return res.data;
// };

// -------------------- CATEGORY --------------------

export const getCategories = async () => {
  const res = await api.get('/category');
  return res.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const res = await api.get(`/category/${id}`);
  return res.data;
};

export const createCategory = async (
  category: Omit<Category, 'id'>
): Promise<Category> => {
  const res = await api.post('/category', category);
  return res.data;
};

export const updateCategory = async (
  id: string,
  category: Partial<Category>
): Promise<Category> => {
  const res = await api.put(`/category/${id}`, category);
  return res.data;
};

export const deleteCategory = async (
  id: string
): Promise<{ message: string }> => {
  const res = await api.delete(`/category/${id}`);
  return res.data;
};

// -------------------- PRODUCTS --------------------

export const getProducts = async (categoryId?: string): Promise<Product[]> => {
  const url = categoryId ? `/products/category/${categoryId}` : '/products';
  const res = await api.get(url);
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  if (!query) return [];
  const res = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
  return res.data;
};

export const getHighRatedProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products/high-rated');
  return res.data;
};

// -------------------- USER --------------------

export const getUser = async (): Promise<User> => {
  const res = await api.get('/users/me');
  console.log("res:::::",res);
  return res.data.user;
};

export const addAddress = async (address: Address): Promise<User> => {
  const res = await api.post('/addresses', address);
  return res.data;
};

export const updateAddress = async (
  index: number,
  address: Address
): Promise<User> => {
  const res = await api.put(`/addresses/${index}`, address);
  return res.data;
};

export const deleteAddress = async (index: number): Promise<User> => {
  const res = await api.delete(`/addresses/${index}`);
  return res.data;
};

export const getUserAddresses = async () => {
  const res = await api.get("/addresses"); // GET /addresses
  return res.data;
};
// -------------------- ORDERS --------------------

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get('/orders');
  return res.data.orders;
};
//check here

export const cancelOrder = async (orderId: string): Promise<Order> => {
  const res = await api.put(`/orders/${orderId}/cancel`);
  return res.data;
};

export const returnOrder = async (orderId: string): Promise<Order> => {
  const res = await api.post(`/orders/${orderId}/return`);
  return res.data;
};

