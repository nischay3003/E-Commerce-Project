import { useRouter } from "next/router";
import { useState ,useEffect} from "react"
import api from "../../../lib/api";
import Link from "next/link";
import Appbar from '../../../components/Appbar';
export default function CategoryPage(){
    
    const [products,setProducts]=useState([]);
    const router=useRouter();
    const {id:category_id}=router.query;
    useEffect(()=>{
        if(!category_id) return  ;
        const getProducts=async()=>{
            try{
               console.log("Going to make request")
                const response=await api.get(`/api/products/category/${category_id}`);
                if(response.status===200){
                    setProducts(response.data);
                }
            }catch(err){
                console.log("Failed to fetch products");
            }
        }
        getProducts();
    },[category_id]);

    return <>
        <div><Appbar/></div>
        <div>
            <h2>Products in Category</h2>
            {products.length > 0 ? (
            products.map((p) => <div><Link href={`/products/${p.id}`}><li key={p.id}>{p.name} - ₹{p.price}</li></Link></div>)
            ) : (
            <p>No products found</p>
            )}
        </div>
    </>
}