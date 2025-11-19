'use client';
import React from 'react';
import FilterBar from './FilterBar';
import ContentTable from './ContentTable.jsx';
import Pagination from './Pagination';
import ContentModal from './ContentModal';


export default function ContentManagement() {
  return (
    <div className="bg-[#17191A] rounded-lg text-white p-6 min-h-screen">
      {/* Filter Bar */}
      <FilterBar />

      {/* Content Table */}
      <div className=" rounded-lg overflow-hidden border border-[#333]">
        <ContentTable />
      </div>

      {/* Pagination */}
      <Pagination />

      {/* Modal */}
      <ContentModal />
    </div>
  );
}