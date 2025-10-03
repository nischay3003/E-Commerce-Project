
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboard,getRecentOrders } from '../services/api';
import { Order ,User} from '../types';
import { useNavigate, Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  //  const [isAuth, setAuth] = useState(false);
  const {isAuthenticated,user,loading}=useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<any>(null);
  const [dashloading, setDashLoading] = useState(true);
  // const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getProfile = async () => {
      try {
       
        if(!isAuthenticated && !loading) {
          
          navigate('/login');
          return;

        }
        const profile = await getDashboard();
        console.log("Profile",profile);
        // setOrders(profile.orders);
        const res=await getRecentOrders();
        
        await setOrders(res.recentOrders);
       
        setCart(profile.cart);
        setAddresses(profile.addresses);
        console.log("address:",profile.addresses);
        
        
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setDashLoading(false);
      }
    };
    
    getProfile();
  }, [ navigate]);

  if (!isAuthenticated) {
    return <p className="text-center text-red-500">Not authorized. Redirecting...</p>;
  }
  
  const fullName = user ? `${user.first_name}`.trim() : '';
  console.log("fullname",user.user);
  const formatDateTime = (isoString: string) => {
      if (!isoString) return '';
      const [date, timeWithMs] = isoString.split('T');
      const time = timeWithMs.split('.')[0]; 
      return `${date} ${time}`;
  };

  return (
        
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-slate-900">Welcome back, {user?.first_name}!</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Your Details</h2>
        <div className="space-y-2">
          <p className="text-slate-800"><span className="font-semibold text-slate-900">Name:</span> {fullName}</p>
          <p className="text-slate-800"><span className="font-semibold text-slate-900">Email:</span> {user?.email}</p>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-slate-900">Saved Addresses</h3>
                <Link to="/dashboard/addresses" className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
                    Manage Addresses
                </Link>
            </div>
            
            {addresses && addresses.length > 0 ? (
              <ul className="space-y-3 mt-2">
                {addresses.map((addr, index) => (
                  <li key={index} className="border p-3 rounded-md bg-slate-50">
                    <p className="text-slate-800">{addr.street}, {addr.city}, {addr.state} {addr.pincode}, {addr.country}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 mt-2">You have no saved addresses.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-slate-800">Recent Orders</h2>
            <Link to="/dashboard/orders" className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
                Manage Orders
            </Link>
        </div>
        {dashloading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="space-y-4">
            
            {orders.length > 0 ? orders.map(order => ( //summary of recent
              <div key={order.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-primary">Order #{order.id}</p>
                  <span className={`px-3 py-1 text-sm rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500">Date: {formatDateTime(order.createdAt)}</p>
                <p className="font-semibold">Total: ${parseFloat(order.total_price).toFixed(2)}</p>
                
              </div>
            )) : (
              <p className="text-slate-500">You have no past orders.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;