"use client";
import { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Tabs and content
const tabs = ["Jobs", "Business", "Programs"];
const tabData = {
  Jobs: [
    {
      title: "Frontend Developer",
      location: "San Francisco, CA - Remote",
      type: "Full Time",
      description: "Work with modern UI technologies in a collaborative environment.",
      image: "/assets/job.avif",
    },
    {
      title: "UI/UX Designer",
      location: "New York, NY",
      type: "Part Time",
      description: "Design user-friendly and engaging interfaces for our platform.",
      image: "/assets/job.avif",
    },
    {
      title: "React Developer",
      location: "Remote",
      type: "Contract",
      description: "Design user-friendly and engaging interfaces for our platform.",
      image: "/assets/job.avif",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      type: "Full Time",
      description: "Build and maintain backend APIs and microservices.",
      image: "/assets/job.avif",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      type: "Full Time",
      description: "Build and maintain backend APIs and microservices.",
      image: "/assets/job.avif",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      type: "Full Time",
      description: "Build and maintain backend APIs and microservices.",
      image: "/assets/job.avif",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      type: "Full Time",
      description: "Build and maintain backend APIs and microservices.",
      image: "/assets/job.avif",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      type: "Full Time",
      description: "Build and maintain backend APIs and microservices.",
      image: "/assets/job.avif",
    },
  ],
  Business: [
    {
      title: "Business Analyst",
      location: "Seattle, WA",
      type: "Full Time",
      description: "Analyze business trends and present insights to the management.",
      image: "/assets/business.png",
    },
    {
      title: "Marketing Executive",
      location: "Austin, TX",
      type: "Remote",
      description: "Drive digital campaigns and boost brand awareness.",
      image: "/assets/business.png",
    },
    {
      title: "Sales Lead",
      location: "Chicago, IL",
      type: "Full Time",
      description: "Lead B2B sales and drive revenue growth across sectors.",
      image: "/assets/business.png",
    },
    {
      title: "Finance Consultant",
      location: "Online",
      type: "Contract",
      description: "Offer financial advice for strategic decisions.",
      image: "/assets/business.png",
    },
  ],
  Programs: [
    {
      title: "Data Science Bootcamp",
      location: "Online",
      type: "6 Months",
      description: "Intensive hands-on learning in Data Science and ML.",
      image: "/assets/programs.jpg",
    },
    {
      title: "Full Stack Web Development",
      location: "Online",
      type: "3 Months",
      description: "Master both frontend and backend technologies in this program.",
      image: "/assets/programs.jpg",
    },
    {
      title: "Cloud Computing",
      location: "Online",
      type: "2 Months",
      description: "Learn AWS, Azure and GCP essentials for a successful cloud career.",
      image: "/assets/programs.jpg",
    },
    {
      title: "AI & Robotics",
      location: "Online",
      type: "4 Months",
      description: "Explore the world of AI, robotics and machine vision.",
      image: "/assets/programs.jpg",
    },
  ],
};

export default function TopTrending() {
  const [activeTab, setActiveTab] = useState("Jobs");

  return (
    <section className="bg-gray-100 py-14 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
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

        {/* Slider */}
        <div className="mt-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2500 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }, // ✅ 4 Cards per row on large screens
            }}
          >
            {tabData[activeTab].map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src="/assets/job-icon.png"
                        alt="icon"
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {activeTab}
                      </span>
                    </div>
                    <h3 className="text-md font-bold text-gray-800">{item.title}</h3>
                    <div className="flex items-center text-xs text-gray-600 mt-2 gap-2">
                      <FaMapMarkerAlt className="text-gray-800 text-sm" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 mt-1 gap-2">
                      <FaBriefcase className="text-gray-800 text-sm" />
                      <span>{item.type}</span>
                    </div>
                    <p className="text-xs text-gray-700 mt-2 flex-grow">{item.description}</p>
                  </div>
                  <div className="bg-blue-600 text-white text-center py-2 font-semibold text-sm hover:bg-blue-700 cursor-pointer">
                    Explore Now
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
