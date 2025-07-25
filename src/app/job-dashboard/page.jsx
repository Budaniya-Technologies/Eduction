'use client';
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import PostJob from '@/components/PostJob';

const JobDashboardPage = () => {
  const [currentSection, setCurrentSection] = useState('Post Job');

  const cards = [
    { title: 'Jobs Posted', count: 52, color: '#F59E0B' },
    { title: 'Total Applications', count: 18, color: '#3B82F6' },
    { title: 'Total Hired', count: 52, color: '#F59E0B' },
    { title: 'Shortlisted Cadidates', count: 18, color: '#3B82F6' },
  ];

  const sidebarItems = [
    {
      section: 'Manage Jobs',
      items: [
        {
          label: 'Manage Jobs',
          subItems: ['Post Job', 'Edit Jobs'],
        },
      ],
    },
    {
      section: 'Applications',
      items: [
        {
          label: 'Applications',
          subItems: ['Shortlisted Candidates', 'Applications'],
        },
      ],
    },
    {
      section: 'News',
      items: [
        {
          label: 'Manage News',
          subItems: ['Add News','Manage News']
        },
      ],
    },
  ];

  const news = [
    { title: 'Walk-in Interviews on July 20th' },
    { title: 'Job Fair organized in Jaipur' },
    { title: 'New HR policy update released' },
  ];

  const renderMainComponent = () => {
    switch (currentSection) {
      case 'Post Job':
        return <div><PostJob /></div>;
      case 'Shortlisted Candidates':
        return <div>✅ Shortlisted Candidates Component</div>;
      case 'Applications':
        return <div>📄 Applications Component</div>;
      case 'Manage News':
        return <div>📄Manage News Component</div>;
      default:
        return <div>📁 Select a section from sidebar</div>;
    }
  };

  return (
    <Dashboard
      title="Job Provider Dashboard"
      cards={cards}
      sidebarItems={sidebarItems}
      news={news}
      mainComponent={renderMainComponent()}
      onSectionClick={setCurrentSection}
    />
  );
};

export default JobDashboardPage;
