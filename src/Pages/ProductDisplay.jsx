import React, { useMemo, useEffect } from 'react';
import ProductPageHead from "../Component/ProductPageHead.jsx";
import Navbar from '../Component/Navbar.jsx';
import CardFurniture from '../Component/CardFurniture.jsx';
import { FaSpinner } from "react-icons/fa";
import { CategoryProvider, useCategory } from '../context/CategoryProvider.jsx';
import { ProductProvider, useProduct } from '../context/ProductProvider.jsx';
import { TbSofaOff } from "react-icons/tb";

const ProductDisplay = () => {
  const { products, loading, error, hasMore, fetchProducts, getProductsByCategory  , fetchedCategories } = useProduct();
  const { selectedCategory } = useCategory();

  // Only fetch products when component mounts or category changes
  useEffect(() => {
    // This will only run when selectedCategory changes, not on every render
    const category = selectedCategory || "latest";
    console.log(fetchedCategories);
    console.log(category);
    if(!fetchedCategories[category]) {
      fetchProducts(category);
    }
  }, [selectedCategory]); // Only depend on selectedCategory to prevent infinite loops

  // Get products for the selected category using existing function
  const filteredProducts = useMemo(() => {
    return getProductsByCategory(selectedCategory || "latest");
  }, [products, selectedCategory, getProductsByCategory]);

  // Load more products for current category
  const loadMoreProducts = () => {
    const category = selectedCategory || "latest";
    if (hasMore[category] && !loading) {
      fetchProducts(category);
    }
  };

  return (
    <div>
      <Navbar />
      <ProductPageHead />
      <h1 className="text-3xl thick-font text-neutral-700 text-center mt-10 mb-[-10px] ">
        {selectedCategory ? selectedCategory : "All Products"}
      </h1>
      <div className="h-1 w-20 rounded-2xl mt-4 bg-gradient-to-r from-indigo-400 to-cyan-400 mx-auto"></div>

      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <FaSpinner className="text-4xl animate-spin" />
          <span className="ml-3 text-lg">Loading products...</span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 md:p-10 md:gap-5 justify-items-center transition-all duration-300 ease-in-out">
            {filteredProducts.length !== 0 ? (
              filteredProducts.map((product) => (
                <CardFurniture key={product.id} product={product} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-10 text-center md:translate-x-48">
                <TbSofaOff size={100} className="text-gray-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2 thick-font">Product Not Available</h2>
                <p className="text-gray-500 thick-font">Sorry, the product you are looking for is currently unavailable.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-8 mb-8">
              {console.log("category" , selectedCategory || "latest" )}
              {console.log("hasMore" , hasMore[selectedCategory || "latest"])}
              
              {hasMore[selectedCategory || "latest"] ? (
                <button
                  onClick={loadMoreProducts}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 thick-font"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Loading...
                    </div>
                  ) : (
                    "Load More Products"
                  )}
                </button>
              ) : (
                <p className="text-gray-500 thick-font">No more products to load</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDisplay;
