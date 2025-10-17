// app/transactions/[id]/page.js
'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- Mock Data ---
// In a real application, you would fetch this data from an API
// using the `params.id` from the page props.
const getTransactionDetails = (id) => {
  // This is where you'd make an API call, e.g., fetch(`/api/transactions/${id}`)
  // For now, we'll return a static object that matches the image.
  return {
    id: id,
    userName: "Sunan Rahman",
    email: "abc@example.com",
    avatarUrl: "/avatars/avatar-user.png", // Make sure this image exists in your public/avatars folder
    status: "Success",
    plan: "Premium Monthly",
    transactionId: "TXN#20259",
    accountHolder: "Jane Cooper",
    accountNumber: "**** **** *456",
    detectPercentage: "$100", // The image shows this label with a dollar value
    finalAmount: "$150",
    date: "Aug 13, 2023",
  };
};


export default function TransactionDetailsPage({ params }) {
  const router = useRouter();
  const transaction = getTransactionDetails(params.id);

  if (!transaction) {
    return <div>Transaction not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#17191A] flex items-center justify-center p-4">
      <div className="relative bg-[#2A2A2A] text-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        {/* Close Button */}
        <button
          onClick={() => router.back()} // Go back to the previous page
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* User Info Section */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src={transaction.avatarUrl}
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full object-cover mb-4 border-2 border-gray-600"
          />
          <h1 className="text-2xl font-bold text-yellow-300">{transaction.userName}</h1>
          <p className="text-sm text-white mb-3">{transaction.email}</p>
          <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
            {transaction.status}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-white mb-1">Plan</p>
            <h3 className="text-lg font-semibold">{transaction.plan}</h3>
          </div>
          <div>
            <p className="text-sm text-white mb-1">Transaction ID</p>
            <h3 className="text-lg font-semibold">{transaction.transactionId}</h3>
          </div>
          <div>
            <p className="text-sm text-white mb-1">A/C holder name</p>
            <h3 className="text-lg font-semibold">{transaction.accountHolder}</h3>
          </div>
          <div>
            <p className="text-sm text-white mb-1">A/C number</p>
            <h3 className="text-lg font-semibold">{transaction.accountNumber}</h3>
          </div>
           <div>
            <p className="text-sm text-white mb-1">Detect Percentage</p>
            <h3 className="text-lg font-semibold">{transaction.detectPercentage}</h3>
          </div>
          <div>
            <p className="text-sm text-white mb-1">Final Amount:</p>
            <h3 className="text-lg font-semibold">{transaction.finalAmount}</h3>
          </div>
          <div>
            <p className="text-sm text-white mb-1">Date</p>
            <h3 className="text-lg font-semibold">{transaction.date}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}