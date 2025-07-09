import Hero from "@/components/Hero";
import OurServices from "@/components/OurServices";
import TopTrending from "@/components/TopTrending";

// src/app/page.js
export default function Home() {
  return (
    <section className="pt-12">
      <Hero/>
      <OurServices/>
      <TopTrending/>
    </section>
  );
}
