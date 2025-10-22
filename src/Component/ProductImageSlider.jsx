import React, { useState, useEffect, useMemo } from "react";
import { register } from 'swiper/element/bundle';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import noImage from "../Images/noImage.jpg";

register();

Modal.setAppElement('#root');

// FIXED: Memoized component to prevent unnecessary re-renders
const ProductImageSlider = React.memo(({ slides }) => {
  const [curr, setCurr] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSlideChange = (e) => {
    console.log('slide changed');
  };
  
  const navigate = useNavigate();

  const openPhoto = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // FIXED: Memoize slides to prevent re-rendering when slides array reference changes
  const memoizedSlides = useMemo(() => slides, [slides]);

  return (
    <div className="overflow-hidden relative md:w-[450px] w-full md:mt-8 md:ml-10">
      <button onClick={() => navigate('/ProductDisplay')} className="rounded-full bg-[#809791] w-10 h-10 absolute z-10 m-3 text-center p-2">
        <FaArrowLeft className="text-2xl text-white" />
      </button>
        
      {memoizedSlides.length ? (
        <swiper-container pagination="true">
          {memoizedSlides.map((slide, index) => (
            <swiper-slide key={index}>
              <button onClick={() => openPhoto(slide)}>
                <img 
                  src={slide} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full max-h-[400px] md:h-[550px] min-h-[250px]"
                  loading="lazy" // FIXED: Add lazy loading
                />
              </button>
            </swiper-slide>
          ))}
        </swiper-container>
      ) : (
        <div>
          <img src={noImage} className="w-full h-[400px] md:h-[550px]" />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Image"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      >
        <div className="relative">
          <img src={selectedImage} alt="Product" className="max-w-full max-h-full" />
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10"
          >
            ×
          </button>
        </div>
      </Modal>
    </div>
  );
});

export default ProductImageSlider;
