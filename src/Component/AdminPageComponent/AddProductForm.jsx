import React, { useState } from 'react';
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { uploadImageToStorage, addProductToFirebase, deleteImageFromStorage } from '../../Firebase.jsx';

const AddProductForm = () => {
  const categories = [
    "Men's Watches", "Women's Watches", "Glasses and Trending"
  ];

  const navigate = useNavigate();

  const initialProductState = {
    category: '',
    name: '',
    description: '',
    price: '',
    images: [] ,
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

  const handleImageUpload = async (e) => {
    setLoading(true);
    try {
      const files = Array.from(e.target.files);
      const imageUrls = await Promise.all(files.map(file => uploadImageToStorage(file, setUploadProgress)));
      setProduct({
        ...product,
        images: [...product.images, ...imageUrls]
      });
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setUploadProgress(0);  // Reset progress after upload is done
    }
  };

  const handleImageDelete = async (index) => {
    setLoading(true);
    try {
      const imageUrl = product.images[index];
      await deleteImageFromStorage(imageUrl);
      const updatedImages = product.images.filter((_, i) => i !== index);
      setProduct({
        ...product,
        images: updatedImages
      });
    } catch (err) {
      setError('Failed to delete image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addProductToFirebase(product);
      setSuccess(true);
      setProduct(initialProductState);
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl font-bold text-center mb-6 mt-4">Add Product in Your <span className="thick-font text-3xl whitespace-nowrap text-customGreen">Zara Furniture</span> Shop</h1>

         {loading && uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-6 rounded-full text-center " style={{ width: `${uploadProgress}%` }}>
            <span className="text-white text-md font-semibold thick-font translate-y-[-15px]">{Math.round(uploadProgress)}%</span>
          </div>
        </div>
      )}
          <div className="flex items-center mb-6">
            <div className="grid grid-cols-2 gap-x-[10px] gap-y-2 md:grid-cols-5">
              {product.images.map((image, index) => (
                <div key={index} className="relative w-20 h-20 md:w-24 md:h-24">
                    <>
                      <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover rounded-md" />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 text-[12px] m-1"
                        onClick={() => handleImageDelete(index)}
                      >
                        <IoMdClose />
                      </button>
                    </>
                  
                </div>
              ))}
            </div>
            <label className="flex flex-col items-center justify-center w-24 h-24 bg-gray-100 text-gray-700 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 m-2 min-w-24">
              <span className="text-xl thick-font">+</span>
              <span className="text-sm thick-font">Add Image</span>
              <input type="file" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                placeholder="Product Name"
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
              <label className="block text-lg font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                placeholder="Price"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Add Product'}
              </button>
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


