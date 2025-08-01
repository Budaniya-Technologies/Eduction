"use client";
import { useEffect, useState } from "react";
import ContactUs from "@/components/ContactUs";
import Courses from "@/components/Courses";
import NewsNotification from "@/components/NewsNotification";
import OurServices from "@/components/OurServices";
import TopTrending from "@/components/TopTrending";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import CustomerReview from "@/components/CustomerReview";
import Location from "@/components/Location";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769); // Tailwind breakpoint for md (768px)
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add listener

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <section>
      {/* Conditional rendering based on screen size */}
      
      <Location/>
        <HeroSlider />
        <OurServices />
        <TopTrending />
        <Courses />
        <NewsNotification />
        <CustomerReview />
        <ContactUs />
        <Footer />
    </section>
  );
}
