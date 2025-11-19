'use client';
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useContentStore } from '@/lib/store';

export default function FilterBar() {
  const { searchTerm, setSearchTerm, filterType, setFilterType } = useContentStore();

  return (
    <div className="flex justify-between items-center mb-6 gap-4">
      <h2 className="text-xl font-semibold text-white">Manage content</h2>
      
      <div className="flex items-center gap-4">
        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-[#2a2a2a] text-white border border-[#444] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00C1C9] appearance-none cursor-pointer pr-8"
          >
            <option value="all">All Videos</option>
            <option value="video">Videos</option>
            <option value="short">Shorts</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Search Input */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-[#2a2a2a] text-white border border-[#444] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00C1C9] w-48"
          />
        </div>

        {/* Settings Icon */}
        {/* <button className="p-2 hover:bg-[#333] rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"></circle>
            <path d="M12 1v6m0 6v4"></path>
            <circle cx="12" cy="19" r="1"></circle>
            <path d="M4.22 4.22l4.24 4.24m0 5.08l-4.24 4.24"></path>
            <circle cx="4" cy="4" r="1"></circle>
            <path d="M19.78 19.78l-4.24-4.24m0-5.08l4.24-4.24"></path>
            <circle cx="20" cy="20" r="1"></circle>
          </svg>
        </button> */}
      </div>
    </div>
  );
}