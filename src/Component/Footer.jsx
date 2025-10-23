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
    const phoneNumber = "6355617070";
const message = encodeURIComponent('Hi zara Furniture' ); // Optional message

    // WhatsApp URL scheme
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  }
  const openInstagram = () => {
    const username = "zara_furniture_surat"; // Your Instagram username or user ID
    const instagramUrl = `https://www.instagram.com/${username}`;
    window.open(instagramUrl, '_blank');
}
  const openFacebook = () => {
    const username = "zara.furniture.777"; // Your Facebook username or user ID
    const facebookUrl = `https://www.facebook.com/${username}`;
    window.open(facebookUrl, '_blank');
}

  const Tonav = (category) => {
    setSelectedCategory(category);
    navigate('/ProductDisplay');
    
  }

  return (
    <footer className="bg-[#5a7f75] text-white py-4 px-4 flex flex-col  h-full gap-y-8 md:mt-10 mt-5 overflow-x-hidden md:pt-10 md:gap-y-10 ">
      <div className='font-bold text-2xl cursor-pointer flex items-center gap-1 w-full ml-3'>
        <span className="text-2xl thick-font">Luxury Collection</span>
      </div>
    <div className="flex flex-col gap-y-2">
      <div className="flex w-full justify-items-start flex flex-row gap-2 md:ml-5">
        <MapIcon className="w-8 md:text-2xl text-bgGreen " />
        <p className="sthick-font md:text-[24px]"> Zara Furniture, Navjivan Cir, Gandhi Kutir, Surat, Gujarat 395017 </p>
      </div>

      <div className="flex w-full justify-items-start flex flex-row gap-1 ml-[-10px] md:ml-5">
        <FaPhone className="w-10 mt-1 md:text-2xl text-bgGreen" />
        <p className="sthick-font md:text-[24px] "> 06355617070 </p>
      </div>

      <div className="flex w-full justify-items-start flex flex-row gap-1 ml-[-10px] md:ml-5">
        <MdEmail className="w-10  md:text-3xl text-bgGreen text-2xl mt-1" />
        <p className="sthick-font text-lg md:text-[24px]"> faraazn007@gmail.com </p>
      </div>
    </div>
     <div className="flex flex-row justify-center mt-4 gap-20 md:text-2xl text-xl md:gap-64">

        <div>
          <h1 className="thick-font text-[14px] pb-2 md:text-[24px]"> Our Products</h1>
            <div className="grid grid-col md:grid-cols-2 gap-x-3 ">
           <button onClick={() => Tonav('SOFASET')} className="   text-neutral-300 text-[12px] md:text-[20px] pl-1 text-left"> Sofa </button>
           <button onClick={() => Tonav('BEDROOM SET')} className=" pl-1  text-neutral-300 text-[12px] md:text-[20px]  text-left"> Bedroom Set</button>
           <button onClick={() => Tonav('WARDROBE & BED')} className=" pl-1  text-neutral-300 text-[12px] md:text-[20px] text-left"> Wardrobe </button>
           <button onClick={() => Tonav('MULTIPURPOSE TABLES')} className=" pl-1  text-neutral-300 text-[12px] md:text-[20px] text-left"> Table </button>
           <button onClick={() => Tonav('TV UNIT')} className=" pl-1  text-neutral-300 text-[12px] md:text-[20px] text-left"> Tv Unit </button>
           <button onClick={() => Tonav('SINGLE BED')} className=" pl-1  text-neutral-300 text-[12px] md:text-[20px]  text-left"> Single Bed </button>
           <button onClick={() => Tonav('SOFACOMEBED')} className=" pl-1  text-neutral-300 text-[12px] md:text-[20px]  text-left"> Sofa Comebed </button>
           <button onClick={() => Tonav('SHOE RACK')} className=" pl-1 thi text-neutral-300 text-[12px] md:text-[20px]  text-left"> Shoe Rack </button>
        </div>
        </div>
        <div>
         <h1 className="thick-font text-[14px] pb-2 md:text-[24px]"> Customer Services </h1>
           <Link to="/ContactUs" className=" pl-1  text-neutral-300 text-[12px] md:text-[20px] block"> Contact Us </Link>
           <Link  to="/Shop" className=" pl-1  text-neutral-300 text-[12px] md:text-[20px] block"> Visit Our Shop  </Link>
           <Link to="/AboutUs" className=" pl-1  text-neutral-300 text-[12px] md:text-[20px]"> About Us </Link>
           <p className="flex flex-row gap-x-7 mt-3 md:text-[20px]">
             <button onClick={whatsappOpen}> <FaWhatsapp className="text-2xl"/>
             </button>
             <button onClick={openInstagram}> <FaInstagram className="text-2xl"/>
             </button>
             <button onClick={openFacebook}> <FaFacebook className="text-2xl"/>
             </button>
           </p>
        </div>
     </div>
     <div className=" w-full text-[13px]  text-center pt-2 border-t-[1.5px] border-[#30574c] border-solid md:text-xl">
        ©2025 Created by  <b> Ayax Soni</b>
     </div>
    </footer>
  );
}

export default Footer;
