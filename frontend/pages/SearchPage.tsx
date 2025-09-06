
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      // This is where a real API call would go.
      try {
        const prods = await searchProducts(query);
        setProducts(prods);
      } catch (error) {
        console.error("Failed to fetch search results", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  if (loading) {
    return <div className="text-center py-10">Searching...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Search Results for: <span className="text-primary">"{query}"</span>
      </h1>
      <p className="text-slate-600 mb-8 border-b pb-4">
        {products.length} {products.length === 1 ? 'product' : 'products'} found.
      </p>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 py-10">No products found matching your search.</p>
      )}
    </div>
  );
};

export default SearchPage;
