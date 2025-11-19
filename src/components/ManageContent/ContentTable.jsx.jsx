 'use client';
import React from 'react';

import Link from 'next/link';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useContentStore } from '@/lib/store';

export default function ContentTable() {
  const { getPaginatedContents, setSelectedContent, deleteContent } = useContentStore();
  const contents = getPaginatedContents();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-[#404040]">
          <tr className="text-sm text-white">
            <th className="py-3 px-4 text-left font-medium">Serial</th>
            <th className="py-3 px-4 text-left font-medium">Creator Name</th>
            <th className="py-3 px-4 text-left font-medium">Content Title</th>
            <th className="py-3 px-4 text-left font-medium">Uploaded Date</th>
            <th className="py-3 px-4 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {contents.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-400">
                No content found
              </td>
            </tr>
          ) : (
            contents.map((content) => (
              <tr
                key={content.id}
                className="border-t border-[#333] hover:bg-[#222] transition-colors"
              >
                <td className="py-3 px-4 text-white text-sm">{content.serial}</td>
                <td className="py-3 px-4 text-white text-sm">{content.creatorName}</td>
                <td className="py-3 px-4 text-white text-sm">{content.contentTitle}</td>
                <td className="py-3 px-4 text-white text-sm">{content.uploadedDate}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center items-center gap-3">
                    {/* View Icon - Opens Modal */}
                    <button
                      onClick={() => setSelectedContent(content)}
                      className="p-1.5 text-[#00C1C9] hover:bg-[#00C1C9]/10 rounded transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>

                    {/* Delete Icon */}
                    <button
                      onClick={() => deleteContent(content.id)}
                      className="p-1.5 text-[#FF0000] hover:bg-[#FF0000]/10 rounded transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}