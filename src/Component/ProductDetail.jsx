import useTextWithReadmore from '../Hooks/TextWithReadmore.jsx';
import { FaShieldAlt } from "react-icons/fa";
import { MdLayers } from "react-icons/md";
import { MdAspectRatio } from "react-icons/md";

const ProductDetail = ({detail}) => {
  /*const { text, toggleShowFullText , ShowFullText} = useTextWithReadmore(detail.description);
  */
  
  const whatsappOpen = () => {
    const phoneNumber = "6355617070";
const message = encodeURIComponent(`Hi zara furniture , I am interested in your ${detail.name} product  whose price is ${detail.price}  product and I want to arrange meeting with you.  ` ); // Optional message

    // WhatsApp URL scheme
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  }
  
  return(
    <section className="md:pt-8 md:mt-8 md:rounded-2xl  md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:pb-8 md:mr-7 md:translate-x-[-5px]">
      <h1 className="text-2xl thick-font text-customGreen px-6 md:text-4xl mt-7 md:mt-0 slide-in-down"> {detail.name} </h1>
     <div className="px-6 md:translate-y-4">
      {detail.description && detail.description.length > 0 && (
        <span className="sthick-font text-[15px] text-neutral-500 mt-3 md:text-xl">{detail.description}</span>
      )}

    {/*  <span onClick={toggleShowFullText} className="text-gray-500 text-[11px] thick-font translate-y-[-7px] ml-1 "> read more </span>*/}
    </div>
    <div class="fixed bottom-0 w-full bg-white   h-16 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  flex flex-row gap-x-[150px] md:gap-x-[180px] justify-center z-30  md:shadow-white md:top-[470px] md:w-[300px] md:ml-3 ">
      <div className="ml-5 md:mt-[5px] mt-3 md:ml-52 ">
        <p className="text-[12px] sthick-font text-gray-500 md:text-[16px] "> Total Price </p>
        <p className="text-xl thick-font text-gray-700 whitespace-nowrap md:text-2xl slide-in-left max-w-[80px]"> Rs {detail.price}</p>
      </div>
      <div>
        <button onClick={whatsappOpen} className="h-[65px] w-32  bg-customGreen  text-white thick-font md:rounded-2xl md:text-center pr-3 md:mr-14 md:pr-0 ">
        Inquire now
      </button>
      </div>
    </div>
     
    <div className="flex flex-col gap-7 mb-20 mx-6 mt-10">
      <div className="flex flex-row">
        <MdAspectRatio className="text-6xl text-customGreen" />
        <div className="ml-4 translate-y-2 md:translate-y-0">
        <p className="thick-font text-gray-500 text-[13px] md:text-2xl"> Dimensions </p>
        <p className="thick-font text-gray-600 slide-in-up slide-in-up md:text-xl"> {detail.dimensions} </p>
        </div>
      </div>
      
      <div className="flex flex-row">
        <FaShieldAlt className="text-6xl text-customGreen" />
        <div className="ml-4">
        <p className="thick-font text-gray-500 text-[13px] md:text-2xl"> Warranty </p>
        <p className="thick-font text-gray-600 text-[14px] slide-in-up md:text-xl">
            {detail.warranty}
           </p>
        </div>
      </div>  
         
      <div className="flex flex-row">
        <MdLayers className="text-6xl text-customGreen" />
        <div className="ml-4">
        <p className="thick-font text-gray-500 text-[13px] md:text-2xl"> Material Use</p>
        <p className="thick-font text-gray-600 text-[14px] slide-in-up md:text-xl">
            {detail.primaryMaterial}
           </p>

  
     
        </div>
      </div>  
      
    </div>
    
    </section>
    );
}

export default ProductDetail;