import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import fur from "../Images/download.webp";
import { useNavigate } from 'react-router-dom';
import noImage from "../Images/noImage.jpg";
import { useInView } from 'react-intersection-observer';

const CardFurniture = ({ product }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px'
  });

  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(noImage);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (inView && !imageLoaded) {
      const actualImageSrc = product.images.length ? product.images[0] : noImage;
      setImageSrc(actualImageSrc);
      setImageLoaded(true);
    }
  }, [inView, imageLoaded, product.images]);

  return (
    <section ref={ref} className="p-10 grid">
      <div className={`w-72 min-h-[380px] max-h-[480px] shadow-2xl rounded-3xl p-5 transition-shadow flex flex-col mx-auto
            ${inView ? 'main shadow-[rgb(167,205,246)_0px_0px_16px]' : 'default shadow-[rgb(207,229,252,_0.95)_0px_0px_16px]'}`}>
        <img 
          className="w-full h-56 rounded-2xl mx-auto transition-opacity duration-300 flex-shrink-0" 
          src={imageSrc} 
          alt={product.name}
          loading="lazy"
          style={{ 
            opacity: imageLoaded ? 1 : 0.7,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
        <div className="p-3 mt-2 flex flex-col flex-grow gap-2">
          <h1 className="thick-font text-xl text-neutral-700 leading-tight line-clamp-2 min-h-[3rem]"> {product.name} </h1>
          {product.description && product.description.length > 0 && (
            <h4 className="thick-font text-neutral-400 text-[13px] mb-1 line-clamp-2">
              {product.description.substring(0, 50) + (product.description.length > 50 ? "..." : "")}
            </h4>
          )}

          <div className="flex flex-row gap-10 mt-auto">
            <p className="thick-font mt-2 text-xl text-[rgb(95,95,95)] max-w-[80px] whitespace-nowrap">RS {product.price}</p>
            <button onClick={() => { navigate(`/MainProductPage/${product.id}`) }} className="flex justify-center items-center p-2 rounded-full relative bottom-1 left-14 bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md flex-shrink-0">
              <IoIosArrowForward className="text-3xl text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardFurniture;
