import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";

export default function ContactPage() {
    return (
        <div className="min-h-screen pb-0 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-24 bg-background">
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
