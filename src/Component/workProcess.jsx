import shop from "../Images/shop.svg";
import furniture from "../Images/furniture-icon.svg";
import collaborate from "../Images/icons8-collaboration-100.png";
import  manufacture from "../Images/noun-manufacturing-1470273.svg";
import { useInView } from 'react-intersection-observer';

const WorkProcess = () => {
  
  const { ref, inView } = useInView({
    threshold :0.5,
  });
  
  return(
    <section ref={ref} className="p-6 bg-[#e0e9e6] mt-10">
      <h1 className="text-center text-3xl thick-font pb-5 text-customGreen md:text-5xl mb-10 "> Work Process </h1>
   <div className="grid grid-cols-1 md:grid-cols-2 md:px-20 md:gap-7 md:gap-x-12">
      <div className={`text-center flex flex-col items-center mb-7 ${inView ? 'slide-in-down-work' : 'opacity-0' }`}>
         <img src={shop} className="bg-[#bed7cf] p-3 rounded-xl md:mb-3" alt=""/>
         <h2 className="thick-font text-gray-800 md:text-2xl"> EXPLORE SHOWROOM </h2>
         <h4 className="sthick-font"> discover inspiration for your unique design creation. </h4>
      </div>
      <div className={`text-center flex flex-col items-center mb-7 ${inView ? 'slide-in-right' : 'opacity-0' }`}>
         <img src={furniture} className="w-14 h-14 bg-[#bed7cf]  p-3 rounded-xl md:mb-3 "alt=""/>
         <h2 className="thick-font text-gray-800 md:text-2xl"> DESIGN CONSULTATION </h2>
         <h4 className="sthick-font" > Collaborate for bespoke design; tailor-made to reflect your style. </h4>
      </div>
      <div className={`text-center flex flex-col items-center mb-7 ${inView ? 'slide-in-left' : 'opacity-0' }`}>
         <img src={collaborate} className="w-14 h-14 bg-[#bed7cf]  p-3 rounded-xl md:mb-3 " alt=""/>
         <h2 className="thick-font text-gray-800 md:text-2xl"> SELECT PREMIUM MATERIAL </h2>
         <h4 className="sthick-font" > Choose premium materials; ensuring both luxury and comfort meet. </h4>
      </div>
      <div className={`text-center flex flex-col  items-center mb-7 ${inView ? 'slide-in-up' : 'opacity-0' }`}>
         <img src={manufacture} className="w-14 h-14  bg-[#bed7cf] p-2 rounded-xl md:mb-3" alt=""/>
         <h2 className="thick-font text-gray-800 md:text-2xl"> EXPERT MANUFACTURING </h2>
         <h4 className="sthick-font" > Witness expert manufacturing; delivering quality products to your doorstep. </h4>
      </div>
    </div>
    </section>
    );
}

export default WorkProcess;