'use client';
import React from 'react';
import BusinessHeader from '@/components/BusinessHeader';
import BusinessTabs from '@/components/BusinessTabs';

const dummyData = {
  name: 'Modern Unisex Salon',
  rating: 5.0,
  reviews: 2,
  isClaimed: true,
  location: 'Andheri West, Mumbai',
  contact: '07795677357',
  timing: 'Open until 10:00 pm',
  businessSince: '2025',
  tags: ['Waxing', 'Bridal Makeup'],
  offers: [
    {
      title: 'Get Upto 25% Off',
      expiry: '31 Jul 2025',
      img: '/images/offer1.png',
    },
    {
      title: 'Special Women’s Offer',
      expiry: '31 Jul 2025',
      img: '/images/offer2.png',
    },
  ],
  services: [
    { title: 'Waxing', icon: '🦵' },
    { title: 'Bridal Makeup', icon: '💄' },
    { title: 'Hair Spa', icon: '🧖‍♀️' },
    { title: 'Facial', icon: '🧴' },
    { title: 'Home Services', icon: '🏠' },
  ],
  address:
    'Shop No 2B, Akhand Jyoti Society, Next to Gurudwara, JP Road, Andheri West, Mumbai - 400053',
  photos: [
    '/images/hair1.jpg',
    '/images/store.jpg',
    '/images/facility.jpg',
    '/images/exterior.jpg',
  ],
};

const BusinessProfilePage = () => {
  return (
    <div className="bg-white text-black py-20 min-h-screen p-4">
      <BusinessHeader data={dummyData} />
      <BusinessTabs data={dummyData} />
    </div>
  );
};

export default BusinessProfilePage;
