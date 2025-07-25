'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '../../../Utils/http'; // Adjust the path if needed

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);

      const res = await apiPost('authapp/api/auth/login/', {
        username,
        password
      });

      if (res?.data?.token) {
        // Optional: Save token
        // localStorage.setItem('token', res.data.token);
        router.push('/user-dashboard');
      } else {
        setError('Login failed. Try again.');
      }
    } catch (err) {
      const errData = err?.response?.data;
      if (errData?.non_field_errors?.length > 0) {
        setError(errData.non_field_errors[0]);
      } else {
        setError('Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-black from-gray-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. punit"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <button
              onClick={() => router.push('/registration')}
              className="text-blue-600 font-semibold ml-1 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
