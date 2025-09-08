const { where } = require('sequelize');
const ProductImage=require('../models/productImagesModel');
async function addImage(req,res) {
    try{
        const {imageUrl,productId}=req.body;
        const productImage=await ProductImage.create({
            imageUrl,productId
        });
        
        return res.status(201).json({message:"Product Image added",productImage});
        


    }catch(err){
        console.log(err);
        return res.status(501).json({message:"Failed to add Product Image"})
    }
    
}
async function deleteImage(req,res){
    try{
        const{id}=req.params;
        const productImage=await ProductImage.findByPk(id);
        if(!productImage){
            return res.status(404).json({message:"Product Image Not found"});
        }
        productImage.destroy();
        return res.status(200).json({message:"Product image deleted successfully"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Failed to delete image "});
    }
}
async function getImage(req,res){
    try{
        const {id}=req.params;
        const image=await ProductImage.findByPk(id);
        if(!image){
            return res.status(404).json({message:"Product Image Not Found"});
        }
        return res.status(200).json(image);


    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Failed to fetch product image"});
    }
}
async function getAllImages(req,res){
    try{
        const productImages=await ProductImage.findAll();
        if(!ProductImage){
            return res.status(404).json({message:"No Product Image Found"});

        }
        return res.status(200).json(productImages);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to fetch product images"});
    }
}
async function getAllProductImages(req,res){
    try{
        const {productId}=req.params;
        const productImages=await ProductImage.findAll({where:{productId}});
        if(!productImages){
            return res.status(404).json({message:"Product Not Found"});
        }
        return res.status(200).json({productImages});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Failed to fetch images of Product "})
    }
}
async function updateImage(req,res){
    try{
        const {id}=req.params;
        const {imageUrl,productId}=req.body;
        const productImage=await ProductImage.findByPk(id);
        if(!productImage){
            return res.status(404).json({message:"Product Image Not Found"});
        }
        const updatedImage=await productImage.update({
            imageUrl,
            id,
            productId
        });

        return res.status(200).json({
            message:"Product Image updated successfully",
            updateImage:{
                id:updatedImage.id,
                productId:updatedImage.productId,
                imageUrl:updatedImage.imageUrl
                
            }
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Failed to update image"});

    }
}
module.exports={addImage,deleteImage,updateImage,getImage,getAllProductImages,getAllImages};