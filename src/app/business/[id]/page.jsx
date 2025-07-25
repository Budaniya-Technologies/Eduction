'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiGet } from '../../../../Utils/http';

const BusinessDetailPage = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await apiGet('api/businesses/');
        const found = res.data.find((item) => String(item.id) === String(id));
        if (found) {
          setBusiness(found);
        } else {
          console.error('Business not found');
        }
      } catch (err) {
        console.error('Failed to load business detail:', err);
      }
    };

    if (id) {
      fetchBusiness();
    }
  }, [id]);

  if (!business) {
    return <div className="p-6 text-center text-gray-600">Loading business details...</div>;
  }

  return (
    <div className="min-h-screen p-6 py-20 bg-gray-50">
      <div className="max-w-8xl mx-auto bg-white p-6 shadow rounded-md">
        <img
          src={business.banner_image}
          alt={`${business.name} Banner`}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <div className="flex items-center gap-4 mb-4">
          <img
            src={business.logo}
            alt={`${business.name} Logo`}
            className="w-20 h-20 object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{business.name}</h2>
            <p className="text-gray-600">{business.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p><strong>Category:</strong> {business.category?.name}</p>
          <p><strong>Subcategory:</strong> {business.subcategory?.name}</p>
          <p><strong>Phone:</strong> {business.phone_number}</p>
          <p><strong>Email:</strong> {business.contact_email}</p>
          <p><strong>Website:</strong> <a href={business.website} className="text-blue-600 underline" target="_blank">{business.website}</a></p>
          <p><strong>Investment Range:</strong> ₹{business.investment_min} – ₹{business.investment_max}</p>
          <p><strong>Area Required:</strong> {business.area_required}</p>
          <p><strong>Franchise Outlets:</strong> {business.franchise_outlets}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailPage;
