import React from 'react'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#fdf0d5] p-4">
    <div className="max-w-7xl mx-auto">
      <div className="bg-[#003459] rounded-lg p-4 mb-4">
        <h2 className="text-white text-lg font-semibold mb-2">Register Now So You Don't Miss Our Programs</h2>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your Email"
            className="flex-grow rounded-l-md p-2 outline-none"
          />
          <button className="bg-[#00171f] text-white px-4 py-2 rounded-r-md">
            Subscribe Now
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-[#00171f] hover:text-[#003459]">Home</a></li>
            <li><a href="#" className="text-[#00171f] hover:text-[#003459]">Category</a></li>
            <li><a href="#" className="text-[#00171f] hover:text-[#003459]">About</a></li>
            <li><a href="#" className="text-[#00171f] hover:text-[#003459]">Contact</a></li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          <a href="#" className="text-[#00171f] hover:text-[#003459]"><Facebook size={20} /></a>
          <a href="#" className="text-[#00171f] hover:text-[#003459]"><Twitter size={20} /></a>
          <a href="#" className="text-[#00171f] hover:text-[#003459]"><Instagram size={20} /></a>
          <a href="#" className="text-[#00171f] hover:text-[#003459]"><Youtube size={20} /></a>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-[#00171f]">
        <p>&copy; 2022 Monito. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#003459]">Terms of Service</a>
          <a href="#" className="hover:text-[#003459]">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer