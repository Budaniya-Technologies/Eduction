'use client';
import React, { useEffect, useState } from 'react';
import StudentDashboard from '@/components/student-dashboard';
import JobSeekerDashboard from '@/components/JobSeekerDashboard';
import BusinessSeekerDashboard from '@/components/BusinessSeekerDashboard';
import { useRouter } from 'next/navigation';

const UserDashboard = () => {

  const router = useRouter();
  useEffect(() => {
      router.push('/user-dashboard');
  }, [router]);

  const [selectedDashboards, setSelectedDashboards] = useState([]);

  useEffect(() => {
    // ✅ Safe to call router.push() inside useEffect
    router.push('/user-dashboard');

    try {
      const services = JSON.parse(localStorage.getItem("selectedServices")) || [];
      console.log("Selected services from localStorage:", services);

      if (services.includes("user")) {
        setSelectedDashboards(["students", "jobseeker", "business seeker"]);
      } else {
        setSelectedDashboards(services);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">User Dashboard</h1>

      {selectedDashboards.length === 0 && (
        <div className="text-center text-gray-600">
          No dashboards selected. Please go back and choose a user type.
        </div>
      )}

      <div className="space-y-8">
        {selectedDashboards.includes("students") && (
          <div className="border rounded-lg p-4 shadow-md bg-white">
            <StudentDashboard />
          </div>
        )}
        {selectedDashboards.includes("jobseeker") && (
          <div className="border rounded-lg p-4 shadow-md bg-white">
            <JobSeekerDashboard />
          </div>
        )}
        {selectedDashboards.includes("business seeker") && (
          <div className="border rounded-lg p-4 shadow-md bg-white">
            <BusinessSeekerDashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
