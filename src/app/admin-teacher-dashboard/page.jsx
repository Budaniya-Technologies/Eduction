'use client';
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import QuizCreate from '@/components/QuizCreate';
import PDFUpload from '@/components/PDFUpload';
import VideoUpload from '@/components/VideoUpload';
import UploadPhoto from '@/components/UploadPhoto';
import TeacherContentManager from '@/components/ContentManager';

const TeacherDashboardPage = () => {
  const [currentSection, setCurrentSection] = useState('Add Quiz');

  const cards = [
    { title: 'Total Students Assigned', count: 180, color: '#10B981' },
    { title: 'Subjects Assigned', count: 2,         color: '#8B5CF6' },
    { title: 'Total Classes Assigned', count: 4, color: '#10B981' },
    { title: 'Total Live Classes', count: 2,         color: '#8B5CF6' },
  ];

  const sidebarItems = [
    {
      section: 'Content Library',
      items: [
        {
          label: 'Add Your Content',
          subItems: [
            'Add Quiz',
            'Add PDF',
            'Add Videos',
            'Add Images',
            'Live Classes',
            'Manage Content',
          ],
        },
      ],
    },
  ];

  const news = [
    { title: 'Teachers workshop on 20th July' },
    { title: 'Submit internal marks by 25th' },
    { title: 'New assignments module live' },
  ];

  const renderMainComponent = () => {
    switch (currentSection) {
      case 'Add Quiz':
        return <QuizCreate />;
      case 'Add PDF':
        return <PDFUpload />;
      case 'Add Videos':
        return <VideoUpload />;
      case 'Add Images':
        return <UploadPhoto />;
      case 'Live Classes':
        return <div>📺 Live Classes Component</div>;
      case 'Manage Content':
        return <TeacherContentManager />;
      default:
        return <div>📚 Please select an option above</div>;
    }
  };

  return (
    <Dashboard
      title="Teacher Dashboard"
      cards={cards}
      sidebarItems={sidebarItems}
      news={news}
      mainComponent={renderMainComponent()}
      onSectionClick={setCurrentSection}
    />
  );
};

export default TeacherDashboardPage;
