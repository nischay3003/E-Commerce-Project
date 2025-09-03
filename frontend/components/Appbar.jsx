import { useRouter } from "next/router"
export default function Appbar(){
    const router=useRouter();
    return <>
    <button onClick={()=>{router.push('/cart');}}>Go to Cart</button>
    <button onClick={()=>{router.push('/dashboard')}}>Dashboard</button>
    <button onClick={()=>{router.push('/products')}}>Products</button>
    <button onClick={()=>{router.push('/')}}>Home </button>
    
    </>

}