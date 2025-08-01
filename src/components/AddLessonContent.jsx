'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddLessonContent = () => {
  const [formData, setFormData] = useState({
    title: '',
    lession_content: '',
    deleted: false,
    draft: false,
    owner: [6],       // Update if needed
    class_obj: 1,     // Update if dynamic
    subject: 1,       // Update if dynamic
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    try {
      const res = await axios.post('https://api.mypratham.com/school/lession-content/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setMessage(res.data.msg || 'Lesson content created successfully!');
    } catch (err) {
      setError(err.response?.data || 'Failed to create lesson content');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Lesson Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="lession_content"
            value={formData.lession_content}
            onChange={handleChange}
            required
            rows={4}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="deleted"
              checked={formData.deleted}
              onChange={handleChange}
              className="mr-2"
            />
            Deleted
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="draft"
              checked={formData.draft}
              onChange={handleChange}
              className="mr-2"
            />
            Draft
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded">
          ✅ {message}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded">
          ❌ {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      )}
    </div>
  );
};

export default AddLessonContent;
