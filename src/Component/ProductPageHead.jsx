import React from 'react';
import sofa from "../Images/sofap.png";
import { LuSofa, LuBedDouble, LuBedSingle } from "react-icons/lu";
import { HiOutlineTv } from "react-icons/hi2";
import { MdOutlineTableBar } from "react-icons/md";
import { CgBox } from "react-icons/cg";
import sofaBed from "../Images/sofa-bed.png";
import Sofa3 from "../Images/Category/sofa3.png";
import wardrobe from "../Images/wardrobe.png";
import closet from "../Images/closet.png";
import shoeRack from "../Images/6403683.png";
import { FaThLarge } from "react-icons/fa";
import { RiSofaLine } from "react-icons/ri";
import { useCategory } from '../context/CategoryProvider'; 
import { useProduct } from '../context/ProductProvider';

const ProductPageHead = () => {
  const { setSelectedCategory, selectedCategory } = useCategory();

  const isActive = (category) => category === selectedCategory;

  const handleCategoryClick = (category) => {
    // Only reset and update if it's a different category
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  };

  return (
    <section className="mt-16 ">
      <div className="w-full h-40 bg-gradient-to-r from-indigo-200 to-cyan-200 flex justify-center md:h-56">
        <img src={sofa} className="relative top-3 h-60 md:h-80 md:top-0 slide-in-down" />
      </div>
      <div className="mt-20 p-5 py-2 grid grid-cols-13 overflow-x-scroll gap-[100px] md:gap-[200px] ">
        {[
          { category: null, Icon: FaThLarge, label: 'All' },
          { category: 'SOFASET', Icon: RiSofaLine, label: 'Sofa' },
          { category: 'BEDROOM SET', Icon: LuBedDouble, label: 'Bed Set' },
          { category: 'TV UNIT', Icon: HiOutlineTv, label: 'TV Unit' },
          { category: 'MULTIPURPOSE TABLES', Icon: MdOutlineTableBar, label: 'Tables' },
          { category: 'SIDEBOX', Icon: CgBox, label: 'Side Box' },
          { category: 'SINGLE BED', Icon: LuBedSingle, label: 'Single Bed' },
          { category: 'LAUNGER SOFA', Icon: LuSofa, label: 'Launger Sofa' },
          { category: '3+2 SOFA', image: Sofa3, label: '3+2 SOFA' } ,
          { category: 'SOFACOMEBED', image: sofaBed, label: 'Sofa Bed' },
          { category: 'WARDROBE & BED', image: wardrobe, label: 'Wardrobe' },
          { category: 'METAL WARDROBE AND METALBED', image: closet, label: 'Metal ' },
          { category: 'SHOE RACK', image: shoeRack, label: 'Shoe Rack' }
        ].map(({ category, Icon, image, label }) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`${isActive(category) ? 'translate-y-[-5px] transition-all duration-300' : ''}  flex flex-col justify-center items-center mx-4`}
          >
            {Icon ? (
              <Icon className={`rounded text-5xl bg-cyan-100 shadow-2xl p-[7px] shadow-md md:text-8xl md:p-4 md:rounded-2xl
             transition-all duration-300 ${isActive(category) ? ' bg-gradient-to-r from-green-300 to-blue-500 animate-gradient-x text-white' : ''}`}
               />
            ) : (
              <div className={`rounded  w-[50px] h-[48px] shadow-2xl p-[7px] shadow-md text-bold md:w-[100px] md:h-[100px] md:rounded-2xl md:p-[18px] transition-all duration-300 bg-cyan-100  ${isActive(category) ? ' bg-gradient-to-r from-green-300 to-blue-500 animate-gradient-x' : ''}`}>
                <img src={image} className="w-[80px]" />
              </div>
            )}
            <h4 className="thick-font mt-[5px] text-center whitespace-nowrap  md:text-2xl md:translate-x-1 text-[15px]">
              {label}
            </h4>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ProductPageHead;
