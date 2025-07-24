'use client';
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import PostJob from '@/components/PostJob';

const HomeTutorDashboardPage = () => {
  const [currentSection, setCurrentSection] = useState('Manage Students');

  const cards = [
    { title: 'Total Students', count: 40, color: '#F59E0B' },
    { title: 'Subjects Offered', count: 6, color: '#10B981' },
  ];

  const sidebarItems = [
    {
      section: 'Dashboard',
      items: ['Add Students', 'Manage Students', 'Add Classes', 'Manage Classes'],
    },
    {
      section: 'Content Library',
      items: [
        {
          label: 'Content Library',
          subItems: ['Add Quiz', 'Add PDF', 'Add Videos', 'Add Images', 'Live Classes'],
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
    // {
    //   section: 'Manage Jobs',
    //   items: [
    //     {
    //       label: 'Manage Jobs',
    //       subItems: ['Post Jobs', 'Shortlisted', 'Applications'],
    //     },
    //   ],
    // },
    {
      section: 'News',
      items: [
        {
          label: 'Manage News',
          subItems: ['Post News', 'Manage News'],
        },
      ],
    },
  ];

  const news = [
    { title: 'Extra classes for Class 8 starting Monday' },
    { title: 'PTM on 20th July' },
    { title: 'New course materials uploaded' },
  ];

  const renderMainComponent = () => {
    switch (currentSection) {
      case 'Manage Students':
        return <div>👩‍🎓 Manage Students Component</div>;
      case 'Add Students':
        return <div>➕ Add Students Component</div>;
      case 'Add Classes':
        return <div>🏫 Add Classes Component</div>;
      case 'Manage Classes':
        return <div>📚 Manage Classes Component</div>;
      case 'Post News':
        return <div>📰 Post News Component</div>;
      case 'Manage News':
        return <div>📰 Manage News Component</div>;
      case 'Add Quiz':
        return <div>🧠 Quiz Upload Component</div>;
      case 'Add PDF':
        return <div>📄 PDF Upload Component</div>;
      case 'Add Videos':
        return <div>🎥 Videos Upload Component</div>;
      case 'Add Images':
        return <div>🖼️ Images Upload Component</div>;
      case 'Live Classes':
        return <div>📺 Live Classes Component</div>;
      case 'Create Exam':
        return <div>📝 Create Exam Component</div>;
      case 'Result':
        return <div>📊 Result Management Component</div>;
      case 'Post Jobs':
        return <div><PostJob /></div>;
      case 'Shortlisted':
        return <div>📊 Shortlisted Candidates Component</div>;
      case 'Applications':
        return <div>📄 Applications Component</div>;
      default:
        return <div>📚 Select a section from sidebar</div>;
    }
  };

  return (
    <Dashboard
      title="Home Tutor Dashboard"
      cards={cards}
      sidebarItems={sidebarItems}
      news={news}
      mainComponent={renderMainComponent()}
      onSectionClick={setCurrentSection}
    />
  );
};

export default HomeTutorDashboardPage;
