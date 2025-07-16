const Product=require('../models/productModel')

async function createProduct(req,res) {
    try{
        const{name,price,description,category_id}=req.body;
        console.log(category_id)
        const product=await Product.create({
            name,
            price,
            description,
            category_id
        })
        res.status(200).json({message:"Product created successfully",product});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Product creation failed"});
    }
    
}


async function getAllProducts(req,res){
    try{
        const products=await Product.findAll() ;
        res.status(200).json(products);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to fetch products"});
    }
}
async function getProductById(req,res){
    try{
        const {id}=req.params;
        const product=await Product.findByPk(id);
        res.status(200).json(product);

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Unable to fetch product"});
    }

}
async function updateProduct(req,res) {
    try{
        const {id}=req.params;
        const {name,price,description}=req.body;
        const product=await Product.findByPk(id);

        if(!product){
            res.status(404).json({message:"Product not found"});
        }

        const updatedProduct=await product.update({
            name,
            description,
            price

        })
        res.status(200).json({message:"Product updated successfully",
            updated_product:{
                id:updatedProduct.id,
                name:updatedProduct.name,
                description:updatedProduct.description,
                price:updatedProduct.price
            }
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to update the product"});
    }
    
}
async function deleteProduct(req,res){
    try{
        const {id}=req.params;
        const product=await Product.findByPk(id);
        const deletedProduct=product;
        if(!product){
            res.status(404).json({message:"Product not found"});
        }
        await product.destroy();
        res.status(200).json({message:"Product deleted successfully",
            deleted_product:{
                id:deletedProduct.id,
                name:deletedProduct.name,
                description:deletedProduct.description,
                price:deletedProduct.price
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to delete the product"});
    }
}
module.exports={createProduct,getAllProducts,getProductById,updateProduct,deleteProduct};  