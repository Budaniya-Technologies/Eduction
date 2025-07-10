"use client";
import Image from "next/image";
import Slider from "react-slick";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const courseData = Array(8).fill({
  level: "LEVEL TEXT HERE",
  title: "Class 6th",
  subtitle: "Course Title Here - Ncert",
  date: "June 2, 2025",
  detail: "Detail 2",
  image: "/assets/course.webp", // Your image path in public/assets
});

// Custom arrows
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100"
  >
    <FaArrowLeft className="text-gray-700" />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100"
  >
    <FaArrowRight className="text-gray-700" />
  </div>
);

export default function Courses() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false, // We’ll use manual arrows below
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  let sliderRef;

  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800 border-b-4 border-black inline-block">
            Courses
          </h2>
          <a href="#" className="text-black font-semibold hover:underline flex items-center gap-1">
            See All <span>→</span>
          </a>
        </div>

        {/* Slider with custom arrows */}
        <div className="relative">
          <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
            {courseData.map((item, idx) => (
              <div key={idx} className="px-2">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                      🎓 CERTIFICATE
                    </span>
                  </div>

                  {/* Level Bar */}
                  <div className="bg-green-100 text-green-700 font-semibold text-xs px-4 py-2">
                    {item.level}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
                      <MdOutlineDateRange className="text-orange-500" />
                      <span className="text-sm">Starts: {item.date}</span>
                      <FaMapMarkerAlt className="ml-2" />
                      <span>{item.detail}</span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-between items-center gap-2">
                      <button className="px-3 py-1 text-black border border-gray-400 rounded text-sm hover:bg-gray-200 transition">
                        More Info
                      </button>
                      <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition">
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Arrows in bottom-right corner */}
          <div className="absolute -bottom-10 right-2 z-10 flex gap-2">
            <PrevArrow onClick={() => sliderRef?.slickPrev()} />
            <NextArrow onClick={() => sliderRef?.slickNext()} />
          </div>
        </div>
      </div>
    </section>
  );
}
