import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Address, PaymentMethod } from '../types';
import { useCart } from '@/context/CartContext';
import { CreditCardIcon } from '../components/icons/CreditCardIcon';
import { PayPalIcon } from '../components/icons/PayPalIcon';
import { getUserAddresses } from '@/services/api';

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal } = useCart();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    // Fetch addresses
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await getUserAddresses();
                setAddresses(data.addresses);
                if (data.addresses.length > 0) setSelectedAddressId(data.addresses[0].id);
            } catch (err) {
                console.error('Failed to fetch addresses', err);
                navigate('/checkout'); // fallback
            }
        };
        fetchAddresses();
    }, [navigate]);

    const selectedAddress = addresses.find(a => a.id === selectedAddressId);

    useEffect(() => {
        if (!selectedAddress && addresses.length > 0) {
            setSelectedAddressId(addresses[0].id);
        }
    }, [addresses, selectedAddress]);

    const shipping = 0;
    const taxes = cartTotal * 0.08;
    const finalTotal = cartTotal + shipping + taxes;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        // process payment here
        setIsOrderPlaced(true);
    };

    if (isOrderPlaced) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center max-w-2xl mx-auto">
                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Thank you for your order!</h1>
                <p className="mt-2 text-base text-gray-500">Your order has been placed successfully.</p>
                <div className="mt-8">
                    <button onClick={() => navigate('/')} className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping <span aria-hidden="true"> &rarr;</span>
                    </button>
                </div>
            </div>
        );
    }

    if (!selectedAddress) return <p>Loading address...</p>;

    const paymentOptions: { id: PaymentMethod; title: string; icon: React.ReactNode }[] = [
        { id: 'Credit Card', title: 'Credit Card', icon: <CreditCardIcon className="h-6 w-6" /> },
        { id: 'PayPal', title: 'PayPal', icon: <PayPalIcon className="h-6 w-6" /> },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">Payment</h1>
            <form onSubmit={handlePlaceOrder} className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                <main className="lg:col-span-7">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-900">Shipping to</h2>
                            <button type="button" onClick={() => navigate('/checkout')} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Change</button>
                        </div>
                        <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <p className="text-sm text-gray-600">{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country} - {selectedAddress.pinCode}</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium text-gray-900">Payment method</h2>
                        <fieldset className="mt-4">
                            <legend className="sr-only">Payment type</legend>
                            <div className="space-y-4">
                                {paymentOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        onClick={() => setPaymentMethod(option.id)}
                                        className={`rounded-lg border p-4 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === option.id ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300 hover:border-gray-400'}`}
                                    >
                                        <div className="flex items-center">
                                            {option.icon}
                                            <span className="ml-3 font-medium text-gray-900">{option.title}</span>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === option.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                                            {paymentMethod === option.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </main>

                <aside className="mt-8 lg:mt-0 lg:col-span-5">
                    <div className="bg-slate-100 rounded-lg p-6 shadow sticky top-24">
                        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                        <ul role="list" className="divide-y divide-gray-200 mt-4">
                            {cartItems.map(({ product, quantity }) => (
                                <li key={product.id} className="flex py-4 space-x-4">
                                    <img src={product.imageUrl} alt={product.name} className="h-20 w-20 flex-none rounded-lg object-cover" />
                                    <div className="flex-auto space-y-1">
                                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {quantity}</p>
                                    </div>
                                    <p className="flex-none text-sm font-medium text-gray-900">${(product.price * quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                        <dl className="space-y-4 border-t border-gray-200 pt-6 mt-6 text-sm">
                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Subtotal</dt>
                                <dd className="font-medium text-gray-900">${parseFloat(cartTotal).toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Shipping</dt>
                                <dd className="font-medium text-gray-900">{shipping === 0 ? 'FREE' : `$${parseFloat(shipping).toFixed(2)}`}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Taxes</dt>
                                <dd className="font-medium text-gray-900">${taxes.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base">
                                <dt className="font-semibold text-gray-900">Order total</dt>
                                <dd className="font-semibold text-gray-900">${finalTotal.toFixed(2)}</dd>
                            </div>
                        </dl>
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={!paymentMethod}
                                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed">
                                Place Order
                            </button>
                        </div>
                    </div>
                </aside>
            </form>
        </div>
    );
};

export default PaymentPage;
