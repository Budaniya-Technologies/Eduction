'use client';
import React from 'react';

const businessData = {
  name: 'CityCool AC Services',
  category: 'Air Conditioning Repair & Maintenance',
  rating: 4.6,
  totalReviews: 124,
  address: 'Plot 42, Raja Park, Jaipur, Rajasthan - 302004',
  phone: '+91 98765 43210',
  website: 'https://citycoolservices.in',
  hours: '10:00 AM – 8:00 PM',
  description:
    'CityCool provides expert AC installation, repair, and maintenance services with certified technicians. Trusted by 5000+ customers in Jaipur.',
  services: [
    'AC Installation',
    'AC Repair',
    'Gas Refilling',
    'Annual Maintenance Contract (AMC)',
    'AC Uninstallation',
  ],
  images: [
    '/business/image1.jpg',
    '/business/image2.jpg',
    '/business/image3.jpg',
  ],
  reviews: [
    {
      name: 'Anjali Mehra',
      rating: 5,
      comment: 'Excellent and fast AC service. Very professional staff!',
    },
    {
      name: 'Rohit Sharma',
      rating: 4,
      comment: 'Good experience. Technician came on time.',
    },
  ],
};

const BusinessProfile = () => {
  return (
    <div className="p-6 bg-white text-black max-w-6xl mx-auto">
      {/* Business Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold">{businessData.name}</h1>
          <p className="text-gray-600">{businessData.category}</p>
          <div className="mt-1 text-yellow-500 text-sm">
            ⭐ {businessData.rating} ({businessData.totalReviews} reviews)
          </div>
        </div>
        <a
          href={businessData.website}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </a>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {businessData.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Business"
            className="rounded shadow h-48 w-full object-cover"
          />
        ))}
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p>{businessData.description}</p>
          <h2 className="text-xl font-semibold mt-4 mb-2">Services</h2>
          <ul className="list-disc list-inside text-gray-700">
            {businessData.services.map((service, i) => (
              <li key={i}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
          <p><strong>Address:</strong> {businessData.address}</p>
          <p><strong>Phone:</strong> {businessData.phone}</p>
          <p><strong>Working Hours:</strong> {businessData.hours}</p>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
        <div className="space-y-4">
          {businessData.reviews.map((review, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between mb-1">
                <strong>{review.name}</strong>
                <span className="text-yellow-500">⭐ {review.rating}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
