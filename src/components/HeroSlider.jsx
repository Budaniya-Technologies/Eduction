"use client";
import { useEffect, useState } from "react";
import { apiGet } from "../../Utils/http";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await apiGet("/api/slider/");
        if (Array.isArray(response?.data)) {
          const transformedSlides = response.data.flatMap((item) =>
            item.slides.map((slide) => ({
              title: slide.caption || item.name || "Online EducationHub",
              description: item.name || "",
              image: slide.image,
              mobile_image: slide.mobile_image,
              buttonUrl: slide.button?.link || "#",
              buttonText: slide.button?.text || "Explore Now",
              bg: slide.bg || "#ffffff",
            }))
          );
          setSlides(transformedSlides);
        }
      } catch (err) {
        console.error("Failed to fetch slides", err);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrent(index);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [autoplay, current, slides]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="relative w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={` transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
            style={{ backgroundColor: slide.bg }}
          >
            {/* Background Images */}
            <div className="w-full">
              {/* Mobile Image */}
              <img
                src={slide.mobile_image}
                alt={slide.title}
                className="block md:hidden w-full h-auto object-cover"
              />
              {/* Desktop Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="hidden md:block w-full h-auto object-cover"
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center px-4 md:px-[100px]">
              <div
                className={`max-w-3xl text-black transform transition-all duration-700 ease-in-out ${index === current ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                  }`}
              >
                <h2 className="text-lg md:text-xl font-bold text-red-400 mb-2">
                  {slide.title}
                </h2>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                  {slide.description}
                </h1>
                {slide.buttonText && (
                  <a
                    href={slide.buttonUrl}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm sm:text-base md:text-lg font-semibold transition-colors"
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center z-40"
          aria-label="Previous Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center z-40"
          aria-label="Next Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === current ? "bg-white w-4 md:w-5" : "bg-white/40"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";
// import { apiGet } from "../../Utils/http";

// export default function HeroSlider() {
//   const [slides, setSlides] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [autoplay, setAutoplay] = useState(true);

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const response = await apiGet("/api/slider/");
//         if (Array.isArray(response?.data)) {
//           const transformedSlides = response.data.flatMap((item) =>
//             item.slides.map((slide) => ({
//               title: slide.caption || item.name || "Online EducationHub",
//               description: item.name || "",
//               image: slide.image,
//               mobile_image: slide.mobile_image,
//               buttonUrl: slide.button?.link || "#",
//               buttonText: slide.button?.text || "Explore Now",
//               bg: slide.bg || "#ffffff",
//             }))
//           );
//           setSlides(transformedSlides);
//         }
//       } catch (err) {
//         console.error("Failed to fetch slides", err);
//       }
//     };

//     fetchSlides();
//   }, []);

//   const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
//   const prevSlide = () =>
//     setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
//   const goToSlide = (index) => setCurrent(index);

//   useEffect(() => {
//     if (!autoplay) return;
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, [autoplay, current, slides]);

//   if (slides.length === 0) return null;

//   return (
//     <div
//       className="relative overflow-hidden"
//       onMouseEnter={() => setAutoplay(false)}
//       onMouseLeave={() => setAutoplay(true)}
//     >
//       <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh]">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
//               index === current ? "opacity-100 z-20" : "opacity-0 z-10"
//             }`}
//             style={{ backgroundColor: slide.bg }}
//           >
//             {/* Responsive Background Images */}
//             <div className="absolute inset-0">
//               {/* Mobile Image */}
//               <img
//                 src={slide.mobile_image}
//                 alt={slide.title}
//                 className="block md:hidden w-full h-full object-contain"
//               />
//               {/* Desktop Image */}
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="hidden md:block w-full h-full object-contain"
//               />
//             </div>

//             {/* Content Overlay */}
//             <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-start relative z-30">
//               <div
//                 className={`max-w-3xl text-black transform transition-all duration-700 ease-in-out ${
//                   index === current
//                     ? "translate-x-0 opacity-100"
//                     : "translate-x-10 opacity-0"
//                 }`}
//               >
//                 <h2 className="text-lg md:text-xl font-bold text-red-400 mb-2">
//                   {slide.title}
//                 </h2>
//                 <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
//                   {slide.description}
//                 </h1>
//                 {slide.buttonText && (
//                   <a
//                     href={slide.buttonUrl}
//                     className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm sm:text-base md:text-lg font-semibold transition-colors"
//                   >
//                     {slide.buttonText}
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Navigation Arrows */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center z-40"
//           aria-label="Previous Slide"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 md:h-6 md:w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center z-40"
//           aria-label="Next Slide"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 md:h-6 md:w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>

//         {/* Dot Indicators */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
//                 index === current ? "bg-white w-4 md:w-5" : "bg-white/40"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



