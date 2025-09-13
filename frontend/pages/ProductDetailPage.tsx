import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import ReviewCard from '@/components/ReviewCard';
const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      
      if (!productId) return;

      setLoading(true);
      // This is where a real API call would go.
      try {
        const prod = await getProductById(productId);
        console.log(prod);  
        setProduct(prod);
        setSelectedImageIndex(0); // Reset image on new product load
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
      if (!product) return;

      try {
        await addToCart(product, quantity); // API call
        alert(`${quantity} of ${product.name} added to cart!`);
      } catch (error: any) {
        console.error("Failed to add to cart:", error);
        alert("Something went wrong while adding to cart. Please try again.");
      }
    };


  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-red-500">Product not found.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images[selectedImageIndex].imageUrl} 
            alt={`${product.id} view ${selectedImageIndex + 1}`} 
            className="w-full h-auto object-cover rounded-lg shadow-md mb-4" 
          />
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img,index) => (
              <button 
                key={img.id}
                onClick={() => setSelectedImageIndex(index)}
                className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImageIndex === img.id ? 'border-primary' : 'border-transparent hover:border-slate-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                aria-label={`View product image ${index + 1}`}
              >
                <img 
                  src={img.imageUrl} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          {/* Resolve Rating Inssue*/}
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-4">
            <span className="text-amber-500 flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.round(product.averageRating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </span>
            <span className="text-slate-500 ml-2 text-sm">{product.averageRating.toFixed(1)} ({product.reviewCount} reviews)</span>
          </div>
          <p className="text-slate-600 mb-6">{product.longDesc}</p>
          <div className="flex items-center space-x-4">
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 border-slate-300 rounded-md text-center"
              min="1"
            />
            <button onClick={handleAddToCart} className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
              Add to Cart
            </button>
          </div>
          
          {product.specification && Object.keys(product.specification).length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Technical Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specification).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-4 text-sm">
                    <p className="font-semibold text-slate-600">{key}</p>
                    <p className="text-slate-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Reviews</h3>
            <div className="space-y-4">
              {/* <p className="text-slate-500 italic">Dummy reviews section. Backend integration needed.</p> */}
              {/* Dummy Reviews
              <div className="border p-4 rounded-md">
                <p className="font-bold">Alice</p>
                <p className="text-sm text-slate-600">This product is amazing! Highly recommended.</p>
              </div>
               <div className="border p-4 rounded-md">
                <p className="font-bold">Bob</p>
                <p className="text-sm text-slate-600">Good value for the price. Works as expected.</p>
              </div> */}
              {product.review && product.review.length > 0 && (
                product.review.map((r: any, index: number) => (
                  <ReviewCard
                    key={index}
                    name={r.user?.first_name || "Anonymous"}
                    rating={r.rating}
                    comment={r.comment}
                  />
                ))
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;