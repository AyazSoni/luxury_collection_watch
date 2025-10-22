import React, { useState, useEffect } from 'react';
import sofaImg1 from "../Images/sofa.png.jpg";
import sofaImg2 from "../Images/sofaImg2.png";
import sofaImg3 from "../Images/sofa3.png.jpg";
import sidebg from "../Images/sidebg.png";
import { useNavigate } from 'react-router-dom';

const SlideComponent1 = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(1); // State to track active button
  const [animate, setAnimate] = useState(true); // State to toggle animations

  const data = [
    {
      text: "OUR WOODEN CONCEPTS",
      subText: "Sustainable Furniture",
      description: "Since 2014, we have customized sofas, cupboards, beds, and multipurpose tables (dining, center, computer, TV units). Using the best quality materials at the lowest rates.",
      bgColor: "bg-gray-200",
      mainTextColor: "text-customGreen",
      textColor: "text-gray-500",
      buttonColor: 'bg-customGreen',
      buttonTextColor: "text-white",
      imageSrc: sofaImg1,
      buttonText: "see our collection",
      navigateTo: () => navigate('/ProductDisplay')
    },
    {
      text: "OUR LOCATIONS",
      subText: "Explore Our Shops",
      description: "We have three shops in Surat, Gujarat. Visit us at Navjivan Circle, Gandhi Kutir; Shree Gopal Villa near Gujarat Gas Office, Adajan Gam; or Chhaprabhatha Road, Amroli.",
      bgColor: "bg-customPink",
      mainTextColor: "text-[#4f526e]",
      textColor: "text-black",
      buttonColor: "bg-[#4f526e]",
      buttonTextColor: "text-white font-bold",
      imageSrc: sofaImg2,
      buttonText: "Our Shop",
      navigateTo: () => navigate('/Shop')
    },
    {
      text: "Know More",
      subText: " About Zara Furniture",
      description: "Customization Expertise We create durable, long-lasting furniture with a luxurious look at a budget price. Our premium product finish prioritizes comfort and attention to detail.",
      bgColor: "bg-gray-100",
      mainTextColor: "text-customPurpleDark",
      textColor: "text-customPurpleLight",
      buttonColor: "bg-customPurpleLight",
      buttonTextColor: "text-white",
      imageSrc: sofaImg3,
      buttonText: "About Us",
      navigateTo: () => navigate('/AboutUs')
    }
  ];


  const handleClick = (index) => {
    setAnimate(false); // Reset animation
    setTimeout(() => {
      setActiveButton(index);
      setAnimate(true); // Trigger animation after state change
    }, 50); // Delay to allow reset to complete
  };

  const { text, subText, description, bgColor, mainTextColor, textColor, buttonColor, buttonTextColor, imageSrc, buttonText, navigateTo } = data[activeButton - 1];

  return (
    <div className={`flex-grow ${bgColor} w-max md:w-full mt-10 md:mt-0 overflow-hidden md:h-[760px] md:h-auto h-[600px]`}>
      <div className="flex md:flex-row flex-col md:justify-between md:items-center md:px-11 px-6">
        <div className="w-10/12 p-5">
          <h1 className={`md:text-xl font-bold text-left ${textColor} mt-6 mb-2 text-[15px] md:mb-5 ${animate ? 'show' : ''}`}>{text}</h1>
          <p className={`text-left max-w-md md:text-6xl mb-2 font-bold ${mainTextColor} heading md:text-3xl text-2xl md:mb-5 ${animate ? 'slide-in-down' : ''}`}>
            {subText}
          </p>
          <p className={`text-left mb-2 md:text-xl max-w-72 ${textColor} text-[13px] md:mb-5 ${animate ? 'slide-in-left' : ''}`}>
            {description}
          </p>
          <button onClick={navigateTo}
            className={`rounded-md ${buttonColor} ${buttonTextColor} w-32 h-6 text-[13px] md:text-[18px] md:w-44 md:h-10 whitespace-nowrap relative bottom-1 ${animate ? 'popup-content' : ''}`}>
            {buttonText}
          </button>
        </div>
        <div className="md:py-36 z-10 px-1 md:translate-x-[-40px]">
          <img
            className={`max-w-2xl md:w-96 md:h-72 relative md:top-10  p-5 md:p-0 w-72 h-56 bottom-1 md:bottom-0 left-2  ${animate ? 'slide-in-up' : ''}`}
            src={imageSrc}
            alt="Main furniture image"
          />
        </div>

        <div className={`sticky md:relative rounded-tr-full rounded-tl-full md:top-5 bg-white w-[320px] md:w-[0px] md:rotate-0 md:h-[600px] h-[300px] md:ml-0 md:bottom-0 bottom-[-60px] ${animate ?  'popup-content' : ''}`}>
        </div>

        <div className={`flex md:flex-col justify-evenly relative bottom-[370px] md:bottom-10 ${animate ? 'slide-in-down' : ''}`}>
          {data.map((item, index) => (
            <button
              key={index}
              className={`relative top-20 w-12 h-12 mb-8 rounded-full right-3 md:right-0 thick-font ${buttonColor} shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${buttonTextColor} ${activeButton === index + 1 ? 'transform scale-110 -translate-y-2 transition-all duration-300 md:translate-x-[-10px] md:translate-y-0' : ''}`}
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideComponent1;
