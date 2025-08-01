'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SubjectPage = ({ subject }) => {
  const totalChapters = 20;
  const unlockedChapters = 1;

  const router = useRouter();

  const handleLockedClick = () => {
    toast.error('⚠️ Complete previous chapter to unlock!');
  };

  const handleChapterClick = (index) => {
    router.push(`/school-student-dashboard/${subject}/${index + 1}`);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">{subject}</h1>
        <p className="text-gray-600 text-lg">Select a chapter to begin</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {Array.from({ length: totalChapters }).map((_, index) => {
          const isUnlocked = index < unlockedChapters;
          return (
            <div
              key={index}
              onClick={() => {
                if (isUnlocked) {
                  handleChapterClick(index);
                } else {
                  handleLockedClick();
                }
              }}
              className={`rounded-xl p-6 text-center shadow-md border transition duration-300 ${
                isUnlocked
                  ? 'bg-white hover:shadow-xl cursor-pointer hover:border-blue-500'
                  : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
            >
              <h3 className={`text-xl font-semibold mb-2 ${isUnlocked ? 'text-blue-700' : 'text-gray-500'}`}>
                Chapter {index + 1}
              </h3>
              {!isUnlocked && <Lock className="mx-auto text-gray-400" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectPage;
