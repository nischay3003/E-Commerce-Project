    import { useState } from 'react'
    import api from '../../lib/api'
    import { useRouter } from 'next/router';
    import { useEffect } from 'react';
    import Appbar from '../../components/Appbar'
    export default function DashboardPage(){
        const router=useRouter();
        const [profile,setProfile]=useState(null);
        const [orders,setOrders]=useState([]);
        const [cart,setCart]=useState([]);
        const [address,setAddress]=useState([]);
        const [loading,setLoading]=useState(true);
        
        useEffect(()=>{
            const fetchProfile=async()=>{
            try{
                const userRes=await api.get('/api/users/me');
                
                setProfile(userRes.data.user);
                
                const orderRes=await api.get('/api/orders');
                setOrders(orderRes.data.orders);

                const cartRes=await api.get('/api/cart');
                setCart(cartRes.data);
                
                const addressRes=await api.get('/api/addresses');
                setAddress(addressRes.data.addresses);
               
                    
                


            }
            catch(err){
                alert("No token Found Please Login to continue.")
                router.push('/auth/login');
            }
            finally{
                setLoading(false);
            }
            }
            fetchProfile();
        },[router])
        const logoutHandler=async()=>{
            try{
                const res=await api.post('/api/users/logout');
                if(res.status==200){
                    router.push('/auth/login');
                }
            }catch(err){
                console.log("Failed to logout");
            }

        }
            
        
    if(loading) return<h1>Loading.....</h1>;

        return <>
            <Appbar/>
            <h1>Dashboard</h1>
            <div>Welcome,&nbsp;{ profile && profile.first_name}</div>
            
            <section>
                        <div><h4>Profile</h4></div>
                        <div>email: {profile && profile.email}</div>
                        <div>phone no.:{ profile && profile.phone_number}</div>
            </section>

            <section>
                <div>My Cart</div>
                {cart.items && cart.items.length>0?cart.items.map(c=>(
                    <div key={c.id}>
                        <p>{c.product.name} x {c.quantity}={c.product.price*c.quantity}</p>

                    </div>

                )):<p>Your Cart is empty</p>}
            </section>
            
            <section>
                <div>My Orders</div>
                {orders.length>0?
                    orders.map(o=>(
                        <div key={o.id}>
                            <p>Order #{o.id} -{o.order_status} ₹{o.total_price}</p>
                        </div>
                    ))
                    :<p>No Orders Yet</p>
                }
            </section>

            <section>
                <div>My Addresses</div>
                {address.length>0?address.map(a=>(
                    <div key={a.id}>
                        <p>{a.street},{a.city},{a.state},({a.pinCode}),{a.county}</p>
                    </div>
                )):<p>No Saved Address</p>}
            </section>


            <div>
                <button onClick={logoutHandler}>Logout</button>
            </div>
            

        </>
    }

