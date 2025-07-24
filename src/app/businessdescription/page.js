import BusinessDescription from '@/components/BusinessDescription'
import React, { Suspense } from 'react'

function page() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <BusinessDescription/>
    </Suspense>
  )
}

export default page
