import { useState,useEffect } from "react";
import api from '../../lib/api';
import {useRouter} from 'next/router';
import Appbar from "../../components/Appbar";
export default function ProductDetailPage(){
    const router=useRouter();
    const {id}=router.query;
    
        const addToCartHandler=async(productId)=>{
        try{
        const res=await api.post('/api/cart/add',{"product_id": productId,
            "quantity": 1});
        if(res.status==200){
        console.log("Item added to cart successfully.");
        }

        }catch(err){
            if (err.response && err.response.status === 401) {
                console.log("User not logged in, redirecting to login page...");
                router.push("/auth/login"); 
            } else {
                console.log("Failed to add item to cart.", err);
            }

        }
    }
    const [products,setProducts]=useState(null);
    useEffect(()=>{
        if(id){
            api.get(`/api/products/${id}`)
            .then(res=>setProducts(res.data))
            .catch(err=>console.log("Api Error:",err));

        }
    },[id]);
    console.log(products);
    if(!products){
        return <p>Loading.....</p>
    }
    return (
        <div>
            <div><Appbar/></div>
            <div style={{display:"flex"}}>
            <div><img src="https://placehold.co/500x400"/></div>
            <div><h1>{products.name}</h1>
            <p>Price:{products.price}</p>
            <p>Description:{products.description}</p>
            <div><button onClick={()=>addToCartHandler(products.id)}>Add to Cart</button></div>
            </div>
            </div>
        </div>
    )
}