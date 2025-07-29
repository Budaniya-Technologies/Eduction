import Image from "next/image";
import React from "react";

const cardData = [
  {
    title: "Lorem Ipsum available, but the majority",
    description:
      "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.",
    borderColor: "border-[#ef5350]",
  },
  {
    title: "Lorem Ipsum available, but the majority",
    description:
      "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.",
    borderColor: "border-[#5c6bc0]",
  },
  {
    title: "Lorem Ipsum available, but the majority",
    description:
      "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.",
    borderColor: "border-[#66bb6a]",
  },
];

const HeroSection = () => {
  return (
    <section className="relative bg-[#f9f9f9] overflow-hidden px-4 sm:px-6 md:px-20 py-12 sm:py-16">
      {/* 🟡 Yellow Half-Circle (Top-Left) */}
      <div className="absolute top-0 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#fff176] rounded-br-full z-0" />

      {/* 🟣 Purple Blob (Top-Right) */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#d1a5f0] rounded-full mix-blend-multiply opacity-60 z-0" />

      {/* 🟡 Small Circle (Center-Left) */}
      <div className="absolute left-[40%] top-[60%] w-10 sm:w-16 h-10 sm:h-16 bg-[#ffee58] rounded-full opacity-70 z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
        {/* Left: Text & Cards */}
        <div className="w-full md:w-1/2">
          <p className="text-lg sm:text-xl font-medium mb-2">
            About <span className="text-[#1976d2] font-bold">PRATHAM</span>
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-snug sm:leading-tight text-black mb-6">
            Innovative Online <br />
            Teaching Mode
          </h1>

          {/* Cards */}
          <div className="space-y-4">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4 shadow-sm border-l-[5px] sm:border-l-[6px] ${card.borderColor} transition-transform duration-300 hover:scale-[1.03] hover:shadow-md`}
              >
                <Image
                  src="/assets/education.png"
                  alt="icon"
                  width={50}
                  height={50}
                  className="min-w-[40px] sm:min-w-[50px]"
                />
                <div>
                  <h3 className="font-bold text-black text-sm sm:text-base md:text-lg">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-64 sm:h-96 md:h-[500px]">
            <Image
              src="/assets/aboutBoy.png"
              alt="student"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
