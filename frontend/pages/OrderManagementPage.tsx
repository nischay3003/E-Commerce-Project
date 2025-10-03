import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders, returnOrder, cancelOrder } from '../services/api';
import { Order } from '../types';
import { useNavigate, Link } from 'react-router-dom';

const OrderManagementPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const userOrders = await getOrders();
        console.log("user order",userOrders);
        setOrders(userOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [isAuthenticated, navigate]);
  
  const handleReturnOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to return this order?')) {
        try {
            const updatedOrder = await returnOrder(orderId);
            if(updatedOrder) {
                setOrders(prevOrders => 
                    prevOrders.map(o => o.id === orderId ? updatedOrder : o)
                );
            }
        } catch (error) {
            console.error("Failed to return order", error);
            alert("Failed to process return.");
        }
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
        try {
         
          const updatedOrder = await cancelOrder(orderId);
            if (updatedOrder) {
            // refetch all orders
            const userOrders = await getOrders();
            setOrders(userOrders);
          }
        } catch (error) {
            console.error("Failed to cancel order", error);
            alert("Failed to process cancellation.");
        }
    }
  };

  const getStatusClass = (status: Order['status']) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Returned': return 'bg-slate-100 text-slate-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };


  if (loading) {
    return <div className="text-center py-10">Loading your orders...</div>;
  }
  
  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800">Your Orders</h1>
        <Link to="/dashboard" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">&larr; Back to Dashboard</Link>
      </div>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 bg-slate-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                  <div>
                      <p className="text-sm text-slate-500">ORDER PLACED</p>
                      <p className="font-medium text-slate-800">{order.createdAt}</p>
                  </div>
                  <div>
                      <p className="text-sm text-slate-500">TOTAL</p>
                      <p className="font-medium text-slate-800">${parseFloat(order.total_price).toFixed(2)}</p>
                  </div>
                  <div>
                      <p className="text-sm text-slate-500">STATUS</p>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full inline-block ${order.order_status}`}>
                        {order.order_status=="processing"?"Processing":""}
                        {order.order_status=="delivered"?"Delivered":""}
                        {order.order_status=="cancelled"?"Cancelled":""}
                      </span>
                  </div>
                  <div className="text-right">
                      <p className="text-sm text-slate-500">ORDER #</p>
                      <p className="font-medium text-slate-800">{order.id}</p>
                  </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-4 flex-grow">
                    {order.order_items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4">
                        {/* Fix: The Product type has an `imageUrls` array, not a single `imageUrl`. Using the first image. */}
                        {/* <img src={item.product.imageUrls[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" /> */}
                        <div className="flex-grow">
                        <p className="font-semibold text-slate-800">{item.product.name}</p>
                        <p className="text-sm text-slate-600">Qty: {item.quantity} - ${item.product.price.toFixed(2)} each</p>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="flex-shrink-0 mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
                    {order.order_status === 'processing' && (
                        <button 
                            onClick={() => handleCancelOrder(order.id)}
                            className="w-full md:w-auto bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm font-medium"
                        >
                            Cancel Order
                        </button>
                    )}
                    {order.order_status === 'delivered' && (
                        <button 
                            onClick={() => handleReturnOrder(order.id)}
                            className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                            Return Order
                        </button>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 py-10">You haven't placed any orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrderManagementPage;