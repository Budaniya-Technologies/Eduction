'use client';

import React from 'react';

const BusinessHeader = ({ data }) => {
  return (
    <div className="border-b pb-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="bg-green-500 text-white px-2 py-0.5 rounded">
              {data.rating} ★
            </span>
            <span>{data.reviews} Ratings</span>
            {data.isClaimed && (
              <span className="text-xs text-gray-500">Claimed</span>
            )}
          </div>
          <p className="text-gray-600 mt-1">{data.location}</p>
          <p className="text-green-600 font-medium">{data.timing}</p>
          <div className="mt-2 flex gap-2 flex-wrap">
            <a
              href={`tel:${data.contact}`}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              📞 {data.contact}
            </a>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">
              Enquire Now
            </button>
            <button className="bg-green-500 text-white px-4 py-1 rounded">
              WhatsApp
            </button>
          </div>
        </div>
        <div className="mt-4 md:mt-0 grid grid-cols-3 gap-2">
          {data.photos.slice(0, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery image ${index + 1}`}
              className="w-24 h-24 object-cover rounded shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;
