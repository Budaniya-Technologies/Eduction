// src/components/Hero.jsx
import Image from "next/image";
import studentImg from "../../public/assets/student (2).png";

export default function Hero() {
  return (
    <section className="bg-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6  flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left: Text */}
        <div className="md:w-1/2 relative z-10">
          {/* Yellow Circle Behind Text */}
          <div className="absolute -left-20 -top-20 w-48 h-48 bg-yellow-300 rounded-full -z-10 hidden md:block"></div>

          <p className="text-xl text-gray-800 font-medium">
            Online EducationHub
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mt-2">
            Innovative Online <br /> Teaching Mode
          </h1>
          <p className="text-gray-700 mt-4 text-base md:text-lg leading-relaxed">
            Lorem Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old. Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-800 transition">
              Get Started
            </button>
            <button className="bg-cyan-100 border border-black text-black font-semibold px-6 py-2 rounded-full hover:bg-cyan-200 transition">
              Explore
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 relative z-10">
          {/* Purple Circle Behind Image */}
          <div className="absolute top-[-100px] right-[-120px] w-[600px] h-[600px] bg-[#f0a5a5] rounded-full mix-blend-multiply opacity-60 z-0" />
          <Image
            src={studentImg}
            alt="Students"
            width={500}
            height={500}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
