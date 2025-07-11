const express= require('express');
const userRoutes=require('./routes/userRouter');
const app=express();
app.use(express.json());
// app.use("/api/users",userRoutes);
// app.post('/user',(req,res)=>{
    
// });

// app.get('/user:id',(req,res)=>{
//     const userId = req.params.id;
//     console.log("Fetching user with ID:", userId);
//     res.send(`User with ID ${userId} fetched successfully`);
// });
app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
