import bgAbout from "../Images/bgAbout.webp";
import Navbar from '../Component/Navbar.jsx';
import Contact  from "../Images/contact.jpg";
import Footer from "../Component/Footer.jsx";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ContactUs = () => {
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { ref, inView } = useInView({
    threshold :0.2,
  });
  
   const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.2,
  });
  
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.5,
  });
  
  const { ref: ref4, inView: inView4 } = useInView({
    threshold: 0.5,
  });
  
const { ref: ref5, inView: inView5 } = useInView({
    threshold: 0.5,
  });
  
const { ref: ref6, inView: inView6 } = useInView({
    threshold: 0.5,
  });
  
  
  const whatsappOpen = () => {
    const phoneNumber = "6352868656";
const message = encodeURIComponent('Hi zara Furniture' ); // Optional message

    // WhatsApp URL scheme
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  }
  const openInstagram = () => {
    const username = "luxury_collection46"; // Your Instagram username or user ID
    const instagramUrl = `https://www.instagram.com/${username}`;
    window.open(instagramUrl, '_blank');
}
  const openEmail = () => {
    const email = "tabrezmalek06@gmail.com"; // Your email address
    const emailUrl = `mailto:${email}`;
    window.open(emailUrl, '_blank');
}
  const dialPhone = () => {
    const phoneNumber = "6352868656"; // Your phone number
    const phoneUrl = `tel:${phoneNumber}`;
    window.open(phoneUrl, '_blank');
}
  
  return(
    <div>
      <Navbar />
      <div className="relative h-72 mt-16 md:h-96 overflow-hidden">
        <div className="absolute inset-0 animate-zoom-out">
          <img
            src={bgAbout}
            alt="Background"
            className="object-cover w-full h-full opacity-50"
          />
        </div >
        <div className="absolute inset-0 bg-neutral-600 opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center animate-fade-up">
          <div  className="text-center">
            <h1 className="md:text-6xl font-bold text-white  text-4xl thick-font"> Let's Connect </h1>
            <p className="mt-4 md:text-xl text-white text-lg px-4">We’re here to help you find your perfect watch. Reach out to us anytime for inquiries or orders.</p>
          </div>
        </div>
      </div>
      
      <div  className="grid grid-cols-1 md:grid-cols-2 mt-10 md:p-8 justify-items-center p-3 mb-14">
        <div>
        <h1  className="thick-font md:text-4xl py-5 text-center text-2xl p-2"
        >Personalized Assistance at Luxury Collection</h1>
        <h4 className="thick-font md:text-xl py-5 text-center text-[16px]">Need help choosing the right watch? We’re here for you! Reach out to us for quick replies, personalized suggestions, or any questions about our collection. We’ll help you find the perfect piece that fits your style and budget.</h4>
        </div>
        <div ref={ref}>
          <img  src={Contact} className={`h-80 
       ${inView ? 'slide-in-left' : 'opacity-0'}
      `}/>
        </div>
      </div>
      
      <div className="mt-10 mb-14">
        <h1 className={`text-customGreen text-2xl thick-font text-center md:text-5xl
      ${inView2 ? 'slide-in-down-work' : 'opacity-0'}
      `}> Get in Touch </h1>
        <h1 ref={ref2} className="text-center text-xl thick-font text-neutral-600 text-4xl"
        > Have Any Questions ?</h1>
        
      <div className="p-5 grid grid-cols-1 gap-5 md:grid-cols-2  md:w-full" >
        <div ref={ref3} className={`h-44 w-full shadow-md rounded-2xl p-5 bg-bgGreen md:w-80 md:ml-28
       ${inView3 ? 'shown' : 'opacity-0'}
      `}
        >
          <h1 className="thick-font text-2xl mb-1 text-neutral-600 "> Call Me </h1>
          <p className="thick-font text-lg text-neutral-500 mb-1 md:w-60">Questions? We've got answers. Call us.</p>
          <button onClick={dialPhone} className={`py-1 px-3 thick-font rounded-3xl bg-customGreen text-white py-2 mb-1
        ${inView3 ? 'popup-content' : 'opacity-0'}
      `}
          >call now </button>
          <FaPhone className={`relative text-7xl left-52 bottom-16 text-customGreen
       ${inView3 ? 'slide-in-right2' : 'opacity-0'}
      `}
          />
        </div>
        
          <div ref={ref4} className={`h-44 w-full shadow-md rounded-2xl p-5 bg-bgGreen md:w-80 
       ${inView4 ? 'shown' : 'opacity-0'}
      `}>
          <h1 className="thick-font text-2xl mb-1 text-neutral-600 "> WhatsApp Me </h1>
          <p className="thick-font text-lg text-neutral-500 mb-1 md:w-60">Start a conversation with us on WhatsApp!</p>
          <button onClick={whatsappOpen} className={`py-1 px-3 thick-font rounded-3xl bg-customGreen text-white py-2 mb-1
         ${inView4 ? 'popup-content' : 'opacity-0'}
      `}
          > WhatsApp </button>
          
          <FaWhatsapp className={`relative text-7xl left-52 bottom-16 text-customGreen
      ${inView4 ? 'slide-in-right2' : 'opacity-0'}
      `} />
        </div>
        
          <div ref={ref5} className={`h-44 w-full shadow-md rounded-2xl p-5 bg-bgGreen md:w-80 md:ml-28
       ${inView5 ? 'shown' : 'opacity-0'}
      `}>
          <h1 className="thick-font text-2xl mb-1 text-neutral-600"> Email Me </h1>
          <p className="thick-font text-lg text-neutral-500 mb-1 md:w-64">Your email is the first step to exceptional service</p>
          <button onClick={openEmail} className={`py-1 px-3 thick-font rounded-3xl bg-customGreen text-white py-2 mb-1
        ${inView5 ? 'popup-content' : 'opacity-0'}
      `}
          > Email Me </button>
          <MdEmail className={`relative text-7xl left-52 bottom-16 text-customGreen
       ${inView5 ? 'slide-in-right2' : 'opacity-0'}
      `}/>
        </div>        
          <div ref={ref6} className={`h-44 w-full shadow-md rounded-2xl p-5 bg-bgGreen md:w-80 
       ${inView6 ? 'shown' : 'opacity-0'}
      `}>
             
          <h1 className="thick-font text-2xl mb-1 text-neutral-600"> Instagram </h1>
          <p className="thick-font text-lg text-neutral-500 mb-1 md:w-60 ">Inspiration for your space on our Insta feed!</p>
          <button onClick={openInstagram} className={`py-1  thick-font rounded-3xl bg-customGreen text-white py-2 mb-1 px-5
       ${inView6 ? 'popup-content' : 'opacity-0'}
      `}> DM Me </button>
          <FaInstagram className={`relative text-7xl left-52 bottom-16 text-customGreen
    ${inView6 ? 'slide-in-right2' : 'opacity-0'}
      `}/>
      </div>
       </div>
      </div>
      <Footer />
    </div>
    )
}
export default ContactUs;