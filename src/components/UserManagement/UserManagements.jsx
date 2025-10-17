'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link'; // Import Link for Next.js navigation
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline'; // For Ban Modal X icon
import { Trash2 } from 'lucide-react';

// --- MOCK DATA FOR DEMO PURPOSES ---
const initialUsers = new Array(35).fill(null).map((_, i) => ({
  id: `rpt_00${i + 1}`,
  name: `AlexTV ${i + 1}`,
  email: `alex${i + 1}@example.com`,
  date: `12 Jan 2024`,
  avatar: 'https://placehold.co/40x40/cccccc/000000?text=A',
  userType: i % 2 === 0 ? 'Creator' : 'User',
  status: i % 7 === 0 ? 'blocked' : 'active',
  // Details for creators:
  videos: i % 2 === 0 ? 42 : undefined,
  shorts: i % 2 === 0 ? 12 : undefined,
  subscribers: i % 2 === 0 ? `${(4.3 + i/10).toFixed(1)} K` : undefined,
  revenue: i % 2 === 0 ? `$${(1500 + i*10.90).toFixed(2)}` : undefined
}));

// --- Ban/Unban Confirmation Modal (Kept for action button functionality) ---
function BanUserModal({ user, onClose, onConfirm }) {
  const isBanning = user.status === 'active';
  const actionText = isBanning ? 'Ban' : 'Unblock';

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-[#343434] rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 relative text-white">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors">
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="text-center py-4">
          <Trash2 size={40} className={`mx-auto mb-4 ${isBanning ? 'text-[#FF0000]' : 'text-[#00C1C9]'}`} />
          <h3 className="text-xl font-semibold mb-2">{actionText} User Confirmation</h3>
          <p className="text-gray-400 mb-6">
            Are you sure you want to {actionText.toLowerCase()} **{user.name}**?
            This action can be reversed.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-[#444444] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(user.id)}
              className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
                isBanning
                  ? 'bg-[#FF0000] hover:bg-[#cc0000] text-white'
                  : 'bg-[#00C1C9] hover:bg-teal-700 text-white'
              }`}
            >
              Yes, {actionText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// --- MAIN COMPONENT ---
const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUsers, setCurrentUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [userToBan, setUserToBan] = useState(null);
  const itemsPerPage = 7;

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return currentUsers;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return currentUsers.filter(user =>
      user.name.toLowerCase().includes(lowerSearchTerm) ||
      user.email.toLowerCase().includes(lowerSearchTerm) ||
      user.id.toLowerCase().includes(lowerSearchTerm) ||
      user.userType.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm, currentUsers]);

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsersDisplayed = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Ban/Unblock Handlers
  const handleBanToggleRequest = (userId) => {
    const user = currentUsers.find(u => u.id === userId);
    setUserToBan(user);
  };

  const handleBlockToggleConfirm = (userId) => {
    setCurrentUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
          : user
      )
    );
    setUserToBan(null);
  };

  // Function to render page numbers dynamically
  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Simplified rendering logic for brevity
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return pageNumbers.map((num) => (
      <button 
        key={num}
        onClick={() => handlePageChange(num)}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
          currentPage === num ? 'bg-[#DDEC00] text-black' : 'hover:bg-[#1f1f1f] text-white border border-transparent'
        } ${num !== 1 && num !== totalPages && num !== currentPage ? 'border-gray-700' : ''}`}
      >
        {num}
      </button>
    ));
  };


  return (
    <>
      <div className="bg-[#17191A] rounded-lg text-white p-6 min-h-[500px] flex flex-col">
        {/* Header (Removed Job Titles Button) */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 bg-[#F3FAFA1A] rounded-lg border-[1px] border-[#0000001A] text-sm focus:outline-none focus:ring-1 focus:ring-[#6999FF] w-full md:w-64 transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#535353]">
              <tr className="text-sm text-white">
                <th className="py-3 px-4 text-center">User ID</th>
                <th className="py-3 px-4 text-center">Name</th>
                <th className="py-3 px-4 text-center">Email</th>
                <th className="py-3 px-4 text-center">User Type</th>
                <th className="py-3 px-4 text-center">Joined Date</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsersDisplayed.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-400 border-b border-gray-600">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                currentUsersDisplayed.map((user) => (
                  <tr key={user.id} className="text-sm text-white  transition-colors">
                    <td className="py-3 px-4 text-center border-b border-gray-600">{user.id}</td>
                    <td className="py-3 px-4 text-center border-b border-gray-600">
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src={user.avatar}
                          alt="avatar"
                          width={24}
                          height={24}
                          className="rounded-full"
                          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/24x24/cccccc/000000?text=A" }}
                        />
                        {user.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center border-b border-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-center border-b border-gray-600">
                      <div className="flex text-[12px] items-center justify-center gap-2 bg-[#4BB54B1A] w-max px-2 py-1 rounded-full mx-auto">
                        <div className={`w-2 h-2 rounded-full ${
                          user.userType === 'Creator' 
                            ? 'bg-[#FFD700]' 
                            : 'bg-gray-300'
                        }`}></div>
                        <span
                          className={`font-semibold ${
                            user.userType === 'Creator' 
                              ? 'text-[#FFD700]' 
                              : 'text-gray-300'
                          }`}
                        >
                          {user.userType}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center border-b border-gray-600">{user.date}</td>
                    <td className="py-3 px-4 text-center border-b border-gray-600">
                      <div className="flex justify-center items-center gap-4">
                        {/* Link to the dynamic details page */}
                        <Link href={`/admin/user-management/${user.id}`} passHref legacyBehavior>
                            <p
                                className="p-2 rounded-full cursor-pointer hover:bg-[#6999FF]/10 transition-colors flex items-center justify-center"
                                title="View Details"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="17" viewBox="0 0 22 17" fill="none" className="text-[#6999FF]">
  <path d="M20.294 7.74494C20.598 8.17126 20.75 8.38442 20.75 8.69995C20.75 9.01549 20.598 9.22865 20.294 9.65497C18.9279 11.5705 15.4392 15.7 10.75 15.7C6.06078 15.7 2.5721 11.5705 1.20604 9.65497C0.902014 9.22865 0.75 9.01549 0.75 8.69995C0.75 8.38442 0.902013 8.17126 1.20604 7.74494C2.5721 5.82939 6.06078 1.69995 10.75 1.69995C15.4392 1.69995 18.9279 5.82939 20.294 7.74494Z" stroke="currentColor" stroke-width="1.5"/>
  <path d="M13.75 8.69995C13.75 7.0431 12.4069 5.69995 10.75 5.69995C9.09315 5.69995 7.75 7.0431 7.75 8.69995C7.75 10.3568 9.09315 11.7 10.75 11.7C12.4069 11.7 13.75 10.3568 13.75 8.69995Z" stroke="currentColor" stroke-width="1.5"/>
</svg>
                            </p>
                        </Link>
                        <button
                          onClick={() => handleBanToggleRequest(user.id)}
                          className={`p-2 rounded-full cursor-pointer hover:bg-opacity-80 transition-colors tooltip-container ${
                            user.status === 'blocked'
                              ? ' hover:bg-green-600/20'
                              : ' hover:bg-[#B20000]/30'
                          }`}
                          title={user.status === 'blocked' ? 'Unblock User' : 'Ban User'}
                        >
                          {user.status === 'blocked' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none" className="text-green-500">
                              <path d="M11.75 21.7H5.34087C3.79549 21.7 2.56631 20.948 1.46266 19.8965C-0.796635 17.7441 2.9128 16.0239 4.32757 15.1815C6.72679 13.7529 9.59251 13.3575 12.25 13.9951" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.25 6.19995C15.25 8.68523 13.2353 10.7 10.75 10.7C8.26472 10.7 6.25 8.68523 6.25 6.19995C6.25 3.71467 8.26472 1.69995 10.75 1.69995C13.2353 1.69995 15.25 3.71467 15.25 6.19995Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M14.8 15.75L19.7 20.65M20.75 18.2C20.75 16.267 19.183 14.7 17.25 14.7C15.317 14.7 13.75 16.267 13.75 18.2C13.75 20.1329 15.317 21.7 17.25 21.7C19.183 21.7 20.75 20.1329 20.75 18.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="hidden"/>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none" className="text-[#FF0000]">
                              <path d="M11.75 21.7H5.34087C3.79549 21.7 2.56631 20.948 1.46266 19.8965C-0.796635 17.7441 2.9128 16.0239 4.32757 15.1815C6.72679 13.7529 9.59251 13.3575 12.25 13.9951" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.25 6.19995C15.25 8.68523 13.2353 10.7 10.75 10.7C8.26472 10.7 6.25 8.68523 6.25 6.19995C6.25 3.71467 8.26472 1.69995 10.75 1.69995C13.2353 1.69995 15.25 3.71467 15.25 6.19995Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M14.8 15.75L19.7 20.65M20.75 18.2C20.75 16.267 19.183 14.7 17.25 14.7C15.317 14.7 13.75 16.267 13.75 18.2C13.75 20.1329 15.317 21.7 17.25 21.7C19.183 21.7 20.75 20.1329 20.75 18.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center mt-6 gap-2 text-sm text-white">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:bg-[#1f1f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M6.99995 13C6.99995 13 1.00001 8.58107 0.999999 6.99995C0.999986 5.41884 7 1 7 1" stroke="#E2E2E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:bg-[#1f1f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1.00005 1C1.00005 1 6.99999 5.41893 7 7.00005C7.00001 8.58116 1 13 1 13" stroke="#C8C8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Ban/Unblock Confirmation Modal */}
      {userToBan && (
        <BanUserModal
          user={userToBan}
          onClose={() => setUserToBan(null)}
          onConfirm={handleBlockToggleConfirm}
        />
      )}
    </>
  );
};

export default UserManagement;