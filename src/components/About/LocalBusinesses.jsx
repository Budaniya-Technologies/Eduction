"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import certImg from "/public/assets/teacherAbout.jpeg";
import badgeIcon from "/public/assets/check.png";
import certLabel from "/public/assets/education.png";

const businessCards = [1, 2, 3, 4, 5, 6];

export default function LocalBusinesses() {
  return (
    <section className="bg-[#f4f4f4] px-0 py-12 w-full">
      {/* Header */}
      <div className="px-6 md:px-20 flex justify-between items-center border-b border-black pb-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
          Local Businesses
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-black hover:underline flex items-center gap-1"
        >
          See All <span>→</span>
        </a>
      </div>

      {/* Hero Section */}
      <div className="px-6 md:px-20 flex flex-col md:flex-row md:items-center gap-10 mb-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Learn. Grow. <br /> Succeed.
          </h1>
          <p className="text-gray-700 text-base mt-4 max-w-lg">
            eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas
            molestias.
          </p>
          <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-md border-2 border-black hover:shadow-lg transition duration-300">
            Explore All
          </button>
        </div>
      </div>

      {/* Card Slider with 4 per row */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }, // Show 4 cards on wide screens
        }}
        className="px-6 md:px-20"
      >
        {businessCards.map((_, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden border w-full max-w-[300px] mx-auto">
              {/* Card Image */}
              <div className="relative h-40 w-full">
                <Image src={certImg} alt="classroom" fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-medium rounded shadow">
                  <Image
                    src={certLabel}
                    alt="cert"
                    width={18}
                    height={18}
                    className="inline-block mr-1"
                  />
                  CERTIFICATE
                </div>
              </div>

              {/* Tag */}
              <div className="bg-[#c9f4f2] flex items-center gap-2 px-4 py-2">
                <Image src={badgeIcon} alt="badge" width={20} height={20} />
                <span className="text-sm font-medium text-[#2e7d32]">Retails</span>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-2 text-sm text-black">
                <h3 className="text-lg font-bold">TTk Prestige</h3>
                <p>
                  <strong>Investment range</strong> ₹ 20L – 30L
                </p>
                <p>
                  <strong>Area Required</strong> 400–1000
                </p>
                <p>
                  <strong>Franchise Outlets</strong>{" "}
                  <span className="font-bold">500–1000</span>
                </p>
              </div>

              {/* Button */}
              <div className="px-4 pb-4">
                <button className="w-full border border-red-500 text-red-600 font-semibold py-2 rounded-md hover:bg-red-50 shadow-sm">
                  Know More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
