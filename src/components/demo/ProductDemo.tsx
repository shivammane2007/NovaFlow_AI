"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Play, Lock, Settings, LayoutTemplate } from "lucide-react";

export function ProductDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the visual and scale it up while scrolling
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
            });

            tl.to(visualRef.current, {
                scale: 1,
                borderRadius: "0px",
                ease: "none",
            });

            // Fade out Text when fully zoomed
            tl.to(contentRef.current, {
                opacity: 0,
                y: -50,
                ease: "none",
                duration: 0.5
            }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="demo" className="relative h-[200vh] bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Background gradient behind the demo */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-10 pointer-events-none" />

                <div ref={contentRef} className="absolute z-30 text-center px-4 top-1/4 max-w-3xl mx-auto flex flex-col items-center drop-shadow-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-xs font-semibold uppercase tracking-wider mb-6">
                        <Play className="w-3 h-3 fill-current" /> See it in action
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
                        Experience the <span className="text-gold">workflow</span>
                    </h2>
                    <p className="text-xl text-muted-foreground/90 font-medium">
                        Watch as NovaFlow seamlessly connects your apps to automate complex, multi-step tasks in seconds.
                    </p>
                </div>

                {/* The scalable mockup window */}
                <div
                    ref={visualRef}
                    className="relative z-20 w-[90vw] md:w-[80vw] lg:w-[70vw] h-[60vh] md:h-[70vh] rounded-[2rem] border border-border/50 bg-card/80 backdrop-blur-2xl shadow-2xl overflow-hidden scale-[0.85] origin-bottom mt-32"
                >
                    {/* Header */}
                    <div className="h-14 border-b border-border/50 bg-background/50 backdrop-blur-md flex items-center px-6 justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-border" />
                            <div className="w-3 h-3 rounded-full bg-border" />
                            <div className="w-3 h-3 rounded-full bg-border" />
                        </div>
                        <div className="flex gap-4">
                            <Lock className="w-4 h-4 text-muted-foreground" />
                            <div className="text-xs font-mono text-muted-foreground font-medium bg-background px-4 py-1 rounded-md border border-border">
                                Flow: Content to Production
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Settings className="w-4 h-4 text-muted-foreground" />
                            <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Interactive Flow representation inside demo window */}
                    <div className="p-8 w-full h-full relative grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Steps Container */}
                        <div className="col-span-1 border border-border/50 rounded-xl bg-background/50 p-6 flex flex-col gap-4">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Automated Triggers</h4>
                            {[
                                { title: "Monitor Email Inbox", status: "Active" },
                                { title: "Extract PDF Data", status: "Processed" },
                                { title: "Generate Summary", status: "Pending" }
                            ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-lg flex items-center justify-between border ${i === 1 ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'border-border bg-card'}`}>
                                    <span className="text-sm font-medium">{item.title}</span>
                                    <CheckCircle2 className={`w-4 h-4 ${i === 1 ? 'text-gold' : 'text-muted'}`} />
                                </div>
                            ))}
                        </div>

                        {/* Canvas / Visualization */}
                        <div className="col-span-2 border border-border/50 rounded-xl bg-background/50 relative overflow-hidden flex items-center justify-center dashboard-grid">
                            {/* Animated Connecting Lines (Abstract) */}
                            <svg className="absolute inset-0 w-full h-full opacity-20">
                                <path d="M 100 200 C 200 200, 300 100, 400 100 S 500 300, 600 200" fill="transparent" stroke="var(--gold)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                            </svg>
                            <div className="glass-card px-8 py-6 rounded-2xl flex flex-col items-center gap-4 border border-gold/30 bg-gold/5 backdrop-blur-md z-10 shadow-2xl">
                                <div className="w-16 h-16 rounded-full border border-gold border-t-transparent animate-spin flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full border border-gold/50 border-b-transparent animate-spin-reverse" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-foreground">Processing PDF...</h3>
                                <p className="text-sm text-muted-foreground text-center">AI Agent is analyzing standard unstructured data formatting.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
