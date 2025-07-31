"use client";
import { useEffect, useState } from "react";
import { apiGet } from "../../Utils/http";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function OurServices() {
  const [services, setServices] = useState([]);

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

  return (
    <section className="bg-gray-100 pt-10 pb-2 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 px-4 py-1 bg-white inline-block border-2 rounded-full shadow">
          🎓 Our Services
        </h2>

  <div className="md:hidden px-2 py-2">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={4}
        spaceBetween={8}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-start p-2">
              {/* Image Circle */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md mb-2 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-12 h-12 object-contain transition-transform duration-300 hover:scale-125"
                />
              </div>

              {/* Text */}
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight h-8 flex items-center justify-center">
                {service.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>


        {/* Desktop View - Swiper Carousel with minimal spacing */}
        <div className="hidden md:block">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={8} // 0.5rem
            slidesPerView={8}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="!pr-0"
          >
            {services.map((service, index) => (
              <SwiperSlide
                key={index}
                className={index === services.length - 1 ? "!pr-0" : ""}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md mb-2 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-14 h-14 object-contain transition-transform duration-300 hover:scale-125"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {service.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
