"use client";
import Image from "next/image";
import { FaClock, FaCommentDots, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  // ... repeat or add more items
];

export default function OurServices() {
  let sliderRef = null;

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Custom arrows instead
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gray-100 py-16 px-4 relative">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b-4 border-black inline-block shadow-md px-3">
          Our Services
        </h2>

        <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
          {services.map((service, index) => (
            <div key={index} className="px-2">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
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
            </div>
          ))}
        </Slider>

        {/* Slider Arrow Icons Bottom Right */}
        <div className="absolute -bottom-10 right-0 flex gap-3 pr-2 z-10">
          <button
            onClick={() => sliderRef?.slickPrev()}
            className="p-2 bg-white border rounded-full shadow hover:bg-gray-200 transition"
          >
            <FaArrowLeft className="text-black" />
          </button>
          <button
            onClick={() => sliderRef?.slickNext()}
            className="p-2 bg-white border rounded-full shadow hover:bg-gray-200 transition"
          >
            <FaArrowRight className="text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
