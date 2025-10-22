import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageSlider from '../Component/ProductImageSlider.jsx';
import ProductDetail from '../Component/ProductDetail.jsx';
import SimilarProduct from '../Component/SimilarProduct.jsx';
import { ProductProvider, useProduct } from '../context/ProductProvider.jsx';
import { FaSpinner } from "react-icons/fa";

const MainProductPage = () => {
  const { productId } = useParams();
  const { getProductById, loading, getProductWithSimilarCategory } = useProduct();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

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
    <section>
      <div className="md:grid md:grid-cols-2 ">
        <div className="show">
         <ProductImageSlider slides={product.images} />
        </div>

        <ProductDetail detail={product} />
      </div>
      <div className="md:mt-16">
        <h1 className="text-customGreen thick-font md:text-4xl pl-8 mb-7 text-xl"> Similar Products </h1>
        <div className="grid grid-flow-col overflow-x-scroll mb-6">
          {similarProducts.length > 0 ? (
            similarProducts.map((simproduct) => (
              <SimilarProduct key={simproduct.id} similar={simproduct} />
            ))
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProductPage;
