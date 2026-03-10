"use client";

import VideoPlayer from "@/components/ui/video-player";

export default function VideoSection() {
  return (
    <section id="demo-video" className="w-full py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            See NovaFlow in <span className="text-gold">Action</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A quick look at how NovaFlow AI powers intelligent workflows.
          </p>
        </div>

        <div className="mx-auto w-fit overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <VideoPlayer src="/videos/Unveiling NovaFlow AI_ The Future of Intelligent Automation.mp4" />
        </div>
      </div>
    </section>
  );
}
