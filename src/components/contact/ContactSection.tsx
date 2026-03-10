"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function ContactSection() {
    return (
        <section id="contact" className="px-6 py-12 md:py-24 flex items-center justify-center bg-background relative">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 relative z-10">

                {/* LEFT INFO PANEL */}
                <div className="space-y-8">
                    <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground">
                        Contact <span className="text-gold">Us</span>
                    </h1>

                    <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                        Have a project idea, question, or collaboration in mind?
                        Send us a message and we&apos;ll get back to you as soon as possible.
                    </p>

                    <div className="space-y-6 pt-6">

                        <div className="flex items-center gap-4 group cursor-pointer w-fit">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:bg-gold/20 transition-colors">
                                <Mail className="w-5 h-5 text-gold" />
                            </div>
                            <p className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">contact@novaflow.ai</p>
                        </div>

                        <div className="flex items-center gap-4 group cursor-pointer w-fit">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:bg-gold/20 transition-colors">
                                <Phone className="w-5 h-5 text-gold" />
                            </div>
                            <p className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">+91 98765 43210</p>
                        </div>

                        <div className="flex items-center gap-4 group cursor-pointer w-fit">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:bg-gold/20 transition-colors">
                                <MapPin className="w-5 h-5 text-gold" />
                            </div>
                            <p className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">Pune, Maharashtra, India</p>
                        </div>

                    </div>
                </div>


                {/* CONTACT FORM */}
                <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-foreground/5 hover:border-gold/30 transition-colors">

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message! Our team will get back to you shortly."); }}>

                        <div>
                            <label className="text-sm font-medium text-foreground/80 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                placeholder="Jane Doe"
                                className="w-full mt-2 px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-foreground placeholder:text-muted-foreground/50"
                                suppressHydrationWarning
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground/80 uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                placeholder="jane@example.com"
                                className="w-full mt-2 px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-foreground placeholder:text-muted-foreground/50"
                                suppressHydrationWarning
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground/80 uppercase tracking-wider">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Write your message here..."
                                className="w-full mt-2 px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-foreground placeholder:text-muted-foreground/50 resize-y"
                                suppressHydrationWarning
                            />
                        </div>

                        <ShinyButton
                            type="submit"
                            className="w-full flex justify-center py-4"
                        >
                            Send Message
                        </ShinyButton>

                    </form>

                </div>

            </div>
        </section>
    );
}
