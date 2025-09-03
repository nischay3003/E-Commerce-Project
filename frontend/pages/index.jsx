import Appbar from "../components/Appbar"
import { useState,useContext, useEffect } from "react";
import api from "../lib/api";
import Link from 'next/link';
export default function HomePage(){
    const [categories,setCategories]=useState([]);
    useEffect(() => {
    const getCategories = async () => {
        try {
            const categoryRes = await api.get("/api/category");
            if(categoryRes.status === 200){
                setCategories(categoryRes.data); 
            }
        } catch(err) {
            console.log("Failed to fetch categories");
        }
    };
    getCategories();
}, []);

       
    return <>
        <Appbar/>
        <div><h2>Home Page</h2> </div>
        <div>{categories.map(c=>(
            <li><Link key={c.id} href={`/products/category/${c.id}`}>{c.id}. {c.category_name}</Link></li>
        ))}
        </div>
    </>
}