
import { FaPhone } from "react-icons/fa6";
import { useInView } from 'react-intersection-observer';

const ShopInfo = ({Info}) => {
  const { ref, inView } = useInView({
    threshold :0.7,
  });
  
  const whatsappOpen = () => {
    const phoneNumber = Info.phone;
const message = encodeURIComponent('Hello, let\'s chat!'); // Optional message

    // WhatsApp URL scheme
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  }
  
  const mapOpen = () => {
    const address = encodeURIComponent(Info.address);
    window.location = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
  }
  
  
  
  return(
            <div ref={ref} className="mt-5 flex flex-col gap-4 " >
        <h2 className={`thick-font text-lg text-neutral-600
          ${inView ? 'slide-in-down' : 'opacity-0'}
      `}
        >{Info.addressHead}</h2>
        <h4  className={`sthick-font text-neutral-500
         ${inView ? 'slide-in-left' : 'opacity-0'}
      
        `}>{Info.address}</h4>
        <p className="sthick-font  ">{Info.email}</p>
        <div className="flex flex-row gap-10">
        <div > 
          <p className="sthick-font text-neutral-500 mb-2" > Timings </p>
          <p className="thick-font text-[12px] text-neutral-600">{Info.dayOpen}</p>
          <p className="thick-font text-[12px] text-neutral-600">{Info.timing}</p>
        </div>
        <div >
          <p className="sthick-font text-neutral-500 mb-2 "> Phone </p>
          <p className="flex flex-row text-[14px] thick-font gap-1 text-neutral-600 "> <FaPhone className="mt-1 text-[14px] "/> +91 {Info.phone}</p>
        </div>
       </div>
       <div className="grid grid-cols-2 gap-5">
         <button className={`border-2 border-customGreen thick-font h-14 text-[14px] text-customGreen
          ${inView ? 'slide-in-left2' : 'opacity-0'}
      `} onClick={mapOpen}> Get Directions </button>
      
        <button className={`bg-customGreen text-white h-14  thick-font text-[14px]
                  ${inView ? 'slide-in-right2' : 'opacity-0'}
      `}
         onClick={whatsappOpen}> Inquiry Now</button>
       </div>
       </div>
    );
}

export default ShopInfo;