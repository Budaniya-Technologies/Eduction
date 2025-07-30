"use client";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { apiGet } from "../../Utils/http";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRouter } from "next/navigation";

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
    <section className="bg-gray-100 py-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 px-4 py-1 bg-white inline-block border-2 rounded-full shadow"
        style={{
          fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
          letterSpacing: '1px',
          wordSpacing: '-3px',
          color: '#000000',
          fontWeight: 400,
          textDecoration: 'none',
          fontStyle: 'normal',
          fontVariant: 'normal',
          textTransform: 'none',}}
        >
          🎓 Top Trending
        </h2>

        {/* Tabs */}
        <div className="flex justify-between items-center flex-wrap mb-4">
          <div className="flex gap-2 sm:gap-4">
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
        </div>

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
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 h-full">
                {/* Image */}
                <div className="w-full h-36 sm:h-40 bg-gray-100 overflow-hidden">
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

                  <p className="text-xs text-gray-700 line-clamp-2 mb-2">
                    {item.description || ""}
                  </p>

                  {activeTab === "Business" && (
                    <div className="text-xs text-gray-800 border-t pt-2 mt-auto space-y-1 font-medium">
                      <div className="flex justify-between">
                        <span>Investment</span>
                        <span>
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
        <div className="flex gap-2 justify-end mt-4">
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
        </div>
      </div>
    </section>
  );
}
