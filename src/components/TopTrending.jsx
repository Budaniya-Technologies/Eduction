"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { apiGet } from "../../Utils/http";

const tabs = ["Jobs", "Business",];

const programsData = [
  {
    title: "Data Science Bootcamp",
    location: "Online",
    type: "6 Months",
    description: "Learn Data Science with hands-on training.",
    image: "/assets/programs.jpg",
  },
  {
    title: "Full Stack Web Dev",
    location: "Online",
    type: "3 Months",
    description: "Become a full stack web developer.",
    image: "/assets/programs.jpg",
  },
  {
    title: "Cloud Computing",
    location: "Online",
    type: "2 Months",
    description: "Master AWS, Azure, and GCP.",
    image: "/assets/programs.jpg",
  },
  {
    title: "AI & Robotics",
    location: "Online",
    type: "4 Months",
    description: "Explore AI, robotics and automation.",
    image: "/assets/programs.jpg",
  },
];

export default function TopTrending() {
  const [activeTab, setActiveTab] = useState("Jobs");
  const [jobsData, setJobsData] = useState([]);
  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiGet("api/job/");
        if (Array.isArray(res?.data)) {
          let delay = 500;
          res.data.forEach((item, index) => {
            setTimeout(() => {
              setJobsData((prev) => [...prev, item]);
            }, delay * (index + 1));
          });
        }
      } catch (err) {
        console.error("Failed to load jobs", err);
      }
    };

    const fetchBusinesses = async () => {
      try {
        const res = await apiGet("api/businesses/");
        if (Array.isArray(res?.data)) {
          let delay = 500;
          res.data.forEach((item, index) => {
            setTimeout(() => {
              setBusinessData((prev) => [...prev, item]);
            }, delay * (index + 1));
          });
        }
      } catch (err) {
        console.error("Failed to load businesses", err);
      }
    };

    fetchJobs();
    fetchBusinesses();
  }, []);

  const getTabData = () => {
    if (activeTab === "Jobs") return jobsData;
    if (activeTab === "Business") return businessData;
    return programsData;
  };

  return (
    <section className="bg-gray-100 py-14 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-4 border-black inline-block shadow-md px-3">
          Top Trending
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mt-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-t-md text-lg font-bold border-b-4 ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-lime-400 shadow"
                  : "bg-white text-gray-700 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {getTabData().map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300"
            >
              {/* Top Image */}
              <div className="w-full h-40 relative">
                <img
                  src={item.image || item.banner_image || "/assets/default-image.jpg"}
                  alt={item.title || "Image"}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Top icon + category */}
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={item.category?.image || item.category?.icon || "/assets/default-image.jpg"}
                    alt={item.category?.name || "Category"}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {item.category?.name || activeTab}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-md font-bold text-gray-800">
                  {item.title || item.name}
                </h3>

                {/* Location */}
                <div className="flex items-center text-xs text-gray-600 mt-2 gap-2">
                  <FaMapMarkerAlt className="text-gray-800 text-sm" />
                  <span>{item.category?.name || item.location || "India"}</span>
                </div>

                {/* Job Type */}
                {/* {item.job_type && (
                  <div className="flex items-center text-xs text-gray-600 mt-1 gap-2">
                    <FaBriefcase className="text-gray-800 text-sm" />
                    <span>{item.job_type.replaceAll("_", " ")}</span>
                  </div>
                )} */}

                {/* Description */}
                <p className="text-xs text-gray-700 mt-2 flex-grow line-clamp-3">
                  {item.description}
                </p>

                {/* Experience */}
                {/* {item.experience_min !== undefined && (
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Experience:</strong> {item.experience_min}–{item.experience_max} yrs
                  </p>
                )} */}

                {/* Salary */}
                {/* {item.salary_min !== undefined && (
                  <p className="text-xs text-gray-500">
                    <strong>Salary:</strong> ₹{item.salary_min}–{item.salary_max}
                  </p>
                )} */}

                {/* Dates */}
                {/* {item.posted_at && (
                  <p className="text-xs text-gray-500 mt-1">
                    <strong>Posted:</strong>{" "}
                    {new Date(item.posted_at).toLocaleDateString("en-IN")}
                  </p>
                )}

                {item.application_deadline && (
                  <p className="text-xs text-gray-500">
                    <strong>Deadline:</strong>{" "}
                    {new Date(item.application_deadline).toLocaleDateString("en-IN")}
                  </p>
                )} */}
              </div>

              {/* CTA */}
              <div className="bg-blue-600 text-white text-center py-2 font-semibold text-sm hover:bg-blue-700 cursor-pointer">
                Explore Now
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
