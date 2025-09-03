import { useEffect,useState } from "react";
import api from "../../lib/api"
import Appbar from "../../components/Appbar";
import { useRouter } from "next/router";
export default function CartsPage(){
    const [cart,setCart]=useState([]);
    const router=useRouter();
    const fetchCart=async ()=>{
            try{
                const resCart=await api.get('/api/cart');
                if(resCart.status==200){
                    setCart(resCart.data);
                    console.log(resCart);
                    loading=true;
                }else if(resCart.status===401){
                    alert("You are not logged in ! Please Log in ")
                    router.push('/auth/login');
                }
            }catch(err){    
                console.log("Failed to fetch cart");

            }
        }

    useEffect(()=>{
        
        
        fetchCart();
    },[]);

    const addToCartHandler=async(productId)=>{
        try{
            const cartRes=await api.post('/api/cart/add',{"product_id": productId,"quantity": 1});
            if(cartRes.status==200){
                console.log("Item added to cart successfully");
            }
            fetchCart();
        }catch(err){
            console.log("Failed to add to cart",err);
        }

    }
    const updateCart=async(productId)=>{
        try{
            const cartRes=await api.put(`/api/cart/update/${productId}`);
            if(cartRes.status==200){
                console.log("Item Updated");
                await fetchCart();
            }

        }catch(err){
            console.log("Failed to update quantity",err);
        }
    }
    const removeProduct=async(productId)=>{
        try{
            const cartRes=await api.delete(`/api/cart/remove/${productId}`);
            if(cartRes.status==200){
                console.log("Item Removed from cart");
                await fetchCart();
            }
        }catch(err){
            console.log("Failed to remove item from cart",err);
        }
    }

    
    
    
    if(!cart) return <p>Loading cart.......</p>

    return <>
        <Appbar/>
        <div><h1>Cart</h1></div>
        <div><ol>
            {cart.items && cart.items.length>0?cart.items.map(c=>(
                <li>
                    <div key={c.id}>
                    <p>{c.product.name} x {c.quantity}={"  ₹"}{c.product.price*c.quantity}</p>
                    </div>
                    <div>
                            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                        <button
                            style={{padding: "6px 12px",border: "none",borderRadius: "6px",backgroundColor: "#4caf50",color: "white",cursor: "pointer",}}
                            onClick={()=>addToCartHandler(c.product_id)}
                        >
                            +
                        </button>
                        <button
                            style={{
                            padding: "6px 12px",
                            border: "none",
                            borderRadius: "6px",
                            backgroundColor: "#fbc02d",
                            color: "white",
                            cursor: "pointer",
                            }}
                            onClick={()=>updateCart(c.product_id)}
                        >
                            -
                        </button>
                        <button
                            style={{
                            padding: "6px 12px",
                            border: "none",
                            borderRadius: "6px",
                            backgroundColor: "#f44336",
                            color: "white",
                            cursor: "pointer",
                            }}
                            onClick={()=>removeProduct(c.product_id)}
                            
                        >
                            Remove
                        </button>
                        </div>

                    </div>
                </li>

            )):<p>Your Cart is empty</p>}
            </ol>
        </div>
    </>
}