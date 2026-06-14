import BenefitsSection from "./components/BenefitsSection";
import CTASection from "./components/CTASection";
import DistributorSection from "./components/DistributorSection";
import EnergyShowcase from "./components/EnergyStatement";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import EnergyMarquee from "./components/Marquee";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <EnergyShowcase />
      <BenefitsSection />
      <DistributorSection />
      <CTASection />
      <EnergyMarquee />
      <Footer />
    </div>
  );
}
