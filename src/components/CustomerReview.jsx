"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { apiGet } from "../../Utils/http";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);

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
    <section className="p-8 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 border-b-2 border-black inline-block">
        Customer Review
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
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
            <div className="flex flex-col bg-white p-6 rounded-xl shadow-md border-l-4 border-green-400 w-full h-full">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReview;
