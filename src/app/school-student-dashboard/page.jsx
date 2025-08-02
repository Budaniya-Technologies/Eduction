'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Clipboard, Edit, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Quiz from '@/components/Quiz';
import Learning from '@/components/Learning';
import ProtectedRoute from '@/Contexts/ProtectedRoute';

const StudentDashboard = () => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState(null); // Tracks which feature is active

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.replace('/login');
  }, []);

  const features = [
    {
      title: 'Learning',
      icon: <BookOpen className="w-10 h-10 text-blue-600" />,
      component: 'learning'
    },
    {
      title: 'Quiz',
      icon: <Clipboard className="w-10 h-10 text-green-600" />,
      component: 'quiz'
    },
    {
      title: 'Exams',
      icon: <Edit className="w-10 h-10 text-yellow-600" />,
      component: 'exams'
    },
    {
      title: 'Results',
      icon: <BarChart2 className="w-10 h-10 text-purple-600" />,
      component: 'results'
    }
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'quiz':
        return <Quiz />;
      case 'learning':
        return <Learning />;
      // case 'exams': return <Exams />;
      // case 'results': return <Results />;
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <div className="min-h-screen p-6 md:p-12 transition-all duration-500">
        {/* Feature Cards */}
        {!activeComponent && (
          <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 py-10 lg:grid-cols-2">
            {features.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveComponent(item.component)}
                className="cursor-pointer rounded-xl bg-white/80 shadow-xl backdrop-blur-md hover:scale-105 transform transition-all duration-300 ease-in-out hover:shadow-2xl group border border-gray-200 hover:border-transparent"
              >
                <div className="flex flex-col items-center justify-center h-40 sm:h-44 md:h-52 text-center px-4 py-6">
                  <div className="mb-4 animate-bounce-slow group-hover:animate-none">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Render selected feature */}
        {activeComponent && (
          <div className="mt-6">
            <button
              onClick={() => setActiveComponent(null)}
              className="mb-6 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              ⬅ Back to Dashboard
            </button>
            {renderComponent()}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default StudentDashboard;
