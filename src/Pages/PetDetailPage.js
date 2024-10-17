import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Heart, Share2, Shield, MessageCircle } from 'lucide-react';
import dog from '../Assets/dog.png'; // Import the dog image

const PetDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [customerImages, setCustomerImages] = useState([]);
  const [puppies, setPuppies] = useState([]);
  const images = [dog, dog, dog, dog, dog];

  const specifications = [
    { label: 'SKU', value: '#1000078' },
    { label: 'Gender', value: 'Female' },
    { label: 'Age', value: '2 Months' },
    { label: 'Size', value: 'Small' },
    { label: 'Color', value: 'Apricot & Tan' },
    { label: 'Vaccinated', value: 'Yes' },
    { label: 'Dewormed', value: 'Yes' },
    { label: 'Cert', value: 'Yes (MKA)' },
    { label: 'Microchip', value: 'Yes' },
    { label: 'Location', value: 'Vietnam' },
    { label: 'Published Date', value: '12-Oct-2022' },
  ];

  // Fetch customer images from the API
  useEffect(() => {
    const fetchCustomerImages = async () => {
      try {
        const response = await fetch('https://monitor-backend-rust.vercel.app/api/customers');
        const data = await response.json();
        setCustomerImages(data);
      } catch (error) {
        console.error('Error fetching customer images:', error);
      }
    };

    fetchCustomerImages();
  }, []);

  // Fetch puppies from the API
  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        const response = await fetch('https://monitor-backend-rust.vercel.app/api/pets');
        const data = await response.json();
        setPuppies(data);
      } catch (error) {
        console.error('Error fetching puppy data:', error);
      }
    };

    fetchPuppies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white"> {/* Set background color to white */}
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm mb-6 text-gray-600">
        <a href="/" className="hover:text-gray-900">Home</a>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <a href="/dog" className="hover:text-gray-900">Dog</a>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <a href="/dog/large-dog" className="hover:text-gray-900">Large Dog</a>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900">Shiba Inu Sepia</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden mb-4">
            <img
              src={images[selectedImage]}
              alt="Shiba Inu"
              className="w-full h-auto object-cover rounded-lg"
            />
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Guarantees */}
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-green-600" />
              <span>100% health guarantee for pets</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>100% guarantee of pet identification</span>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex gap-4 mt-4">
            <button className="text-sm text-gray-600 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="text-sm text-gray-600">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column - Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Shiba Inu Sepia</h1>
          <p className="text-xl text-blue-600 font-semibold mb-4">34,000,000 VND</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="bg-[#002A48] text-white px-6 py-3 rounded-full hover:bg-opacity-90">
              Contact us
            </button>
            <button className="border-2 border-[#002A48] text-[#002A48] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-50">
              <MessageCircle className="w-5 h-5" />
              Chat with Monte
            </button>
          </div>

          {/* Specifications */}
          <div className="border rounded-xl p-6 bg-gray-50">
            <h2 className="font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-y-4">
              {specifications.map((spec) => (
                <div key={spec.label}>
                  <div className="text-gray-600 text-sm">{spec.label}</div>
                  <div className="font-medium">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Additional Information</h2>
            <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
              <li>Pure breed Shih Tzu</li>
              <li>Good body structure</li>
              <li>With MKA cert and Microchip</li>
              <li>Father from champion lineage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Our Lovely Customer Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Our Lovely Customers</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {customerImages.length > 0 ? (
            customerImages.map((customer) => (
              <div key={customer.id} className="flex-none w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                <img src={customer.image} alt={`Customer ${customer.id}`} className="w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <p className="text-gray-600">Loading customer images...</p>
          )}
        </div>
      </div>

      {/* New Puppies Section */}
      <div className="mt-12">
  <h2 className="text-xl font-semibold mb-4">What's New?</h2>
  <a href="/puppies" className="text-blue-600 hover:underline">See all new puppies</a>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
    {puppies.length > 0 ? (
      puppies.slice(0, 3).map((puppy) => ( // Only take the first 3 puppies
        <div key={puppy.id} className="border rounded-lg overflow-hidden">
          <img src={puppy.image} alt={puppy.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{puppy.name}</h3>
            <p className="text-gray-600">{puppy.breed}</p>
            <p className="text-blue-600 font-semibold">{puppy.price} VND</p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-600">Loading new puppies...</p>
    )}
  </div>
</div>

    </div>
  );
};

export default PetDetailPage;
