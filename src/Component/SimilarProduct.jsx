import { IoIosArrowForward } from "react-icons/io";
import {useNavigate} from 'react-router-dom';
import noImage from  "../Images/noImage.jpg";
import { useState } from "react";

const SimilarProduct = ({similar}) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(similar.images.length ? similar.images[0] : noImage);
  
  return(
    <section className="mb-6 px-2 flex-shrink-0">
      <div 
        onClick={() => {
          navigate(`/MainProductPage/${similar.id}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="w-56 min-w-[224px] min-h-[320px] shadow-[rgb(207,229,252,_0.95)_0px_0px_16px] rounded-3xl p-4 overflow-hidden flex flex-col cursor-pointer hover:shadow-[rgb(167,205,246)_0px_0px_20px] transition-all duration-300 hover:scale-[1.02] bg-white"> 
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-3 flex-shrink-0 bg-gray-50">
          <img 
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" 
            src={imageSrc} 
            alt={similar.name}
            onError={() => setImageSrc(noImage)}
          />
        </div>
        <div className="flex flex-col flex-grow gap-2">
          <h1 className="thick-font text-base text-neutral-700 leading-tight line-clamp-2 min-h-[2.5rem]"> {similar.name} </h1>
          {similar.description && similar.description.length > 0 && (
            <h4 className="thick-font text-neutral-400 text-xs line-clamp-2 mb-1">
              {similar.description.substring(0, 60) + (similar.description.length > 60 ? "..." : "")}
            </h4>
          )}
          <div className="flex flex-row items-center justify-between mt-auto pt-2">
            <p className="thick-font text-lg text-[rgb(95,95,95)] whitespace-nowrap">RS {similar.price}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/MainProductPage/${similar.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex justify-center items-center p-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md hover:from-indigo-500 hover:to-cyan-500 transition-all flex-shrink-0"
            >
              <IoIosArrowForward className="text-xl text-white"/>
            </button>
          </div>
        </div>
      </div>
    </section>
    );
}

export default SimilarProduct;
