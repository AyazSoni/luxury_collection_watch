import React, { useState, useEffect, useRef } from 'react';
import posterzara from "../Images/posterzara.png";
import { useNavigate, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { getCurrentBannerData } from '../Firebase.jsx';

function Poster() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold :0.9,
  });

  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false); // Add this to prevent multiple fetches

  useEffect(() => {
    // Prevent multiple calls
    if (hasFetched.current) {
      return;
    }

    hasFetched.current = true;

    const fetchBannerData = async () => {
      try {
        console.log('Fetching banner data...'); // Debug log
        // Check if banner data is already cached in sessionStorage
        const cachedBannerData = sessionStorage.getItem('cachedBannerData');

        if (cachedBannerData) {
          console.log('Using cached banner data'); // Debug log
          // Use cached banner data
          setBannerData(JSON.parse(cachedBannerData));
          setLoading(false);
        } else {
          console.log('Fetching from Firebase...'); // Debug log
          // Fetch from Firebase and cache it
          const data = await getCurrentBannerData();
          const bannerInfo = data || {
            imageUrl: 'https://via.placeholder.com/600x150?text=Current+Banner',
            title: '',
            description: '',
            productId: null
          };

          // Cache the banner data in sessionStorage
          sessionStorage.setItem('cachedBannerData', JSON.stringify(bannerInfo));

          setBannerData(bannerInfo);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching banner:', err); // Debug log
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []); // Empty dependency array ensures it only runs once
  
  const handleBannerClick = () => {
    if (bannerData?.productId) {
      // Navigate to product detail page with the product ID
      navigate(`/product/${bannerData.productId}`);
    } else {
      // Default to product display page
      navigate('/ProductDisplay');
    }
  };

  return (
    <section ref={ref} className="mt-10 bg-zinc-100">
      <h1 className="text-xl font-extrabold text-gray-600 thick-font py-3 md:py-8 md:text-3xl text-center">
        {bannerData?.title || 'Our Post'}
      </h1>

      {bannerData?.description && (
        <p className="text-center text-gray-600 px-4 mb-4 md:text-lg">
          {bannerData.description}
        </p>
      )}

      <div
        className="bg-contain bg-center h-96 bg-no-repeat flex justify-center items-center md:h-[700px]"
        style={{ backgroundImage: `url(${bannerData?.imageUrl || 'https://via.placeholder.com/600x150?text=Banner'})` }}
      >
        <button
          onClick={handleBannerClick}
          className={`rounded-md bg-customGreen shadow-2xl text-white text-[8px] thick-font text-center md:text-3xl md:h-auto md:px-10 md:py-5 md:mt-96 text-3xl py-0.5 px-4 mt-56 ${inView ? 'popup-content' : 'opacity-0'}`}
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
}

export default Poster;
