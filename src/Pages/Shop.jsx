import ImageSlider from '../Component/ImagesSlider.jsx';
import Footer from '../Component/Footer.jsx';
import Navbar from '../Component/Navbar.jsx';
import ShopInfo from '../Component/ShopInfo.jsx';

import udhna_Image1 from "../Images/Shop/udhna_Image1.jpg";
import udhna_Image2 from "../Images/Shop/udhna_Image2.jpg";
import udhna_Image3 from "../Images/Shop/udhna_Image3.jpg";

import AdajanImage1 from "../Images/Shop/AdajanImage1.jpg";
import AdajanImage2 from "../Images/Shop/AdajanImage2.jpg";
import AdajanImage3 from "../Images/Shop/AdajanImage3.jpg";

import Amroli_Image1 from "../Images/Shop/Amroli_Image1.jpg";
import Amroli_Image2 from "../Images/Shop/Amroli_Image2.jpg";
import Amroli_Image3 from "../Images/Shop/Amroli_Image3.jpg";
import { useInView } from 'react-intersection-observer';


const Shop = () => {
  
  const { ref, inView } = useInView({
    threshold :0.5,
  });
  
  const imagesShop1 = [
    udhna_Image1 , udhna_Image2 , udhna_Image3
  ];
  const imagesShop2 = [
   AdajanImage1 , AdajanImage2 , AdajanImage3
  ];
  const imagesShop3 = [
    Amroli_Image1 , Amroli_Image2 , Amroli_Image3
  ];
  const Info = [
    {
      addressHead : "Surat Gujarat" ,
      address: "Zara Furniture, Navjivan Cir, Gandhi Kutir, Surat, Gujarat 395017" ,
      dayOpen : "Mon to Sat",
      email : "faraazn007@gmail.com" , 
      timing : "10 AM to 8:30 PM" ,
      phone : "9377777632" ,
    },{
      addressHead : "Surat Gujarat" ,
      address: " Zara furniture Shop-3, Shop-3 Shree Gopal Villa near Gujarat gas office, opposite SHAHI MASJID, Guru Ram Pavan Bhumi, Adajan Gam, Adajan, Surat, Gujarat 395009" ,
      dayOpen : "Mon to Sat",
      email : "faraazn007@gmail.com" , 
      timing : "10 AM to 8:30 PM" ,
      phone : "6355617070" ,
    },{
      addressHead : "Surat Gujarat" ,
      address: "Zara furniture amroli 6RQX+G8V, Chhaprabhatha Rd, Amroli, Surat, Gujarat 394107" ,
      
      dayOpen : "Mon to Sat",
      email : "faraazn007@gmail.com" , 
      timing : "10 AM to 8:30 PM" ,
      phone : "9638099019" ,
    }
    ];
  
  return(
    <>
    <div className="mt-14 p-10 overflow-hidden ">
      <Navbar />
      <div  ref={ref} className="md:mb-20 ">
      <h1 className={`thick-font text-3xl text-center md:text-5xl text-customGreen slide-in-right
      ${inView ? 'slide-in-dowm' : 'opacity-0'}
      `}>
        Our Stores
      </h1>
      <h3 className={`sthick-font text-center md:mx-24 md:text-3xl mx-2 my-5 md:my-10       ${inView ? 'slide-in-up' : 'opacity-0'}`}>
         Come experience the charm of our stores in Amroli, Adajan, and Udhna. Step into a world where style meets simplicity. Our curated collections offer furniture that's both elegant and easy on the eye. Discover the beauty in every piece and transform your space effortlessly. Visit us today and elevate your surroundings with our carefully crafted furniture.
      </h3>
     </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 justify-items-center md:gap-10 md:mb-16">
        <ImageSlider slides={imagesShop1}  />
        <ShopInfo Info={Info[0]} />
        <ImageSlider slides={imagesShop2}  />
        <ShopInfo Info={Info[1]} />   
        <ImageSlider slides={imagesShop3}  />        
        <ShopInfo Info={Info[2]} />       
      </div>

    </div>
    <Footer  />
   </>
    );
}

export default Shop;