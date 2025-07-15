const bcrypt=require('bcrypt');
const User=require('../models/userModel.js');
const jwt=require('jsonwebtoken');
require('dotenv').config();
async function registerUser(req,res) {
    try{

    const {first_name,last_name,email,phone_number,password}=req.body;
    const hashed_password=await bcrypt.hash(password,10);
    const user= await User.create({
        first_name,
        last_name,
        email,
        hashed_password,
        phone_number
    });
   
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,

    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name
      }
    });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Registration failed"});


    }

    
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    if (!password || !user.hashed_password) {
      return res.status(400).json({ message: "Missing password or hash" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashed_password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed due to server error" });
  }
}
async function getUserProfile(req,res){
  try{
    const user=req.user;
    // const fullUser=await User.findByPk(req.user.id);
    // console.log(fullUser.dataValues);
    //get the full user
    res.status(200).json({
      message:"User Profile fetched successfully",
      user
    });
  }
  catch(err){
    res.status(401).json({message:"Failed to fetch user profile"})
  }
}


module.exports =  {registerUser,loginUser,getUserProfile} ;