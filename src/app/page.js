import ContactUs from "@/components/ContactUs";
import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import NewsNotification from "@/components/NewsNotification";
import OurServices from "@/components/OurServices";
import TopTrending from "@/components/TopTrending";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import CustomerReview from "@/components/CustomerReview";


// src/app/page.js
export default function Home() {
  return (
    <section className="">
      {/* <Hero/> */}
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
