import React, { useState, useEffect } from 'react';
import sofaImg3 from "../Images/rolex-banner-removebg-preview.png";
import purple_watch from "../Images/banner-3-removebg-preview.png";
import { useNavigate } from 'react-router-dom';
import { getCurrentBannerData } from '../Firebase';

const SlideComponent1 = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(1); // State to track active button
  const [animate, setAnimate] = useState(true); // State to toggle animations
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const banner = await getCurrentBannerData();
        setBannerData(banner);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };
    fetchBanner();
  }, []);

  // Always show 3 slides regardless of banner loading
  const data = [
    // Slide 1 - Banner slide (dynamically loaded from admin)
    {
      type: "banner",
      text: bannerData?.title || "Featured Product",
      subText: "",
      description: bannerData?.description || "Discover our exclusive collection",
      bgImage: bannerData?.imageUrl || sofaImg3,
      buttonText: "Shop Now",
      navigateTo: () => {
        if (bannerData?.productId) {
          navigate(`/MainProductPage/${bannerData.productId}`);
        } else {
          navigate('/ProductDisplay');
        }
      }
    },
    // Slide 2 - See Our Collection
    {
      type: "static",
      text: "OUR WATCH COLLECTION",
      subText: "Premium  Watches",
      description: "We offer the best collection of first-copy watches from top brands like Rado, Rolex, Omega, and more. Each watch is carefully chosen for its premium design, quality finish, and authentic feel. From luxury to casual styles, we have something for every look",
      bgColor: "bg-gray-200",
      mainTextColor: "text-customGreen",
      textColor: "text-gray-500",
      buttonColor: 'bg-customGreen',
      buttonTextColor: "text-white",
      imageSrc: sofaImg3,
      buttonText: "see our collection",
      navigateTo: () => navigate('/ProductDisplay')
    },
    // Slide 3 - About Us slide
    {
      type: "static",
      text: "Know More",
      subText: " About Luxury Collection",
      description: "We deal in first-copy watches of premium brands like Rado, Rolex, and Omega. Offering stylish designs at affordable prices, we aim to bring luxury within everyone's reach.",
      bgColor: "bg-gray-100",
      mainTextColor: "text-customPurpleDark",
      textColor: "text-customPurpleLight",
      buttonColor: "bg-customPurpleLight",
      buttonTextColor: "text-white",
      imageSrc: purple_watch,
      buttonText: "About Us",
      navigateTo: () => navigate('/ContactUs')
    }
  ];


  const handleClick = (index) => {
    setAnimate(false); // Reset animation
    setTimeout(() => {
      setActiveButton(index);
      setAnimate(true); // Trigger animation after state change
    }, 50); // Delay to allow reset to complete
  };

  const currentSlide = data[activeButton - 1];
  const { type, text, subText, description, bgColor, mainTextColor, textColor, buttonColor, buttonTextColor, imageSrc, bgImage, buttonText, navigateTo } = currentSlide;

  // Render banner slide with full-background layout
  if (type === "banner") {
    return (
      <div
        className="flex-grow w-full mt-10 md:mt-0 overflow-hidden h-[600px] md:h-[760px] relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark overlay gradient - mobile: left to right, desktop: bottom to top */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent md:bg-gradient-to-t md:from-black/80 md:via-black/20 md:to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col justify-start items-start h-full px-8 pt-28 md:px-11 md:pt-0 md:justify-center pointer-events-none">
          {/* Text content - left-aligned with padding on mobile for modern look */}
          <div className="w-full md:w-6/12 lg:w-5/12 md:absolute md:left-11 text-left space-y-4 md:space-y-6">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl ${animate ? 'show' : ''}`}>
              {text}
            </h1>
            {description && (
              <p className={`text-base md:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-sm md:max-w-xl font-light tracking-wide drop-shadow-lg ${animate ? 'slide-in-left' : ''}`}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Shop Now Button - above navigation buttons on mobile, bottom center */}
        <button
          onClick={navigateTo}
          className={`absolute bottom-20 left-0 right-0 mx-auto w-fit md:bottom-auto md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:right-auto md:mx-0 z-10 rounded-md bg-white text-black font-bold px-10 py-3 text-[15px] md:text-[16px] whitespace-nowrap hover:bg-gray-200 transition-all duration-300 shadow-lg pointer-events-auto ${animate ? 'popup-content' : ''}`}
        >
          {buttonText}
        </button>

        {/* Navigation dots - SAME AS SLIDE 2 & 3 ORIGINAL DESIGN */}
          <div className={`flex flex-row md:flex-col gap-10 md:gap-0 absolute bottom-4 left-0 right-0 justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:transform md:-translate-x-1/2 md:right-auto z-10 ${animate ? 'slide-in-down' : ''}`}>
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-12 h-12 md:mb-8 rounded-full md:relative md:top-20 md:right-0 thick-font bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black pointer-events-auto flex items-center justify-center ${ index == 0 ? 'transform scale-110 transition-all duration-300 md:translate-x-[-10px]' : ''}`}
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Render static slide with original split layout
  return (
    <div className={`flex-grow ${bgColor} w-full md:w-full mt-10 md:mt-0 overflow-hidden md:h-[760px] md:h-auto h-[600px] relative`}>
      <div className="flex md:flex-row flex-col md:justify-between md:items-center md:px-11 px-6 overflow-hidden h-full">
        <div className="w-10/12 p-5">
          <h1 className={`md:text-xl font-bold text-left ${textColor} mt-6 mb-2 text-[15px] md:mb-5 ${animate ? 'show' : ''}`}>{text}</h1>
          <p className={`text-left max-w-md md:text-6xl mb-2 font-bold ${mainTextColor} heading md:text-3xl text-2xl md:mb-5 ${animate ? 'slide-in-down' : ''}`}>
            {subText}
          </p>
          {description && (
            <p className={`text-left mb-2 md:text-xl max-w-72 ${textColor} text-[13px] md:mb-5 ${animate ? 'slide-in-left' : ''}`}>
              {description}
            </p>
          )}
          <button onClick={navigateTo}
            className={`rounded-md ${buttonColor} ${buttonTextColor} w-32 h-6 text-[13px] md:text-[18px] md:w-44 md:h-10 whitespace-nowrap relative bottom-1 ${animate ? 'popup-content' : ''}`}>
            {buttonText}
          </button>
        </div>
        <div className="md:py-36 z-10 flex justify-center md:justify-start md:translate-x-[-40px] relative">
          <div className="absolute rounded-tr-full rounded-tl-full bg-white w-full max-w-[300px] md:w-[0px] md:max-w-none h-[280px] md:h-0 top-[100%] -translate-y-1/2"></div>
          <img
            className={`max-w-2xl md:w-96 md:h-72 relative md:top-0 md:p-0 w-[250px] h-[250px] z-10 md:left-2  ${animate ? 'slide-in-up' : ''}`}
            src={imageSrc}
            alt="Main furniture image"
          />
        </div>

        <div className={`flex flex-row md:flex-col gap-10 md:gap-0 absolute bottom-4 left-0 right-0 justify-center md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2 md:left-auto z-20 ${animate ? 'slide-in-down' : ''}`}>
          {data.map((item, index) => (
          <button
            key={index}
              className={`w-12 h-12 md:mb-8 rounded-full thick-font ${buttonColor} shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${buttonTextColor} ${activeButton === index + 1 ? 'transform scale-110 transition-all duration-300 md:translate-x-[-10px]' : ''}`}
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
