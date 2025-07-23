import JobDesciptipon from '@/components/JobsDesciption'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDesciptipon />
    </Suspense>
  )
}

export default page
