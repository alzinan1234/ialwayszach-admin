'use client';
import React, { useState } from 'react';
import { useContentStore } from '@/lib/store';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ContentModal() {
  const { selectedContent, closeModal } = useContentStore();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!selectedContent) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 "
      onClick={closeModal}
    >
      <div
        className="bg-[#2a2a2a] rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-end items-center p-4 ">
          {/* <h3 className="text-white font-semibold">Content Details</h3> */}
          <button
            onClick={closeModal}
            className="p-1 hover:bg-[#444] rounded transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 ">
          {/* Video Preview */}
          <div className="mb-6 relative bg-black rounded-lg overflow-hidden aspect-video">
            <img
              src={selectedContent.thumbnail}
              alt={selectedContent.contentTitle}
              className="w-full h-full object-cover"
            />
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors group"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs">{selectedContent.duration}</span>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-white/20 rounded">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-white/20 rounded">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-[#9BD71B] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Content Title */}
          <h2 className="text-[#DDEC00] text-center text-lg font-semibold mb-4">
            {selectedContent.contentTitle}
          </h2>

          {/* Content Stats - Two Columns */}
          <div className="grid grid-cols-2 items-center justify-center gap-6 mb-6 pl-17">
            <div>
              <p className="text-gray-400 text-sm mb-1">Serial</p>
              <p className="text-white">{selectedContent.serial}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Creator Name</p>
              <p className="text-white">{selectedContent.creatorName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Views</p>
              <p className="text-white">{selectedContent.views}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Likes</p>
              <p className="text-white">{selectedContent.likes}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Dislikes</p>
              <p className="text-white">{selectedContent.dislikes}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Comments</p>
              <p className="text-white">{selectedContent.comments}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Uploaded Date</p>
              <p className="text-white">{selectedContent.uploadedDate}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Reports</p>
              <p className="text-white">{selectedContent.reports}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#444] my-4"></div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={closeModal}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-[#333] transition-colors"
            >
              Close
            </button>
            {/* <Link
              href={`/admin/content-management/${selectedContent.id}`}
              onClick={closeModal}
              className="px-6 py-2 bg-[#00C1C9] text-white rounded-lg hover:bg-[#00a8b0] transition-colors"
            >
              View Full Details
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}