'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import SubjectPage from '@/components/SubjectPage';

const SubjectLearningPage = () => {
  const { subject } = useParams();

  return (
    <div className='py-10'>
    <SubjectPage  subject={subject.charAt(0).toUpperCase() + subject.slice(1)} />
    </div>
  );
};

export default SubjectLearningPage;
