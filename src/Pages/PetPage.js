import React, { useState, useEffect } from 'react';
import { ChevronRight, RefreshCcw } from 'lucide-react';
import sl01 from '../Assets/sl1.png'; // Ensure this path is correct for your project structure

const PetsCard = ({ image, id, breed, gender, age, price }) => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square rounded-lg overflow-hidden mb-2">
        <img
          src={image || "/api/placeholder/300/300"}
          alt={breed}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/300"; // Fallback image for errors
          }}
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center text-xs font-bold space-x-1">
          <span>{id}</span>
          {breed && (
            <>
              <span>-</span>
              <span className="truncate">{breed}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center text-xs text-gray-600 gap-1">
          <span>Gene: {gender}</span>
          {age && (
            <>
              <span className="hidden sm:inline">•</span>
              <span>Age: {age}</span>
            </>
          )}
        </div>

        <div className="font-bold text-sm">
          {typeof price === 'number' ? 
            `${price.toLocaleString()} VND` : 
            price ? `${price} VND` : 'Price not available'}
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="bg-white rounded-lg p-3 shadow-sm animate-pulse">
    <div className="aspect-square rounded-lg bg-gray-200 mb-2" />
    <div className="space-y-1">
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="h-2 bg-gray-200 rounded w-1/2" />
      <div className="h-2 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

const PetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // Reset error state on fetch
    try {
      const response = await fetch('https://monitor-backend-rust.vercel.app/api/pets');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error('Received non-JSON response');
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [retryCount]);

  const fallbackProducts = [
    { id: 1, image: "", breed: "Dog", gender: "Male", age: "2 years", price: 2000000 },
    { id: 2, image: "", breed: "Cat", gender: "Female", age: "1 year", price: 1500000 },
    // Add more sample products as needed
  ];

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div>
            <p className="text-black mb-1 text-sm">What's new?</p>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
              Take a Look at Some of Our Pets
            </h2>
          </div>
          
          <button className="flex items-center text-navy-900 border-2 border-navy-900 rounded-full px-4 py-1.5 text-sm hover:bg-navy-900 hover:text-white transition-colors">
            View more
            <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mb-6">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
              <p className="mb-2 text-sm">Unable to load products: {error}</p>
              <p className="text-xs mb-4">Don't worry! We're showing you some sample products while we fix this issue.</p>
              <button
                onClick={() => setRetryCount(c => c + 1)}
                className="flex items-center bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Retry Loading
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading ? (
            [...Array(8)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          ) : (
            (error ? fallbackProducts : products).map((product) => (
              <PetsCard
                key={product.id}
                id={product.id}
                image={product.image}
                breed={product.breed}
                gender={product.gender}
                age={product.age}
                price={product.price}
              />
            ))
          )}
        </div>
      </div>

      {/* Image section */}
      <div className="mt-6 text-center">
        <img src={sl01} alt="A descriptive alt text" className="mx-auto" />
      </div>
    </div>
  );
};

export default PetProducts;
