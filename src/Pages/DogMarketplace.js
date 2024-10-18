import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';
import cat from '../Assets/cat.png';

const DogMarketplace = () => {
  const navigate = useNavigate();
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
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    fetchPets();
  }, [currentPage, filters, sortBy]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://monitor-backend-rust.vercel.app/api/pets');
      if (!response.ok) throw new Error('Failed to fetch pets');
      let data = await response.json();

      // Apply filters
      data = data.filter(pet => {
        if (filters.gender && pet.gender !== filters.gender) return false;
        if (filters.color && pet.color !== filters.color) return false;
        if (filters.breed && pet.breed !== filters.breed) return false;
        if (pet.price < filters.priceRange[0] || pet.price > filters.priceRange[1]) return false;
        return true;
      });

      // Apply sorting
      if (sortBy === 'priceLowToHigh') {
        data.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'priceHighToLow') {
        data.sort((a, b) => b.price - a.price);
      }

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

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      gender: '',
      color: '',
      breed: '',
      priceRange: [0, 10000000],
    });
    setCurrentPage(1);
  };

  const handlePetClick = (petId) => {
    navigate(`/pet-detail`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <img src={cat} alt="Banner" className="w-full h-auto rounded-xl" />
        </div>
        
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center"
          >
            <Filter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                <button onClick={resetFilters} className="text-blue-600 hover:underline">Reset</button>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Gender</h3>
                <div className="space-y-2">
                  {['Male', 'Female'].map(gender => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={filters.gender === gender}
                        onChange={() => handleFilterChange('gender', filters.gender === gender ? '' : gender)}
                      />
                      <span className="ml-2">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color</h3>
                <div className="space-y-2">
                  {['Red', 'Apricot', 'Black', 'Black & White', 'Silver', 'Tan'].map(color => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={filters.color === color}
                        onChange={() => handleFilterChange('color', filters.color === color ? '' : color)}
                      />
                      <div className="ml-2 flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${color.toLowerCase().replace(' & ', '-')}`}></div>
                        {color}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-24 p-1 border rounded"
                    value={filters.priceRange[0]}
                    onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-24 p-1 border rounded"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  />
                </div>
              </div>

              {/* Breed Filter */}
              <div>
                <h3 className="font-medium mb-2">Breed</h3>
                <div className="space-y-2">
                  {['Small', 'Medium', 'Large'].map(breed => (
                    <label key={breed} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={filters.breed === breed}
                        onChange={() => handleFilterChange('breed', filters.breed === breed ? '' : breed)}
                      />
                      <span className="ml-2">{breed}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dogs Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-xl font-semibold mb-2 sm:mb-0">Small Dog <span className="text-gray-500 text-sm">({pets.length} puppies)</span></h2>
              <select
                className="border rounded-lg px-3 py-2 bg-white w-full sm:w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Sort by: Popular</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPets.map((pet) => (
                  <div 
                    key={pet.id} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handlePetClick(pet.id)}
                  >
                    <img 
                      src={pet.image || '/api/placeholder/200/200'} 
                      alt={pet.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2">{pet.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex flex-wrap gap-2">
                          <span className="font-semibold">Gender:</span>
                          <span>{pet.gender}</span>
                          <span className="font-semibold">Age:</span>
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
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft />
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
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