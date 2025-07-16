'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const jobList = [
    {
        id: 1,
        title: 'Product Designer',
        company: 'Figma',
        location: 'San Francisco, CA',
        posted: '2 days ago',
        type: 'Full-time · Entry level',
        applicants: '68 applicants',
        employees: '201-500 employees',
        industry: 'Design',
        recruiting: true,
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
        about:
            'Figma is growing our team of passionate people on a mission to make design accessible to all. We help teams brainstorm, create, test, and ship better designs together. Join us!',
        responsibilities: [
            'Collaborate with Product, Research, Marketing, and others',
            'Design features that ship quickly and with high quality',
            'Create flows, prototypes, and visuals for your features',
            'Mentor and help build a strong design culture',
        ],
        qualifications: [
            'Strong visual and interaction design skills',
            'Interest in design tools and systems',
            'Experience shipping design projects (internships/jobs)',
        ],
    },
];

const JobsDescription = () => {
    const [selectedJob, setSelectedJob] = useState(jobList[0]);
    const [isMobile, setIsMobile] = useState(false);
    const [showDetailMobile, setShowDetailMobile] = useState(false);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCardClick = (job) => {
        setSelectedJob(job);
        if (isMobile) setShowDetailMobile(true);
    };

    const renderJobList = () => (
        <aside className="w-full p-4 overflow-y-auto mt-[70px] md:w-1/3">
            <div className="space-y-4">
                {jobList.map((job) => (
                    <div
                        key={job.id}
                        onClick={() => handleCardClick(job)}
                        className={`bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition cursor-pointer ${selectedJob.id === job.id ? 'border-blue-500 shadow-md' : 'border-gray-200'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <img src={job.logo} alt={job.title} width={40} height={40} className="rounded" />
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>
                                <p className="text-sm text-gray-600">{job.company}</p>
                                <p className="text-xs text-gray-500">{job.type}</p>
                                <p className="text-xs text-gray-400 mt-1">{job.posted} · {job.applicants}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );

    const renderJobDetail = () => (
        <main className="flex-1 overflow-y-auto p-6 mb-10 mt-[70px]">
            {selectedJob && (
                <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
                    {isMobile && (
                        <button
                            onClick={() => setShowDetailMobile(false)}
                            className="mb-4 text-sm text-blue-600 hover:underline"
                        >
                            ← Back to Jobs
                        </button>
                    )}
                    <div className="flex items-center gap-4 mb-6">
                        <Image src={selectedJob.logo} alt={selectedJob.title} width={64} height={64} />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h1>
                            <p className="text-sm text-gray-600">{selectedJob.company}</p>
                            <div className="text-xs text-gray-500 mt-1">
                                {selectedJob.location} · {selectedJob.type}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                        <span>{selectedJob.posted}</span>
                        <span>{selectedJob.applicants}</span>
                        <span>{selectedJob.employees} · {selectedJob.industry}</span>
                        {selectedJob.recruiting && (
                            <span className="text-green-600 font-medium">Actively recruiting</span>
                        )}
                    </div>

                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
                        <p className="text-sm text-gray-700">{selectedJob.about}</p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities</h2>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {selectedJob.responsibilities.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Qualifications</h2>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {selectedJob.qualifications.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <div className="text-center mt-10">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition">
                            Apply Now
                        </button>
                    </div>
                </div>
            )}
        </main>
    );

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#f9f9f9]">
            {isMobile ? (
                showDetailMobile ? renderJobDetail() : renderJobList()
            ) : (
                <>
                    {renderJobList()}
                    {renderJobDetail()}
                </>
            )}
        </div>
    );
};

export default JobsDescription;
