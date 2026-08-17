import BenefitsSectionTwo from "./components/BenifitsSectionTwo";
import CTASection from "./components/CTASection";
import DistributorSection from "./components/DistributorSection";
import EnergyShowcase from "./components/EnergyStatement";
import Footer from "./components/Footer";
import FssaiGuidelines from "./components/FssaiGuidelines";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import EnergyMarquee from "./components/Marquee";
import NutritionSection from "./components/Nutrtion";
import XtreemSlider from "./components/XtreemSlider";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <NutritionSection />
      <FssaiGuidelines />
      {/* <BenefitsSection /> */}
      <BenefitsSectionTwo />
      <XtreemSlider />
      <EnergyShowcase />
      <DistributorSection />
      <CTASection />
      <EnergyMarquee />
      <Footer />
    </div>
  );
}
