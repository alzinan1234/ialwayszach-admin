"use client";

import React from "react";
import Image from "next/image";

const BannerCard = ({ banner }) => {
  return (
    <div className="  relative w-full max-w-sm md:h-[249px] rounded-[42px] overflow-hidden shadow-lg text-white">
      {/* Background Image */}
      <Image
        src={banner.imageUrl || "https://via.placeholder.com/400x200"}
        alt={banner.title}
        fill
        className=" w-full h-full"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#00000080]  p-4 flex flex-col justify-end rounded-2xl">
       <div className=" mb-40 ">
         <h3 className="text-lg font-semibold ">{banner.title}</h3>
        <p className="text-sm text-white">{banner.description}</p>

   
       </div>

        {/* Location */}
       

        {/* Optional Link */}
        {/* {banner.link && (
          <a
            href={banner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:underline text-sm mt-2"
          >
            Learn More
          </a>
        )} */}
      </div>
    </div>
  );
};

export default BannerCard;