// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";

// import badgeIcon from "/public/assets/check.png";
// import certLabel from "/public/assets/education.png";
// import { apiGet } from "../../../Utils/http";

// export default function LocalBusinesses() {
//   const [businesses, setBusinesses] = useState([]);

//   useEffect(() => {
//     const fetchBusinesses = async () => {
//       try {
//         const res = await apiGet("api/businesses/");
//         setBusinesses(res.data);
//       } catch (err) {
//         console.error("Failed to fetch businesses:", err);
//       }
//     };
//     fetchBusinesses();
//   }, []);

//   return (
//     <section className="bg-[#f4f4f4] px-0 w-full">
//       {/* Header */}
//       <div className="px-6 md:px-20 flex justify-between items-center border-b border-black pb-8 mb-6">
//         <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
//           Local Businesses
//         </h2>
//         <a
//           href="#"
//           className="text-sm font-medium text-black hover:underline flex items-center gap-1"
//         >
//           See All <span>→</span>
//         </a>
//       </div>

//       {/* Hero Section */}
//       <div className="px-6 md:px-20 flex flex-col md:flex-row md:items-center gap-10 mb-10">
//         <div className="flex-1">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
//             Learn. Grow. <br /> Succeed.
//           </h1>
//           <p className="text-gray-700 text-base mt-4 max-w-lg">
//             eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
//             praesentium voluptatum deleniti atque corrupti quos dolores et quas
//             molestias.
//           </p>
//           <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-md border-2 border-black hover:shadow-lg transition duration-300">
//             Explore All
//           </button>
//         </div>
//       </div>

//       {/* Card Slider */}
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={20}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         loop={true}
//         breakpoints={{
//           0: { slidesPerView: 1.2 },
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//           1280: { slidesPerView: 4 },
//         }}
//         className="px-6 md:px-20"
//       >
//         {businesses.map((item, index) => (
//           <SwiperSlide key={index}>
//             <div className="bg-white rounded-xl shadow-md overflow-hidden border w-full max-w-[300px] mx-auto mb-20">
//               {/* Card Image */}
//               <div className="relative h-40 w-full">
//                 <img
//                   src={item.banner_image || "/assets/default-image.jpg"}
//                   alt={item.name}
//                   className="object-cover w-full h-full"
//                 />
//                 <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-medium rounded shadow flex gap-2">
//                    <img
//                     src={item.logo || "/assets/default-image.jpg"}
//                     alt={item.name || "Category"}
//                     width={28}
//                     height={28}
//                     className="rounded-full object-cover"
//                   />
//                   CERTIFICATE
//                 </div>
//               </div>

//               {/* Tag */}
//               <div className="bg-[#c9f4f2] flex items-center gap-2 px-4 py-2">
//  <img
//     src={item.category?.icon || "/assets/default-image.jpg"}
//     alt={item.category?.name || "Category"}
//     width={28}
//     height={28}
//     className="rounded-full object-cover"
//   />
//   <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
//     {item.category?.name}
//   </span>
//               </div>

//               {/* Card Details */}
//               <div className="p-4 space-y-2 text-sm text-black">
//                 <h3 className="text-lg font-bold">{item.name}</h3>
//                 <p className="line-clamp-2">{item.description}</p>
//               </div>

//               {/* Button */}
//               <div className="px-4 pb-4">
//                 <button className="w-full border border-red-500 text-red-600 font-semibold py-2 rounded-md hover:bg-red-50 shadow-sm">
//                   Know More
//                 </button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }

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
    <section className="bg-[#f4f4f4] px-0 w-full">
      {/* Header */}
      <div className="px-6 md:px-20 flex justify-between items-center border-b border-black pb-8 mb-6">
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

      {/* Card Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="px-6 md:px-20"
      >
        {businesses.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden border w-full max-w-[300px] mx-auto mb-20">
              {/* Card Image */}
              <div className="relative h-40 w-full">
                <img
                  src={item.banner_image || "/assets/default-image.jpg"}
                  alt={item.name}
                  fill
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
                  {/* CERTIFICATE */}
                </div>
              </div>

              {/* Tag */}
              <div className="bg-[#c9f4f2] flex items-center gap-2 px-4 py-2">
                <img
                  src={item.category?.icon || "/assets/default-image.jpg"}
                  alt={item.category?.name || "Category"}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                  {item.category?.name}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-2 text-sm text-black">
                <h3 className="text-md leading-5 font-bold">{item.name}</h3>
                <p className="line-clamp-2">{item.description}</p>
                <div className=" font-semibold text-base/1 text-gray-800 space-y-1 border-t pt-3 mt-auto">
                  <div className="flex text-bold justify-between">
                    <span>Investment range</span>
                    <span className="font-bold text-black">
                      ₹
                      {item.investment_min || 0}
                      {item.investment_max
                        ? ` - ₹${item.investment_max}`
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Area Required</span>
                    <span className="font-bold text-black">
                      {item.area_required || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Franchise Outlets</span>
                    <span className="font-bold text-black">
                      {item.franchise_outlets || "0"}
                    </span>
                  </div>
                  {/* <div className="flex justify-between mt-2">
                        <span>Email</span>
                        <span className="text-right text-blue-700 text-[10px]">
                          {item.contact_email || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone</span>
                        <span className="text-right font-medium">
                          {item.phone_number || "N/A"}
                        </span>
                      </div> */}
                  {/* {item.website && (
                        <div className="flex justify-between">
                          <span>Website</span>
                          <a
                            href={item.website}
                            className="text-blue-600 text-right underline text-[10px]"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit
                          </a>
                        </div>
                      )} */}
                </div>
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
