
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="group relative block overflow-hidden rounded-lg shadow-lg">
      <img src={category.imageUrl} alt={category.category_name} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold tracking-wider">{category.category_name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
