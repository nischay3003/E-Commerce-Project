import { Product, Category, User, Order, Address } from '../types';
import axios from 'axios';
const api=axios.create({
  baseURL:'http://localhost:3000/api/'
})

// // Dummy Data
// const categories: Category[] = [
//   { id: '1', name: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/600/400' },
//   { id: '2', name: 'Books', imageUrl: 'https://picsum.photos/seed/books/600/400' },
//   { id: '3', name: 'Clothing', imageUrl: 'https://picsum.photos/seed/clothing/600/400' },
//   { id: '4', name: 'Home & Kitchen', imageUrl: 'https://picsum.photos/seed/kitchen/600/400' },
// ];

// const products: Product[] = [
//   // Electronics
//   { id: '101', name: 'Wireless Headphones', price: 99.99, description: 'High-fidelity sound', longDescription: 'Experience immersive sound with these noise-cancelling wireless headphones. 40-hour battery life and comfortable over-ear design.', imageUrls: ['https://picsum.photos/seed/headphones1/500/500', 'https://picsum.photos/seed/headphones2/500/500', 'https://picsum.photos/seed/headphones3/500/500', 'https://picsum.photos/seed/headphones4/500/500'], rating: 4.8, reviewCount: 1250, categoryId: '1', specs: { Connectivity: 'Bluetooth 5.0', 'Battery Life': '40 hours', Weight: '250g', 'Noise Cancellation': 'Active Noise Cancellation' } },
//   { id: '102', name: 'Smart Watch', price: 199.50, description: 'Track your fitness', longDescription: 'Stay connected and track your health with this sleek smartwatch. Features heart rate monitoring, GPS, and a vibrant AMOLED display.', imageUrls: ['https://picsum.photos/seed/watch1/500/500', 'https://picsum.photos/seed/watch2/500/500', 'https://picsum.photos/seed/watch3/500/500'], rating: 4.6, reviewCount: 890, categoryId: '1', specs: { Display: '1.4" AMOLED', 'Water Resistance': '5 ATM', GPS: 'Built-in', 'OS': 'WearOS' } },
//   { id: '103', name: 'Portable Speaker', price: 45.00, description: 'Waterproof and durable', longDescription: 'Take your music anywhere with this waterproof Bluetooth speaker. Powerful bass and 24 hours of playtime make it perfect for any adventure.', imageUrls: ['https://picsum.photos/seed/speaker1/500/500', 'https://picsum.photos/seed/speaker2/500/500', 'https://picsum.photos/seed/speaker3/500/500', 'https://picsum.photos/seed/speaker4/500/500', 'https://picsum.photos/seed/speaker5/500/500'], rating: 4.9, reviewCount: 2300, categoryId: '1', specs: { 'IP Rating': 'IPX7 Waterproof', 'Playtime': '24 hours', 'Power Output': '10W', 'Bluetooth Version': '5.1' } },
//   // Books
//   { id: '201', name: 'The Midnight Library', price: 15.99, description: 'A novel by Matt Haig', longDescription: 'A captivating novel that explores the choices that go into a life well lived. A beautiful and moving story about regret, hope, and forgiveness.', imageUrls: ['https://picsum.photos/seed/book1/500/500'], rating: 4.7, reviewCount: 5400, categoryId: '2', specs: { Author: 'Matt Haig', Genre: 'Fantasy Fiction', Pages: '304', Publisher: 'Viking' } },
//   { id: '202', name: 'Atomic Habits', price: 18.00, description: 'By James Clear', longDescription: 'An easy and proven way to build good habits and break bad ones. James Clear presents a practical framework for improving every day.', imageUrls: ['https://picsum.photos/seed/book2/500/500'], rating: 4.9, reviewCount: 15000, categoryId: '2', specs: { Author: 'James Clear', Genre: 'Self-help', Pages: '320', Publisher: 'Avery' } },
//   // Clothing
//   { id: '301', name: 'Men\'s Cotton T-Shirt', price: 25.00, description: 'Comfortable and stylish', longDescription: 'Made from 100% premium cotton, this t-shirt offers a classic fit and unmatched comfort. Perfect for everyday wear.', imageUrls: ['https://picsum.photos/seed/tshirt1/500/500', 'https://picsum.photos/seed/tshirt2/500/500', 'https://picsum.photos/seed/tshirt3/500/500'], rating: 4.5, reviewCount: 600, categoryId: '3', specs: { Material: '100% Premium Cotton', Fit: 'Classic', 'Care Instructions': 'Machine wash cold' } },
//   { id: '302', name: 'Women\'s Denim Jacket', price: 75.50, description: 'A timeless classic', longDescription: 'This versatile denim jacket is a wardrobe staple. Featuring a slightly distressed finish and a comfortable fit, it pairs well with any outfit.', imageUrls: ['https://picsum.photos/seed/jacket1/500/500', 'https://picsum.photos/seed/jacket2/500/500'], rating: 4.6, reviewCount: 350, categoryId: '3', specs: { Material: '98% Cotton, 2% Spandex', Pockets: '4 (2 chest, 2 side)', Fit: 'Regular' } },
//   // Home & Kitchen
//   { id: '401', name: 'Espresso Machine', price: 249.99, description: 'Barista-quality coffee', longDescription: 'Brew your favorite espresso drinks at home with this semi-automatic espresso machine. Features a powerful steam wand for perfect lattes and cappuccinos.', imageUrls: ['https://picsum.photos/seed/espresso1/500/500', 'https://picsum.photos/seed/espresso2/500/500', 'https://picsum.photos/seed/espresso3/500/500'], rating: 4.8, reviewCount: 780, categoryId: '4', specs: { Power: '1350W', Pressure: '15 Bar', 'Water Tank': '1.1L', 'Dimensions': '12" x 6" x 12"' } },
// ];

let user: User = {
  id: 'u1',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  addresses: [
    { street: '123 Main St', city: 'Anytown', state: 'CA', country: 'USA', pincode: '12345' },
    { street: '456 Oak Ave', city: 'Somecity', state: 'NY', country: 'USA', pincode: '67890' },
  ],
};

// const orders: Order[] = [
//     { id: 'o1', date: '2023-10-26', status: 'Delivered', total: 124.99, items: [{ product: products[0], quantity: 1 }, { product: products[5], quantity: 1 }] },
//     { id: 'o2', date: '2023-11-15', status: 'Shipped', total: 75.50, items: [{ product: products[6], quantity: 1 }] },
//     { id: 'o3', date: '2023-11-20', status: 'Processing', total: 45.00, items: [{ product: products[2], quantity: 1 }] },
// ];

// // API Simulation Functions
// const simulateApiCall = <T,>(data: T): Promise<T> => 
//   new Promise(resolve => setTimeout(() => resolve(data), 500));

export const getCategories = async () => {
    const res=await api.get('/category');
    return res.data; 
}
export const getCategoryById = async (id: string): Promise<Category> => {
  const res = await api.get(`/category/${id}`);
  return res.data;
};
export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  const res = await api.post('/category', category);
  return res.data;
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
  const res = await api.put(`/category/${id}`, category);
  return res.data;
};

export const deleteCategory = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete(`/category/${id}`);
  return res.data;
};
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
  const lowercasedQuery=query.toLowerCase();
  const res = await api.get(`/products/search?q=${encodeURIComponent(lowercasedQuery)}`);
  return res.data;
};

export const getHighRatedProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products/high-rated');
  return response.data;
};
export const getUser = async (): Promise<User> => {
  const res = await api.get('/user');
  return res.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get('/orders');
  return res.data;
};

export const cancelOrder = async (orderId: string): Promise<Order> => {
  const res = await api.post(`/orders/${orderId}/cancel`);
  return res.data;
};

export const returnOrder = async (orderId: string): Promise<Order> => {
  const res = await api.post(`/orders/${orderId}/return`);
  return res.data;
};

// export const searchProducts = (query: string) => {
//   if (!query) {
//     return simulateApiCall([]);
//   }
//   const lowercasedQuery = query.toLowerCase();
//   const results = products.filter(p => 
//     p.name.toLowerCase().includes(lowercasedQuery) ||
//     p.description.toLowerCase().includes(lowercasedQuery) ||
//     p.longDescription.toLowerCase().includes(lowercasedQuery)
//   );
//   return simulateApiCall(results);
// };

export const addAddress = async (address: Address): Promise<User> => {
  const res = await api.post('/user/address', address);
  return res.data;
};

export const updateAddress = async (index: number, address: Address): Promise<User> => {
  const res = await api.put(`/user/address/${index}`, address);
  return res.data;
};

export const removeAddress = async (index: number): Promise<User> => {
  const res = await api.delete(`/user/address/${index}`);
  return res.data;
};
