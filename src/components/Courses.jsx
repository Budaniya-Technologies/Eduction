"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { apiGet } from "../../Utils/http";

// Custom Arrows
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
  const [courses, setCourses] = useState([]);
  let sliderRef;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiGet("school/course/");
        setCourses(res.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gray-100 pt-10 pb-1 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="Heading text-sm md:text-xl font-bold text-black px-5 py-1 rounded-full shadow-lg border-4 border-white inline-block mb-4">
            💼 Courses
          </h2>
          <a
            href="#"
            className="text-black font-semibold hover:underline flex items-center gap-1"
          >
            See All <span>→</span>
          </a>
        </div>

        {/* Slider */}
        <div className="relative">
          <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
            {courses.map((item) => (
              <div key={item.id} className="px-2">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col 
                  sm:max-w-sm sm:mx-auto sm:scale-[0.95] sm:text-sm">

                  {/* Image with aspect ratio */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                      🎓 CERTIFICATE
                    </span>
                  </div>

                  {/* Description Tag */}
                  <div className="bg-green-100 text-green-700 font-semibold text-xs px-4 py-2">
                    {item.description || "NCERT"}
                  </div>

                  {/* Info Section */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      NCERT Course - Full Year Access
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MdOutlineDateRange className="text-orange-500" />
                      <span>Starts: {item.start_date}</span>
                      <FaMapMarkerAlt className="ml-2" />
                      <span>Online</span>
                    </div>

                    {/* Buttons aligned at bottom */}
                    <div className="mt-auto flex justify-between items-center gap-2">
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

          {/* Manual Navigation Arrows */}
          <div className="absolute -bottom-10 right-2 z-10 flex gap-2">
            <PrevArrow onClick={() => sliderRef?.slickPrev()} />
            <NextArrow onClick={() => sliderRef?.slickNext()} />
          </div>
        </div>
      </div>
    </section>
  );
}
