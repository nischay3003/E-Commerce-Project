import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-slate-500 text-lg">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-hover transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.product.imageUrls[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-md"/>
                  <div>
                    <h2 className="font-semibold text-lg text-slate-800">{item.product.name}</h2>
                    <p className="text-slate-500">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                    className="w-16 border-slate-300 rounded-md text-center"
                    min="1"
                  />
                  <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-100 rounded-lg p-6 text-slate-500">
              <h2 className="text-xl font-semibold mb-4 ">Order Summary</h2>
              <div className="flex justify-between mb-2 text-slate-500">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-slate-500">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg text-slate-500">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full mt-6 bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary-hover transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;