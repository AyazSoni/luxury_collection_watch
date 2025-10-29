import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon, MapIcon } from '@heroicons/react/24/solid';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { useState } from 'react';
import {useNavigate, Link} from "react-router-dom";
import { useCategory  } from '../context/CategoryProvider.jsx';

const Footer = () => {
 const { setSelectedCategory } = useCategory();
  const navigate = useNavigate();
  
  
  const whatsappOpen = () => {
    const phoneNumber = "6352868656";
const message = encodeURIComponent('Hi Luxury Collection' ); // Optional message

    // WhatsApp URL scheme
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  }
  const openInstagram = () => {
    const username = "luxury_collection46"; // Your Instagram username or user ID
    const instagramUrl = `https://www.instagram.com/${username}`;
    window.open(instagramUrl, '_blank');
}
  const openFacebook = () => {
    const username = "luxury_collection46"; // Your Facebook username or user ID
    const facebookUrl = `https://www.facebook.com/${username}`;
    window.open(facebookUrl, '_blank');
}

  const Tonav = (category) => {
    setSelectedCategory(category);
    navigate('/ProductDisplay');
    
  }

  return (
    <footer className="bg-[#5a7f75] text-white py-6 px-4 flex flex-col gap-8 md:mt-10 mt-5 overflow-x-hidden md:pt-12 md:gap-12">
      {/* Brand Section */}
      <div className='flex flex-col gap-2'>
        <div className='font-bold text-2xl cursor-pointer'>
          <span className="text-2xl md:text-3xl thick-font">Luxury Collection</span>
        </div>
        <p className="text-neutral-200 text-sm md:text-base max-w-md">
          Premium watches and eyewear collection. Discover elegance and style with our curated selection.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Contact Information */}
        <div className="flex flex-col gap-4">
          <h1 className="thick-font text-lg md:text-xl mb-2">Contact Us</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <FaPhone className="w-5 h-5 mt-0.5 text-bgGreen flex-shrink-0" />
              <a href="tel:+916352868656" className="text-neutral-200 text-sm md:text-base hover:text-white transition-colors">
                +91 6352 868 656
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MdEmail className="w-5 h-5 mt-0.5 text-bgGreen flex-shrink-0" />
              <a href="mailto:tabrezmalek06@gmail.com" className="text-neutral-200 text-sm md:text-base hover:text-white transition-colors break-words">
                tabrezmalek06@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h1 className="thick-font text-lg md:text-xl mb-4">Our Products</h1>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => Tonav('trending')} 
              className="text-neutral-200 text-sm md:text-base text-left hover:text-white transition-colors w-fit"
            >
              Trending
            </button>
            <button 
              onClick={() => Tonav("men")} 
              className="text-neutral-200 text-sm md:text-base text-left hover:text-white transition-colors w-fit"
            >
              Men's Watch
            </button>
            <button 
              onClick={() => Tonav("women")} 
              className="text-neutral-200 text-sm md:text-base text-left hover:text-white transition-colors w-fit"
            >
              Women's Watch
            </button>
            <button 
              onClick={() => Tonav('glasses')} 
              className="text-neutral-200 text-sm md:text-base text-left hover:text-white transition-colors w-fit"
            >
              Stylish Eyewear
            </button>
          </div>
        </div>

        {/* Customer Services Section */}
        <div>
          <h1 className="thick-font text-lg md:text-xl mb-4">Quick Links</h1>
          <div className="flex flex-col gap-3 mb-4">
            <Link 
              to="/ProductDisplay" 
              className="text-neutral-200 text-sm md:text-base hover:text-white transition-colors w-fit"
            >
              All Products
            </Link>
            <Link 
              to="/ContactUs" 
              className="text-neutral-200 text-sm md:text-base hover:text-white transition-colors w-fit"
            >
              Contact Us
            </Link>
          </div>
          
          {/* Social Media */}
          <div className="mt-6">
            <h2 className="thick-font text-base md:text-lg mb-3">Follow Us</h2>
            <div className="flex gap-4">
              <button 
                onClick={whatsappOpen}
                className="bg-customGreen hover:bg-opacity-80 p-2 rounded-full transition-all transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-lg md:text-xl"/>
              </button>
              <button 
                onClick={openInstagram}
                className="bg-customGreen hover:bg-opacity-80 p-2 rounded-full transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg md:text-xl"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full text-center pt-4 border-t border-[#30574c] border-solid">
        <p className="text-neutral-300 text-xs md:text-sm">
          © 2025 Luxury Collection. All rights reserved.
        </p>
        <p className="text-neutral-400 text-xs mt-1">
          Created by <span className="font-semibold">Ayax Soni</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
