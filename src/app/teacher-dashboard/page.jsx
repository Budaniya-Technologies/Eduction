'use client';
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import AddStudentForm from '@/components/AddStudentForm';
import VideoUpload from '@/components/VideoUpload';
import UploadPhoto from '@/components/UploadPhoto';
import PDFUpload from '@/components/PDFUpload';
import QuizCreate from '@/components/QuizCreate';
import TeacherContentManager from '@/components/ContentManager';

const TeacherDashboardPage = () => {
  const [currentSection, setCurrentSection] = useState('Manage Students');

  const cards = [
    { title: 'Total Students Assigned', count: 180, color: '#10B981' },
    { title: 'Subjects Assigned', count: 2, color: '#8B5CF6' },
  ];

  const sidebarItems = [
    {
      section: 'Dashboard',
      items: ['Add Students'],
    },
    {
      section: 'Content Library',
      items: [
        {
          label: 'Add Your Content',
          subItems: ['Add Quiz', 'Add PDF', 'Add Videos', 'Add Images', 'Live Classes', 'Manage Content'],
        },
      ],
    },
    {
      section: 'Exams',
      items: [
        {
          label: 'Exams',
          subItems: ['Create Exam', 'Result'],
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
      case 'Add Students':
        return <div><AddStudentForm/></div>;
      case 'Add Quiz':
        return <div><QuizCreate/></div>;
      case 'Add PDF':
        return <div><PDFUpload/></div>;
      case 'Add Videos':
        return <div><VideoUpload/></div>;
      case 'Add Images':
        return <div><UploadPhoto/></div>;
      case 'Live Classes':
        return <div>📺 Live Classes Component</div>;
      case 'Create Exam':
        return <div>📝 Create Exam Component</div>;
      case 'Result':
        return <div>📊 Result Component</div>;
        case 'Manage Content':
          return <div><TeacherContentManager/></div>;
      default:
        return <div>📚 Please select a section from the sidebar</div>;
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
