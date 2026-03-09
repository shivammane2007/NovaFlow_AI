"use client"

import { useRef } from "react"
import { AnimatedBeam } from "@/components/ui/animated-beam"

export default function AgentBeamVisualization() {

    const containerRef = useRef<HTMLDivElement>(null)
    const centerRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const topRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-[280px] h-[280px] flex items-center justify-center p-4"
        >

            <div
                ref={centerRef}
                className="z-10 w-16 h-16 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center font-bold text-white shadow-xl shadow-gold/10"
            >
                AI
            </div>

            <div ref={leftRef} className="z-10 absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 shadow-md" />
            <div ref={rightRef} className="z-10 absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 shadow-md" />
            <div ref={topRef} className="z-10 absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 shadow-md" />
            <div ref={bottomRef} className="z-10 absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 shadow-md" />

            <AnimatedBeam containerRef={containerRef} fromRef={leftRef} toRef={centerRef} />
            <AnimatedBeam containerRef={containerRef} fromRef={rightRef} toRef={centerRef} />
            <AnimatedBeam containerRef={containerRef} fromRef={topRef} toRef={centerRef} />
            <AnimatedBeam containerRef={containerRef} fromRef={bottomRef} toRef={centerRef} />

        </div>
    )
}
