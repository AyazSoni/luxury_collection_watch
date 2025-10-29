import React, { useState, useMemo, useEffect } from 'react';
import { FaArrowLeft, FaSpinner, FaRegSadTear, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteProductFromFirebase, fetchProductById } from '../../Firebase.jsx';
import { useProduct } from '../../context/ProductProvider.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = ({onEdit}) => {
  const { products, loading, error, hasMore, fetchProducts, getProductsByCategory, fetchedCategories, refreshProducts } = useProduct();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const navigate = useNavigate();

  const categories = [
    'men',
    'women',
    'glasses'
  ];

  const addProduct = () => {
    navigate('/admin/add-product');
  };

  const goBack = () => navigate('/admin/');

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const resetCategoryFilter = () => {
    setSelectedCategory(null);
  };

  const toggleTrendingFilter = () => {
    setShowTrendingOnly(!showTrendingOnly);
  };

  // Fetch products when component mounts or category changes
  useEffect(() => {
    const category = selectedCategory || "latest";
    // Only fetch if category is selected and not already fetched
    if (selectedCategory && fetchedCategories && !fetchedCategories[category]) {
      fetchProducts(category);
    }
  }, [selectedCategory]);

  // Handle search by ID
  const handleSearchById = async () => {
    if (!searchId.trim()) {
      toast.error("Please enter a product ID");
      return;
    }

    setSearchLoading(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const product = await fetchProductById(searchId.trim());
      if (product) {
        setSearchResult(product);
        toast.success("Product found!");
      } else {
        setSearchError("Product not found");
        toast.error("Product not found with this ID");
      }
    } catch (err) {
      setSearchError(err.message);
      toast.error(err.message);
    } finally {
      setSearchLoading(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchId('');
    setSearchResult(null);
    setSearchError(null);
  };

  // Get products for the selected category using existing function
  const filteredProducts = useMemo(() => {
    // If searching by ID, return search result or empty array
    if (searchResult) {
      return [searchResult];
    }

    let categoryProducts = getProductsByCategory(selectedCategory || "latest");

    // Apply trending filter if enabled
    if (showTrendingOnly) {
      categoryProducts = categoryProducts.filter(product => product.trending === true);
    }

    return categoryProducts;
  }, [products, selectedCategory, showTrendingOnly, getProductsByCategory, searchResult]);

  // Load more products for current category
  const loadMoreProducts = () => {
    const category = selectedCategory || "latest";
    if (hasMore[category] && !loading) {
      fetchProducts(category);
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    setShowDialog(false);
    try {
      await deleteProductFromFirebase(productToDelete.id, productToDelete.images);
      
      // Refresh products to remove the deleted product
      await refreshProducts('latest');
      
      toast.success("Successfully deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };


  return (
    <div className="overflow-x-auto sm:overflow-hidden">
      <div className="flex gap-[100px] flex-row md:gap-[500px] md:mb-10">
        <button onClick={goBack}>
          <FaArrowLeft className="text-2xl text-black z-10 ml-1" />
        </button>
        <button className="flex" onClick={addProduct}>
          <p className="thick-font pr-4 bg-indigo-300 rounded-bl-2xl rounded-tl-2xl p-1 text-white translate-x-3 whitespace-nowrap pl-2"> Add New Product </p>
          <p className="thick-font text-2xl rounded-full bg-indigo-400 text-white w-8 h-8 text-center z-[2]">+</p>
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6 thick-font text-gray-700 my-4 md:text-5xl md:mb-12">Manage Your Product</h1>

      {/* Search by ID */}
      <div className="mb-6 md:mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 w-full md:w-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search by Product ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchById()}
                placeholder="Enter product ID..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              />
              <button
                onClick={handleSearchById}
                disabled={searchLoading}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FaSearch />
                {searchLoading ? 'Searching...' : 'Search'}
              </button>
              {searchResult && (
                <button
                  onClick={clearSearch}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition duration-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        {searchError && (
          <p className="mt-2 text-red-500 text-sm">{searchError}</p>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex overflow-x-auto mb-4 md:mb-6 p-1">
        <button onClick={resetCategoryFilter} className={`bg-gray-400 hover:bg-gray-600 font-bold py-[5px] px-3 rounded-2xl mr-2 transition duration-300 text-[13px] text-white ${selectedCategory === null && 'bg-gray-800'}`}>All</button>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => filterProductsByCategory(category)}
            className={`bg-gray-400 hover:bg-gray-600 font-bold py-[5px] px-3 text-white text-[13px] rounded-2xl mr-2 transition duration-300 whitespace-nowrap ${selectedCategory === category && 'bg-gray-800'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Trending Filter */}
      <div className="flex items-center mb-7 md:mb-12 p-1">
        <button
          onClick={toggleTrendingFilter}
          className={`font-bold py-[5px] px-4 rounded-2xl transition duration-300 text-[13px] flex items-center gap-2 ${
            showTrendingOnly
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
          }`}
        >
          <span className={showTrendingOnly ? 'text-lg' : ''}>
            {showTrendingOnly ? '⭐' : '☆'}
          </span>
          {showTrendingOnly ? 'Trending Only' : 'Show Trending'}
        </button>
      </div>

      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <FaSpinner className="text-4xl animate-spin" />
          <span className="ml-3 text-lg">Loading products...</span>
        </div>
      ) : deleteLoading ? (
        <div className="flex justify-center items-center p-10">
          <FaSpinner className="text-4xl animate-spin" />
          <span className="ml-3 text-lg">Deleting product...</span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-2 px-2 text-left">ID</th>
              <th className="py-2 px-2 text-left">Category</th>
              <th className="py-2 px-2 text-left">Name</th>
              <th className="py-2 px-2 text-left">Price</th>
              <th className="py-2 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light md:text-lg">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-600">
                  <div className="flex flex-col items-center">
                    <FaRegSadTear className="text-6xl mb-4" />
                    <p className="text-xl font-bold">No products found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 px-2 md:py-4 text-[10px] md:text-[12px] font-mono break-all">{product.id}</td>
                  <td className="py-2  px-2 md:py-4 text-[12px] ">{product.category}</td>
                  <td className="py-2 px-2">{product.name}</td>
                  <td className="py-2 px-2">{product.price}</td>
                  <td className="py-2 px-2 text-center flex flex-col gap-1 md:flex-row justify-center">
                    <button
                      onClick={() => onEdit(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-0.5 px-2 rounded-full transition duration-300 md:py-1 md:px-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(product)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-0.5 px-2 rounded-full transition duration-300 md:py-1 md:px-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center mt-8 mb-8">
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

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[5]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center mx-3">
            <h2 className="text-2xl mb-4">Are you sure you want to delete?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProductList;
