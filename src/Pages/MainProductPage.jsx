import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageSlider from '../Component/ProductImageSlider.jsx';
import ProductDetail from '../Component/ProductDetail.jsx';
import SimilarProduct from '../Component/SimilarProduct.jsx';
import { ProductProvider, useProduct } from '../context/ProductProvider.jsx';
import { FaSpinner } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const MainProductPage = () => {
  const { productId } = useParams();
  const { getProductById, loading, getProductWithSimilarCategory } = useProduct();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isSimilarProductsOpen, setIsSimilarProductsOpen] = useState(false);

  // FIXED: Removed function dependencies to prevent infinite re-renders
  useEffect(() => {
    if (!loading) {
      const fetchedProduct = getProductById(productId);
      setProduct(fetchedProduct);
      if (fetchedProduct) {
        const similarProducts = getProductWithSimilarCategory(productId);
        setSimilarProducts(similarProducts);
      }
    }
  }, [productId, loading]); // Only depend on productId and loading

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2 thick-font">Product Not Found</h2>
        <p className="text-gray-500 thick-font">Sorry, the product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen pb-[140px] md:pb-0">
      {/* Main Product Content */}
      <div className="md:grid md:grid-cols-2 mb-8 md:mb-12">
        <div className="show">
         <ProductImageSlider slides={product.images} />
        </div>
        <ProductDetail detail={product} />
      </div>
      
      {/* Similar Products Accordion - Fixed at bottom on mobile */}
      {similarProducts.length > 0 && (
        <div className={`fixed bottom-[70px] left-0 right-0 z-40 md:relative md:bottom-auto md:z-auto md:mt-8`}>
          {/* Accordion Header */}
          <button
            onClick={() => setIsSimilarProductsOpen(!isSimilarProductsOpen)}
            className="w-full flex items-center justify-between px-4 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-customGreen via-[#597D73] to-customGreen rounded-t-3xl md:rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_-6px_25px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <h1 className="text-white thick-font md:text-4xl text-base font-extrabold drop-shadow-lg"> Similar Products </h1>
              <span className="text-xs md:text-sm text-white/90 thick-font bg-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                {similarProducts.length}
              </span>
            </div>
            <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
              {isSimilarProductsOpen ? (
                <ChevronDownIcon className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300 transform rotate-180" />
              ) : (
                <ChevronUpIcon className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300" />
              )}
            </div>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isSimilarProductsOpen 
                ? 'max-h-[2000px] opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-white rounded-b-2xl shadow-2xl border-t-4 border-customGreen/20">
              <div className="flex overflow-x-auto py-6 pb-6 px-4 md:px-8 gap-4 scrollbar-hide">
                {similarProducts.map((simproduct) => (
                  <SimilarProduct key={simproduct.id} similar={simproduct} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Price and Inquire Button Section - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-gradient-to-br from-white via-gray-50/95 to-white backdrop-blur-md shadow-[0_-4px_25px_rgba(0,0,0,0.2)] flex flex-row items-center justify-between px-4 md:px-12 py-4 md:py-5 z-50 md:relative md:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:mt-12 md:mb-8 md:rounded-2xl md:bg-white">
        <div className="flex flex-col">
          <p className="text-[11px] md:text-[12px] sthick-font text-gray-500 mb-0.5"> Total Price </p>
          <p className="text-lg md:text-2xl thick-font text-gray-800 whitespace-nowrap font-extrabold"> Rs {product.price}</p>
        </div>
        <button 
          onClick={() => {
            const phoneNumber = "6355617070";
            const message = encodeURIComponent(`Hi Luxury Collection, I am interested in product ID: ${product.id} whose price is ${product.price}. I want to arrange meeting with you.`);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
          }}
          className="h-[45px] md:h-[50px] px-6 md:px-8 bg-gradient-to-r from-customGreen to-[#4a6b64] text-white thick-font rounded-xl md:rounded-2xl hover:from-[#4a6b64] hover:to-customGreen transition-all shadow-lg hover:shadow-xl active:scale-95 text-sm md:text-base font-bold"
        >
          Inquire now
        </button>
      </div>
    </section>
  );
};

export default MainProductPage;
