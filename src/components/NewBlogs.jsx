'use client';
import React from 'react';

// Blog Posts Array
const blogPosts = [
    {
        image: 'https://i.pinimg.com/1200x/8b/df/20/8bdf2037e4f6f6dd7687a0ebdd975933.jpg',
        title: 'My First Blog Post',
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        ],
    },
    {
        image: 'https://i.pinimg.com/1200x/8b/df/20/8bdf2037e4f6f6dd7687a0ebdd975933.jpg',
        title: 'My Second Blog Post',
        paragraphs: [
            'This is a second article to test dynamic blog content rendering.',
            'It also includes useful information with a similar layout.',
        ],
    },
];

// Sidebar Links Array
const importantLinks = [
    { name: 'Technology', },
    { name: 'Travel', },
    { name: 'Food', },
    { name: 'Education', },
];

const NewBlogs = () => {
    return (
        <main className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">
                {blogPosts.map((post, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-8">
                        {/* Blog Post Left Side */}
                        <div className="md:w-8/12">
                            <img
                                src={post.image}
                                alt={`Blog Image ${index + 1}`}
                                className="w-full h-72 sm:h-96 object-cover rounded-xl shadow-md"
                            />
                            <h1 className="text-4xl sm:text-5xl font-bold mt-6 mb-4 text-gray-900">
                                {post.title}
                            </h1>
                            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                {post.paragraphs.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Right Side */}
                        <aside className="md:w-4/12 bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Important Links</h2>
                            <ul className="space-y-3 text-gray-700">
                                {importantLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <a
                                            href="#"
                                            className="hover:text-blue-600 transition-colors flex items-center gap-2"
                                        >
                                            <span>🔗</span> {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default NewBlogs;
