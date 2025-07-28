"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaClock,
  FaCommentDots,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { apiGet } from "../../Utils/http";

export default function OurServices() {
  const [services, setServices] = useState([]);
  const swiperRef = useRef(null);

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
    <section className="bg-gray-100 pt-16 pb-1 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-xl font-extrabold text-black px-6 py-2 rounded-full shadow-lg border-4 border-white inline-block mb-4">
          🎓 Our Services
        </h2>

        {services.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">
            No active services available.
          </p>
        ) : (
          <>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      width={400}
                      height={300}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {service.url
                          ? `URL: ${service.url}`
                          : "More info coming soon."}
                      </p>
                    </div>
                    {/* <div className="flex justify-between items-center px-3 py-1 border-t text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-black text-sm" /> Recently
                        Added
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCommentDots className="text-black text-sm" /> 0
                        Comments
                      </span>
                    </div> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex gap-3 justify-end mt-10">
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
            </div>
          </>
        )}
      </div>
    </section>
  );
}
