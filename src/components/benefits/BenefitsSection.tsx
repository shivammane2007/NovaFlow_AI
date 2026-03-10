"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Zap, BrainCircuit, Blocks } from "lucide-react";
import { PixelCanvas } from "@/components/ui/pixel-canvas";

const benefits = [
    {
        icon: <Clock className="w-6 h-6 text-gold" />,
        title: "Save Time",
        description: "Automate repetitive digital tasks and reclaim hours of your day.",
    },
    {
        icon: <BrainCircuit className="w-6 h-6 text-gold" />,
        title: "Work Smarter",
        description: "Let AI handle complex cognitive work like research and summarization.",
    },
    {
        icon: <Zap className="w-6 h-6 text-gold" />,
        title: "Boost Productivity",
        description: "Execute multi-step workflows 10x faster than manual processing.",
    },
    {
        icon: <Blocks className="w-6 h-6 text-gold" />,
        title: "Custom AI Workforce",
        description: "Build an army of specialized agents tailored to your exact needs.",
    },
];

const stats = [
    { value: 10, suffix: "x", label: "Faster Execution" },
    { value: 100, suffix: "+", label: "Tool Integrations" },
    { value: 24, suffix: "/7", label: "Automated Work" },
];

export function BenefitsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const countersRef = useRef<HTMLSpanElement[]>([]);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate counters
            countersRef.current.forEach((counter, i) => {
                if (!counter) return;
                const targetValue = stats[i].value;
                gsap.fromTo(
                    counter,
                    { textContent: "0" },
                    {
                        textContent: targetValue,
                        duration: 2,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 60%",
                        },
                        onUpdate: function () {
                            counter.innerHTML = Math.ceil(Number(this.targets()[0].textContent)).toString();
                        },
                    }
                );
            });

            // Animate cards
            gsap.fromTo(
                cardsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 50%",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="benefits" ref={containerRef} className="py-24 relative overflow-hidden bg-background text-foreground">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text & Stats */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Why build with <span className="text-gold">NovaFlow?</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-lg leading-relaxed">
                            We've re-imagined what's possible when you combine cutting-edge LLMs with deep tool integrations. It's not just a chat interface—it's your automated workforce.
                        </p>

                        <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 flex items-baseline">
                                        <span
                                            ref={(el) => {
                                                if (el) countersRef.current[i] = el;
                                            }}
                                        >
                                            0
                                        </span>
                                        <span className="text-gold text-3xl">{stat.suffix}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Benefit Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative items-stretch auto-rows-fr">
                        <div className="absolute inset-0 bg-gold/5 blur-3xl -z-10 rounded-full" />

                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    if (el) cardsRef.current[index] = el;
                                }}
                                className={`group relative h-full p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm shadow-xl hover:border-gold/30 transition-colors overflow-hidden ${index % 2 === 1 ? "sm:mt-12" : ""
                                    }`}
                            >
                                <PixelCanvas
                                    gap={8}
                                    speed={30}
                                    colors={["#d4af37", "#1f1f1f", "#eaddb6"]}
                                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                                />

                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-sm">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
