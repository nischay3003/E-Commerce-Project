import { useEffect, useState } from "react";
import api from '../../lib/api';
import Appbar from "../../components/Appbar";
import { useRouter } from "next/router";
import Link from 'next/link';
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const router=useRouter();

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
                router.push("/auth/login"); // redirect to login page
            } else {
                console.log("Failed to add item to cart.", err);
            }
    }
  }


  useEffect(() => {
    api.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log('API Error:', err));
  }, []);
  console.log(products);
  return (
    <div className="p-4 border rounded">
      <Appbar/>
      <h1 className="text-xl font-bold mb-2">Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            <Link href={`/products/${product.id}`}>
            <strong>{product.name}</strong> - {product.price} 
            </Link>
            <div><button onClick={()=>addToCartHandler(product.id)}>Add to Cart</button></div><br/>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
