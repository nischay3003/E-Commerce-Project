const express=require("express");
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, getProductsByCategory, bulkProduct, searchProducts, getHighRatedProducts } = require("../controllers/productController");
const router=express.Router();
router.get('/',getAllProducts);
router.post('/',createProduct);
router.get('/search/',searchProducts);
router.get('/high-rated',getHighRatedProducts);
router.get('/:id',getProductById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);
router.get('/category/:category_id',getProductsByCategory);
router.post('/bulk',bulkProduct);

module.exports=router;