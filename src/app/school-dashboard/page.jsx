'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/Dashboard';
import PostJob from '@/components/PostJob';
import NewsPost from '@/components/NewsPost';
import NewsManager from '@/components/NewsManager';
import AddTeacher from '@/components/AddTeacher';
import ManageStudents from '@/components/ManageStudents';
import StudentAdmissionForm from '@/components/AddStudentForm';
import ManageTeachers from '@/components/ManageTeacher';
import AddBundleStudentsEditable from '@/components/AddBundleStudents';
import ProtectedRoute from '@/Contexts/ProtectedRoute';

const SchoolDashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Ensure this runs only on the client
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login'); // redirect to login if token not found
    }
  }, []);

  const [currentSection, setCurrentSection] = useState('Manage Students');
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      setToken(savedToken);
    }
  }, []);

  const cards = [
    { title: 'Total Students', count: 320, color: '#EF4444' },
    { title: 'Total Teachers', count: 75, color: '#3B82F6' },
    { title: 'Quiz Created', count: 50, color: '#EF4444' },
    { title: 'Toppers', count: 65, color: '#3B82F6' },
  ];

  const sidebarItems = [
    {
      section: 'Dashboard',
      items: ['Add Students', 'Add Bundle Students', 'Manage Students', 'Add Teachers', 'Manage Teachers'],
    },
    {
      section: 'Content Library',
      items: [
        {
          label: 'Admin Content',
          subItems: ['Add Admin content'],
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
    {
      section: 'Menage Jobs',
      items: [
        {
          label: 'Menage Jobs',
          subItems: ['Post Jobs', 'Shortlisted', 'Applications'],
        },
      ],
    },
    {
      section: 'News',
      items: [
        {
          label: 'Menage News',
          subItems: ['Post News', 'Magnage News'],
        },
      ],
    },
  ];

  const news = [
    { title: 'New syllabus released for Class 10' },
    { title: 'Science fair on 12th Sept' },
    { title: 'School reopens after holidays' },
  ];

  const renderMainComponent = () => {
    switch (currentSection) {
      case 'Manage Students':
        return <div><ManageStudents /></div>;
      case 'Manage Teachers':
        return <div><ManageTeachers /></div>;
      case 'News':
        return <div><NewsManager /></div>;
      case 'Create Exam':
        return <div>📝 Create Exam Component</div>;
      case 'Result':
        return <div>📊 Result Management Component</div>;
      case 'Post Jobs':
        return <div><PostJob /></div>;
      case 'Shortlisted':
        return <div>📊 Shortlisted Component</div>;
      case 'Applications':
        return <div>📊 Application Component</div>;
      case 'Post News':
        return <div><NewsPost /></div>;
      case 'Magnage News':
        return <div><NewsManager /></div>;
      case 'Add Students':
        return <div><StudentAdmissionForm /></div>;
      case 'Add Teachers':
        return <div><AddTeacher /></div>;
      case 'Add Bundle Students':
        return <div><AddBundleStudentsEditable /></div>;
      default:
        return <div>📚 Select a section from sidebar</div>;
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>

      <Dashboard
        title="School Dashboard"
        cards={cards}
        sidebarItems={sidebarItems}
        news={news}
        mainComponent={renderMainComponent()}
        onSectionClick={setCurrentSection}
      />
    </ProtectedRoute>
  );
};

export default SchoolDashboardPage;
