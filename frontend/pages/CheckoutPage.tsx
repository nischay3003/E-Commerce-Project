
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Address, PaymentMethod } from '../types';
import { getUserAddresses } from '@/services/api';
import { useCart } from '@/context/CartContext';
interface CheckoutPageProps {
  cartItems: CartItem[];
  total: number;
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  selectedAddressId: number | null;
  setSelectedAddressId: React.Dispatch<React.SetStateAction<number | null>>;
  paymentMethod: PaymentMethod;
}

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const {cartItems,cartTotal}=useCart();

     const [addresses, setAddresses] = useState<Address[]>([]);
        const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
        const [showNewAddressForm, setShowNewAddressForm] = useState(false);
        const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

        const [newAddress, setNewAddress] = useState({
            street: '',
            city: '',
            state: '',
            country: '',
            pinCode: '',
        });

//Addresses fetch remove it later
   useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getUserAddresses();
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddressId(data.addresses[0].id); // auto-select first
        }
      } catch (error) {
        console.error("Failed to load addresses", error);
        navigate("/login"); // redirect if unauthorized
      }
    };
    fetchAddresses();
  }, [navigate]);
  console.log("addresses:",addresses);
//remove till 
  const shipping: number = 0; // Assuming free shipping
  const taxes = cartTotal * 0.08; // Example 8% tax
  const finalTotal = cartTotal + shipping + taxes;
  

  const handleNewAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = () => {
    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    const addedAddress: Address = { id: newId, ...newAddress };

    setAddresses(prev => [...prev, addedAddress]);
    setSelectedAddressId(newId);
    setShowNewAddressForm(false);
    setNewAddress({ firstName: '', lastName: '', address: '', city: '', postalCode: '' });
  };


  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddressId) {
        alert("Please select a shipping address.");
        return;
    }
    navigate('/payment');
  }

  return (
    <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">Checkout</h1>
        <form onSubmit={handleProceedToPayment} className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <main className="lg:col-span-7">
                {/* Shipping Information Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                    <div className="mt-4 space-y-4">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                onClick={() => {
                                  setSelectedAddressId(address.id);
                                  setShowNewAddressForm(false);
                                }}
                                className={`rounded-lg border p-4 cursor-pointer transition-all relative ${
                                    selectedAddressId === address.id
                                        ? 'border-indigo-600 ring-2 ring-indigo-600'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="pr-8">
                                        {/* <p className="font-medium text-gray-900">{address.firstName} {address.lastName}</p> */}
                                        <p className="text-sm text-gray-600 mt-1">{address.street}</p>
                                        <p className="text-sm text-gray-600">{address.city}, {address.pinCode}, {address.state}</p>
                                    </div>
                                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddressId === address.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                                        {selectedAddressId === address.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {!showNewAddressForm && addresses.length > 0 && (
                        <button 
                            type="button" 
                            onClick={() => {
                              setShowNewAddressForm(true);
                              setSelectedAddressId(null);
                            }}
                            className="mt-6 w-full flex justify-center items-center px-4 py-2 border border-dashed border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add a new address
                        </button>
                    )}

                    {showNewAddressForm && (
                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <h3 className="text-md font-medium text-gray-900 mb-4">Add a new address</h3>
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                                    <div className="mt-1">
                                        <input type="text" id="firstName" name="firstName" value={newAddress.firstName} onChange={handleNewAddressInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                                    <div className="mt-1">
                                        <input type="text" id="lastName" name="lastName" value={newAddress.lastName} onChange={handleNewAddressInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <div className="mt-1">
                                        <input type="text" name="address" id="address" value={newAddress.address} onChange={handleNewAddressInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <div className="mt-1">
                                        <input type="text" name="city" id="city" value={newAddress.city} onChange={handleNewAddressInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
                                    <div className="mt-1">
                                        <input type="text" name="postalCode" id="postalCode" value={newAddress.postalCode} onChange={handleNewAddressInputChange} required autoComplete="postal-code" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex space-x-4">
                                <button type="button" onClick={handleAddNewAddress} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Save Address</button>
                                {addresses.length > 0 && <button type="button" onClick={() => setShowNewAddressForm(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Payment Method Summary */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">Payment method</h2>
                        <button 
                            type="button" 
                            onClick={() => navigate('/payment')} 
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Change
                        </button>
                    </div>
                    <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                        {paymentMethod ? (
                            <p className="text-sm text-gray-700">
                                <span className="font-medium text-gray-900">Selected:</span> {paymentMethod}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500">No payment method selected</p>
                        )}
                    </div>
                </div>
            </main>

            <aside className="mt-8 lg:mt-0 lg:col-span-5">
                <div className="bg-slate-100 rounded-lg p-6 shadow sticky top-24">
                    <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                    <ul role="list" className="divide-y divide-gray-200 mt-4">
                        {cartItems.map(({ product, quantity }) => (
                            <li key={product.id} className="flex py-4 space-x-4">
                                <img src={product.images[0].imageUrl} alt={product.name} className="h-20 w-20 flex-none rounded-lg object-cover" />
                                {console.log("product:",product)}
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
                            <dd className="font-medium text-gray-900">${parseFloat(cartTotal    ).toFixed(2)}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Shipping</dt>
                            <dd className="font-medium text-gray-900">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</dd>
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
                            disabled={!selectedAddressId}
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </aside>
        </form>
    </div>
  );
};

export default CheckoutPage;


