import React from 'react';
import furnitureVideo from '../Images/zara-video.mp4';
import { useInView } from 'react-intersection-observer';


const VideoSection = () => {
  const { ref, inView } = useInView({
    threshold :0.4,
  });

  return (
    <section  className="mt-10 md:flex md:flex-row ">
      <div ref={ref} className={`shadow-md rounded-3xl border-t-4 border-customGreen border-solid pb-3 m-5 md:mr-8 md:w-1/2 ${inView ? 'show' : 'opacity-0'}`}>
        <h1 className="text-xl thick-font text-center text-gray-700 rounded-t-2xl py-6 px-2 border-b-2 border-customGreen border-solid drop-shadow-2xl md:text-3xl slide-in-down">
          Elevate Your Interior Design with <span className="text-customGreen thick-font md:text-3xl"> Zara Furniture </span>: Here's Why
        </h1>
        <div className="md:mt-48">
          <ul className="list-disc list-inside md:text-2xl">
            <li className={`pl-5 pb-3 thick-font pt-5  ${inView ? 'slide-in-right' : 'opacity-0'}`}>Customization Expertise.</li>
            <li className={`pl-5 pb-3 thick-font  ${inView ? 'slide-in-left' : 'opacity-0'}`}>Durable, long-lasting furniture</li>
            <li className={`pl-5 pb-3 thick-font  ${inView ? 'slide-in-right' : 'opacity-0'}`}>Luxurious look at budget price</li>
            <li className={`pl-5 pb-3 thick-font  ${inView ? 'slide-in-left' : 'opacity-0'}`}>Premium Product Finish</li>
            <li className={`pl-5 pb-3 thick-font  ${inView ? 'slide-in-right' : ''}`}>Prioritize comfort</li>
            <li className={`pl-5 pb-3 thick-font  ${inView ? 'slide-in-left' : 'opacity-0'}`}>Attention to Detail</li>
            <li className={`pl-5 pb-3 thick-font  ${inView ? 'slide-in-right' : 'opacity-0'}`}>0% down payment available.</li>
          </ul>
        </div>
      </div>

      <div className="my-10 mx-4">
        <video width="500px" controls>
          <source src={furnitureVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

export default VideoSection;
