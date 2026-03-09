"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Workflow, Puzzle, Cpu, Users } from "lucide-react";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import AgentBeamVisualization from "@/components/ui/AgentBeamVisualization";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: <Bot className="w-8 h-8 text-gold" />,
        title: "AI Agent Builder",
        description: "Design custom AI agents with specific personalities, tasks, and automation rules without writing code.",
        color: "from-gold/20 to-transparent",
    },
    {
        icon: <Workflow className="w-8 h-8 text-gold" />,
        title: "Workflow Automation",
        description: "Chain together multiple tasks automatically. Research, summarize, and format—all in one seamless flow.",
        color: "from-foreground/10 to-transparent",
    },
    {
        icon: <Puzzle className="w-8 h-8 text-gold" />,
        title: "Multi-Tool Integration",
        description: "Connect to Google Docs, Notion, GitHub, and email to let your agents work across your entire stack.",
        color: "from-gold/20 to-transparent",
    },
    {
        icon: <Cpu className="w-8 h-8 text-gold" />,
        title: "Smart Execution",
        description: "Execute complex tasks dynamically, from debugging code to analyzing unstructured data sources.",
        color: "from-foreground/10 to-transparent",
    },
    {
        icon: <Users className="w-8 h-8 text-gold" />,
        title: "Team Collaboration",
        description: "Share proven AI agents and workflows across your startup or study group to scale productivity.",
        color: "from-gold/20 to-transparent",
    },
];

export function FeatureShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                headerRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Staggered cards animation
            gsap.fromTo(
                cardsRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
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
        <section id="features" ref={containerRef} className="py-24 bg-background relative z-10">
            <div className="container mx-auto px-4 max-w-7xl">
                <div ref={headerRef} className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                        The power of an <span className="text-gold">entire team</span>.
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Traditional AI tools are single-purpose. NovaFlow lets you build custom agents that execute end-to-end workflows across your favorite platforms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className={`group relative p-8 rounded-3xl border border-border bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-gold/5 hover:-translate-y-1 overflow-hidden ${index === 0 ? "lg:col-span-2 lg:row-span-2 flex flex-col justify-between min-h-[400px]" : ""
                                }`}
                        >
                            {/* Background gradient hover effect */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            <PixelCanvas
                                gap={10}
                                speed={25}
                                colors={["#d4af37", "#1f1f1f", "#eaddb6"]}
                                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                            />

                            {index === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center p-8 z-[1] w-[95%] mx-auto mt-4">
                                    <AgentBeamVisualization />
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 rounded-2xl bg-muted/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-border/50">
                                    {feature.icon}
                                </div>

                                <div className="mt-auto">
                                    <h3 className={`font-display font-bold mb-3 ${index === 0 ? "text-3xl" : "text-xl"}`}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Sixth card placeholder for layout balance */}
                    <div
                        ref={(el) => {
                            if (el) cardsRef.current[5] = el;
                        }}
                        className="group relative p-8 rounded-3xl border border-dashed border-border flex items-center justify-center bg-transparent transition-all hover:bg-card hover:border-solid hover:shadow-xl cursor-pointer"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full border border-gold text-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                +
                            </div>
                            <span className="font-medium text-foreground">Explore all integrations</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
