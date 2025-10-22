import React, { useState, useEffect, useRef } from 'react';
import posterzara from "../Images/posterzara.png";
import { useNavigate, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { getCurrentBannerURL } from '../Firebase.jsx';

function Poster() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold :0.9,
  });
  
  const [currentBanner, setCurrentBanner] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false); // Add this to prevent multiple fetches

  useEffect(() => {
    // Prevent multiple calls
    if (hasFetched.current) {
      return;
    }
    
    hasFetched.current = true;
    
    const fetchCurrentBanner = async () => {
      try {
        console.log('Fetching banner...'); // Debug log
        // Check if banner URL is already cached in sessionStorage
        const cachedBanner = sessionStorage.getItem('cachedBannerURL');
        
        if (cachedBanner) {
          console.log('Using cached banner'); // Debug log
          // Use cached banner URL
          setCurrentBanner(cachedBanner);
          setLoading(false);
        } else {
          console.log('Fetching from Firebase...'); // Debug log
          // Fetch from Firebase and cache it
          const url = await getCurrentBannerURL();
          const bannerURL = url || 'https://via.placeholder.com/600x150?text=Current+Banner';
          
          // Cache the banner URL in sessionStorage
          sessionStorage.setItem('cachedBannerURL', bannerURL);
          
          setCurrentBanner(bannerURL);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching banner:', err); // Debug log
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchCurrentBanner();
  }, []); // Empty dependency array ensures it only runs once
  
  return (
    <section ref={ref} className="mt-10 bg-zinc-100  ">
       <h1 className="text-xl font-semibold   font-extrabold text-gray-600 thick-font py-3 md:py-8 md:text-3xl  text-center "> Our Post </h1>
    <div className="bg-contain bg-center h-96 
    bg-no-repeat flex justify-center items-center md:h-[700px] " style={{ backgroundImage: `url(${currentBanner})` }}>
          <Link to="/ProductDisplay" className={`rounded-md bg-customGreen shadow-2xl text-white text-[8px] thick-font  text-center  md:text-3xl md:h-auto md:px-10 md:py-5 md:mt-96  text-3xl py-0.5 px-4 mt-56  ${inView ? 'popup-content' : 'opacity-0' }`}>
            SHOP NOW 
          </Link>
    </div>
    </section>
  );
}

export default Poster;
