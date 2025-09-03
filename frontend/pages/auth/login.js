import { useState } from "react";
import api from  '../../lib/api';
import Link from 'next/link'
import Appbar from "../../components/Appbar";
import { useRouter} from "next/router";
export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(null);
    const router=useRouter();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await api.post('/api/users/login',{email,password});
            setError(null);
            if(response){
                console.log("Successfull Login");
                router.push('/dashboard');
            }
            



        }catch(err){
            setError('Invalid Credentials');
            
        }
    }
        return <>
            <div><Appbar/></div>
            <h1>Login</h1>
            {error?<p>{error}</p>:null}
            <form onSubmit={handleSubmit}>
                <ul type="none">
                    <li><label>Email:</label><input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/></li>
                <li><label>Password</label><input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/></li>
                <li><button type="submit">Login</button></li>
                </ul>
            </form>
            <Link href="/auth/register">Register / NewUser</Link>
           
        </>
    }
