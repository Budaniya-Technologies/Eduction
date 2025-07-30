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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="bg-gray-100 pt-6 pb-2 px-2 sm:pt-10 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl md:text-xl font-bold text-black px-6 py-2 rounded-full shadow-lg border-4 border-white inline-block mb-4"
           style={{
          fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
          letterSpacing: '1px',
          wordSpacing: '-3px',
          color: '#000000',
          fontWeight: 400,
          textDecoration: 'none',
          fontStyle: 'normal',
          fontVariant: 'normal',
          textTransform: 'none',}}
           >
          💼 Courses
        </h2>
          <a
            href="#"
            className="text-xs sm:text-sm text-black font-semibold hover:underline flex items-center gap-1"
          >
            See All <span>→</span>
          </a>
        </div>

        {/* Slider */}
        <div className="relative">
          <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
            {courses.map((item) => (
              <div key={item.id} className="px-1 sm:px-2">
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col 
                  text-xs sm:text-sm p-2 sm:p-4">

                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 bg-white text-black text-[10px] sm:text-xs font-semibold px-2 py-[2px] rounded">
                      🎓 CERTIFICATE
                    </span>
                  </div>

                  {/* Description Tag */}
                  <div className="bg-green-100 text-green-700 font-semibold text-[10px] sm:text-xs px-3 py-1 mt-2">
                    {item.description || "NCERT"}
                  </div>

                  {/* Info Section */}
                  <div className="pt-2 flex flex-col flex-grow">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-gray-600 mb-1">
                      NCERT Course - Full Year Access
                    </p>

                    <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-600 mb-3">
                      <MdOutlineDateRange className="text-orange-500" />
                      <span>Starts: {item.start_date}</span>
                      <FaMapMarkerAlt className="ml-1" />
                      <span>Online</span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto flex justify-between items-center gap-1">
                      <button className="px-2 py-1 text-[10px] sm:text-xs text-black border border-gray-400 rounded hover:bg-gray-200 transition">
                        Info
                      </button>
                      <button className="px-2 py-1 text-[10px] sm:text-xs bg-green-500 text-white rounded hover:bg-green-600 transition">
                        Start
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
