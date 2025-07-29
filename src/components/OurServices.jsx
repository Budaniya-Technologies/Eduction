"use client";
import { useEffect, useRef, useState } from "react";
import { apiGet } from "../../Utils/http";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: container.clientWidth * 0.5, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [services]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="bg-gray-100 pt-16 pb-4 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-xl font-extrabold text-black mb-6 text-left Heading"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          🎓 Our Services
        </motion.h2>

        {/* Mobile View (auto-scrollable horizontal list) */}
        <motion.div
          className="md:hidden overflow-x-auto"
          ref={scrollRef}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-4 w-max px-1">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="min-w-[45%] bg-white rounded-lg flex flex-col items-center justify-center p-4 shadow-sm"
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: service.bgColor || "#e0e0e0" }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop View (Swiper Carousel) */}
        <motion.div className="hidden md:block" variants={fadeUp} transition={{ duration: 0.6 }}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden text-center p-6"
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
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
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
}
