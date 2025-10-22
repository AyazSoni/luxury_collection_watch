// src/components/admin/EditProductForm.jsx
import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { uploadImageToStorage, deleteImageFromStorage, updateProductInFirestore } from '../../Firebase.jsx';

const EditProductForm = ({ product, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
    images: []
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
      console.log(formData.images);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const goBack = () => {
    onBack();
  };

  const handleImageUpload = async (e) => {
    setLoading(true);
    try {
      const files = Array.from(e.target.files);
      const imageUrls = await Promise.all(files.map(file => uploadImageToStorage(file, setUploadProgress)));
      setFormData({
        ...formData,
        images: [...formData.images, ...imageUrls]
      });} catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleImageDelete = async (index) => {
    setLoading(true);
    try {
      const imageUrl = formData.images[index];
      await deleteImageFromStorage(imageUrl);
      const updatedImages = formData.images.filter((_, i) => i !== index);
      setFormData({
        ...formData,
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
    try {
      await updateProductInFirestore(product.id, formData);
         goBack(); 
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <button onClick={goBack}>
        <FaArrowLeft className="text-2xl text-black absolute z-10" />
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">Edit Product</h1>

       {loading && uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-6 rounded-full text-center " style={{ width: `${uploadProgress}%` }}>
            <span className="text-white text-md font-semibold thick-font translate-y-[-15px]">{Math.round(uploadProgress)}%</span>
          </div>
        </div>
      )}
      <div className="flex items-center mb-6">
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-2 md:grid-cols-5">
          {formData.images.map((image, index) => (
            <div key={index} className="relative w-20 h-20 md:w-24 md:h-24">
              <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover rounded-md" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-400 text-white rounded-full p-0.5 m-1 text-[12px]"
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
          <input type="file" multiple onChange={handleImageUpload} className="hidden" />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          >
            <option value="" disabled>Select a category</option>
            {["Men's Watches", "Women's Watches", "Glasses and Trending"].map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            placeholder="Product Name"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Product Description <span className="text-gray-500 text-sm">(Optional)</span></label>
          <textarea
            name="description"
            value={formData.description}
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
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            placeholder="Price"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
