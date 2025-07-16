"use client";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiGet("api/job/");
        if (Array.isArray(res?.data)) {
          setJobsData(res.data);
        }
      } catch (err) {
        console.error("Failed to load jobs", err);
      }
    };

    const fetchBusinesses = async () => {
      try {
        const res = await apiGet("api/businesses/");
        if (Array.isArray(res?.data)) {
          setBusinessData(res.data);
        }
      } catch (err) {
        console.error("Failed to load businesses", err);
      }
    };

    fetchJobs();
    fetchBusinesses();
  }, []);

  const getTabData = () => {
    return activeTab === "Jobs" ? jobsData : businessData;
  };

  return (
    <section className="bg-gray-100 py-14 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 border-b-4 border-black inline-block mb-8">
          Top Trending
        </h2>
        {/* Heading and Tabs */}
        <div className="flex justify-between items-center flex-wrap mb-6">
          <div className="flex gap-3 mt-3 sm:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-bold border-b-2 ${
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
            onClick={() => {
              if (activeTab === "Jobs") {
                router.push("/jobdescription");
              } else if (activeTab === "Business") {
                router.push("/businessdescription");
              }
            }}
            className="text-sm font-semibold text-blue-700 underline hover:text-blue-900 mt-3 sm:mt-0"
          >
            See All →
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {getTabData().map((item, idx) => (
            <SwiperSlide key={item.id || idx}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 max-w-[300px] mx-auto h-full">
                {/* Top Image */}
                <div className="w-full h-40">
                  <img
                    src={
                      item.image ||
                      item.banner_image ||
                      "/assets/default-image.jpg"
                    }
                    alt={item.title || "Image"}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={
                        item.category?.image ||
                        item.category?.icon ||
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

                  <h3 className="text-md font-bold text-gray-800">
                    {item.title || item.name}
                  </h3>

                  <div className="flex items-center text-xs text-gray-600 mt-2 gap-2">
                    <FaMapMarkerAlt className="text-gray-800 text-sm" />
                    <span>
                      {item.location || item.category?.name || "India"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 mt-2 flex-grow line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* CTA */}
                <div
                  className="bg-blue-600 text-white text-center py-2 font-semibold text-sm hover:bg-blue-700 cursor-pointer"
                  onClick={() => {
                    if (activeTab === "Jobs") {
                      router.push("/jobdescription");
                    } else if (activeTab === "Business") {
                      router.push("/businessdescription");
                    }
                  }}
                >
                  Explore Now
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
