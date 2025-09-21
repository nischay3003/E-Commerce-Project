import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Address } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { updateAddress,getUserAddresses,addAddress,deleteAddress } from '@/services/api';
const initialAddressState: Address = {
  street: '',
  city: '',
  state: '',
  country: '',
  pinCode: '',
};

const AddressFormFields: React.FC<{ address: Address, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ address, onChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="street" value={address.street} onChange={onChange} placeholder="Street" className="md:col-span-2 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
      <input name="city" value={address.city} onChange={onChange} placeholder="City" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
      <input name="state" value={address.state} onChange={onChange} placeholder="State" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
      <input name="pinCode" value={address.pinCode} onChange={onChange} placeholder="Pincode" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
      <input name="country" value={address.country} onChange={onChange} placeholder="Country" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
    </div>
);

const AddressManagementPage: React.FC = () => {
  const { user, isAuthenticated, addUserAddress, removeUserAddress, updateUserAddress } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Address>(initialAddressState);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
      try {
        const data = await getUserAddresses();
        // console.log("data:",data);
        setAddresses(data.addresses);
        // console.log("addresses",addresses)
      } catch (error) {
        console.error("Failed to load addresses", error);
        navigate("/login"); // if unauthorized
      }
    };

    

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>, formSetter: React.Dispatch<React.SetStateAction<any>>) => {
    const { name, value } = e.target;
    formSetter((prev: any) => ({ ...prev, [name]: value }));
  };

      const handleAddAddressSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (Object.values(newAddress).every(f => String(f).trim() !== "")) {
        await addAddress(newAddress);  // call backend
        setNewAddress(initialAddressState);
        fetchAddresses(); // refetch latest
      } else {
        alert("Please fill out all address fields.");
      }
    };
    
    const handleRemoveAddress = async (id: number) => {
      if (window.confirm("Are you sure?")) {
        await deleteAddress(id); // backend
        fetchAddresses(); // refetch latest
      }
    };


  const handleEditStart = (index: number, currentAddress: Address) => {
    setEditingIndex(index);
    setEditingAddress({ ...currentAddress });
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingAddress(null);
  };

    const handleEditSave = async (id: number) => {
    if (editingAddress && Object.values(editingAddress).every(f => String(f).trim() !== "")) {
      await updateAddress(id, editingAddress); // backend
      setEditingIndex(null);
      setEditingAddress(null);
      fetchAddresses(); // refetch latest
    } else {
      alert("Please fill out all address fields.");
    }
  };


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800">Manage Addresses</h1>
        <Link to="/dashboard" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">&larr; Back to Dashboard</Link>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Your Saved Addresses</h2>
          {addresses.length > 0 ? (
            <ul className="space-y-4">
            
              {addresses.map((addr, index) => (
        <li key={addr.id ?? index} className="border p-4 rounded-lg bg-slate-50">
          {editingIndex === index && editingAddress ? (
            <div className="space-y-4">
              <AddressFormFields address={editingAddress} onChange={(e) => handleFormChange(e, setEditingAddress)} />
              <div className="flex gap-2 justify-end">
                <button onClick={() => handleEditSave(addr.id!)} className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors">Save</button>
                <button onClick={handleEditCancel} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-md transition-colors">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-slate-800 flex-grow">
                <strong>{addr.street}</strong><br />
                {addr.city}, {addr.state} {addr.pincode}<br />
                {addr.country}
              </p>
              <div className="flex-shrink-0 flex items-center gap-4">
                <button onClick={() => handleEditStart(index, addr)} className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">Edit</button>
                <button onClick={() => handleRemoveAddress(addr.id!)} className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors">Remove</button>
              </div>
            </div>
          )}
        </li>
      ))}

            </ul>
          ) : (
            <p className="text-slate-500">You have no saved addresses.</p>
          )}
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Add a New Address</h2>
          <form onSubmit={handleAddAddressSubmit} className="space-y-4 bg-slate-50 p-4 rounded-lg">
            <AddressFormFields address={newAddress} onChange={(e) => handleFormChange(e, setNewAddress)} />
            <button type="submit" className="w-full sm:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Add Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressManagementPage;
