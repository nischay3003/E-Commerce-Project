const Product = require('../models/productModel');
const client=require('../redis');
async function createProduct(req, res) {
    try {
        const { name, price, description, category_id } = req.body;
        const product = await Product.create({
            name,
            price,
            description,
            category_id
        });
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Product creation failed" });
    }
}

async function getAllProducts(req, res) {
    try {
            // const cached = await client.get('products'); // First wait for Redis to return data
            // const productCachedData = cached ? JSON.parse(cached) : null;

            // if (!productCachedData) {
            //      const products = await Product.findAll();
            //     const setProducts = await client.set('products', JSON.stringify(products));
            //     if (setProducts) console.log("products set-----------");
            //     return res.status(200).json(products);
            // } else {
            // return res.status(200).json({data:productCachedData,message:"got Products from redis cache"});    
            // }
            const products = await Product.findAll();
              return res.status(200).json(products);


        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to fetch products" });
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to fetch product" });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await product.update({
            name,
            description,
            price
        });
        return res.status(200).json({
            message: "Product updated successfully",
            updated_product: {
                id: updatedProduct.id,
                name: updatedProduct.name,
                description: updatedProduct.description,
                price: updatedProduct.price
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update the product" });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const deletedProduct = product;
        await product.destroy();
        return res.status(200).json({
            message: "Product deleted successfully",
            deleted_product: {
                id: deletedProduct.id,
                name: deletedProduct.name,
                description: deletedProduct.description,
                price: deletedProduct.price
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to delete the product" });
    }
}
async function getProductsByCategory(req, res) {
  try {
        
    const { category_id } = req.params; 
    const products = await Product.findAll({ where: { category_id } });


    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
}
module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductsByCategory };
