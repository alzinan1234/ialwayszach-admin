'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockContents } from '@/lib/mockData';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ContentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const content = mockContents.find(c => c.id === params.id);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!content) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg text-white p-6 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Content Not Found</h1>
        <Link
          href="/admin/content-management"
          className="px-6 py-2 bg-[#00C1C9] text-white rounded-lg hover:bg-[#00a8b0] transition-colors"
        >
          Back to Content Management
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF1A] rounded-lg text-white p-6 min-h-screen">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-[#333] rounded-lg transition-colors"
            title="Go Back"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-semibold">{content.contentTitle}</h1>
            <p className="text-gray-400 text-sm mt-1">Content ID: {content.serial}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="p-2 bg-[#00C1C9]/10 hover:bg-[#00C1C9]/20 rounded-lg transition-colors text-[#00C1C9]" title="Edit">
            <PencilIcon className="w-5 h-5" />
          </button>
          <button className="p-2 bg-[#FF0000]/10 hover:bg-[#FF0000]/20 rounded-lg transition-colors text-[#FF0000]" title="Delete">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Video Player (2 cols) */}
        <div className="col-span-2">
          <div className="bg-[#222] rounded-lg overflow-hidden border border-[#333]">
            {/* Video Preview */}
            <div className="relative bg-black aspect-video rounded-t-lg overflow-hidden">
              <img
                src={content.thumbnail}
                alt={content.contentTitle}
                className="w-full h-full object-cover"
              />
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors group"
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="mb-3">
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-[#00C1C9] rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs">{content.duration}</span>
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-white/20 rounded text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                      </svg>
                    </button>
                    <button className="p-1.5 hover:bg-white/20 rounded text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info Card */}
            <div className="p-6 border-t border-[#333]">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Creator</p>
                  <p className="text-white font-medium">{content.creatorName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Content Type</p>
                  <p className="text-white font-medium capitalize">{content.contentType}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Views</p>
                  <p className="text-white font-medium">{content.views}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Likes</p>
                  <p className="text-white font-medium">{content.likes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stats Panel (1 col) */}
        <div className="col-span-1">
          <div className="bg-[#222] rounded-lg border border-[#333] p-6">
            <h3 className="text-lg font-semibold mb-6">Content Stats</h3>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Views</p>
                <p className="text-2xl font-bold text-white">{content.views}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Likes</p>
                <p className="text-2xl font-bold text-green-400">{content.likes}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Dislikes</p>
                <p className="text-2xl font-bold text-red-400">{content.dislikes}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Comments</p>
                <p className="text-2xl font-bold text-[#00C1C9]">{content.comments}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Shares</p>
                <p className="text-2xl font-bold text-purple-400">{content.shares}</p>
              </div>

              <div className="border-t border-[#444] pt-4 mt-4">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Reports</p>
                <p className="text-2xl font-bold text-orange-400">{content.reports}</p>
              </div>

              <div className="border-t border-[#444] pt-4 mt-4">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Uploaded Date</p>
                <p className="text-white text-sm">{content.uploadedDate}</p>
              </div>

              <div className="border-t border-[#444] pt-4 mt-4">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Status</p>
                <p className={`text-sm font-medium capitalize ${
                  content.status === 'published' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {content.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-6 bg-[#222] rounded-lg border border-[#333] p-6">
        <h3 className="text-lg font-semibold mb-4">Description</h3>
        <p className="text-gray-300 leading-relaxed">{content.description}</p>
      </div>

      {/* Back Button */}
      <div className="flex gap-3 justify-end mt-6">
        <Link
          href="/admin/content-management"
          className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-[#333] transition-colors"
        >
          Back
        </Link>
        <button className="px-6 py-2 bg-[#00C1C9] text-white rounded-lg hover:bg-[#00a8b0] transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}