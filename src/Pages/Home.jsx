import React from 'react';
import Navbar from '../Component/Navbar.jsx';
import SlideComponent1 from '../Component/SlideComponent1.jsx';
import Category from '../Component/Categories.jsx';
import VideoSection from '../Component/VideoSection.jsx';
import NewestProduct from '../Component/NewestProduct.jsx';
import ProductCard from '../Component/ProductCard.jsx';
import Poster from '../Component/Poster.jsx';
import WorkProcess from '../Component/workProcess.jsx';
import Footer from '../Component/Footer.jsx';


const Home = () => {
  

  return (
    <div className="overflow-x-hidden ">
      <Navbar />
      <SlideComponent1 />
      <Category />
      <VideoSection />
      <NewestProduct />
      <ProductCard />
      <Poster />
      <WorkProcess />
      <Footer />
    </div>
 
  );
}

export default Home;
