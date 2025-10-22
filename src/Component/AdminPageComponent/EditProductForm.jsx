// src/components/admin/EditProductForm.jsx
import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { uploadImageToStorage, deleteImageFromStorage, updateProductInFirestore } from '../../Firebase.jsx';
import { useProduct } from '../../context/ProductProvider.jsx';

const EditProductForm = ({ product, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingImage, setDeletingImage] = useState(null);
  
  const navigate = useNavigate();
  const { refreshProducts } = useProduct();

  const categories = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "glasses", label: "Glasses" }
  ];

  const [formData, setFormData] = useState({
    category: 'men', // Default to men
    name: '',
    description: '',
    price: '',
    images: [], // Existing images from database
    selectedFiles: [], // New files selected by user
    deletedImages: [], // Images marked for deletion
    trending: false
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        selectedFiles: [],
        deletedImages: []
      });
      console.log('Product loaded:', product);
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

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      selectedFiles: [...(formData.selectedFiles || []), ...files]
    });
  };

  const handleImageDelete = async (index, isExistingImage = false) => {
    if (isExistingImage) {
      // Delete existing image immediately from Supabase storage
      const imageUrl = formData.images && formData.images[index];
      if (imageUrl) {
        try {
          // Delete from Supabase storage immediately
          await deleteImageFromStorage(imageUrl);
          
          // Update form data to remove the image
          setFormData({
            ...formData,
            images: (formData.images || []).filter((_, i) => i !== index)
          });
        } catch (error) {
          console.error('Failed to delete image from storage:', error);
          setError('Failed to delete image. Please try again.');
        }
      }
    } else {
      // Remove selected file (no storage deletion needed)
      const updatedFiles = (formData.selectedFiles || []).filter((_, i) => i !== index);
      setFormData({
        ...formData,
        selectedFiles: updatedFiles
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Upload new images first
      const newImageUrls = formData.selectedFiles && formData.selectedFiles.length > 0 
        ? await Promise.all(
            formData.selectedFiles.map(file => uploadImageToStorage(file, setUploadProgress, formData))
          )
        : [];
      
      // Prepare updated product data
      const updatedProductData = {
        ...formData,
        images: [...(formData.images || []), ...newImageUrls] // Keep existing + add new
      };
      
      // Remove temporary fields
      delete updatedProductData.selectedFiles;
      delete updatedProductData.deletedImages;
      
      // Update product in Firebase
      await updateProductInFirestore(product.id, updatedProductData);
      
      // Refresh products to show the updated product
      await refreshProducts('latest');
      
      goBack(); 
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <button onClick={goBack}>
        <FaArrowLeft className="text-2xl text-black absolute z-10" />
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">Edit Product</h1>
      
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
        <label className="block text-lg font-medium text-gray-700 mb-3">Product Images</label>
        <div className="flex items-center">
          <div className="grid grid-cols-2 gap-x-[10px] gap-y-2 md:grid-cols-5">
            {/* Existing images */}
            {formData.images && formData.images.map((image, index) => (
              <div key={`existing-${index}`} className="relative w-20 h-20 md:w-24 md:h-24">
                <img src={image} alt={`Existing ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 m-1 text-[12px]"
                  onClick={() => handleImageDelete(index, true)}
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
            
            {/* Selected new files */}
            {formData.selectedFiles && formData.selectedFiles.map((file, index) => (
              <div key={`selected-${index}`} className="relative w-20 h-20 md:w-24 md:h-24">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`New ${index + 1}`} 
                  className="w-full h-full object-cover rounded-md" 
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 m-1 text-[12px]"
                  onClick={() => handleImageDelete(index, false)}
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
                  checked={formData.category === category.value}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
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

        <div className="flex items-center">
          <input
            type="checkbox"
            name="trending"
            checked={formData.trending}
            onChange={(e) => setFormData({
              ...formData,
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
