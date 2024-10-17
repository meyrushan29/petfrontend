import React, { useState, useEffect } from 'react';
import { ChevronRight, RefreshCcw } from 'lucide-react';
import s1 from '../Assets/s1.png';
import s2 from '../Assets/s2.png';
import s3 from '../Assets/s3.png';
import s4 from '../Assets/s4.png';
import s5 from '../Assets/s5.png';
import s6 from '../Assets/s6.png';
import s7 from '../Assets/s7.png';
import sll02 from '../Assets/sll02.png'; // Make sure the image path is correct

const ProductCard = ({ image, name, product, size, price, description }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow relative">
      <div className="aspect-square rounded-xl overflow-hidden mb-4">
        <img
          src={image || "/api/placeholder/300/300"}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/300";
          }}
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-black text-lg leading-tight">{name}</h3>
        
        <div className="flex items-center text-sm text-black font-semibold space-x-2">
          <span>Product: {product}</span>
          {size && (
            <>
              <span>•</span>
              <span>Size: {size}</span>
            </>
          )}
        </div>

        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        )}

        <div className="font-bold text-lg text-black">
          {typeof price === 'number' ? 
            `${price.toLocaleString()} VND` : 
            price ? `${price} VND` : 'Price not available'}
        </div>

        <div className="bg-yellow-100 text-black px-4 py-2 rounded-md mt-4 inline-flex items-center space-x-2">
          <span className="text-red-500">🎁</span> 
          <span className="font-semibold">Free Toy & Free Shaker</span>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="bg-white rounded-xl p-4 shadow-md animate-pulse">
    <div className="aspect-square rounded-xl bg-gray-200 mb-4" />
    <div className="space-y-2">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-6 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

const PetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://monitor-backend-rust.vercel.app/api/products', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const transformedData = data.map(item => {
        let parsedPrice = item.price;
        if (typeof item.price === 'string') {
          parsedPrice = parseFloat(item.price.replace(/[^\d.-]/g, ''));
        }

        return {
          id: item.id || Math.random().toString(),
          name: item.name || 'Unnamed Product',
          product: item.product || 'Category not available',
          size: item.size || null,
          price: isNaN(parsedPrice) ? null : parsedPrice,
          description: item.description || null,
          image: item.image || "/api/placeholder/300/300"
        };
      });

      setProducts(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [retryCount]);

  const fallbackProducts = [
    {
      id: 1,
      image: "/api/placeholder/300/300",
      name: "Premium Dog Food",
      product: "Dog Food",
      size: "1.5kg",
      price: 150000,
      description: "High-quality premium dog food for adult dogs"
    },
    {
      id: 2,
      image: "/api/placeholder/300/300",
      name: "Cat Food Special",
      product: "Cat Food",
      size: "2kg",
      price: 120000,
      description: "Nutritious cat food with added vitamins"
    }
  ];

  return (
    <div className="py-16 px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-black mb-2">
              Hard to choose the right products for your pets?
            </p>
            <h2 className="text-3xl font-bold text-black">Our Products</h2>
          </div>
          
          <button className="flex items-center text-black border-2 border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition-colors">
            View more
            <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mb-8">
            <div className="bg-red-50 text-red-600 p-6 rounded-lg mb-4">
              <p className="mb-4">Unable to load products: {error}</p>
              <p className="text-sm mb-4">Don't worry! We're showing you some sample products while we fix this issue.</p>
              <button
                onClick={() => setRetryCount(c => c + 1)}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Retry Loading
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [...Array(8)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          ) : (
            (error ? fallbackProducts : products).map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                product={product.product}
                size={product.size}
                price={product.price}
                description={product.description}
              />
            ))
          )}
        </div>

        {/* Pet Sellers Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="mb-6 lg:mb-0">
              <p className="text-lg font-medium text-gray-600">
                Proud to be part of <span className="font-bold text-blue-900">Pet Sellers</span>
              </p>
            </div>
            {/* Button Section */}
            <div className="mt-6 lg:mt-0">
              <button className="text-blue-900 border-2 border-blue-900 rounded-full px-6 py-2 hover:bg-blue-900 hover:text-white transition-colors">
                View all our sellers
              </button>
            </div>
          </div>
          {/* Logos Section */}
          <div className="flex items-center space-x-8">
            <img src={s1} alt="s1" className="ml-16 h-24 object-contain" />
            <img src={s2} alt="s2" className="ml-8 mr-6 h-24 object-contain" />
            <img src={s3} alt="s3" className="ml-8 mr-6 h-24 object-contain" />
            <img src={s4} alt="s4" className="ml-8 mr-6 h-24 object-contain" />
            <img src={s5} alt="s5" className="ml-8 mr-6 h-24 object-contain" />
            <img src={s6} alt="s6" className="ml-8 mr-6 h-24 object-contain" />
            <img src={s7} alt="s7" className="ml-8 h-24 mr-6 object-contain" />
          </div>
        </div>

        <div className='px-48'>
          <img src={sll02} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PetProducts;
