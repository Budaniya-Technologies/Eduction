'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const RegistrationPage = () => {
  const router = useRouter();

  const [selectedProfession, setSelectedProfession] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const professions = [
    { id: 'tutor', label: 'Home Tutor' },
    { id: 'business', label: 'Business Provider' },
    { id: 'job', label: 'Job Provider' },
    { id: 'institute', label: 'Institute' },
  ];

  const services = [
    { id: 'students', label: 'Student' },
    { id: 'jobseeker', label: 'Job Seeker' },
    { id: 'business seeker', label: 'Business Seeker' },
    { id: 'user', label: 'Guest User' },
  ];

  const toggleService = (id) => {
    setSelectedProfession(null);
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProviderSubmit = () => {
    if (selectedProfession) {
      localStorage.setItem('selectedProfession', selectedProfession);
      localStorage.setItem('selectedUserDashboards', JSON.stringify(selectedServices));
      router.push('/register-provider');
    } else {
      alert('Please select a profession before proceeding.');
    }
  };

  const handleUserSubmit = () => {
    if (selectedServices.length > 0) {
      localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
      router.push('/register-user');
    } else {
      alert('Please select at least one service before proceeding.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-20 p-6">
      <main className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            Join as Provider or User
          </h1>
          <p className="text-gray-600 text-sm">
            Choose your profession or select services you're looking for.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Provider Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg width="40" height="40" fill="#3B82F6" viewBox="0 0 48 48">
                <path d="M28.7,18.8l-1.8,2.9,1.4,1.4,2.9-1.8,1,.4L33,25h2l.8-3.3,1-.4,2.9,1.8,1.4-1.4-1.8-2.9a4.2,4.2,0,0,0,.4-1L43,17V15l-3.3-.8a4.2,4.2,0,0,0-.4-1l1.8-2.9L39.7,8.9l-2.9,1.8-1-.4L35,7H33l-.8,3.3-1,.4L28.3,8.9l-1.4,1.4,1.8,2.9a4.2,4.2,0,0,0-.4,1L25,15v2l3.3.8A4.2,4.2,0,0,0,28.7,18.8Z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 ml-3">I am a Service Provider</h2>
            </div>
            <div className="space-y-4">
              {professions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center justify-between p-3 border rounded-md transition cursor-pointer ${selectedProfession === option.id
                    ? 'bg-blue-50 border-blue-600'
                    : 'hover:bg-gray-100 border-gray-300'
                    }`}
                >
                  <span className="text-gray-700">{option.label}</span>
                  <input
                    type="radio"
                    name="profession"
                    value={option.id}
                    checked={selectedProfession === option.id}
                    onChange={() => {
                      setSelectedProfession(option.id);
                      setSelectedServices([]);
                    }}
                    className="form-radio text-blue-600"
                  />
                </label>
              ))}
              {selectedProfession === 'institute' && (
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-1">Institute Type *</label>
                  <select
                    className="w-full border px-3 py-2 rounded-md"
                    onChange={(e) => localStorage.setItem('instituteSubRole', e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Select institute type</option>
                    <option value="private_school">Private School</option>
                    <option value="govt_school">Government School</option>
                    <option value="tuition_teacher">Tuition Teacher</option>
                  </select>
                </div>
              )}

              <button
                onClick={handleProviderSubmit}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Register as Provider
              </button>
            </div>
          </div>

          {/* User Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg width="40" height="40" fill="#1C274C" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0001 1.25C9.37678 1.25 7.25013 3.37665 7.25013 6C7.25013 8.62335 9.37678 10.75 12.0001 10.75C14.6235 10.75 16.7501 8.62335 16.7501 6C16.7501 3.37665 14.6235 1.25 12.0001 1.25ZM8.75013 6C8.75013 4.20507 10.2052 2.75 12.0001 2.75C13.7951 2.75 15.2501 4.20507 15.2501 6C15.2501 7.79493 13.7951 9.25 12.0001 9.25C10.2052 9.25 8.75013 7.79493 8.75013 6Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0001 12.25C9.68658 12.25 7.55506 12.7759 5.97558 13.6643C4.41962 14.5396 3.25013 15.8661 3.25013 17.5L3.25007 17.602C3.24894 18.7638 3.24752 20.222 4.52655 21.2635C5.15602 21.7761 6.03661 22.1406 7.22634 22.3815C8.4194 22.6229 9.97436 22.75 12.0001 22.75C14.0259 22.75 15.5809 22.6229 16.7739 22.3815C17.9637 22.1406 18.8443 21.7761 19.4737 21.2635C20.7527 20.222 20.7513 18.7638 20.7502 17.602L20.7501 17.5C20.7501 15.8661 19.5807 14.5396 18.0247 13.6643C16.4452 12.7759 14.3137 12.25 12.0001 12.25Z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 ml-3">I am a User</h2>
            </div>
            <div className="space-y-4">
              {services.map((service) => (
                <label
                  key={service.id}
                  className={`flex items-center justify-between p-3 border rounded-md transition cursor-pointer ${selectedServices.includes(service.id)
                    ? 'bg-blue-50 border-blue-600'
                    : 'hover:bg-gray-100 border-gray-300'
                    }`}
                >
                  <span className="text-gray-700">{service.label}</span>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                    className="form-checkbox text-blue-600"
                  />
                </label>
              ))}
              <button
                onClick={handleUserSubmit}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Register as User
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Login Redirect Button */}
      <div className="mt-6 text-center">
        <p className="text-gray-700 text-sm">
          Already have an account?
          <button
            onClick={() => router.push('/login')}
            className="ml-1 text-blue-600 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
