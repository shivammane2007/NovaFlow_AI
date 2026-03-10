"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundPaths } from "./background-paths";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Basic GSAP context for cleanup
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                headlineRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.2 }
            )
                .fromTo(
                    textRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(
                    ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.4"
                );

            // Background shapes animation
            gsap.to(".bg-shape", {
                rotation: 360,
                duration: 40,
                repeat: -1,
                ease: "linear",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex text-center justify-center items-center pt-24 overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden clip-hero">
                <BackgroundPaths />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-20 z-10">
                    <div className="bg-shape absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-gold/20 -top-[20%] -left-[10%] mix-blend-multiply dark:mix-blend-screen" />
                    <div className="bg-shape absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-foreground/10 top-[40%] -right-[15%] mix-blend-multiply dark:mix-blend-screen" />
                </div>
            </div>

            <div className="container mx-auto px-4 z-10 flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex flex-row items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-medium mb-8">
                    <Sparkles className="h-4 w-4 text-gold" />
                    <span>Introducing NovaFlow V2</span>
                </div>

                {/* Headline */}
                <h1
                    ref={headlineRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold max-w-5xl leading-tight md:leading-tight lg:leading-tight tracking-tight mb-6 opacity-0"
                >
                    Build smarter. <br /> Launch <span className="text-gold">faster.</span>
                </h1>

                {/* Text */}
                <p
                    ref={textRef}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 opacity-0 leading-relaxed"
                >
                    Create, customize, and deploy AI agents without coding. NovaFlow AI combines your favorite tools into one powerful, automated workforce.
                </p>

                {/* Call to Actions */}
                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row gap-4 opacity-0 items-center justify-center"
                >
                    <ShinyButton href="/pricing" className="whitespace-nowrap flex items-center justify-center gap-2">
                        Start Building Free <ArrowRight className="h-5 w-5" />
                    </ShinyButton>
                    <ShinyButton href="#features" className="whitespace-nowrap flex items-center justify-center">
                        View Product Demo
                    </ShinyButton>
                </div>

                {/* Interactive mock interface visualization */}
                <ContainerScroll
                    titleComponent={<></>}
                >
                    <div className="relative rounded-2xl md:rounded-3xl border border-border bg-card shadow-2xl overflow-hidden h-full flex flex-col">
                        {/* Window Header */}
                        <div className="h-12 border-b border-border bg-muted/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                            <div className="w-3 h-3 rounded-full bg-green-400/80" />
                            <div className="mx-auto px-4 py-1 rounded bg-background border border-border text-xs font-mono text-muted">
                                agent://novaflow.ai/builder
                            </div>
                        </div>
                        {/* Window Body Mock */}
                        <div className="flex-1 p-8 flex gap-6 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03]">
                            {/* Sidebar */}
                            <div className="w-48 hidden md:flex flex-col gap-3">
                                <div className="h-8 bg-muted/20 rounded w-full" />
                                <div className="h-8 bg-muted/20 rounded w-3/4" />
                                <div className="h-8 bg-muted/20 rounded w-5/6" />
                                <div className="h-8 bg-muted/20 rounded w-full mt-4" />
                                <div className="h-8 bg-gold/20 border border-gold/30 rounded w-full" />
                            </div>
                            {/* Main Canvas */}
                            <div className="flex-1 border border-border/50 bg-background/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                                <div className="absolute w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
                                <div className="flex flex-col items-center gap-4 z-10 glass-card p-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xl">
                                    <Sparkles className="w-8 h-8 text-gold" />
                                    <div className="text-center">
                                        <div className="font-semibold text-foreground">ResearchBot Active</div>
                                        <div className="text-xs text-muted-foreground mt-1">Processing 4 automated tasks...</div>
                                    </div>
                                    {/* Mock progress bar */}
                                    <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden mt-2">
                                        <div className="h-full bg-gold w-2/3 rounded-full relative">
                                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContainerScroll>
            </div>
        </section>
    );
}
