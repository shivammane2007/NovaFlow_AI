"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "Product", href: "/#demo" },
    { name: "Benefits", href: "/#benefits" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Check if it's a hash link and we are on the current page to smooth scroll
        if (href.startsWith("/#") && window.location.pathname === "/") {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            const targetId = href.replace("/#", "");
            const elem = document.getElementById(targetId);
            if (elem) {
                window.scrollTo({
                    top: elem.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        } else {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-border py-3"
                : "bg-transparent border-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded bg-gold text-background flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-105">
                                N
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight text-foreground">
                                NovaFlow <span className="text-gold">AI</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScrollToSection(e, link.href)}
                                    className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 border-l border-border pl-4">
                            <ThemeToggle />
                            <ShinyButton href="/pricing" className="!px-5 !py-2.5 !text-sm">
                                Get Started
                            </ShinyButton>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-foreground p-2"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScrollToSection(e, link.href)}
                                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-gold hover:bg-muted/10 rounded-md"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="px-3 pt-2 w-full flex justify-center">
                            <ShinyButton href="/pricing" className="w-full">
                                Get Started
                            </ShinyButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
