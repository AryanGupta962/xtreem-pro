import AboutSection from "./components/AboutSection";
import CTASection from "./components/CTASection";
import DistributorSection from "./components/DistributorSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import EnergyMarquee from "./components/Marquee";
import NutritionSection from "./components/NutritionSection";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <NutritionSection />
      <AboutSection />
      <DistributorSection />
      <CTASection />
      <EnergyMarquee />
      <Footer />
    </div>
  );
}
