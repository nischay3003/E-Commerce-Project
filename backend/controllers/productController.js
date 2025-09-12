const Product = require('../models/productModel');
const ProductImage = require('../models/productImagesModel');
const Review = require('../models/reviewsModel');
const { fn,col,Sequelize, Op } = require('sequelize');
const User = require('../models/userModel');

async function createProduct(req, res) {
  try {
    const { name, price, description, category_id, specification, longDesc, images } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ message: 'Name, price and category_id are required' });
    }

    // Create product first
    const product = await Product.create({
      name,
      price,
      description,
      category_id,
      specification,
      longDesc
    });

    // If images array provided, create and associate them
    if (Array.isArray(images) && images.length > 0) {
      const productImages = images.map(imageUrl => ({
        productId: product.id,
        imageUrl,
      }));
      await ProductImage.bulkCreate(productImages);
    }

    // Reload product with images included
    const productWithImages = await Product.findByPk(product.id, {
      include: [{ model: ProductImage, as: 'images', attributes: ['id', 'imageUrl'] }]
    });

    return res.status(201).json({ message: "Product created successfully", product: productWithImages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Product creation failed" });
  }
}

const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const results = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { longDesc: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include: [{ model: ProductImage, as: 'images', attributes: ['id', 'imageUrl'] }],
    });

    res.status(200).json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Failed to search products' });
  }
};

async function getHighRatedProducts(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 4;

    const products = await Product.findAll({
      attributes: {
        include: [
          [Sequelize.cast(Sequelize.col('price'), 'FLOAT'), 'price'],
          [
            Sequelize.literal(`(
              SELECT CAST(COALESCE(AVG("review"."rating"), 0) AS FLOAT)
              FROM "review"
              WHERE "review"."productId" = "product"."id"
            )`),
            'averageRating'
          ]
        ]
      },
      include: [
        {
          model: ProductImage,
          as: 'images',
          attributes: ['id', 'imageUrl']
        }
      ],
      order: [[Sequelize.literal('"averageRating"'), 'DESC']],
      limit,
    });

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch high rated products' });
  }
}

async function bulkProduct(req, res) {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }

    // Create products first
    const createdProducts = await Product.bulkCreate(products, { validate: true, returning: true });

    // Now handle images for each product if provided in the input
    for (let productInput of products) {
      if (productInput.images && productInput.images.length > 0) {
        const product = createdProducts.find(p => p.name === productInput.name); // crude match by name or add unique id in input
        if (product) {
          const imagesData = productInput.images.map(imageUrl => ({
            productId: product.id,
            imageUrl,
          }));
          await ProductImage.bulkCreate(imagesData);
        }
      }
    }

    // Reload products with images
    const productIds = createdProducts.map(p => p.id);
    const productsWithImages = await Product.findAll({
      where: { id: productIds },
      include: [{ model: ProductImage, as: 'images', attributes: ['id', 'imageUrl'] }],
    });

    return res.status(201).json({ message: "Products created successfully", products: productsWithImages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Bulk product creation failed" });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll({
      include: [{ model: ProductImage, as: 'images', attributes: ['id', 'imageUrl'] }]
    });

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    // 1. Get product with images + reviews
     
    const product = await Product.findByPk(id, {
  include: [
    { 
      model: ProductImage, 
      as: 'images', 
      attributes: ['id', 'imageUrl'] 
    },
    { 
      model: Review, 
      as: 'review', 
      attributes: ['id', 'rating', 'comment', 'userId', 'createdAt'],
      include: [
        { 
          model: User, 
          as: 'user',  // This comes from the association we defined
          attributes: ['id', 'first_name',] // reviewer name
        }
      ] 
    }
  ]
});
      // Calculate average rating from fetched reviews
      let averageRating = null;
      let reviewCount=0;
      if (product.review && product.review.length > 0) {
        reviewCount=product.review.length;
        const sum = product.review.reduce((acc, r) => acc + r.rating, 0);
        averageRating = sum / product.review.length;
      }

      // 3. Merge response
      


    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
        ...product.toJSON(),
        averageRating: parseFloat(averageRating) || 0,
        reviewCount
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to fetch product" });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, description, longDesc, specification, category_id, images } = req.body;

    // Find the product with images included
    const product = await Product.findByPk(id, {
      include: [{ model: ProductImage, as: 'images' }]
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product details
    await product.update({ name, price, description, longDesc, specification, category_id });

    // Update images
    if (Array.isArray(images)) {
      for (const img of images) {
        if (img.id) {
          // If image id provided, update that image
          const existingImage = product.images.find(image => image.id === img.id);
          if (existingImage) {
            await existingImage.update({ imageUrl: img.imageUrl });
          } else {
            // Image id provided but not found; you can choose to throw error or create new
            // For now, let's create new image
            await ProductImage.create({ productId: id, imageUrl: img.imageUrl });
          }
        } else {
          // No id provided, treat it as new image to add
          await ProductImage.create({ productId: id, imageUrl: img.imageUrl });
        }
      }
    }

    // Reload product with images
    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: ProductImage, as: 'images', attributes: ['id', 'imageUrl'] }]
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (err) {
    console.error(err);
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

    // Optional: Delete associated images first (if you want to cascade manually)
    await ProductImage.destroy({ where: { productId: id } });

    await product.destroy();

    return res.status(200).json({
      message: "Product deleted successfully",
      deleted_product: product
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to delete the product" });
  }
}

async function getProductsByCategory(req, res) {
  try {
    const { category_id } = req.params;

    const products = await Product.findAll({
      where: { category_id },
      include: [
                { 
                  model:  ProductImage, as: 'images', attributes: ['id', 'imageUrl'] 
                },
                {
                  model:Review,as:'review',attributes:[],
                }
              ],
              attributes:{
                include:[
                  [
                  Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('review.rating')), 1),'averageRating',
                ],
                [
                  Sequelize.fn('COUNT', Sequelize.col('review.id')),
                  'reviewCount',
                ]
              ]
              },
              group:['product.id','images.id']
              
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
}

module.exports = {
  createProduct,
  searchProducts,
  getHighRatedProducts,
  bulkProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
