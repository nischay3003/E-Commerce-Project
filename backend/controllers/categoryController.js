const Category = require('../models/categoryModel');


const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Sequelize or ORM
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch category' });
  }
};


const createCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({ message: 'Name and imageUrl are required' });
    }

    const newCategory = await Category.create({ name, imageUrl });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create category' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name || category.name;
    category.imageUrl = imageUrl || category.imageUrl;

    await category.save();

    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update category' });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
