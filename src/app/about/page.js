// src/app/about/page.jsx
"use client";

import GurukulHero from "@/components/About/GurukulHero";
import HeroSection from "@/components/About/HeroSection";
import LocalBusinesses from "@/components/About/LocalBusinesses";
import TeachingMode from "@/components/About/TeachingMode";


const about = () => {
  return (
    <main className="bg-gray-100 text-gray-800 min-h-screen py-8 space-y-16">
     <HeroSection/>
     <TeachingMode/>
     <GurukulHero/>
     <LocalBusinesses/>
    </main>
  );
};

export default about;
