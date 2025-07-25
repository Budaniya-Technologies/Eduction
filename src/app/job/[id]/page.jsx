'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet } from '../../../../Utils/http';

// Dummy JSON for extended details
const dummyJobExtras = {
  6: {
    role_overview: `Collaborate with product and engineering teams to design efficient, pixel-perfect UI components and innovative features.`,
    skills: ['Sales Communication', 'CRM', 'Negotiation', 'Customer Service'],
    company: {
      name: 'MyPratham Enterprises',
      description: `MyPratham is a career and job platform offering employment opportunities and training to job seekers across India.`,
      profileLink: '/company/mypratham'
    }
  },
  // add more IDs if needed
};

const JobDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await apiGet('/api/job/');
        const apiJob = res.data.find((j) => String(j.id) === String(id));
        if (!apiJob) return;

        // Merge with dummy data
        const extra = dummyJobExtras[apiJob.id] || {};
        const merged = { ...apiJob, ...extra };
        setJob(merged);
      } catch (err) {
        console.error('Failed to fetch job data:', err);
      }
    };

    if (id) fetchJob();
  }, [id]);

  if (!job) {
    return <div className="p-6 text-center text-gray-500">Loading job details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Title & Category */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
          <p className="text-sm text-gray-600">{job.category?.name}</p>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <p><strong>Location:</strong> Work from home</p>
          <p><strong>Salary:</strong> ₹{job.salary_min.toLocaleString()} – ₹{job.salary_max.toLocaleString()}</p>
          <p><strong>Experience:</strong> {job.experience_min}–{job.experience_max} years</p>
          <p><strong>Type:</strong> {job.job_type?.replace('_', ' ') || 'N/A'}</p>
          <p><strong>Posted:</strong> {new Date(job.posted_at).toLocaleDateString()}</p>
          <p><strong>Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</p>
        </div>

        {/* Role Overview */}
        {job.role_overview && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Role Overview</h2>
            <p className="text-gray-700 mt-1 whitespace-pre-line">{job.role_overview}</p>
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
          <p className="text-gray-700 mt-1 whitespace-pre-line">{job.description}</p>
        </div>

        {/* Skills */}
        {job.skills && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Skills Required</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Company Section */}
        {job.company && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">About Company</h2>
            <p className="text-gray-700 mt-1">{job.company.description}</p>
            <button
              onClick={() => router.push(job.company.profileLink)}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              Visit Company Profile →
            </button>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            onClick={() => alert(`Applied for job: ${job.title}`)}
          >
            Apply Now
          </button>

          <button
            className="text-sm text-gray-600 hover:underline"
            onClick={() => router.back()}
          >
            ← Back to Job Listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
