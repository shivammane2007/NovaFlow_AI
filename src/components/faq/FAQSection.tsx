import { Accordion01 } from "@/components/faq/accordion-01-1";

export function FAQSection() {
    return (
        <section id="faq" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                        Questions about <span className="text-gold">NovaFlow</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know before building your first AI-powered workflow with NovaFlow.
                    </p>
                </div>

                <Accordion01 />
            </div>
        </section>
    );
}