import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { FeatureShowcase } from "@/components/features/FeatureShowcase";
import { ProductDemo } from "@/components/demo/ProductDemo";
import { BenefitsSection } from "@/components/benefits/BenefitsSection";
import { SocialProof } from "@/components/testimonials/SocialProof";
import { CallToAction } from "@/components/cta/CallToAction";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen pb-0">
      <Navbar />
      <main>
        <Hero />
        <FeatureShowcase />
        <ProductDemo />
        <BenefitsSection />
        <SocialProof />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
