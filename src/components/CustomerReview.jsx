"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { apiGet } from "../../Utils/http";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiGet("api/testimonials/");
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className="p-8 bg-gray-100"
    >
      <motion.h2
        className="Heading text-sm md:text-xl font-bold text-black px-5 py-1 rounded-full shadow-lg border-4 border-white inline-block mb-4"
        variants={fadeInUp}
      >
        📝 Customer Review
      </motion.h2>
       
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-400 w-full h-full"
            >
              <div className="flex items-center mb-4 space-x-4">
                <div className="w-14 h-14 relative">
                  <Image
                    src="/assets/profile.png"
                    alt="User"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-black text-lg">User #{review.user}</p>
                  <div className="flex text-yellow-400">
                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                {review.content}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        className="flex gap-3 justify-end mt-5"
        variants={fadeInUp}
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
    </motion.section>
  );
};

export default CustomerReview;
