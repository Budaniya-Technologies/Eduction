"use client";
import { useEffect, useRef, useState } from "react";
import { apiGet } from "../../Utils/http";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function OurServices() {
  const [services, setServices] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiGet("api/services/");
        const data = response.data;

        const activeServices = Array.isArray(data)
          ? data.filter((item) => item.is_active === true)
          : [];

        setServices(activeServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Auto-scroll logic for mobile horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: container.clientWidth * 0.5, behavior: "smooth" });
      }
    }, 3000); // every 3 seconds

    return () => clearInterval(scrollInterval);
  }, [services]);

  return (
    <section className="bg-gray-100 pt-16 pb-4 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-extrabold text-black mb-6 text-center">
          🎓 Our Services
        </h2>

        {/* Mobile View (auto-scrollable horizontal list) */}
        <div className="md:hidden overflow-x-auto" ref={scrollRef}>
          <div className="flex gap-4 w-max px-1">
            {services.map((service, index) => (
              <div
                key={index}
                className="min-w-[45%] bg-white rounded-lg flex flex-col items-center justify-center p-4 shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: service.bgColor || "#e0e0e0",
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View (Swiper Carousel) */}
        <div className="hidden md:block">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden text-center p-6">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-40 object-cover mb-3 rounded"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.url
                      ? `URL: ${service.url}`
                      : "More info coming soon."}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
