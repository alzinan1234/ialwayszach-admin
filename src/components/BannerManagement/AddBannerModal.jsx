'use client';
import React, { useState } from 'react';

const AddBannerModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    bannerTitle: '',
    description: '',
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting banner data:', formData, 'Image file:', imageFile);
    onSave(formData);
    setFormData({
      bannerTitle: '',
      description: '',
      imageUrl: '',
    });
    setImageFile(null);
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-lg p-8 relative shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-8 text-white">Add New Banner</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner Title */}
          <div>
            <label htmlFor="bannerTitle" className="block text-gray-300 text-sm font-medium mb-2">
              Banner Title
            </label>
            <input
              type="text"
              id="bannerTitle"
              name="bannerTitle"
              value={formData.bannerTitle}
              onChange={handleChange}
              placeholder="May 7, 2025"
              className="w-full px-4 py-3 bg-[#2a2a2a] text-white border border-[#444] rounded focus:outline-none focus:border-[#666]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter banner description"
              className="w-full px-4 py-3 bg-[#2a2a2a] text-white border border-[#444] rounded focus:outline-none focus:border-[#666] resize-none"
            ></textarea>
          </div>

          {/* Upload Banner Image */}
          <div>
            <label htmlFor="uploadBanner" className="block text-gray-300 text-sm font-medium mb-2">
              Upload Banner
            </label>
            <div className="relative w-full border-2 border-dashed border-[#555] rounded-lg bg-[#2a2a2a] hover:border-[#666] transition-colors overflow-hidden group cursor-pointer min-h-[200px]">
              <input
                type="file"
                id="uploadBanner"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="uploadBanner"
                className="flex flex-col items-center justify-center w-full h-full py-12 cursor-pointer"
              >
                {imagePreview ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Banner Preview"
                      className="max-h-48 max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                   <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span className="text-gray-400 font-medium">Upload</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 text-[#ffff] border-[0.5px] border-[rgba(232,255,183,0.29)] bg-[linear-gradient(270deg,_#282828_0%,_rgba(155,215,27,0.10)_100%)] rounded-lg font-medium transition-colors hover:opacity-95"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBannerModal;