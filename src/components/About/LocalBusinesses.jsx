"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { apiGet } from "../../../Utils/http";

export default function LocalBusinesses() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await apiGet("api/businesses/");
        setBusinesses(res.data);
      } catch (err) {
        console.error("Failed to fetch businesses:", err);
      }
    };
    fetchBusinesses();
  }, []);

  return (
    <section className="bg-[#f4f4f4] w-full">
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-20 py-4 sm:py-5 md:py-6 flex justify-between items-center border-b border-black mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700">
          Local Businesses
        </h2>
        <a
          href="#"
          className="text-xs sm:text-sm text-black hover:underline flex items-center gap-1"
        >
          See All <span>→</span>
        </a>
      </div>

      {/* Hero Section */}
      <div className="px-4 sm:px-6 md:px-20 flex flex-col md:flex-row md:items-center gap-6 sm:gap-8 mb-6 sm:mb-10">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black leading-tight">
            Learn. Grow. <br /> Succeed.
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 mt-3 sm:mt-4 max-w-lg">
            eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas
            molestias.
          </p>
          <button className="mt-4 sm:mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md border-2 border-black hover:shadow-lg transition duration-300 text-xs sm:text-sm md:text-base">
            Explore All
          </button>
        </div>
      </div>

      {/* Card Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="px-4 sm:px-6 md:px-20"
      >
        {businesses.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden border w-full max-w-[300px] mx-auto mb-10">
              {/* Card Image */}
              <div className="relative h-36 sm:h-40 w-full">
                <img
                  src={item.banner_image || "/assets/default-image.jpg"}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-medium rounded shadow">
                  <img
                    src={item.logo || "/assets/default-image.jpg"}
                    alt={item.name || "Category"}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Tag */}
              <div className="bg-[#c9f4f2] flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2">
                <img
                  src={item.category?.icon || "/assets/default-image.jpg"}
                  alt={item.category?.name || "Category"}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <span className="bg-blue-200 text-blue-800 text-[10px] sm:text-xs px-2 py-1 rounded-full font-semibold">
                  {item.category?.name}
                </span>
              </div>

              {/* Card Details */}
              <div className="px-3 sm:px-4 py-3 space-y-2 text-black text-xs sm:text-sm md:text-base">
                <h3 className="font-bold text-gray-800 mb-1">
                  {(item.title || item.name).length > 20
                    ? (item.title || item.name).substring(0, 20) + "..."
                    : item.title || item.name}
                </h3>
                <p className="text-gray-700 mb-2">
                  {item.description.length > 40
                    ? item.description.substring(0, 40) + "..."
                    : item.description}
                </p>
                <div className="font-medium text-gray-800 space-y-1 border-t pt-2">
                  <div className="flex justify-between">
                    <span>Investment</span>
                    <span className="font-semibold text-black">
                      ₹{item.investment_min || 0}
                      {item.investment_max ? ` - ₹${item.investment_max}` : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Area</span>
                    <span className="font-semibold text-black">
                      {item.area_required || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Franchise</span>
                    <span className="font-semibold text-black">
                      {item.franchise_outlets || "0"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="px-3 sm:px-4 pb-4">
                <button className="w-full border border-red-500 text-red-600 font-medium py-2 rounded-md hover:bg-red-50 text-xs sm:text-sm shadow-sm">
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
