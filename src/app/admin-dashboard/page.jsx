'use client';
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
// import AddSchool from '@/components/AddSchool';
// import ManageSchools from '@/components/ManageSchools';
// import AddJobProvider from '@/components/AddJobProvider';
// import ManageJobProviders from '@/components/ManageJobProviders';
// import AddBusiness from '@/components/AddBusiness';
// import ManageBusinesses from '@/components/ManageBusinesses';
// import AddHomeTutor from '@/components/AddHomeTutor';
// import ManageHomeTutors from '@/components/ManageHomeTutors';
// import AddService from '@/components/AddService';
// import ManageServices from '@/components/ManageServices';

const AdminDashboardPage = () => {
    const [currentSection, setCurrentSection] = useState('Add Schools');

    const cards = [
        { title: 'Total Schools', count: 24, color: '#10B981' },
        { title: 'Job Providers', count: 45, color: '#8B5CF6' },
        { title: 'Businesses', count: 33, color: '#F59E0B' },
        // { title: 'Home Tutors',        count: 12,  color: '#3B82F6' },
        { title: 'Services Offered', count: 56, color: '#EF4444' },
    ];

    const sidebarItems = [
        {
            section: 'School Management',
            items: [
                {
                    label: 'Schools',
                    subItems: ['Add Schools', 'Manage Schools'],
                },
            ],
        },
        {
            section: 'Job Providers',
            items: [
                {
                    label: 'Providers',
                    subItems: ['Add Job Provider', 'Manage Job Providers'],
                },
            ],
        },
        {
            section: 'Business Management',
            items: [
                {
                    label: 'Businesses',
                    subItems: ['Add Businesses', 'Manage Businesses'],
                },
            ],
        },
        {
            section: 'Home Tutors',
            items: [
                {
                    label: 'Tutors',
                    subItems: ['Add Home Tutors', 'Manage Home Tutors'],
                },
            ],
        },
        {
            section: 'Services',
            items: [
                {
                    label: 'Services',
                    subItems: ['Add Services', 'Manage Services'],
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
        {
            section: 'Jobs',
            items: [
                {
                    label: 'Post Jobs',
                    subItems: ['Post Job', 'Shortlisted', 'Applications'],
                },
            ],
        },
    ];

    const news = [
        { title: 'New accreditation guidelines released' },
        { title: 'Provider compliance review scheduled' },
        { title: 'Business network meetup on Sept 15' },
    ];

    const renderMainComponent = () => {
        switch (currentSection) {
            case 'Add Schools':
                // return <AddSchool />;
                return <div><h3>hello ji</h3></div>
            case 'Manage Schools':
                // return <ManageSchools />;
                return <div><h3>hello ji</h3></div>
            case 'Add Job Provider':
                // return <AddJobProvider />;
                return <div><h3>hello ji</h3></div>
            case 'Manage Job Providers':
                // return <ManageJobProviders />;
                return <div><h3>hello ji</h3></div>
            case 'Add Businesses':
                // return <AddBusiness />;
                return <div><h3>hello ji</h3></div>
            case 'Manage Businesses':
                // return <ManageBusinesses />;
                return <div><h3>hello ji</h3></div>
            case 'Add Home Tutors':
                return <AddHomeTutor />;
            case 'Manage Home Tutors':
                // return <ManageHomeTutors />;
                return <div><h3>hello ji</h3></div>
            case 'Add Services':
                // return <AddService />;
                return <div><h3>hello ji</h3></div>
            case 'Manage Services':
                // return <ManageServices />;
                return <div><h3>hello ji</h3></div>
            default:
                return <div>📌 Please select an option from the sidebar</div>;
        }
    };

    return (
        <Dashboard
            title="Admin Dashboard"
            cards={cards}
            sidebarItems={sidebarItems}
            news={news}
            mainComponent={renderMainComponent()}
            onSectionClick={setCurrentSection}
        />
    );
};

export default AdminDashboardPage;
