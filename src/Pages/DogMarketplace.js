import { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import cat from '../Assets/cat.png';

const DogMarketplace = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    gender: '',
    color: '',
    breed: '',
    priceRange: [0, 10000000],
  });

  useEffect(() => {
    fetchPets();
  }, [currentPage]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://monitor-backend-rust.vercel.app/api/pets');
      if (!response.ok) throw new Error('Failed to fetch pets');
      const data = await response.json();
      setPets(data);
      setTotalPages(Math.ceil(data.length / 9));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString()}.000 VND`;
  };

  // Get current page pets
  const indexOfLastPet = currentPage * 9;
  const indexOfFirstPet = indexOfLastPet - 9;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div>
          <img src={cat} alt="" />
        </div>
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Filter</h2>

              {/* Gender Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Gender</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      onChange={(e) => setFilters({ ...filters, gender: e.target.checked ? 'Male' : '' })}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      onChange={(e) => setFilters({ ...filters, gender: e.target.checked ? 'Female' : '' })}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-red-600" />
                    <div className="ml-2 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                      Red
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-orange-600" />
                    <div className="ml-2 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                      Apricot
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-gray-900" />
                    <div className="ml-2 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-black mr-2"></div>
                      Black
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                    <div className="ml-2 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-400 mr-2"></div>
                      Black & White
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                    <div className="ml-2 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
                      Silver
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                    <div className="ml-2 flex items-center">
                      <div className="w-4 h-4 rounded-full bg-amber-700 mr-2"></div>
                      Tan
                    </div>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price</h3>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Min" className="w-20 p-1 border rounded" />
                  <span>-</span>
                  <input type="text" placeholder="Max" className="w-20 p-1 border rounded" />
                </div>
              </div>

              {/* Breed Filter */}
              <div>
                <h3 className="font-medium mb-2">Breed</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2">Small</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2">Medium</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="ml-2">Large</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Dogs Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Small Dog <span className="text-gray-500 text-sm">(52 puppies)</span></h2>
              <select className="border rounded-lg px-3 py-2 bg-white">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Loading pets...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-600">
                <p>{error}</p>
                <button 
                  onClick={fetchPets}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {currentPets.map((pet) => (
                  <div key={pet.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <img 
                      src={pet.image || '/api/placeholder/200/200'} 
                      alt={pet.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2">{pet.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex gap-2">
                          <span className="font-semibold">Gender:</span>
                          <span>{pet.gender}</span>
                          <span className="font-semibold ml-4">Age:</span>
                          <span>{pet.age} months</span>
                        </div>
                        <p className="text-blue-600 font-semibold">{formatPrice(pet.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button 
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg"
                >
                  <ChevronLeft />
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogMarketplace;
