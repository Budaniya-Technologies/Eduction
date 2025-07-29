"use client";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { apiGet } from "../../Utils/http";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "swiper/css";

const tabs = ["Jobs", "Business"];

export default function TopTrending() {
  const [activeTab, setActiveTab] = useState("Jobs");
  const [jobsData, setJobsData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const router = useRouter();
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiGet("api/job/");
        if (Array.isArray(res?.data)) setJobsData(res.data);
      } catch (err) {
        console.error("Failed to load jobs", err);
      }
    };

    const fetchBusinesses = async () => {
      try {
        const res = await apiGet("api/businesses/");
        if (Array.isArray(res?.data)) setBusinessData(res.data);
      } catch (err) {
        console.error("Failed to load businesses", err);
      }
    };

    fetchJobs();
    fetchBusinesses();
  }, []);

  const getTabData = () => (activeTab === "Jobs" ? jobsData : businessData);

  return (
    <motion.section
      className="bg-gray-100 py-1 px-4 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.h2
          className="Heading text-sm md:text-xl font-bold text-black px-5 py-1 rounded-full shadow-lg border-4 border-white inline-block mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎓Top Trending
        </motion.h2>

        {/* Tabs */}
        <motion.div
          className="flex justify-between items-center flex-wrap mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-3 mt-1 sm:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-bold border-b-2 ${activeTab === tab
                  ? "bg-blue-600 text-white border-lime-400"
                  : "bg-white text-gray-700 border-transparent"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              router.push(
                activeTab === "Jobs"
                  ? "/jobdescription"
                  : "/businessdescription"
              )
            }
            className="text-sm font-semibold text-blue-700 underline hover:text-blue-900 mt-3 sm:mt-0"
          >
            See All →
          </button>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            420: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {getTabData().map((item, idx) => (
            <SwiperSlide key={item.id || idx}>
              {/* <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 max-w-8xl mx-auto h-full"> */}
              {/* Top image */}
              <div>
                <div className="w-full aspect-[4/3] bg-gray-200">
                  <img
                    src={
                      item.banner_image ||
                      item.image ||
                      "/assets/default-image.jpg"
                    }
                    alt={item.title || item.name || "Image"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-2 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={
                        item.category?.icon ||
                        item.category?.image ||
                        "/assets/default-image.jpg"
                      }
                      alt={item.category?.name || "Category"}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                    <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {item.category?.name || activeTab}
                    </span>
                  </div>

                  <h3 className="text-md font-bold text-gray-800 mb-1">
                    {(item.title || item.name).length > 20
                      ? (item.title || item.name).substring(0, 20) + "..."
                      : item.title || item.name}
                  </h3>

                  <div className="flex items-center text-xs text-gray-600 mb-2 gap-2">
                    <FaMapMarkerAlt className="text-gray-800 text-sm" />
                    <span>
                      {item.location || item.category?.name || "India"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    {item.description?.length > 30
                      ? item.description.substring(0, 30) + "..."
                      : item.description}
                  </p>

                  {/* Business-specific */}
                  {activeTab === "Business" && (
                    <div className="font-semibold text-sm line-clamp-2 text-gray-800 space-y-1 border-t pt-3 mt-auto">
                      <div className="flex justify-between">
                        <span>Investment range</span>
                        <span className="font-bold text-black">
                          ₹{item.investment_min || 0}
                          {item.investment_max
                            ? ` - ₹${item.investment_max}`
                            : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area Required</span>
                        <span className="font-bold text-black">
                          {item.area_required || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Franchise Outlets</span>
                        <span className="font-bold text-black">
                          {item.franchise_outlets || "0"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div
                  className="bg-blue-600 text-white text-center py-2 font-semibold text-sm hover:bg-blue-700 cursor-pointer"
                  onClick={() =>
                    router.push(
                      activeTab === "Jobs"
                        ? `/jobdescription?id=${item.id}`
                        : `/businessdescription?id=${item.id}`
                    )
                  }
                >
                  Explore Now
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows */}
        <motion.div
          className="flex gap-3 justify-end mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100"
          >
            <FaArrowRight className="text-gray-700" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
