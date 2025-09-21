export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDesc: string;
  images: string[];
  rating: number;
  reviewCount: number;
  categoryId: string;
  specification?: { [key: string]: string };
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  addresses: Address[];
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned' | 'Cancelled';
  total: number;
  items: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}