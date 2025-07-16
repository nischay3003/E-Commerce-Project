const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllAddresses, addAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const router=express.Router();
router.get("/",authMiddleware,getAllAddresses);
router.post("/",authMiddleware,addAddress);
router.put("/:id",authMiddleware,updateAddress);
router.delete("/:id",authMiddleware,deleteAddress);
module.exports=router;