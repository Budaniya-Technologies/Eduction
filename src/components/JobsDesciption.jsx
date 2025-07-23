"use client";
import React, { useState, useEffect } from "react";
// import Image from 'next/image';
import { apiGet } from "../../Utils/http";
import { useSearchParams } from "next/navigation";

const JobsDescription = () => {
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetailMobile, setShowDetailMobile] = useState(false);
  const searchParams = useSearchParams();
  const jobIdFromQuery = searchParams.get("id");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //     const fetchJobs = async () => {
  //         try {
  //             const res = await apiGet('api/job/');
  //             if (Array.isArray(res?.data)) {
  //                 setJobList(res.data);
  //                 setSelectedJob(res.data[0]); // Set first job as default selected
  //             }
  //         } catch (error) {
  //             console.error('Failed to fetch jobs:', error);
  //         }
  //     };

  //     fetchJobs();
  // }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiGet("api/job/");
        if (Array.isArray(res?.data)) {
          setJobList(res.data);

          const foundJob = res.data.find((job) => job.id == jobIdFromQuery);
          if (foundJob) {
            setSelectedJob(foundJob);
          } else {
            setSelectedJob(res.data[0]); // fallback
          }
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, [jobIdFromQuery]);

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
            className={`bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition cursor-pointer ${
              selectedJob?.id === job.id
                ? "border-blue-500 shadow-md"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <img
                src={job.image || "/assets/default-image.jpg"}
                alt={job.title}
                width={40}
                height={40}
                className="rounded"
              />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {job.category?.name || "Category"}
                </p>
                <p className="text-xs text-gray-500">
                  {job.job_type.replace("_", " ")}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(job.posted_at).toLocaleDateString("en-IN")} · Exp:{" "}
                  {job.experience_min}–{job.experience_max} yrs
                </p>
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
            <img
              src={selectedJob.image || "/assets/default-image.jpg"}
              alt={selectedJob.title}
              width={64}
              height={64}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedJob.title}
              </h1>
              <p className="text-sm text-gray-600">
                {selectedJob.subcategory?.name}
              </p>
              <div className="text-xs text-gray-500 mt-1">
                {selectedJob.job_type.replace("_", " ")} ·{" "}
                {selectedJob.salary_min}K–{selectedJob.salary_max}K
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span>
              Posted:{" "}
              {new Date(selectedJob.posted_at).toLocaleDateString("en-IN")}
            </span>
            <span>
              Deadline:{" "}
              {new Date(selectedJob.application_deadline).toLocaleDateString(
                "en-IN"
              )}
            </span>
            <span>
              Experience: {selectedJob.experience_min}–
              {selectedJob.experience_max} yrs
            </span>
          </div>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Job Description
            </h2>
            <p className="text-sm text-gray-700">{selectedJob.description}</p>
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
        showDetailMobile ? (
          renderJobDetail()
        ) : (
          renderJobList()
        )
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
