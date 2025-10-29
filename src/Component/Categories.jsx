import trendingImage from "../Images/bround_belt-removebg-preview.png";
import mensWatchImage from "../Images/man-removebg-preview.png";
import womensWatchImage from "../Images/girl_watch-removebg-preview.png";
import eyewearImage from "../Images/eyeyear-removebg-preview.png";
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {useNavigate} from "react-router-dom";
import { useCategory } from '../context/CategoryProvider.jsx';
import { useInView } from 'react-intersection-observer';

const Category = () => {
  
  const { setSelectedCategory } = useCategory();
  const navigate = useNavigate();
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  
  const ToNav = (category) => {
    setSelectedCategory(category);
    navigate('/ProductDisplay');
  }

  const categories = [
    {
      name: "Trending",
      fullName: "Trending Collection",
      image: trendingImage,
      category: "TRENDING",
      bgGradient: "bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100",
      textColor: "text-amber-900",
      accentColor: "text-orange-600",
      decorativeColor: "bg-amber-200",
      accentLineColor: "bg-rose-200",
    },
    {
      name: "Men's Watch",
      fullName: "Men's Luxury Watches",
      image: mensWatchImage,
      category: "MEN'S WATCH",
      bgGradient: "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100",
      textColor: "text-slate-800",
      accentColor: "text-blue-700",
      decorativeColor: "bg-slate-200",
      accentLineColor: "bg-blue-200",
    },
    {
      name: "Women's Watch",
      fullName: "Women's Elegant Watches",
      image: womensWatchImage,
      category: "WOMEN'S WATCH",
      bgGradient: "bg-gradient-to-br from-pink-50 via-rose-100 to-pink-100",
      textColor: "text-rose-900",
      accentColor: "text-pink-600",
      decorativeColor: "bg-pink-200",
      accentLineColor: "bg-rose-200",
    },
    {
      name: "Stylish Eyewear",
      fullName: "Premium Eyewear",
      image: eyewearImage,
      category: "EYEWEAR",
      bgGradient: "bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100",
      textColor: "text-purple-900",
      accentColor: "text-indigo-600",
      decorativeColor: "bg-purple-200",
      accentLineColor: "bg-indigo-200",
    }
  ];
  
  return (
    <section ref={ref} className="w-full mt-6 px-4 pb-8 overflow-hidden">
      <div className="w-full mb-6">
        <h1 className="text-2xl font-extrabold text-gray-700 thick-font tracking-tight">
          EXPLORE BY CATEGORIES
        </h1>
      </div>

      {/* Mobile-First Grid Layout - 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => ToNav(item.category)}
            className={`
              ${item.bgGradient}
              shadow-lg rounded-2xl p-4 flex flex-col 
              relative overflow-hidden
              transform transition-all duration-300
              active:scale-95
              ${inView ? 'slide-in-up' : 'opacity-0 invisible'}
              min-h-[180px]
            `}
            style={{
              animationDelay: inView ? `${index * 0.15}s` : '0s',
              animationFillMode: 'both'
            }}
          >
            {/* Decorative circle background */}
            <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${item.decorativeColor} opacity-30 blur-xl`}></div>
            
            {/* Image Container */}
            <div className="flex items-center justify-center mb-3 relative z-10">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-28 w-auto object-contain drop-shadow-lg transform transition-transform duration-300" 
              />
            </div>
            
            {/* Category Name */}
            <div className="relative z-10 mt-auto">
              <h2 className={`
                ${item.textColor}
                text-base font-extrabold thick-font 
                mb-1 leading-tight
                tracking-wide
              `}>
                {item.name}
              </h2>
              
              {/* Explore More Link */}
              <div className="flex flex-row items-center mt-1">
                <span className={`${item.accentColor} text-xs thick-font font-semibold`}>
                  Explore
                </span>
                <ChevronRightIcon className={`h-3.5 w-3.5 ${item.accentColor} ml-0.5 mt-0.5`} />
              </div>
            </div>

            {/* Subtle bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${item.accentLineColor} opacity-40`}></div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Category;
