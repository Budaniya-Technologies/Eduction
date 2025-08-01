'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const slidesData = [
  {
    title: 'Online EducationHub',
    description: 'Innovative Online Teaching Mode',
    description2:
      'Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.',
    buttonText: 'Explore now',
    buttonUrl: '#',
    image: '/assets/About-Section-Page.png',
  },
  {
    title: 'Online EducationHub',
    description: 'Innovative Online Teaching Mode',
    description2:
      'Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.',
    buttonText: 'Explore now',
    buttonUrl: '#',
    image: '/assets/About-Section-Page.png',
  },
  {
    title: 'Online EducationHub',
    description: 'Innovative Online Teaching Mode',
    description2:
      'Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.',
    buttonText: 'Explore now',
    buttonUrl: '#',
    image: '/assets/About-Section-Page.png',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slidesData.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  const goToSlide = (index) => setCurrent(index);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [autoplay, current]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="relative h-[90vh] min-h-[500px]">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            <div className="absolute inset-0 bg-gray-900">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover opacity-70"
                priority={index === 0}
              />
            </div>

            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-start">
              <div
                className={`max-w-3xl text-white transform transition-all duration-700 ease-in-out ${
                  index === current ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
              >
                <h2 className="text-lg md:text-xl font-bold text-red-500 mb-2">{slide.title}</h2>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{slide.description}</h1>
                <p className="text-sm sm:text-base md:text-lg mb-6 text-white/90">{slide.description2}</p>
                <a
                  href={slide.buttonUrl}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm sm:text-base md:text-lg font-semibold transition-colors"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center z-30 transition-all"
          aria-label="Previous Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center z-30 transition-all"
          aria-label="Next Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === current ? 'bg-white w-4 md:w-5' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
