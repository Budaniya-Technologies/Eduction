"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "@Bankat suryawanshi",
    rating: 5,
    image: "/assets/profile.png",
    comment:
      "Which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour,",
  },
  {
    name: "@Sneha Patil",
    rating: 4,
    image: "/assets/profile.png",
    comment:
      "Excellent service and easy to use platform. Would highly recommend it to everyone looking for convenience.",
  },
  {
    name: "@Rohan Joshi",
    rating: 5,
    image: "/assets/profile.png",
    comment:
      "Very user-friendly interface. The customer support was responsive and helpful.",
  },
  {
    name: "@Priya Sharma",
    rating: 4,
    image: "/assets/profile.png",
    comment:
      "Great experience overall. Had minor issues initially but everything was resolved quickly.",
  },
  {
    name: "@Amit Mehta",
    rating: 5,
    image: "/assets/profile.png",
    comment:
      "Super fast service! I'm impressed with the ease and simplicity of the process.",
  },
  {
    name: "@Kavita Desai",
    rating: 5,
    image: "/assets/profile.png",
    comment:
      "Really helpful team and clean design. I found exactly what I needed without any hassle.",
  },
];

const CustomerReview = () => {
  return (
    <section className="p-8 bg-gray-100 ">
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
                    src={review.image}
                    alt={review.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-black text-lg">{review.name}</p>
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
                {review.comment}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReview;
