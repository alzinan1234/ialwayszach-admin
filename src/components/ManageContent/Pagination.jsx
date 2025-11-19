'use client';
import React from 'react';
import { useContentStore } from '@/lib/store';

export default function Pagination() {
  const { currentPage, setCurrentPage, getTotalPages } = useContentStore();
  const totalPages = getTotalPages();

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-end items-center mt-6 gap-2">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M6.99995 13C6.99995 13 1.00001 8.58107 0.999999 6.99995C0.999986 5.41884 7 1 7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {renderPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
              currentPage === num
                ? 'bg-[#DDEC00] text-black'
                : 'border border-gray-600 text-white hover:bg-[#333]'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M1.00005 1C1.00005 1 6.99999 5.41893 7 7.00005C7.00001 8.58116 1 13 1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}