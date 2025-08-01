'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
});

const tabs = [
  'Lesson',
  'PDF Notes',
  'Recorded Classes',
  'Live Classes',
  'Video Lectures',
];

const ChapterTabs = () => {
  const [activeTab, setActiveTab] = useState('Lesson');
  const { subject, chapterId } = useParams();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'PDF Notes':
        return <PDFViewer subject={subject} chapterId={chapterId} />;
      default:
        return <p>{activeTab} content for {subject} - Chapter {chapterId}</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-10">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700 capitalize">
          {subject} - Chapter {chapterId}
        </h1>
        <p className="text-gray-600">Explore the content below</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-black hover:bg-blue-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-gray-300 rounded-3xl h-[450px] sm:h-[500px] w-full max-w-full mx-auto shadow-inner p-6 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ChapterTabs;
