const Product = require('./productModel');
const Review = require('./reviewsModel');
const User = require('./userModel');
const Category = require('./categoryModel');

// Product and Category
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });

// Product and Review
Product.hasMany(Review, { foreignKey: 'productId', as: 'review' });
Review.belongsTo(Product, { foreignKey: { name: 'productId', allowNull: false } });

// User and Review
User.hasMany(Review, { foreignKey: 'userId', as: 'review' });
Review.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, as: 'user' });