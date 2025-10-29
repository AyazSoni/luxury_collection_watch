import useTextWithReadmore from '../Hooks/TextWithReadmore.jsx';
import { SparklesIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const ProductDetail = ({detail}) => {
  /*const { text, toggleShowFullText , ShowFullText} = useTextWithReadmore(detail.description);
  */
  
  const whatsappOpen = () => {
    const phoneNumber = "6352868656";
const message = encodeURIComponent(`Hi Luxury Collection, I’m interested in this watch (Product ID:${detail.id}) . Could you share more details of it?`); // Optional message

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

      {/* Show feature highlights when no description OR description is very short (less than 20 characters) */}
      {(!detail.description || detail.description.length === 0 || detail.description.length < 20) && (
        <div className={`mt-4 md:mt-6 ${detail.description && detail.description.length > 0 ? 'mt-6 md:mt-8' : ''}`}>
          {/* Elegant Feature Highlights */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 py-4 md:py-6">
            <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200/50">
              <div className="p-2 md:p-3 bg-gradient-to-br from-customGreen/10 to-customGreen/5 rounded-xl mb-2 md:mb-3">
                <SparklesIcon className="w-6 h-6 md:w-8 md:h-8 text-customGreen" />
              </div>
              <p className="text-[10px] md:text-xs thick-font text-gray-700 text-center leading-tight">Premium Quality</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200/50">
              <div className="p-2 md:p-3 bg-gradient-to-br from-customGreen/10 to-customGreen/5 rounded-xl mb-2 md:mb-3">
                <HeartIcon className="w-6 h-6 md:w-8 md:h-8 text-customGreen" />
              </div>
              <p className="text-[10px] md:text-xs thick-font text-gray-700 text-center leading-tight">Elegant Design</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200/50">
              <div className="p-2 md:p-3 bg-gradient-to-br from-customGreen/10 to-customGreen/5 rounded-xl mb-2 md:mb-3">
                <ShieldCheckIcon className="w-6 h-6 md:w-8 md:h-8 text-customGreen" />
              </div>
              <p className="text-[10px] md:text-xs thick-font text-gray-700 text-center leading-tight">Authentic</p>
            </div>
          </div>
          
          {/* Elegant Divider with Text */}
          <div className="relative my-4 md:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs md:text-sm">
              <span className="px-3 md:px-4 bg-white text-gray-400 italic">Discover luxury in every detail</span>
            </div>
          </div>
        </div>
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
     
    
    </section>
    );
}

export default ProductDetail;