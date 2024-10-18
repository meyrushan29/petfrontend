import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react'; // Importing Menu and X icons
import { Link } from 'react-router-dom'; // Import Link for navigation
import logo from '../Assets/img.png';
import logo01 from '../Assets/Logo001.png';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF6E9]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo01} alt="Monito Logo" className="h-auto w-auto" />
          </div>
          
          {/* Navigation Links for desktop */}
          <div className="hidden md:flex gap-8">
            {['Home', 'Category', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={item === 'Category' ? 'dog-marketplace' : '#'} // Set path for Category
                className="text-[#00235C] hover:text-[#00235C]/80 font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? <X className="w-6 h-6 text-[#00235C]" /> : <Menu className="w-6 h-6 text-[#00235C]" />}
          </button>
        </div>

        {/* Right Side Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search something here!"
              className="pl-5 pr-12 py-2.5 w-[280px] rounded-full border border-gray-200 focus:outline-none focus:border-[#00235C]"
            />
            <Search className="absolute right-4 top-3 text-gray-400 w-5 h-5" />
          </div>
          
          {/* Join Button */}
          <button className="bg-[#00235C] text-white px-6 py-2.5 rounded-full hover:bg-[#00235C]/90 font-medium">
            Join the community
          </button>
          
          {/* Currency Selector */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <select className="bg-transparent border-none text-[#00235C] font-medium focus:outline-none cursor-pointer">
              <option value="VND">VND</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          {['Home', 'Category', 'About', 'Contact'].map((item) => (
            <Link 
              key={item}
              to={item === 'Category' ? 'dog-marketplace' : '#'} // Set path for Category
              className="block text-[#00235C] hover:text-[#00235C]/80 font-medium mb-2"
              onClick={() => setIsMenuOpen(false)} // Close the menu on item click
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-6 md:py flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-8 z-10 mb-8 md:mb-0">
          <div className="space-y-4">
            <h1 className="text-[#00235C] text-4xl md:text-5xl font-bold leading-tight">
              One More Friend
            </h1>
            <h2 className="text-[#00235C] text-2xl md:text-3xl font-bold">
              Thousands More Fun!
            </h2>
          </div>
          
          <p className="text-gray-600 max-w-md text-lg leading-relaxed">
            Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!
          </p>
          
          <div className="flex gap-4">
            <button className="group px-8 py-3 rounded-full border-2 border-[#00235C] text-[#00235C] hover:bg-[#00235C]/5 transition-colors flex items-center gap-2">
              View Intro
              <span className="inline-block w-5 h-5 rounded-full border-2 border-current group-hover:bg-[#00235C]/10" />
            </button>
            <button className="px-8 py-3 rounded-full bg-[#00235C] text-white hover:bg-[#00235C]/90 transition-colors">
              Explore Now
            </button>
          </div>
        </div>
        
        {/* Right Content - Image Section */}
        <div className="md:w-1/2 relative">
          {/* Navy Background Shape */}
          <div className="absolute -z-10 right-0 top-1/4 w-72 h-96 bg-[#00235C] rounded-l-full" />
          
          {/* Pink Decorative Elements */}
          <div className="absolute -z-10 right-4 top-8 w-8 h-8 bg-pink-500 rotate-45" />
          <div className="absolute -z-10 right-24 top-16 w-6 h-6 bg-pink-500 rotate-45" />
          <div className="absolute -z-10 left-1/4 bottom-16 w-8 h-8 bg-pink-500 rotate-45" />
          
          {/* Main Image */}
          <img 
            src={logo}
            alt="Happy person with a corgi" 
            className="w-auto h-auto object-cover rounded-3xl relative z-10"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
