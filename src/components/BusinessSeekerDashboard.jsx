'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiGet } from '../../Utils/http';

const BusinessSeekerDashboard = () => {
  const [filters, setFilters] = useState({ category: '', location: '' });
  const [businessList, setBusinessList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const businessesPerPage = 4;

  const router = useRouter();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await apiGet('/api/businesses/');
        if (Array.isArray(res?.data)) {
          setBusinessList(res.data);
          setFilteredList(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch business data:', err);
      }
    };
    fetchBusinesses();
  }, []);

  const handleFilter = () => {
    const { category, location } = filters;
    const filtered = businessList.filter((item) => {
      const matchCategory = category ? String(item.category) === String(category) : true;
      const matchLocation = location
        ? item.description?.toLowerCase().includes(location.toLowerCase())
        : true;
      return matchCategory && matchLocation;
    });
    setFilteredList(filtered);
    setCurrentPage(1); // reset to first page after filter
  };

  const clearFilters = () => {
    setFilters({ category: '', location: '' });
    setFilteredList(businessList);
    setCurrentPage(1);
  };

  const viewDetails = (id) => {
    router.push(`/business/${id}`);
  };

  // Pagination calculations
  const indexOfLast = currentPage * businessesPerPage;
  const indexOfFirst = indexOfLast - businessesPerPage;
  const currentBusinesses = filteredList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredList.length / businessesPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">Explore Business Opportunities</h1>
          <p className="text-gray-500 mt-2">Find the right business fit for your goals</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Panel */}
          <div className="md:w-1/4 bg-white p-5 rounded-lg shadow text-black">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block text-sm mb-1 text-gray-600">Category ID</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full border rounded-md p-2 text-sm"
              >
                <option value="">All Categories</option>
                <option value="1">Franchise</option>
                <option value="2">Consultancy</option>
                <option value="3">Logistics</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1 text-gray-600">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Search in description"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleFilter}
                className="bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-200 text-gray-700 py-2 rounded-md text-sm hover:bg-gray-300"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Business Listings */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentBusinesses.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-md"
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-16 object-contain mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Category:</span>{' '}
                    {item.category?.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Phone:</span> {item.phone_number}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Investment:</span> ₹
                    {item.investment_min} – ₹{item.investment_max}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                  <button
                    onClick={() => viewDetails(item.id)}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))}
              {currentBusinesses.length === 0 && (
                <div className="col-span-full text-center text-gray-500 italic">
                  No opportunities match the filters.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md text-sm border ${
                      currentPage === i + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSeekerDashboard;
