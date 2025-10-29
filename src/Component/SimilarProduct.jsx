import { IoIosArrowForward } from "react-icons/io";

import {useNavigate} from 'react-router-dom';
import noImage from  "../Images/noImage.jpg";

const SimilarProduct = ({similar}) => {
  
  const navigate = useNavigate();
  
  return(
    <section className="mb-20 grid px-5 show">
      <div className="w-48 h-[250px] shadow-2xl rounded-3xl p-3 shadow-[rgb(207,229,252,_0.95)_0px_0px_10px] overflow-hidden"> 
        <img className="w-full h-24 rounded-2xl mx-auto" src={similar.images.length ? similar.images[0] : noImage } alt="" />
        <div className="p-3 mt-2 grid gap-0.5">
          <h1 className="thick-font text-[13px] text-neutral-700 mb-1"> {similar.name} </h1>
          {similar.description && similar.description.length > 0 && (
            <h4 className="thick-font text-neutral-400 text-[10px] h-10">
              {`${similar.description.split(' ').slice(0, 13).join(' ')}...`}
            </h4>
          )}
          <div className="flex flex-row">
          <p className="thick-font mt-2 text-[13px] text-[rgb(95,95,95)] whitespace-nowrap"> RS {similar.price} </p><button onClick={() => {
    navigate(`/MainProductPage/${similar.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}} className="flex justify-center items-center p-1 rounded-full relative left-14 bg-customGreen shadow-md">
    <IoIosArrowForward className="text-xl text-white"/>
</button>


          </div>
        </div>
      </div>
    </section>
    );
}

export default SimilarProduct;