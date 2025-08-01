'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const subjects = ['Hindi', 'English', 'Math', 'Sanskrit', 'Social Science', 'Science'];

const Learning = () => {
  const router = useRouter(); // ✅ use the hook here

  const handleSubjectClick = (subject) => {
    router.push(`/school-student-dashboard/${subject.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-4">
      <div className="max-w-full mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Start Learning</h1>
        <p className="text-gray-600 text-lg">Choose your subject to begin</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {subjects.map((subject, index) => (
          <div
            key={index}
            onClick={() => handleSubjectClick(subject)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex items-center justify-center text-center border border-gray-200 hover:border-blue-400 group cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-blue-700 group-hover:text-blue-800 tracking-wide font-serif">
              {subject}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;
