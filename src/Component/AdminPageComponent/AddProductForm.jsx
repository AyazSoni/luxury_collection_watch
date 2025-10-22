import React, { useState } from 'react';
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { uploadImageToStorage, addProductToFirebase, deleteImageFromStorage } from '../../Firebase.jsx';
import { useProduct } from '../../context/ProductProvider.jsx';

const AddProductForm = () => {
  const categories = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "glasses", label: "Glasses" }
  ];

  const navigate = useNavigate();
  const { refreshProducts } = useProduct();

  const initialProductState = {
    category: 'men', // Default to men
    name: '',
    description: '',
    price: '',
    images: [] ,
    selectedFiles: [], // Store selected files temporarily
    trending: false,
    createdAt: new Date()
  };

  const [product, setProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);  // New state for tracking upload progress

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    setProduct({
      ...product,
      selectedFiles: [...product.selectedFiles, ...files]
    });
  };

  const handleImageDelete = (index) => {
    const updatedFiles = product.selectedFiles.filter((_, i) => i !== index);
    setProduct({
      ...product,
      selectedFiles: updatedFiles
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation: Check required fields
    if (!product.name.trim()) {
      setError('Product name is required.');
      setLoading(false);
      return;
    }

    if (!product.price.trim()) {
      setError('Product price is required.');
      setLoading(false);
      return;
    }

    if (product.selectedFiles.length === 0) {
      setError('At least one product image is required.');
      setLoading(false);
      return;
    }

    try {
      // Upload images first
      const imageUrls = await Promise.all(
        product.selectedFiles.map(file => uploadImageToStorage(file, setUploadProgress, product))
      );
      
      // Create product data with uploaded image URLs
      const productData = {
        ...product,
        images: imageUrls
      };
      
      // Remove selectedFiles from the data before saving
      delete productData.selectedFiles;
      
      await addProductToFirebase(productData);
      
      // Refresh products to show the new product
      await refreshProducts('latest');
      
      setSuccess(true);
      setProduct(initialProductState);
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const goBack = () => navigate(-1);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">

      {!success ? (
        <div>
          <button onClick={goBack}>
            <FaArrowLeft className="text-2xl text-black absolute z-10 translate-y-[-25px]" />
          </button>
          <h1 className="text-2xl font-bold text-center mb-6 mt-4">Add Product in Your <span className="thick-font text-3xl whitespace-nowrap text-customGreen">Luxury Collection</span> Shop</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

         {loading && uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-6 rounded-full text-center " style={{ width: `${uploadProgress}%` }}>
            <span className="text-white text-md font-semibold thick-font translate-y-[-15px]">{Math.round(uploadProgress)}%</span>
          </div>
        </div>
      )}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-3">Product Images <span className="text-red-500">*</span></label>
            <div className="flex items-center">
              <div className="grid grid-cols-2 gap-x-[10px] gap-y-2 md:grid-cols-5">
                {product.selectedFiles.map((file, index) => (
                  <div key={index} className="relative w-20 h-20 md:w-24 md:h-24">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Selected ${index + 1}`} 
                      className="w-full h-full object-cover rounded-md" 
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 text-[12px] m-1"
                      onClick={() => handleImageDelete(index)}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                ))}
              </div>
              <label className="flex flex-col items-center justify-center w-24 h-24 bg-gray-100 text-gray-700 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 m-2 min-w-24">
                <span className="text-xl thick-font">+</span>
                <span className="text-sm thick-font">Add Image</span>
                <input type="file" multiple onChange={handleImageSelection} className="hidden" />
              </label>
            </div>
            {product.selectedFiles.length === 0 && (
              <p className="text-sm text-red-500 mt-2">At least one image is required</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">Category</label>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={product.category === category.value}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Product Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                placeholder="Product Name"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Product Description <span className="text-gray-500 text-sm">(Optional)</span></label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                placeholder="Product Description (Optional)"
              ></textarea>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Price <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                placeholder="Price"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="trending"
                checked={product.trending}
                onChange={(e) => setProduct({
                  ...product,
                  trending: e.target.checked
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-lg font-medium text-gray-700">
                Mark as Trending
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  product.name.trim() && product.price.trim() && product.selectedFiles.length > 0
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                disabled={loading || !product.name.trim() || !product.price.trim() || product.selectedFiles.length === 0}
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Add Product'}
              </button>
              {(!product.name.trim() || !product.price.trim() || product.selectedFiles.length === 0) && (
                <p className="text-sm text-gray-500 mt-2">Please fill all required fields to add product</p>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="">
          <button onClick={() => setSuccess(false)}>
            <FaArrowLeft className="text-2xl text-black absolute z-10 translate-y-[-25px]" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-center thick-font">Product Added Successfully!</h2>
            <button
              onClick={() => navigate('/admin/product-manager')}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              See All Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;


