import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import logonav from '../Assets/logonav.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Set height for the logo */}
              <img src={logonav} alt="Logo" className="h-10 w-auto" /> {/* Adjust height here */}
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="dog-marketplace" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Category</a>
                <a href="#" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input type="text" placeholder="Search something here!" className="bg-gray-100 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium">Join the community</button>
            <div className="ml-4 flex items-center">
              <span className="text-sm font-medium text-gray-700">VND</span>
              <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
