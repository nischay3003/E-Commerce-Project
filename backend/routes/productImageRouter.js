const express=require("express");
const router=express();
const {getImage,updateImage,getAllProductImages,deleteImage,addImage, getAllImages}=require("../controllers/productImageController");
router.get('/image/:id',getImage);
router.post('/',addImage);
router.get('/all/:productId',getAllProductImages);
router.put('/:id',updateImage);
router.delete('/:id',deleteImage);
router.get('/images/all',getAllImages)
module.exports=router;
