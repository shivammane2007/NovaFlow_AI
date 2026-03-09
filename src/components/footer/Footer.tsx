import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Col */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <div className="w-8 h-8 rounded bg-gold text-background flex items-center justify-center font-bold text-xl">
                                N
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-foreground">
                                NovaFlow <span className="text-gold">AI</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
                            The platform that makes powerful AI automation accessible to everyone. Build AI agents that work for you.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors">
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors">
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Cols */}
                    <div>
                        <h4 className="font-bold mb-6 text-foreground uppercase tracking-wider text-sm">Product</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Agent Builder</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Workflows</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Integrations</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Pricing</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-foreground uppercase tracking-wider text-sm">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Documentation</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">API Reference</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Community</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Blog</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Templates</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-foreground uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">About Us</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Careers</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} NovaFlow AI, Inc. All rights reserved.
                    </p>
                    <div className="flex gap-2 items-center mt-4 md:mt-0 text-sm text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        All systems operational
                    </div>
                </div>
            </div>
        </footer>
    );
}
