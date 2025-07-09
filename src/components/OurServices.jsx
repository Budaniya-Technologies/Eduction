// src/components/OurServices.jsx
"use client";
import Image from "next/image";
import { FaClock, FaCommentDots } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const services = [
  {
    title: "Program Title",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/assets/course.webp",
    time: "6 mins ago",
    comments: "39 Comments",
  },
  {
    title: "Program Title",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/assets/course.webp",
    time: "6 mins ago",
    comments: "39 Comments",
  },
  {
    title: "Program Title",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/assets/course.webp",
    time: "6 mins ago",
    comments: "39 Comments",
  },
  {
    title: "Program Title",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/assets/course.webp",
    time: "6 mins ago",
    comments: "39 Comments",
  },
];

export default function OurServices() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-4 border-black inline-block shadow-md px-3">
          Our Services
        </h2>

        {/* Swiper Slider */}
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
          {services.map((service, index) => (
            <SwiperSlide key={index}>
  <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
    <Image
      src={service.image}
      alt={service.title}
      width={400}
      height={200}
      className="w-full h-40 object-cover"
    />
    <div className="p-3">
      <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
    </div>
    <div className="flex justify-between items-center px-3 py-2 border-t text-xs text-gray-600">
      <span className="flex items-center gap-1">
        <FaClock className="text-black text-sm" /> {service.time}
      </span>
      <span className="flex items-center gap-1">
        <FaCommentDots className="text-black text-sm" /> {service.comments}
      </span>
    </div>
  </div>
</SwiperSlide>

          ))}
        </Swiper>
      </div>
    </section>
  );
}
