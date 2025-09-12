
import React, { useState, useEffect } from 'react';
import { getCategories, getHighRatedProducts } from '../services/api';
import { Category, Product } from '../types';
import BannerSlider from '../components/BannerSlider';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const banners = [
    {
      title: 'Summer Sale is Here!',
      subtitle: 'Get up to 50% off on selected items. Don\'t miss out!',
      buttonText: 'Shop Now',
      buttonLink: '/',
      bgColorClasses: 'bg-gradient-to-r from-primary to-secondary',
    },
    {
      title: 'New Electronics Collection',
      subtitle: 'Discover the latest in tech. Upgrade your life today.',
      buttonText: 'Explore Electronics',
      buttonLink: '/category/1',
      bgColorClasses: 'bg-gradient-to-r from-slate-800 to-slate-600',
    },
    {
      title: 'Cozy Home Essentials',
      subtitle: 'Everything you need to make your space feel like home.',
      buttonText: 'View Home Goods',
      buttonLink: '/category/4',
      bgColorClasses: 'bg-gradient-to-r from-emerald-500 to-lime-600',
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // This is where a real API call would go.
      
      try {
        const catRes=await getCategories();
        const prodRes=await getHighRatedProducts();
      
        // const [cats, prods] = await Promise.all([
        //   getCategories(),
        //   getHighRatedProducts()
        // ]);
        if(catRes)setCategories(catRes);
        if (prodRes)setFeaturedProducts(prodRes);
      } catch (error) {
        console.error("Failed to fetch homepage data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="space-y-12">
      <BannerSlider banners={banners} />

      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Top Rated Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
