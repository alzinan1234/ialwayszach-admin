// components/TrendingVideosTable.js
"use client"; // This is a client component, necessary for useState and event handlers

import { useState } from "react";
import { Eye, Trash2, Image as ImageIcon } from "lucide-react"; // Using lucide-react for icons
import Image from "next/image"; // Import the Next.js Image component

const dummyVideos = [
  {
    rank: "01",
    title: "Beach Vlog in Bali",
    creatorName: "Nothing Studio",
    views: "45.3K",
    id: "vid-001",
    avatarUrl: "/avatars/avatar-1.png", // Added avatar URL
  },
  {
    rank: "01",
    title: "Beach Vlog in Bali",
    creatorName: "Nothing Studio",
    views: "45.3K",
    id: "vid-002",
    avatarUrl: "/avatars/avatar-2.png", // Added avatar URL
  },
  {
    rank: "01",
    title: "Beach Vlog in Bali",
    creatorName: "Nothing Studio",
    views: "45.3K",
    id: "vid-003",
    avatarUrl: "/avatars/avatar-3.png", // Added avatar URL
  },
  {
    rank: "01",
    title: "Beach Vlog in Bali",
    creatorName: "Nothing Studio",
    views: "45.3K",
    id: "vid-004",
    avatarUrl: "/avatars/avatar-4.png", // Added avatar URL
  },
];

export default function TrendingVideosTable() {
  const [videos, setVideos] = useState(dummyVideos);

  // Action Handlers
  const handleView = (videoId) => {
    alert(`Viewing video: ${videoId}`);
    // Implement navigation or modal logic here
  };

  const handleDelete = (videoId) => {
    if (confirm(`Are you sure you want to delete this video?`)) {
      alert(`Deleting video: ${videoId}`);
      // This will filter out the deleted video from the state
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video.id !== videoId)
      );
    }
  };

  return (
    <div className="bg-[#17191A] p-4 rounded-xl shadow-lg text-white border border-[#FFFFFF80]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Top Trending Videos</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-700 text-white bg-[#FFFFFF1A]">
              <th className="py-3 px-4 font-medium">Rank</th>
              <th className="py-3 px-4 font-medium">Thumbnail</th>
              <th className="py-3 px-4 font-medium">Title</th>
              <th className="py-3 px-4 font-medium">Creator Name</th>
              <th className="py-3 px-4 font-medium">Views</th>
              <th className="py-3 px-4 font-medium text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {videos.length > 0 ? (
              videos.map((video) => (
                <tr key={video.id} className="border-b border-gray-700">
                  <td className="py-4 px-4">{video.rank}</td>
                  <td className="py-4 px-4">
                    <div className="w-10 h-10  rounded flex items-center justify-center">
                      {/* <ImageIcon className="w-5 h-5 text-white" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M3.64893 11.1636C3.64893 7.39234 3.64893 5.50672 4.8205 4.33515C5.99207 3.16357 7.87769 3.16357 11.6489 3.16357H13.6489C17.4202 3.16357 19.3058 3.16357 20.4774 4.33515C21.6489 5.50672 21.6489 7.39234 21.6489 11.1636V13.1636C21.6489 16.9348 21.6489 18.8204 20.4774 19.992C19.3058 21.1636 17.4202 21.1636 13.6489 21.1636H11.6489C7.87769 21.1636 5.99207 21.1636 4.8205 19.992C3.64893 18.8204 3.64893 16.9348 3.64893 13.1636V11.1636Z"
                          stroke="white"
                          stroke-width="2"
                        />
                        <path
                          d="M8.72217 9.67725C9.27252 9.63083 9.82511 9.73735 10.3188 9.98486C10.9106 10.2816 11.2905 10.7892 11.5952 11.3306C11.8971 11.867 12.2022 12.5829 12.5679 13.436L12.6216 13.561C12.7925 13.9597 12.8939 14.1935 12.981 14.353C12.9848 14.36 12.9892 14.3663 12.9927 14.3726C12.9987 14.3678 13.0065 14.3644 13.0132 14.3589C13.1533 14.243 13.3343 14.0641 13.6411 13.7573C14.0427 13.3558 14.3876 13.0094 14.6948 12.7505C15.0117 12.4834 15.3575 12.2479 15.7827 12.1196C16.3476 11.9493 16.9503 11.9493 17.5151 12.1196C17.9403 12.2479 18.2861 12.4834 18.603 12.7505C18.9077 13.0074 19.2496 13.3501 19.647 13.7476C19.6456 14.9102 19.6383 15.8029 19.5923 16.521L18.2427 15.1714C17.8168 14.7455 17.5408 14.471 17.314 14.2798C17.0969 14.0969 16.994 14.0516 16.938 14.0347C16.7496 13.9778 16.5482 13.9778 16.3599 14.0347C16.3039 14.0516 16.2009 14.0969 15.9839 14.2798C15.757 14.471 15.4811 14.7455 15.0552 15.1714C14.7767 15.4499 14.5179 15.7095 14.2876 15.8999C14.0547 16.0925 13.7415 16.3104 13.3315 16.3823C12.8485 16.467 12.3511 16.3708 11.9341 16.1128C11.5802 15.8937 11.3698 15.5753 11.2251 15.3101C11.0821 15.0478 10.9378 14.711 10.7827 14.3491L10.73 14.2241C10.3461 13.3284 10.0884 12.732 9.85205 12.312C9.61868 11.8973 9.48427 11.804 9.42236 11.7729C9.25777 11.6904 9.0736 11.6549 8.89014 11.6704C8.82112 11.6763 8.66124 11.7128 8.29053 12.0112C7.91516 12.3134 7.45497 12.7716 6.76611 13.4604L5.65283 14.5728C5.65003 14.147 5.64893 13.6795 5.64893 13.1636V11.7524C6.17695 11.2259 6.63099 10.7801 7.03662 10.4536C7.52075 10.0639 8.06229 9.73293 8.72217 9.67725Z"
                          fill="white"
                        />
                        <circle
                          cx="17.1489"
                          cy="7.66357"
                          r="1.5"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="py-4 px-4">{video.title}</td>
                  <td className="py-4 px-4">
                    {/* --- MODIFIED SECTION --- */}
                    <div className="flex items-center gap-3">
                      <Image
                        src={video.avatarUrl}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                      <span>{video.creatorName}</span>
                    </div>
                    {/* --- END MODIFIED SECTION --- */}
                  </td>
                  <td className="py-4 px-4">{video.views}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-3">
                      <Eye
                        className="cursor-pointer text-blue-500 hover:text-blue-400"
                        size={20}
                        onClick={() => handleView(video.id)}
                      />
                      <Trash2
                        className="cursor-pointer text-red-500 hover:text-red-400"
                        size={20}
                        onClick={() => handleDelete(video.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No videos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
