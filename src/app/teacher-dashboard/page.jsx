'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/Dashboard';
import AddStudentForm from '@/components/AddStudentForm';
import VideoUpload from '@/components/VideoUpload';
import PDFUpload from '@/components/PDFUpload';
import QuizCreate from '@/components/QuizCreate';
import TeacherContentManager from '@/components/ContentManager';
import CreateZoomMeeting from '@/components/CreateZoomMeeting';
import AddLessonContent from '@/components/AddLessonContent';

const TeacherDashboardPage = () => {

  const router = useRouter();

  useEffect(() => {
    // Ensure this runs only on the client
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login'); // redirect to login if token not found
    }
  }, []);

  const [currentSection, setCurrentSection] = useState('Manage Students');

  const cards = [
    { title: 'Total Classes Assigned', count: 5, color: '#10B981' },
    { title: 'Subjects Assigned', count: 2, color: '#8B5CF6' },
    { title: 'Pending Exams', count: 10, color: '#10B981' },
    { title: 'Quiz Created', count: 25, color: '#8B5CF6' },
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
          subItems: ['Add Content', 'Add Quiz', 'Add PDF', 'Add Videos', 'Live Classes', 'Manage Content'],
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
        return <div><AddStudentForm /></div>;
      case 'Add Content':
        return <div><AddLessonContent/></div>;
      case 'Add Quiz':
        return <div><QuizCreate /></div>;
      case 'Add PDF':
        return <div><PDFUpload /></div>;
      case 'Add Videos':
        return <div><VideoUpload /></div>;
      case 'Live Classes':
        return <div><CreateZoomMeeting /></div>;
      case 'Create Exam':
        return <div>📝 Create Exam Component</div>;
      case 'Result':
        return <div>📊 Result Component</div>;
      case 'Manage Content':
        return <div><TeacherContentManager /></div>;
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
