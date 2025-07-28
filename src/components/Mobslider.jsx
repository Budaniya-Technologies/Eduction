"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

// Import your images here
import img1 from "../../public/assets/news.jpeg";
import img2 from "../../public/assets/student.png";
import img3 from "../../public/assets/news1.jpeg";

const slideImages = [img1, img2, img3];

const MobSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const slideInterval = useRef(null);

    useEffect(() => {
        startSlideTimer();
        return () => stopSlideTimer();
    }, [activeSlide]);

    const startSlideTimer = () => {
        stopSlideTimer();
        slideInterval.current = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slideImages.length);
        }, 3000);
    };

    const stopSlideTimer = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
    };

    const goToSlide = (index) => {
        setActiveSlide(index);
        stopSlideTimer();
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
        stopSlideTimer();
    };

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slideImages.length);
        stopSlideTimer();
    };

    return (
        <section className="bg-gray-100 p-2">
            <div className="max-w-3xl mx-auto relative group">
                {/* Slide Container */}
                <div className="relative overflow-hidden rounded-lg shadow-xl h-64">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    >
                        {slideImages.map((img, index) => (
                            <div
                                key={index}
                                className="min-w-full h-64 flex-shrink-0 relative"
                            >
                                <Image
                                    src={img}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prev Button */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2.5 transition-colors z-10"
                >
                    <FaArrowLeft className="w-3 h-3 text-black" />
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2.5 transition-colors z-10"
                >
                    <FaArrowRight className="w-3 h-3 text-black" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {slideImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`w-4 h-2 rounded-full transition-colors ${activeSlide === i ? "bg-white" : "bg-white/50"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MobSlider;
