import quotes from "../Images/quote.svg";
import CardFurniture from "./CardFurniture.jsx";
import { useInView } from 'react-intersection-observer';

const NewestProduct = () => {
  
  const { ref, inView } = useInView({
    threshold :0.5,
  });
  
  const whatsappOpen = () => {
    const phoneNumber = "6352868656";
const message = encodeURIComponent('Hi! I’m interested in buying a watch from your collection. Could you help me with some options?' ); // Optional message

    // WhatsApp URL scheme
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  }
  
  return(

   <section ref={ref} className="w-full bg-bgGreen text-center p-5 mt-16 ">
      <img className="md:h-20 mx-auto h-14 animate-bounce" src={quotes} />
      <h1 className={`text-customGreen thick-font  md:text-4xl ${inView ? 'show' : 'opacity-0'}`}> LOOKING FOR PREMIUM WATCHES? </h1>
      <h4 className={`thick-font p-2 text-gray-700 md:text-3xl md:px-16 md:mb-3 text-[14px] 
      ${inView ? 'slide-in-down' : 'opacity-0'}`}
      > Tell us what you have in mind — we’ll help you find the perfect match from our collection.
Contact us now and let’s make it yours. </h4>
      <button onClick={whatsappOpen} className={`rounded-md bg-customGreen  px-5 py-2 text-white p-2 thick-font md:text-xl       ${inView ? 'slide-in-up' : 'opacity-0'}`}> Contact Now </button>
   </section>
    
    );
}

export default NewestProduct;