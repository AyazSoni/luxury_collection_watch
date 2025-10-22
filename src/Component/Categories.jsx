import bed  from "../Images/Category/bed2.png";
import ShoeRack from "../Images/Category/ShoeRack.png";
import singlebed from "../Images/Category/singlebed.png";
import Sofa from "../Images/Category/Sofa2.png.jpg";
import TvUnit from "../Images/Category/TvUnit.png";
import wardrobe from "../Images/Category/wardrobe.png";
import SofaComeBed from "../Images/Category/SofaComeBed.png";
import multipurposeTable from "../Images/Category/table.png";
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {useNavigate} from "react-router-dom";
import { useCategory } from '../context/CategoryProvider.jsx';
import { useInView } from 'react-intersection-observer';

const Category = () => {
  
  const { setSelectedCategory } = useCategory();
  const navigate = useNavigate();
  
  const { ref, inView } = useInView({
    threshold :0.3,
  });
  
  const ToNav = (category) => {
    setSelectedCategory(category);
    navigate('/ProductDisplay');
    
  }
  
  return (
    
    
    <section ref={ref} className="w-full  mt-4 m-1 p-4 overflow-hidden">
    <div className=" w-full">
     <h1 className="text-xl font-semibold  mr-10 mt-7 font-extrabold text-gray-600 thick-font my-5 md:text-3xl "> EXPLORE BY CATEGORIES </h1>
    </div>
      {/* First row */}
      <div className="flex flex-row justify-evenly mb-3">
        <button onClick={() => ToNav('BEDROOM SET')} className={`bg-card1bg shadow-md rounded-lg  mr-2 flex flex-row w-full justify-between md:h-40 md:justify-center
        ${inView ? 'popup-content' : 'opacity-0'}`}>
          <img src={bed} alt="Placeholder" className="h-36  md:h-64 md:w-64 md:relative  md:bottom-10" />
          <div>
          <h2 className="text-2xl font-semibold  mr-10 mt-7  font-extrabold text-gray-600 thick-font md:text-5xl md:mb-2 text-left"> BEDROOM SET</h2>
           <div className="flex flex-row"><h2 className="thick-font text-pink-500 md:text-3xl "> Explore More  </h2> <ChevronRightIcon className="h-5 w-5 text-pink-500 mt-[2px] md:h-10 md:w-10 md:mt-[0px]" /> </div>
           
           </div>
        </button>

     </div>
      {/* Second row */}
      <div className="flex flex-row justify-evenly mb-3 md:justify-between">
        <button onClick={() => ToNav('WARDROBE & BED')} className={`bg-card3bg shadow-md rounded-lg px-3 mr-2 pr-3 md:w-[350px]         ${inView ? 'popup-content' : 'opacity-0'}`}>
          <img src={wardrobe} alt="Placeholder" className="w-[400px] h-36 md:h-auto md:w-[250px]" />
         <h3 className=" font-semibold  font-extrabold text-gray-700 thick-font md:text-4xl relative bottom-5 md:right-8"> WARDROBE</h3>
         
         <div className="flex flex-row relative bottom-5"><h6 className=" thick-font  text-sky-500 md:text-2xl ml-5 "> Explore  </h6> <ChevronRightIcon className="h-3 w-3 text-sky-500 mt-[6px] font-bold ml-1 md:h-7 md:w-7 mt-[1px] md:ml-0" /> </div>
        </button>
        <div className="flex flex-col">
          {/* Third row */}
          <div className="flex flex-row mb-2 ">
            <button onClick={() => ToNav('MULTIPURPOSE TABLES')} className={`bg-card4bg shadow-md rounded-lg p-2 mr-2 flex flex-col md:w-[300px] ${inView ? 'popup-content' : 'opacity-0'}`}>
              <img src={multipurposeTable} alt="Placeholder" className="w-60 md:w-52 mx-auto " />
              <h2 className=" text-[12px] thick-font font-semibold  text-yellow-600 text-center mt-1 md:text-4xl">Table</h2>
            </button>
            
            <button onClick={() => ToNav('SINGLE BED')} className={`bg-card5bg shadow-md rounded-lg md:p-5 p-2 mr-2 flex flex-col overflow-hidden md:w-[300px] ${inView ? 'popup-content' : 'opacity-0'}`}>
              <img src={singlebed} alt="Placeholder" className="w-52 rotate-180 relative bottom-5 md:w-40 md:bottom-10 mx-auto" />
              <h2 className=" text-[10px] thick-font font-semibold  text-emerald-700 text-center relative md:text-3xl "> Single Bed</h2>
            </button>
          </div>
          {/* Fourth row */}
          <div  className="flex flex-row ">
            <button onClick={() => ToNav('SOFACOMEBED')} className={`bg-rose-300 shadow-md rounded-lg mr-2 flex flex-row h-20  md:h-36 md:p-5 pr-3 md:w-full ${inView ? 'popup-content' : 'opacity-0'}`}>
              <img src={SofaComeBed} alt="Placeholder" className="w-20 h-24 bottom-4 relative  md:h-60 md:w-60 md:bottom-20" />
              <h2 className=" text-[14px] thick-font font-semibold  text-rose-100 text-left relative top-5 md:text-3xl"> Sofa <br /> ComeBed </h2>
            </button>
          </div>
        </div>
      </div>

      {/* Third row */}
      <div className="flex flex-row justify-evenly ">
        <button onClick={() => ToNav('SOFASET')} className={`bg-card8bg shadow-md rounded-lg p-3 mr-2 h-[100px] md:h-[200px] ${inView ? 'popup-content' : 'opacity-0'}`}>
              <h2 className=" text-[20px] thick-font font-semibold  text-stone-500 text-left md:text-5xl md:text-center"> Sofa </h2>
              <img src={Sofa} alt="Placeholder" className="relative bottom-6 w-[700px] md:bottom-40" />
        </button>
        <button onClick={() => ToNav('TV UNIT')} className={`bg-card9bg shadow-md rounded-lg p-3 mr-2 h-[100px] overflow-hidden md:h-[200px] ${inView ? 'popup-content' : 'opacity-0'}`}>
              <h2 className=" text-[18px] thick-font font-semibold  text-teal-600 text-left md:text-4xl md:text-center"> Tv Unit</h2>
              <img src={TvUnit} alt="Placeholder" className="relative top-1 w-[700px] md:top-[-50px]" />
        </button>
        <button onClick={() => ToNav('SHOE RACK')} className={`bg-card10bg shadow-md rounded-lg p-3 mr-2 h-[100px] md:h-[200px] md:w-[700px] ${inView ? 'popup-content' : 'opacity-0'}`}>
              <h2 className=" text-[14px] thick-font font-semibold  text-gray-500 text-left relative top-16 md:text-4xl  md:text-left  md:top-32"> Shoe Rack</h2>
              <img src={ShoeRack} alt="Placeholder" className="relative bottom-8 left-3 w-[700px] rounded-tr-2xl md:w-[130px] md:bottom-12 md:left-40" />
        </button>
      </div>
    </section>
  );
}

export default Category;