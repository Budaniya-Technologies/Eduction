'use client';
import React, { useState, useEffect } from 'react';
import { apiGet } from '../../Utils/http'; // adjust path if needed
import { useRouter } from 'next/navigation';

const JobSeekerDashboard = () => {
  const [jobsData, setJobsData] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [experienceInput, setExperienceInput] = useState('');
  const [salaryInput, setSalaryInput] = useState(10);
  const [filters, setFilters] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

    // Filter logic based on user input
    const isMatch = (job) => {
      if (!filters) return true;
  
      const location = job?.locations?.[0]?.address?.toLowerCase() || '';
      const matchesLocation =
        !filters.location || location.includes(filters.location.toLowerCase());
  
      const matchesExperience =
        !filters.experience ||
        (job.experience_min <= parseInt(filters.experience) &&
          job.experience_max >= parseInt(filters.experience));
  
      const averageSalary = (job.salary_min + job.salary_max) / 2 / 100000;
      const matchesSalary = averageSalary <= filters.salary;
  
      return matchesLocation && matchesExperience && matchesSalary;
    };

  // Calculate indexes
  const filteredJobs = jobsData.filter(isMatch);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const router = useRouter();



  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiGet('/api/job');
        if (Array.isArray(res?.data)) {
          setJobsData(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch job data', err);
      }
    };

    fetchJobs();
  }, []);


  const applyFilters = () => {
    setFilters({
      location: locationInput.trim(),
      experience: experienceInput.trim(),
      salary: salaryInput,
    });
  };

  const clearFilters = () => {
    setFilters(null);
    setLocationInput('');
    setExperienceInput('');
    setSalaryInput(10);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">Explore Job Opportunities</h1>
          <p className="text-gray-500 mt-1">Find jobs that match your skill and goals</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Panel */}
          <div className="w-full lg:w-1/4 bg-white p-5 rounded-lg shadow text-black">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Filters</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Location</label>
              <input
                type="text"
                placeholder="e.g. Jaipur"
                className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Experience (years)</label>
              <input
                type="number"
                placeholder="e.g. 1"
                className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={experienceInput}
                onChange={(e) => setExperienceInput(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Max Salary (Lakhs)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                className="w-full mt-2"
              />
              <span className="block text-sm mt-1 text-blue-600">{salaryInput} Lakh</span>
            </div>

            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="w-full mt-2 border border-red-500 text-red-600 py-2 rounded hover:bg-red-50 transition"
            >
              Clear All
            </button>
          </div>

          {/* Job Listings */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 gap-6">
            {currentJobs.length > 0 ? (
              currentJobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-5 border border-gray-100 hover:shadow-md transition"
                >
                  {/* job image */}
                  {job.image && (
                    <div className="mb-4">
                      <img
                        src={job.image}
                        alt={job.title}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-gray-500 text-sm">{job.category?.name}</p>
                    </div>
                    <button
                      onClick={() => router.push(`/job/${job.id}`)}
                      className="mt-4 w-40 bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600 transition"
                    >
                      Apply Now
                    </button>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 mt-2">
                    <p>
                      <strong>Location:</strong>{' '}
                      {job.locations?.map((loc) => loc.address).join(', ') || 'N/A'}
                    </p>
                    <p>
                      <strong>Salary:</strong> ₹{job.salary_min.toLocaleString()} – ₹
                      {job.salary_max.toLocaleString()}
                    </p>
                    <p>
                      <strong>Experience:</strong> {job.experience_min}–{job.experience_max} years
                    </p>
                    <p>
                      <strong>Type:</strong> {job.job_type_display}
                    </p>
                    <p className="italic text-gray-500">
                      Posted: {new Date(job.posted_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">No jobs match your filters.</div>
            )}
          </div>
        </div>
        {totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-md text-sm border ${currentPage === i + 1
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
  );
};

export default JobSeekerDashboard;
