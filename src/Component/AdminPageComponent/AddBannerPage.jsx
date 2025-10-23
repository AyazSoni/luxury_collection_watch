// src/components/admin/BannerUpload.jsx
import React, { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { FaArrowLeft  , FaSpinner} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { uploadBanner, getCurrentBannerData, deleteCurrentBanner } from '../../Firebase.jsx';
import { useProduct } from '../../context/ProductProvider.jsx';

const BannerUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [currentBanner, setCurrentBanner] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { products, fetchProducts } = useProduct();

  useEffect(() => {
    const fetchData = async () => {
      try{
        // Fetch current banner data
        const bannerData = await getCurrentBannerData();
        if (bannerData) {
          setCurrentBanner(bannerData);
          setTitle(bannerData.title || '');
          setDescription(bannerData.description || '');
          setSelectedProductId(bannerData.productId || '');
        }

        // Fetch products for selector
        if (products.length === 0) {
          await fetchProducts('latest');
        }
      }catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const goBack = () => navigate(-1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    try{
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError('');
      setSuccess('');
      setLoading(true)
    }} catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError('Banner title is required.');
      return;
    }

    if (!description.trim()) {
      setError('Banner description is required.');
      return;
    }

    if (!selectedFile && !currentBanner) {
      setError('Please select a banner image.');
      return;
    }

    try {
      setLoading(true);

      // Prepare banner data
      const bannerData = {
        title: title.trim(),
        description: description.trim(),
        productId: selectedProductId || null
      };

      // If new file is selected, delete old banner and upload new one
      if (selectedFile) {
        await deleteCurrentBanner();
        const url = await uploadBanner(selectedFile, bannerData);
        setCurrentBanner({ imageUrl: url, ...bannerData });
        setSelectedFile(null);
        setPreview('');
      } else {
        // Update metadata only (no new image)
        const url = await uploadBanner(null, bannerData);
        setCurrentBanner({ imageUrl: url || currentBanner.imageUrl, ...bannerData });
      }

      // Clear cached banner data so frontend gets fresh data
      sessionStorage.removeItem('cachedBannerData');
      sessionStorage.removeItem('cachedBannerURL');

      setError('');
      setSuccess('Banner updated successfully!');
    } catch (error) {
      setError('Error uploading banner. Please try again.');
      console.error(error);
    }finally {
      setLoading(false);
    }
  };
return (
  <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
    {!success ? (
      <div>
        <button onClick={goBack}>
          <FaArrowLeft className="text-2xl text-black m-4 absolute z-10 translate-y-[-45px] translate-x-[-15px]" />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center mt-2">Admin Banner Upload</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="text-4xl animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            {currentBanner && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 md:text-3xl">Current Banner:</h3>
                <img src={currentBanner.imageUrl} alt="Current Banner" className="w-full rounded-lg shadow-md" />
                {currentBanner.title && <p className="mt-2 text-gray-700 font-semibold">Title: {currentBanner.title}</p>}
                {currentBanner.description && <p className="text-gray-600">Description: {currentBanner.description}</p>}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Banner Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter banner title"
                  required
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Banner Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter banner description"
                  rows="3"
                  required
                ></textarea>
              </div>

              {/* Product Selector */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Link to Product <span className="text-gray-500 text-sm">(Optional)</span>
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select a product (optional) --</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div className="flex items-center justify-center space-x-4 flex-col space-y-3">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FiUpload className="text-8xl text-gray-500 hover:text-blue-600 transition duration-300 border-dotted border-gray-500 border-2 p-5" />
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="thick-font translate-x-[-5px]">{currentBanner ? 'Change Banner Image (Optional)' : 'Select Banner Image *'}</p>
                {selectedFile && (
                  <h3 className="text-xl font-semibold mb-2 text-blue-600">File selected: {selectedFile.name}</h3>
                )}
              </div>
              {preview && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Preview:</h3>
                  <img src={preview} alt="Preview" className="w-full rounded-lg shadow-md" />
                </div>
              )}
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {currentBanner ? 'Update Banner' : 'Upload Banner'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    ) : (
      <div className="flex justify-center mt-6 flex-col">
        <div className="text-green-500 text-3xl text-center mb-4 thick-font">{success}</div>
        <button onClick={() => setSuccess('')} className="text-blue-600 hover:underline focus:outline-none">
          Back
        </button>
      </div>
    )}
  </div>
);

  
};

export default BannerUpload;
