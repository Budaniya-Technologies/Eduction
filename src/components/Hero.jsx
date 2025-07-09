// src/components/Hero.jsx
import Image from "next/image";
import studentImg from "../../public/assets/student1.avif"; 

export default function Hero() {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left: Text */}
        <div className="md:w-1/2 relative z-10">
          <div className="absolute -left-20 -top-20 w-48 h-48 bg-yellow-300 rounded-full -z-10 hidden md:block"></div>

          <p className="text-xl text-gray-800 font-medium">Online EducationHub</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mt-2">
            Innovative Online <br /> Teaching Mode
          </h1>
          <p className="text-gray-700 mt-4 text-base md:text-lg leading-relaxed">
            Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
            looked up one of the more obscure Latin words.
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
        <div className="md:w-1/2 relative">
          <div className="absolute -right-10 top-0 w-60 h-60 bg-purple-300 rounded-full -z-10 hidden md:block"></div>
          <Image
            src={studentImg}
            alt="Students"
            width={500}
            height={500}
            className="object-contain z-10 relative"
            priority
          />
        </div>
      </div>
    </section>
  );
}
