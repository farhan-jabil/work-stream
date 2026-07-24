import About from "../components/LandingPage/AboutUs";
import FAQ from "../components/LandingPage/FAQ";
import FeatureSection from "../components/LandingPage/FeatureSection";
import Hero from "../components/LandingPage/Hero";
import Pricing from "../components/LandingPage/Pricing";
import Testimonial from "../components/LandingPage/Testimonial";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="features">
        <FeatureSection />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="testimonial"><Testimonial /></div>
      <div id="faq"><FAQ /></div>
      <Footer />
    </>
  );
}
