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
    <section className="bg-gray-100 py-1 relative" style={{paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-xl md:text-xl font-bold text-black px-6 py-2 rounded-full shadow-lg border-4 border-white inline-block mb-4">
          🎓Top Treanding 
        </h2>

        {/* Tabs */}
        <div className="flex justify-between items-center flex-wrap mb-6">
          <div className="flex gap-3 mt-1 sm:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs sm:text-sm rounded-md font-bold border-b-2 ${
                  activeTab === tab
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
            className="text-xs sm:text-sm font-semibold text-blue-700 underline hover:text-blue-900 mt-2 sm:mt-0"
          >
            See All →
          </button>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          loop
          spaceBetween={12}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1440: { slidesPerView: 6 },
          }}
        >
          {getTabData().map((item, idx) => (
            <SwiperSlide key={item.id || idx}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 max-w-7xl mx-auto h-full">
                {/* Top image */}
                <div className="w-full aspect-[4/3] bg-gray-200">
                  <img
                    src={
                      item.banner_image ||
                      item.image ||
                      "/assets/default-image.jpg"
                    }
                    alt={item.title || item.name || "Image"}
                    className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-2 sm:p-3 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={
                        item.category?.icon ||
                        item.category?.image ||
                        "/assets/default-image.jpg"
                      }
                      alt={item.category?.name || "Category"}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">
                      {item.category?.name || activeTab}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
                    {(item.title || item.name)?.substring(0, 30)}
                  </h3>

                  <div className="flex items-center text-xs text-gray-600 gap-1 mb-1">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <span className="line-clamp-1">
                      {item.location || item.category?.name || "India"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + "..."
                      : item.description}
                  </p>

                  {/* Business specific data */}
                  {activeTab === "Business" && (
                    <div className="font-semibold text-sm line-clamp-2 text-gray-800 space-y-1 border-t pt-3 mt-auto">
                      <div className="flex justify-between ">
                        <span>Investment range</span>
                        <span className="font-bold text-black">
                          ₹{item.investment_min || 0}
                          {item.investment_max
                            ? ` - ₹${item.investment_max}`
                            : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area</span>
                        <span>{item.area_required || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outlets</span>
                        <span>{item.franchise_outlets || "0"}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Button */}
                <div
                  className="bg-blue-600 text-white text-center py-2 font-semibold text-sm hover:bg-blue-700 cursor-pointer"
                  // onClick={() =>
                  //   router.push(
                  //     activeTab === "Jobs"
                  //       ? "/jobdescription"
                  //       : "/businessdescription"
                  //   )
                  // }
                  onClick={() =>
                    router.push(
                      activeTab === "Jobs"
                        ? `/jobdescription?id=${item.id}`
                        : `/businessdescription?id=${item.id}`
                    )
                  }
                  className="bg-blue-600 text-white text-center py-1.5 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-blue-700"
                >
                  Explore Now
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows */}
        <div className="flex gap-3 justify-end mt-5">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 bg-white border rounded-full hover:bg-gray-100"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 bg-white border rounded-full hover:bg-gray-100"
          >
            <FaArrowRight className="text-gray-700" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
