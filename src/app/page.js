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


// src/app/page.js
export default function Home() {
  return (
    <Location>
      <section>
        <HeroSlider />
        <OurServices />
        <TopTrending />
        <Courses />
        <NewsNotification />
        <CustomerReview />
        <ContactUs />
        <Footer />
      </section>
    </Location>
  );
}
