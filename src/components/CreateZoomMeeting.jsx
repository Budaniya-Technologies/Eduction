'use client';
import React, { useState } from 'react';
import axios from 'axios';

const CreateZoomMeeting = () => {
  const [formData, setFormData] = useState({
    topic: '',
    agenda: '',
    start_time: '',
    duration: '',
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('User not authenticated. Please log in.');
      return;
    }

    try {
      const res = await axios.post('https://api.mypratham.com/school/zoom/create-meeting/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setResponse(null);
      setError(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Create Zoom Meeting</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Agenda</label>
          <input
            type="text"
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Meeting
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded">
          <h4 className="font-semibold mb-2">Meeting Created Successfully!</h4>
          <p><strong>Topic:</strong> {response.topic}</p>
          <p><strong>Start URL:</strong> <a className="text-blue-600 underline" href={response.start_url} target="_blank" rel="noopener noreferrer">{response.start_url}</a></p>
          <p><strong>Join URL:</strong> <a className="text-blue-600 underline" href={response.join_url} target="_blank" rel="noopener noreferrer">{response.join_url}</a></p>
          <p><strong>Password:</strong> {response.password}</p>
          <p><strong>Duration:</strong> {response.duration} minutes</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded">
          <strong>Error:</strong> {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      )}
    </div>
  );
};

export default CreateZoomMeeting;
