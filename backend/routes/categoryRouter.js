const express=require('express');
const { getCategories } = require('../controllers/categoryController');
const router=express();
router.get('/',getCategories);
module.exports=router
