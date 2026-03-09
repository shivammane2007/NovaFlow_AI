"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

export function CallToAction() {
    const containerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal CTA
            gsap.fromTo(
                ".cta-content",
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Continuous animated glow
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    rotate: 360,
                    scale: 1.1,
                    duration: 15,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="cta" ref={containerRef} className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl z-10 relative">
                <div className="cta-content rounded-[3rem] border border-border bg-card p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-gold/5">

                    {/* Animated Background Gradients inside the card */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]">
                        <div
                            ref={glowRef}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/20 rounded-full blur-[100px] mix-blend-screen opacity-50"
                        />
                        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-foreground">
                            Ready to build your <br className="hidden md:block" /> <span className="text-gold">AI workforce?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                            Join thousands of forward-thinking teams automating their digital lives with NovaFlow. Start building agents today, no coding required.
                        </p>

                        <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4 relative" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing! We'll be in touch soon."); }}>
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-4 rounded-full bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"
                                    required
                                    suppressHydrationWarning
                                />
                            </div>
                            <ShinyButton
                                type="submit"
                                className="flex items-center justify-center gap-2 whitespace-nowrap !py-4"
                            >
                                Get Started <ArrowRight className="w-5 h-5" />
                            </ShinyButton>
                        </form>

                        <p className="mt-6 text-sm text-muted-foreground font-medium">
                            Start building for free. No credit card required.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
