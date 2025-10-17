// app/[id]/page.js
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// --- MOCK DATA SOURCE (MUST BE ACCESSIBLE HERE) ---
const mockUsers = new Array(35).fill(null).map((_, i) => ({
  id: `rpt_00${i + 1}`,
  name: `AlexTV ${i + 1}`,
  email: `alex${i + 1}@example.com`,
  date: `12 Jan 2024`,
  avatar: 'https://placehold.co/80x80/cccccc/000000?text=A', // Larger avatar for detail page
  userType: i % 3 === 0 ? 'Creator' : (i % 3 === 1 ? 'Service Provider' : 'User'),
  status: i % 7 === 0 ? 'blocked' : 'active',
  // Details:
  videos: i % 3 === 0 ? 42 : undefined,
  shorts: i % 3 === 0 ? 12 : undefined,
  subscribers: i % 3 === 0 ? `${(4.3 + i/10).toFixed(1)} K` : undefined,
  revenue: i % 3 === 0 ? `$${(1500 + i*10.90).toFixed(2)}` : undefined,
  jobTitle: i % 3 === 1 ? 'Plumber' : undefined,
}));

// Simulate fetching user data from the ID
const fetchUserById = (id) => {
    return mockUsers.find(user => user.id === id);
};


const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  // Fetch the specific user data
  const user = fetchUserById(userId);
  
  // Handlers
  const handleBanUser = () => {
    // In a real application, you'd send an API call here.
    // For this mock, we just log the action.
    console.log(`User ${user.name} (${userId}) has been ${user.status === 'active' ? 'BANNED' : 'UNBLOCKED'}.`);
    alert(`Action: ${user.status === 'active' ? 'BANNED' : 'UNBLOCKED'}`);

    // After action, navigate back or update UI
    router.push('/admin/user-management'); 
  };
  
  // Render loading or not found states
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1e1e1e] text-white">
        User ID {userId} not found.
      </div>
    );
  }

  const isCreator = user.userType === 'Creator';
  const actionText = user.status === 'active' ? 'Ban User' : 'Unblock User';
  const actionColor = user.status === 'active' ? 'bg-[#B200001A] border-[#FF0000] text-[#FF0000]' : 'bg-green-600/10 border-green-600 text-green-400';

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex justify-center items-center p-4">
      <div className="bg-[#343434] rounded-xl shadow-2xl w-full max-w-lg mx-auto p-8 relative text-white">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-[#00C1C9] bg-[#00C1C91A] rounded-full p-2 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Content matching the modal design */}
        <div className="flex flex-col items-center mb-6 pt-6">
          <img
            src={user.avatar}
            alt={`${user.name} avatar`}
            className="rounded-full w-20 h-20 mb-3 border-2 border-gray-500"
          />
          <h2 className="text-xl font-bold text-[#FFD700]">{user.name}</h2>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm px-4">
          <DetailItem label="User ID" value={user.id} />
          <DetailItem label="Email address" value={user.email} />
          <DetailItem label="User Type" value={user.userType} customClass="text-white" />
          <DetailItem label="Joined Date" value={user.date} />

          {/* Conditional Creator Details */}
          {isCreator && (
            <>
              <DetailItem label="Videos" value={user.videos} />
              <DetailItem label="Shorts" value={user.shorts} />
              <DetailItem label="Subscribers" value={user.subscribers} />
              <DetailItem label="Revenue" value={user.revenue} customClass="text-white" />
            </>
          )}

          {/* Conditional Service Provider Details (if applicable) */}
          {user.userType === 'Service Provider' && (
             <DetailItem label="Designation" value={user.jobTitle} isFullWidth={true} />
          )}
        </div>

        {/* Ban/Unblock Button */}
        <div className="mt-8 px-4">
          <button
            onClick={handleBanUser}
            className={`w-full py-3 font-semibold rounded-lg transition-colors border ${actionColor} hover:opacity-80`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for detail items
const DetailItem = ({ label, value, customClass = 'text-base', isFullWidth = false }) => (
    <div className={`flex flex-col ${isFullWidth ? 'col-span-2' : ''}`}>
        <span className="text-gray-400">{label}</span>
        <span className={`font-semibold ${customClass}`}>{value}</span>
    </div>
);

export default UserDetailPage;