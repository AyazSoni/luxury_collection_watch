// src/components/admin/BannerUpload.jsx
import React, { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { FaArrowLeft  , FaSpinner} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { uploadBanner, getCurrentBannerURL, deleteCurrentBanner } from '../../Firebase.jsx';

const BannerUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [currentBanner, setCurrentBanner] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentBanner = async () => {
      try{
      const url = await getCurrentBannerURL();
      setCurrentBanner(url || 'https://via.placeholder.com/600x150?text=Current+Banner');
      }catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentBanner();
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
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }

    try {
      setLoading(true);
      await deleteCurrentBanner();
      const url = await uploadBanner(selectedFile);
      setCurrentBanner(url);
      setSelectedFile(null);
      
      setPreview('');
      setError('');
      setSuccess('Banner uploaded successfully!');
    } catch (error) {
      setError('Error uploading banner. Please try again.');
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
                <img src={currentBanner} alt="Current Banner" className="w-full rounded-lg shadow-md" />
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <p className="thick-font translate-x-[-5px]">Select new Banner</p>
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
                  Upload Banner
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
