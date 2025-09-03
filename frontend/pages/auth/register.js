import { useState } from "react";
import api from '../../lib/api';
import { useRouter } from "next/router";
import Link from 'next/link'
import Appbar from "../../components/Appbar";
export default function RegisterUserPage(){
    const router=useRouter();
    const [firstname,setFirstname]=useState('');
    const [email,setEmail]=useState('');
    const [lastname,setLastname]=useState('');
    const [password,setPassword]=useState('');
    const [phnNum,setPhnNum]=useState('');
    const [error,setError]=useState(null);
    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            const response=await api.post('/api/users/register',{
                first_name:firstname,
                last_name:lastname,
                email:email,
                password:password,
                phone_number:phnNum
        })
        
        router.push('/dashboard');
        setError(null);
        if(response.status==201){
            console.log("successfull registration")
            
        }
    }
        catch(err){
            setError("Invalid Credentials");
        }

    }

    return<>
        <div><Appbar/></div>
        <h1>Signup</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleRegister} > 
            <ul type="none">     
                <li/><label>First Name:</label> <input type="text" value={firstname} onChange={(e)=>{setFirstname(e.target.value)}}/>
                <li/><label>Last Name:</label> <input type="text" value={lastname} onChange={(e)=>{setLastname(e.target.value)}}/>
                <li/><label>Email:</label><input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <li/><label>Password:</label><input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <li/><label>Contact No.:</label><input type="number" value={phnNum} onChange={(e)=>{setPhnNum(e.target.value)}}/>
                <li/><button type="submit">Signup</button>
            </ul>  
        </form>
        <Link href="/auth/login">Login/Signin</Link>

    </>


}