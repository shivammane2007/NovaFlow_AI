"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export type TestimonialColumnItem = {
    quote: string;
    author: string;
    role: string;
    initial: string;
};

export function TestimonialsColumn({
    className,
    testimonials,
    duration = 18,
}: {
    className?: string;
    testimonials: TestimonialColumnItem[];
    duration?: number;
}) {
    return (
        <div className={cn("w-full max-w-sm", className)}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 will-change-transform"
            >
                {Array.from({ length: 2 }).map((_, index) => (
                    <React.Fragment key={index}>
                        {testimonials.map((testimonial, itemIndex) => (
                            <div
                                key={`${testimonial.author}-${itemIndex}-${index}`}
                                className="relative overflow-hidden rounded-2xl border border-border bg-background/80 p-8 shadow-lg backdrop-blur-sm transition-colors hover:border-gold/30"
                            >
                                <div className="absolute right-6 top-6 text-6xl font-serif text-muted/20 transition-colors hover:text-gold/10">
                                    &quot;
                                </div>

                                <div className="mb-6 flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="h-4 w-4 fill-gold text-gold" />
                                    ))}
                                </div>

                                <p className="relative z-10 mb-8 font-medium leading-relaxed text-foreground/90">
                                    "{testimonial.quote}"
                                </p>

                                <div className="mt-auto flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted/20 font-display text-lg font-bold text-foreground">
                                        {testimonial.initial}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold">{testimonial.author}</h4>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
}