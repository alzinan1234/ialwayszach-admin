// components/EarningsTable.js
"use client";

import { useState, useEffect } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// New dummy data to match the screenshot, expanded for pagination
const dummyTransactions = Array.from({ length: 300 }).map((_, i) => ({
  id: i,
  transactionId: `TXN#2025${i}`, // Made ID unique for better filtering
  name: "Nothing Studio",
  plan: "Premium Monthly",
  date: "Aug. 13, 2023",
  status: "Success",
  amount: 150,
  avatarUrl: "/avatars/avatar-1.png", // Added avatar URL
}));

const itemsPerPage = 10;

export default function EarningsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = dummyTransactions.filter((item) =>
    item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.amount).includes(searchTerm)
  );
  
  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleView = (transaction) => {
    alert(`Viewing transaction: ${transaction.transactionId}`);
  };

  return (
    <>
      {/* --- ADDED SECTION: Title and Search Bar --- */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Earnings</h2>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
      {/* --- END ADDED SECTION --- */}

      <div className="bg-[#1E1E1E] text-white p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[#2A2A2A] text-white">
                <th className="py-3 px-4 font-medium">Transaction ID</th>
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Plan</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700">
                    <td className="py-4 px-4">{item.transactionId}</td>
                    <td className="py-4 px-4">
                      {/* --- MODIFIED SECTION: Added Avatar --- */}
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.avatarUrl}
                          alt=" Avatar"
                          width={28}
                          height={28}
                          className="rounded-full object-cover"
                        />
                        <span>{item.name}</span>
                      </div>
                      {/* --- END MODIFIED SECTION --- */}
                    </td>
                    <td className="py-4 px-4">{item.plan}</td>
                    <td className="py-4 px-4">{item.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{item.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">${item.amount}</td>
                    <td className="py-4 px-4 text-center">
                      <button onClick={() => handleView(item)}>
                        <Eye className="text-blue-500 cursor-pointer" size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                 <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-400">
                        No transactions found.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {paginatedData.length > 0 && (
        <div className="flex justify-end items-center mt-6 gap-2 text-sm text-white">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center border border-gray-600 rounded-full justify-center hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Your pagination logic here... */}
          {Array.from({ length: totalPages }).slice(0, 4).map((_, index) => {
              const pageNumber = index + 1;
              return (
                 <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageNumber ? 'bg-[#DDEC00] text-black font-bold' : 'hover:bg-gray-700'}`}>{pageNumber}</button>
              )
          })}
          {totalPages > 5 && <span className="px-1 text-gray-400">...</span>}
          {totalPages > 4 && <button onClick={() => handlePageChange(totalPages)} className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === totalPages ? 'bg-[#DDEC00] text-black font-bold' : 'hover:bg-gray-700'}`}>{totalPages}</button>}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center border border-gray-600 rounded-full justify-center hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </>
  );
}