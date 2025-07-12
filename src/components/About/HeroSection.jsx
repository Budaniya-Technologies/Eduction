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
    <section className="relative bg-[#f9f9f9] overflow-hidden px-6 md:px-20 py-16">
      {/* 🟡 Yellow Half-Circle (Top-Left) */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-[#fff176] rounded-br-full z-0" />

      {/* 🟣 Purple Blob (Top-Right) */}
      <div className="absolute top-[-100px] right-[-120px] w-[600px] h-[600px] bg-[#d1a5f0] rounded-full mix-blend-multiply opacity-60 z-0" />

      {/* 🟡 Small Circle (Center-Left) */}
      <div className="absolute left-[45%] top-[50%] w-20 h-20 bg-[#ffee58] rounded-full opacity-70 z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
        {/* Left: Text */}
        <div className="w-full md:w-1/2">
          <p className="text-xl font-medium mb-2">
            About <span className="text-[#1976d2] font-bold">PRATHAM</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-black mb-6">
            Innovative Online <br />
            Teaching Mode
          </h1>

          {/* Cards */}
          <div className="space-y-4">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 flex gap-4 shadow-sm border-l-[6px] ${card.borderColor} transition-transform duration-300 hover:scale-[1.03] hover:shadow-md`}
              >
                <Image
                  src="/assets/education.png"
                  alt="icon"
                  width={60}
                  height={60}
                />
                <div>
                  <h3 className="font-bold text-black text-base md:text-lg">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Student Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full h-[400px] md:h-[500px]">
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
