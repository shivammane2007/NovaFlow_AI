import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import PricingSection from "@/components/pricing/PricingSection";

export default function PricingPage() {
    return (
        <div className="min-h-screen pb-0 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
                <PricingSection />
            </main>
            <Footer />
        </div>
    );
}
