"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBriefcase, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Tabs and their data
const tabs = ["Jobs", "Business", "Programs"];
const tabData = {
  Jobs: [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full Time",
      description: "Work with modern UI technologies.",
      image: "/assets/job.avif",
    },
    {
      title: "UI/UX Designer",
      location: "New York, NY",
      type: "Part Time",
      description: "Design user-friendly interfaces.",
      image: "/assets/job.avif",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      type: "Full Time",
      description: "Build and maintain APIs and services.",
      image: "/assets/job.avif",
    },
    {
      title: "QA Engineer",
      location: "Chicago, IL",
      type: "Contract",
      description: "Ensure quality through testing and validation.",
      image: "/assets/job.avif",
    },
  ],
  Business: [
    {
      title: "Business Analyst",
      location: "Seattle, WA",
      type: "Full Time",
      description: "Analyze trends and deliver insights.",
      image: "/assets/business.png",
    },
    {
      title: "Marketing Executive",
      location: "Austin, TX",
      type: "Remote",
      description: "Plan and execute digital campaigns.",
      image: "/assets/business.png",
    },
    {
      title: "Sales Manager",
      location: "Los Angeles, CA",
      type: "Full Time",
      description: "Drive revenue across B2B channels.",
      image: "/assets/business.png",
    },
    {
      title: "Finance Consultant",
      location: "Online",
      type: "Contract",
      description: "Strategic advice on financial planning.",
      image: "/assets/business.png",
    },
  ],
  Programs: [
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
  ],
};

// Custom arrows
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100"
  >
    <FaArrowLeft className="text-gray-700" />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100"
  >
    <FaArrowRight className="text-gray-700" />
  </div>
);

export default function TopTrending() {
  const [activeTab, setActiveTab] = useState("Jobs");
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gray-100 py-14 px-4 relative">
      <div className="max-w-screen-xl mx-auto">
        {/* Title */}
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
        <div className="mt-10 relative">
          <Slider ref={sliderRef} {...settings}>
            {tabData[activeTab].map((item, idx) => (
              <div key={idx} className="p-2">
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
                        src="/assets/profile.png"
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
              </div>
            ))}
          </Slider>

          {/* Bottom-right slider arrows */}
          <div className="absolute -bottom-10 right-2 z-10 flex gap-2">
            <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
            <NextArrow onClick={() => sliderRef.current?.slickNext()} />
          </div>
        </div>
      </div>
    </section>
  );
}
