'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { apiGet } from '../../Utils/http';

const BusinessDescription = () => {
  const [businessList, setBusinessList] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await apiGet('api/businesses/');
        const data = response.data;
        setBusinessList(data);
        setSelectedBusiness(data[0]); // default
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };
    fetchBusinesses();
  }, []);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (biz) => {
    setSelectedBusiness(biz);
    if (isMobile) setShowDetailMobile(true);
  };

  const renderBusinessList = () => (
    <aside className="w-full p-4 overflow-y-auto mt-[70px] md:w-1/3">
      <div className="space-y-4">
        {businessList.map((biz) => (
          <div
            key={biz.id}
            onClick={() => handleCardClick(biz)}
            className={`bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition cursor-pointer ${
              selectedBusiness?.id === biz.id ? 'border-blue-500 shadow-md' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <img
                src={biz.banner_image || '/placeholder.jpg'}
                alt={biz.name}
                width={40}
                height={40}
                className="rounded"
              />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{biz.name}</h3>
                <p className="text-sm text-gray-600">{biz.category?.name}</p>
                <p className="text-xs text-gray-500">{biz.subcategory?.name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Investment: ₹{biz.investment_min || 0} - ₹{biz.investment_max || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );

  const renderBusinessDetail = () => (
    <main className="flex-1 overflow-y-auto p-6 mb-10 mt-[70px]">
      {selectedBusiness && (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
          {isMobile && (
            <button
              onClick={() => setShowDetailMobile(false)}
              className="mb-4 text-sm text-blue-600 hover:underline"
            >
              ← Back to Businesses
            </button>
          )}

          <div className="flex items-center gap-4 mb-6">
            <img
              src={selectedBusiness.banner_image || '/placeholder.jpg'}
              alt={selectedBusiness.name}
              width={64}
              height={64}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedBusiness.name}</h1>
              <p className="text-sm text-gray-600">{selectedBusiness.subcategory?.name}</p>
              <div className="text-xs text-gray-500 mt-1">{selectedBusiness.website}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span>Email: {selectedBusiness.contact_email}</span>
            <span>Phone: {selectedBusiness.phone_number}</span>
            <span>Area Required: {selectedBusiness.area_required}</span>
            <span>Outlets: {selectedBusiness.franchise_outlets}</span>
          </div>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-sm text-gray-700">{selectedBusiness.description}</p>
          </section>

          <div className="text-center mt-10">
            <a
              href={selectedBusiness.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition"
            >
              Visit Website
            </a>
          </div>
        </div>
      )}
    </main>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f9f9f9]">
      {isMobile ? (showDetailMobile ? renderBusinessDetail() : renderBusinessList()) : (
        <>
          {renderBusinessList()}
          {renderBusinessDetail()}
        </>
      )}
    </div>
  );
};

export default BusinessDescription;
