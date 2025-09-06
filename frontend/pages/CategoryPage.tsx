
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getCategoryById } from '../services/api';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) return;
      setLoading(true);
      // This is where real API calls would go.
      try {
        const [prods, cat] = await Promise.all([
            getProducts(categoryId),
            getCategoryById(categoryId)
        ]);
        setProducts(prods);
        setCategory(cat);
      } catch (error) {
        console.error("Failed to fetch category data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 border-b pb-4">{category?.name}</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
