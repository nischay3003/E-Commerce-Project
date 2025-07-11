const bcrypt=require('bcrypt');
const {createUser}=require('../models/userModel.js');

async function registerUser(req,res) {
    try{

    const {first_name,last_name,email,phone_num,password}=req.body;
    const hashed_password=await bcrypt.hash(password,10);
    const user= await createUser({
        first_name,
        last_name,
        email,
        phone_num,
        hashed_password
    });
    res.status(201).json({message:"user registered successfully"});

    }
    catch{
        console.error(500).json({message:"Registration failed"});

    }

    
}

module.exports =  registerUser ;