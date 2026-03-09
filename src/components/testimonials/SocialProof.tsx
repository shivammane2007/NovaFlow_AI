"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "NovaFlow AI completely transformed how our engineering team handles bug triage. What used to take 2 hours every morning now takes 10 minutes.",
        author: "Sarah Jenkins",
        role: "VP of Engineering, Syntax Inc.",
        initial: "S",
    },
    {
        quote: "As a solo founder, I essentially bought back 40% of my week. My customized 'MarketerBot' pulls trends, formats newsletters, and schedules posts automatically.",
        author: "David Chen",
        role: "Founder, Loop.io",
        initial: "D",
    },
    {
        quote: "The ability to chain multiple AI agents together is groundbreaking. We built an entire automated research department using NovaFlow.",
        author: "Elena Rodriguez",
        role: "Director of Research, Nexus Labs",
        initial: "E",
    },
];

const logos = ["Vercel", "Acme Corp", "Global Reach", "Stripe", "NextJS", "Github", "Notion", "Figma", "OpenAI", "Anthropic"];

export function SocialProof() {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create continuous marquee effect
            if (marqueeRef.current) {
                gsap.to(marqueeRef.current, {
                    xPercent: -50,
                    ease: "none",
                    duration: 30,
                    repeat: -1,
                });
            }

            // Fade up testimonials on scroll
            gsap.fromTo(
                ".testimonial-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="proof" ref={containerRef} className="py-24 bg-card/30 relative overflow-hidden border-y border-border/50">

            {/* Logos Marquee */}
            <div className="w-full overflow-hidden mb-24 relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap pl-16">
                    {/* Double the logos to make it infinite smooth */}
                    {[...logos, ...logos].map((logo, i) => (
                        <div key={i} className="text-xl md:text-2xl font-display font-medium text-muted-foreground/40 uppercase tracking-widest flex-shrink-0">
                            {logo}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                        Trusted by the <span className="text-gold">pioneers</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From hyper-growth startups to solo creators, teams use NovaFlow to automate their most complex workflows.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <div key={i} className="testimonial-card p-8 rounded-2xl bg-background border border-border shadow-lg relative group transition-all hover:-translate-y-2 hover:border-gold/30">
                            {/* Decorative quote mark */}
                            <div className="absolute top-6 right-6 text-6xl font-serif text-muted/20 group-hover:text-gold/10 transition-colors">
                                &quot;
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-gold fill-gold" />
                                ))}
                            </div>

                            <p className="text-foreground/90 font-medium leading-relaxed mb-8 relative z-10">
                                "{testimonial.quote}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center font-display font-bold text-lg text-foreground border border-border">
                                    {testimonial.initial}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{testimonial.author}</h4>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
