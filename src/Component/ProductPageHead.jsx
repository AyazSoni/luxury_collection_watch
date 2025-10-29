import React from 'react';
import productDisplayImage from "../Images/product_display_page-removebg-preview.png";
import { FaThLarge } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { BsWatch } from "react-icons/bs";
import { IoMdGlasses } from "react-icons/io";
import { HiFire } from "react-icons/hi";
import { useCategory } from '../context/CategoryProvider'; 
import { useProduct } from '../context/ProductProvider';

const ProductPageHead = () => {
  const { setSelectedCategory, selectedCategory } = useCategory();

  const isActive = (category) => category === selectedCategory;

  const handleCategoryClick = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  };

  return (
    <section className="mt-16 relative">
      {/* Gradient Background Section */}
      <div className="w-full h-48 md:h-64 bg-gradient-to-r from-purple-200 via-purple-100 to-blue-200 relative overflow-visible">
        <img 
          src={productDisplayImage} 
          className="h-90 md:h-[420px] object-contain slide-in-down absolute bottom-[-95px] md:bottom-[-160px] right-7 md:right-16 z-10" 
          alt="Product Display"
        />
      </div>
      
      {/* White Background Section with Category Icons */}
      <div className="w-full bg-white py-8 mt-4 md:mt-4 relative z-20">
        <div className="flex justify-center items-center gap-4 md:gap-8 overflow-x-auto pb-4 relative z-30" style={{ paddingLeft: '100px', paddingRight: '24px' }}>
          {[
            { category: null, Icon: FaThLarge, label: 'All' },
            { category: 'TRENDING', Icon: HiFire, label: 'Trending' },
            { category: "MEN'S WATCH", Icon: MdWatch, label: "Men's Watch" },
            { category: "GIRL'S WATCH", Icon: BsWatch, label: "Girls Watch" },
            { category: 'EYEWEAR', Icon: IoMdGlasses, label: 'Eyewear' }
          ].map(({ category, Icon, label }) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex flex-col items-center gap-2 transition-all duration-300 min-w-[80px] md:min-w-[100px] ${
                isActive(category) ? 'scale-105' : ''
              }`}
            >
              <div className={`
                w-16 h-16 md:w-20 md:h-20 rounded-xl 
                flex items-center justify-center
                transition-all duration-300
                ${isActive(category) 
                  ? 'bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg' 
                  : 'bg-cyan-100 text-gray-700 hover:bg-cyan-200'
                }
              `}>
                <Icon className={`text-3xl md:text-4xl ${isActive(category) ? 'text-white' : 'text-gray-700'}`} />
              </div>
              <h4 className={`
                text-xs md:text-sm thick-font whitespace-nowrap text-center
                transition-colors duration-300
                ${isActive(category) ? 'text-indigo-600 font-bold' : 'text-gray-600'}
              `}>
                {label}
              </h4>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductPageHead;
