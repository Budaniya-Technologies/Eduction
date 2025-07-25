'use client';
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import PostJob from '@/components/PostJob';
import AddService from '@/components/AddService';

const BusinessDashboardPage = () => {
  const [currentSection, setCurrentSection] = useState('Add Services');

  const cards = [
    { title: 'Total Services', count: 35, color: '#10B981' },
    { title: 'Total Products', count: 142, color: '#6366F1' },
    { title: 'Team Members', count: 281, color: '#F59E0B' },
    { title: 'Frenchies', count: 3, color: '#6366F1' },
  ];

  const sidebarItems = [
    {
      section: 'Services',
      items: [
        {
          label: 'Manage Services',
          subItems: ['Add Services', 'Manage Services'],
        },
      ],
    },
    {
      section: 'Products',
      items: [
        {
          label: 'Manage Products',
          subItems: ['Add Products', 'Manage Products'],
        },
      ],
    },
    {
      section: 'Team',
      items: [
        {
          label: 'Team Management',
          subItems: ['Add Team Member', 'Manage Team'],
        },
      ],
    },
    {
      section: 'Jobs',
      items: [
        {
          label: 'Business Jobs',
          subItems: ['Post Job', 'Shortlisted', 'Applications'],
        },
      ],
    },
    {
      section: 'News',
      items: [
        {
          label: 'News Management',
          subItems: ['Post News', 'Manage News'],
        },
      ],
    },
  ];

  const news = [
    { title: 'Business Expo 2025 Announced' },
    { title: 'GST Update for Product Sellers' },
    { title: 'Hiring for Sales Team Open' },
  ];

  const renderMainComponent = () => {
    switch (currentSection) {
      case 'Add Services':
        return <div><AddService/></div>;
      case 'Manage Services':
        return <div>📁 Manage Services Component</div>;
      case 'Add Products':
        return <div>➕ Add Products Component</div>;
      case 'Manage Products':
        return <div>📦 Manage Products Component</div>;
      case 'Add Team Member':
        return <div>👥 Add Team Member Component</div>;
      case 'Manage Team':
        return <div>📋 Manage Team Component</div>;
      case 'Post Job':
        return <div><PostJob/></div>;
      case 'Shortlisted':
        return <div>✅ Shortlisted Applications Component</div>;
      case 'Applications':
        return <div>📨 All Applications Component</div>;
      case 'Post News':
        return <div>📰 Post News Component</div>;
      case 'Manage News':
        return <div>🗂️ Manage News Component</div>;
      default:
        return <div>📌 Select a section from sidebar</div>;
    }
  };

  return (
    <Dashboard
      title="Business Dashboard"
      cards={cards}
      sidebarItems={sidebarItems}
      news={news}
      mainComponent={renderMainComponent()}
      onSectionClick={setCurrentSection}
    />
  );
};

export default BusinessDashboardPage;
