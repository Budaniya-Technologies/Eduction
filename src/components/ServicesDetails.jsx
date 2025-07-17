'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const sections = {
    story: {
        title: 'Our Story',
        paragraphs: [
            'SynthMind AI was founded in 2019 with a radical idea: that artificial intelligence should enhance human decision-making rather than replace it.',
            'Today, we’re recognized as pioneers in cognitive computing, with our technology powering some of the world’s most innovative companies.',
            'Our name reflects our philosophy — we synthesize human-like understanding with machine precision.',
        ],
        image:
            'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    },

    mission: {
        title: 'Our Mission',
        quote:
            '“To create symbiotic intelligence systems that amplify human potential while maintaining ethical boundaries and transparency.”',
        features: [
            {
                icon: 'fas fa-lightbulb',
                title: 'Augmented Intelligence',
                desc: 'We build tools that enhance human cognition, not replace it.',
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Ethical Framework',
                desc: 'Every system undergoes rigorous ethical review before deployment.',
            },
            {
                icon: 'fas fa-project-diagram',
                title: 'Neural Synthesis',
                desc: 'Our proprietary architecture mimics human neural pathways.',
            },
        ],
    },

    // leadership: [
    //     {
    //         name: 'Dr. Elena Vasquez',
    //         role: 'CEO & Co-Founder',
    //         desc: 'Cognitive computing pioneer with a PhD in Computational Neuroscience from Stanford.',
    //         img: 'https://images.unsplash.com/photo-1590086783191-a0694c7d1e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    //     },
    //     {
    //         name: 'Raj Patel',
    //         role: 'Chief Technology Officer',
    //         desc: 'Former lead architect at DeepMind, specializes in neural-symbolic integration.',
    //         img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    //     },
    //     {
    //         name: 'Dr. Kwame Nkosi',
    //         role: 'Chief Ethics Officer',
    //         desc: 'Author of "The Moral Algorithm" and AI policy advisor to the EU Parliament.',
    //         img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    //     },
    // ],

    impact: [
        { stat: '37+', label: 'Peer-Reviewed Papers' },
        { stat: '84+', label: 'Patents Granted' },
        { stat: '22M+', label: 'Daily Predictions' },
        { stat: '98%', label: 'Client Retention' },
    ],
};

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const ServicesDetails = () => {
    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Hero */}
            <motion.header
                className="text-center py-20 bg-gray-100"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Services Pratham</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
                    Where human creativity meets artificial intelligence to solve tomorrow&apos;s challenges.
                </p>
            </motion.header>

            <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
                {/* Our Story */}
                <motion.section
                    className="flex flex-col md:flex-row gap-12 items-center"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="md:w-1/2 space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">{sections.story.title}</h2>
                        {sections.story.paragraphs.map((para, i) => (
                            <p key={i} className="text-gray-600">{para}</p>
                        ))}
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src={sections.story.image}
                            alt="AI Concept"
                            className="rounded-xl shadow-lg w-full h-auto"
                        />
                    </div>
                </motion.section>

                {/* Our Mission */}
                <motion.section
                    className="bg-gray-50 rounded-xl p-10 text-center"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{sections.mission.title}</h2>
                    <p className="text-xl text-gray-600 mb-10 italic max-w-3xl mx-auto">{sections.mission.quote}</p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {sections.mission.features.map((item, i) => (
                            <div key={i} className="bg-white w-64 p-6 rounded-lg shadow-md">
                                <div className="text-blue-600 mb-4">
                                    <i className={`${item.icon} text-3xl`}></i>
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Leadership */}
                {/* <motion.section
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sections.leadership.map((leader, i) => (
                            <div key={i} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img
                                    src={leader.img}
                                    alt={leader.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-800">{leader.name}</h3>
                                    <p className="text-blue-600 font-medium">{leader.role}</p>
                                    <p className="text-sm text-gray-600 mt-2">{leader.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section> */}

                {/* Impact Stats */}
                <motion.section
                    className="bg-gray-100 rounded-xl p-10 text-center"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-3xl font-bold mb-10">Our Impact</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {sections.impact.map((item, i) => (
                            <div key={i}>
                                <div className="text-4xl font-bold text-blue-500">{item.stat}</div>
                                <div className="text-gray-600 mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.section
                    className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience the SynthMind Difference</h2>
                    <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
                        Join forward-thinking organizations leveraging our cognitive AI platform.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition shadow-md">
                        Schedule a Demo
                    </button>
                </motion.section>
            </main>
        </div>
    );
};

export default ServicesDetails;
