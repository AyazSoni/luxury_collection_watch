import React from 'react';
import bgimage from "../Images/image.jpeg";
import { TiTick } from "react-icons/ti";
import { SiAffinitydesigner } from "react-icons/si";
import bgwork from "../Images/work.jpg";
import quotes from "../Images/quote.svg";
import { MdAddHome } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { useNavigate, Link } from 'react-router-dom';
import { GiSofa } from "react-icons/gi";
import { BiSolidCustomize } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useInView } from 'react-intersection-observer';

const AboutPage = () => {
  
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold :0.6,
  });
  const { ref: ref2 , inView: inView2 } = useInView({
    threshold: 0.3,
  });
  
  const { ref: ref3 , inView: inView3 } = useInView({
    threshold: 0.5,
  });
  
  const { ref: ref4 , inView: inView4 } = useInView({
    threshold: 0.5,
  });
  
  const { ref: ref5 , inView: inView5 } = useInView({
    threshold: 0.3,
  });
  
  const { ref: ref6 , inView: inView6 } = useInView({
    threshold: 0.5,
  });
  
  return (
    <div className=" mt-16">
      {/* Section 1 */}
      <div className="relative h-72 mt-16 md:h-96 overflow-hidden">
        <div className="absolute inset-0 animate-zoom-out">
          <img
            src={bgimage}
            alt="Background"
            className="object-cover w-full h-full opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center animate-fade-up">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Discover Zara Furniture</h1>
            <p className="mt-4 text-lg text-white px-10 md:text-2xl">Crafting Timeless Pieces  for Your Modern Lifestyle</p>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className="mt-9 p-3 flex flex-col md:text-center ">
        <div className="flex flex-row md:pl-72  ">
          <p className="text-[100px]  rotate-90 text-customGreen relative bottom-[62.5px] md:bottom-[58px]">|</p> <p className="relative left-8 thick-font md:text-3xl slide-in-right">About Our Company</p>
        </div>
        <h3 className="thick-font relative bottom-28 text-xl md:text-4xl md:px-20 md:py-5 slide-in-up"> Providing the best <span className="text-customGreen thick-font text-xl md:text-4xl">furniture</span> & interior design services </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 shown">
        <div className="p-5 bg-gray-200 sthick-font border-b-2 border-b-customGreen border-solid relative bottom-20 md:text-xl "> 
          At Zara Furniture, we specialize in customizing high-quality furniture at the most competitive rates. From sofas to cupboards, beds, and multipurpose tables, each piece meets our exacting standards. Our pride is in ensuring customer satisfaction, encouraging their return and referrals.
        </div>
        <div ref={ref} className="relative bottom-14 grid grid-cols-1 md:grid-cols-2  md:bottom-16">
          <div className="flex gap-1">
          <TiTick className={`text-customGreen text-2xl ${inView ? 'popup-content' : 'opacity-0' }`} />
           <p className={`flex flex-row gap-1 sthick-font ${inView ? 'slide-in-right' : 'opacity-0' }`}>  Custom Furniture </p>
           </div>
          <div className="flex gap-1">
          <TiTick className={`text-customGreen text-2xl ${inView ? 'popup-content' : 'opacity-0' }`} />
           <p className={`flex flex-row gap-1 sthick-font ${inView ? 'slide-in-right' : 'opacity-0' }`}>   Best Quality </p>
           </div>
           <div className="flex gap-1">          
          <TiTick className={`text-customGreen text-2xl ${inView ? 'popup-content' : 'opacity-0' }`} />
           <p className={`flex flex-row gap-1 sthick-font ${inView ? 'slide-in-right' : 'opacity-0' }`}> Affordable Price </p>
           </div>
           <div className="flex gap-1">          
          <TiTick className={`text-customGreen text-2xl ${inView ? 'popup-content' : 'opacity-0' }`} />
           <p className={`flex flex-row gap-1 sthick-font ${inView ? 'slide-in-right' : 'opacity-0' }`}> Multiple Showrooms </p>
           </div>
        </div>
        </div>
           <div ref={ref2} className="grid grid-cols-1 md:grid-cols-2 md:px-20 md:gap-7 md:gap-x-12">
      <div className="text-center flex flex-col items-center mb-7 ">
         <MdAddHome className={`bg-[#bed7cf]  rounded-full text-5xl p-2 text-white
         ${inView2 ? 'popup-content' : 'opacity-0' }`}
          alt=""/>
         <h2 className={`thick-font text-gray-800 md:text-2xl
          ${inView2 ? 'slide-in-down' : 'opacity-0' }`}
         > EXPLORE SHOWROOM </h2>
         <h4 className={`sthick-font           ${inView2 ? 'slide-in-up' : 'opacity-0' }`}> discover inspiration for your unique design creation. </h4>
      </div>
          <div className="text-center flex flex-col items-center mb-7 px-5 ">
         <GiTeamIdea className={`bg-[#bed7cf]  rounded-full text-5xl p-2 text-white
         ${inView2 ? 'popup-content' : 'opacity-0' }`}
         alt=""/>
         <h2 className={`thick-font text-gray-800 md:text-2xl
         ${inView2 ? 'slide-in-down' : 'opacity-0' }`}
         > Professional Team </h2>
         <h4 className={`sthick-font ${inView2 ? 'slide-in-up' : 'opacity-0' }`}> Quickly productivate just in time strategic theme  </h4>
      </div>
    </div>
    <div ref={ref3} className="flex flex-col items-center bg-bgGreen px-1 py-20 gap-3">
      <p className={`thick-font text-2xl          ${inView3 ? 'slide-in-down' : 'opacity-0' }`}> We have more than  </p>
      <p className={`text-6xl thick-font ${inView3 ? 'shown' : 'opacity-0 '} `}> 10+ </p>
      <p className={`thick-font text-2xl ${inView3 ? 'slide-in-up' : 'opacity-0' }`}>years of experience</p>  
    </div>
      </div>
      {/* Section 3*/}
      <div className=" grid grid-col-1 md:grid-cols-2 bg-customGreen py-6 items-center  text-white md:px-4 md:gap-x-12" >
       <div ref={ref4} className="flex flex-col items-center gap-y-2 md:gap-y-4  ">
          <span className={`bg-bgGreen h-1 w-14 rounded-2xl relative top-[24px] right-24 md:right-36 md:top-9 ${inView4 ? 'slide-in-left' : 'opacity-0' }`}></span> <span className={`relative left-3 thick-font text-bgGreen text-lg md:text-3xl ${inView4 ? 'slide-in-right' : 'opacity-0' }`}> What we Offer ?</span>
         <h3 className={`thick-font text-xl text-center md:text-2xl px-4 ${inView4 ? 'slide-in-down' : 'opacity-0' }`}> Our Company  <span className="text-bgGreen thick-font text-xl md:text-2xl"> Make You </span> Feel More Confident  </h3>
         <p className={`sthick-font text-neutral-200 text-center md:text-[19px] px-5 py-1 ${inView4 ? 'slide-in-up' : 'opacity-0' }`}> Since 2014, we’ve specialized in custom sofas and furniture like cupboards, beds, and tables. We use top-quality materials at the best prices to ensure your satisfaction </p>
          <Link to="/ProductDisplay" className={`rounded-md bg-bgGreen text-customGreen px-5 py-1 thick-font shadow-md ${inView4 ? 'popup-content' : 'opacity-0' }`} >
            Explore Our Product
          </Link>
      </div>
     <div  class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ">
            <div class="h-96 w-96 mt-6 md:w-full mr-5 ">
              <img class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={bgwork} alt="" />
            </div>
            </div>
            <div ref={ref5} className="grid grid-cols-1 mt-10 w-full p-3 gap-4 md:grid-cols-4 md:gap-x-[230px] items-center">
  <div className={`flex  flex-col py-6 drop-shadow-md shadow-black items-center gap-2 bg-[#69978a] w-full md:w-48 px-1 ${inView5 ? 'shown' : 'opacity-0'}`}>
    <GiSofa className={`text-4xl ${inView5 ? 'popup-content' : 'opacity-0'}`} />
    <p className={`text-xl text-center ${inView5 ? 'slide-in-up' : 'opacity-0'}`}>All Type of Furniture Available</p>
  </div>
  <div className={`flex flex-col py-6 px-1 drop-shadow-md shadow-black items-center gap-2 bg-[#69978a] w-full md:w-48 ${inView5 ? 'shown' : 'opacity-0'}`}>
    <BiSolidCustomize className={`text-4xl ${inView5 ? 'popup-content' : 'opacity-0'}`} />
    <p className={`text-xl text-center  ${inView5 ? 'slide-in-up' : 'opacity-0'}`}>Customize Furniture</p>
  </div>
  <div className={`flex flex-col p-6 md:py-10 drop-shadow-md shadow-black items-center gap-2 bg-[#69978a] w-full md:w-48 ${inView5 ? 'shown' : 'opacity-0'}`}>
    <FaRegMoneyBillAlt className={`text-4xl ${inView5 ? 'popup-content' : 'opacity-0'}`} />
    <p className={`text-xl ${inView5 ? 'slide-in-up' : 'opacity-0'}`}>Low Cost</p>
  </div>
  <div className={`flex flex-col p-6 md:py-10 drop-shadow-md shadow-black items-center gap-2 bg-[#69978a] w-full md:w-48 ${inView5 ? 'shown' : 'opacity-0'}`}>
    <VscWorkspaceTrusted className={`text-4xl ${inView5 ? 'popup-content' : 'opacity-0'}`} />
    <p className={`text-xl ${inView5 ? 'slide-in-up' : 'opacity-0'}`}>Trusted Work</p>
  </div>
</div>




      </div>
      {/*section 4*/}
      <section ref={ref6} className={`w-full bg-bgGreen text-center p-5 mt-10 ${inView6 ? 'shown' : 'opacity-0'}`}>
      <img className="md:h-20 mx-auto h-14 animate-bounce" src={quotes} />
      <h1 className={`text-customGreen thick-font  md:text-4xl ${inView6 ? 'show' : 'opacity-0'}`}> We are ready to help you  </h1>
      <h4 className={`thick-font p-2 text-gray-700 md:text-3xl md:px-16 md:mb-3 text-[14px] ${inView6 ? 'slide-in-down' : 'opacity-0'}`}> Transform your space with customized, comfortable, and affordable furniture from Zara Furniture. Contact us today for exceptional service and quality pieces </h4>
      <Link to="/ContactUs" className={`rounded-md bg-customGreen  px-5 py-1 text-white p-2 thick-font md:text-xl my-2 ${inView6 ? 'slide-in-up' : 'opacity-0'}`}> Contact Now</Link>
   </section>
    </div>
  );
};

export default AboutPage;
