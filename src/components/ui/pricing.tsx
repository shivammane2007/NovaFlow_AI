"use client";

import { motion, useSpring } from "framer-motion";
import React, {
    useState,
    useRef,
    useEffect,
    createContext,
    useContext,
} from "react";
import confetti from "canvas-confetti";
import { ShinyButton } from "@/components/ui/shiny-button";
import Link from "next/link";
import { Check, Star as LucideStar } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY FUNCTIONS ---

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function useMediaQuery(query: string) {
    const [value, setValue] = useState(false);

    useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setValue(event.matches);
        }

        const result = matchMedia(query);
        result.addEventListener("change", onChange);
        setValue(result.matches);

        return () => result.removeEventListener("change", onChange);
    }, [query]);

    return value;
}

// --- BASE UI COMPONENTS (BUTTON) ---

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-foreground text-background hover:bg-gold hover:text-background",
                destructive:
                    "bg-red-500 text-white hover:bg-red-600/90",
                outline:
                    "border border-border bg-card hover:bg-muted/10 hover:text-foreground hover:border-gold/50",
                secondary:
                    "bg-muted/20 text-foreground hover:bg-muted/40",
                ghost: "hover:bg-muted/10 hover:text-foreground",
                link: "text-foreground underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 rounded-md px-4",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

// --- INTERACTIVE STARFIELD ---

function Star({
    mousePosition,
    containerRef,
}: {
    mousePosition: { x: number | null; y: number | null };
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [initialPos] = useState({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    });

    const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
    const springX = useSpring(0, springConfig);
    const springY = useSpring(0, springConfig);

    useEffect(() => {
        if (
            !containerRef.current ||
            mousePosition.x === null ||
            mousePosition.y === null
        ) {
            springX.set(0);
            springY.set(0);
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const starX =
            containerRect.left +
            (parseFloat(initialPos.left) / 100) * containerRect.width;
        const starY =
            containerRect.top +
            (parseFloat(initialPos.top) / 100) * containerRect.height;

        const deltaX = mousePosition.x - starX;
        const deltaY = mousePosition.y - starY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const radius = 600; // Radius of magnetic influence

        if (distance < radius) {
            const force = 1 - distance / radius;
            const pullX = deltaX * force * 0.5;
            const pullY = deltaY * force * 0.5;
            springX.set(pullX);
            springY.set(pullY);
        } else {
            springX.set(0);
            springY.set(0);
        }
    }, [mousePosition, initialPos, containerRef, springX, springY]);

    return (
        <motion.div
            className="absolute bg-gold rounded-full"
            style={{
                top: initialPos.top,
                left: initialPos.left,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                x: springX,
                y: springY,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
            }}
        />
    );
}

function InteractiveStarfield({
    mousePosition,
    containerRef,
}: {
    mousePosition: { x: number | null; y: number | null };
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none mix-blend-screen opacity-50 dark:opacity-30">
            {/* Glow behind starfield */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold/5 blur-[120px]" />
            {isMounted && Array.from({ length: 150 }).map((_, i) => (
                <Star
                    key={`star-${i}`}
                    mousePosition={mousePosition}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
}

// --- PRICING COMPONENT LOGIC ---

// Interfaces
interface PricingPlan {
    name: string;
    price: string;
    yearlyPrice: string;
    period: string;
    features: string[];
    description: string;
    buttonText: string;
    href: string;
    isPopular?: boolean;
}

interface PricingSectionProps {
    plans: PricingPlan[];
    title?: string;
    description?: string;
}

// Context for state management
const PricingContext = createContext<{
    isMonthly: boolean;
    setIsMonthly: (value: boolean) => void;
}>({
    isMonthly: true,
    setIsMonthly: () => { },
});

// Main PricingSection Component
export function PricingSection({
    plans,
    title = "Simple, Transparent Pricing",
    description = "Choose the plan that's right for you. All plans include our core features and support.",
}: PricingSectionProps) {
    const [isMonthly, setIsMonthly] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState<{
        x: number | null;
        y: number | null;
    }>({ x: null, y: null });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
    };

    return (
        <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePosition({ x: null, y: null })}
                className="relative w-full bg-background py-32 overflow-hidden"
            >
                <InteractiveStarfield
                    mousePosition={mousePosition}
                    containerRef={containerRef}
                />
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
                        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground">
                            {title.split('Perfect').map((text, i, arr) =>
                                i === 0 && arr.length > 1 ? <React.Fragment key={i}>{text}<span className="text-gold">Perfect</span></React.Fragment> : text
                            )}
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl whitespace-pre-line leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <PricingToggle />
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 items-start gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <PricingCard key={index} plan={plan} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </PricingContext.Provider>
    );
}

// Pricing Toggle Component
function PricingToggle() {
    const { isMonthly, setIsMonthly } = useContext(PricingContext);
    const confettiRef = useRef<HTMLDivElement>(null);
    const monthlyBtnRef = useRef<HTMLButtonElement>(null);
    const annualBtnRef = useRef<HTMLButtonElement>(null);

    const [pillStyle, setPillStyle] = useState({});

    useEffect(() => {
        const btnRef = isMonthly ? monthlyBtnRef : annualBtnRef;
        if (btnRef.current) {
            setPillStyle({
                width: btnRef.current.offsetWidth,
                transform: `translateX(${btnRef.current.offsetLeft}px)`,
            });
        }
    }, [isMonthly]);

    const handleToggle = (monthly: boolean) => {
        if (isMonthly === monthly) return;
        setIsMonthly(monthly);

        if (!monthly && confettiRef.current) {
            const rect = annualBtnRef.current?.getBoundingClientRect();
            if (!rect) return;

            const originX = (rect.left + rect.width / 2) / window.innerWidth;
            const originY = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 80,
                spread: 80,
                origin: { x: originX, y: originY },
                colors: [
                    "#d4af37", // gold
                    "#ffffff", // off-white
                    "#1c1c1c", // charcoal
                ],
                ticks: 300,
                gravity: 1.2,
                decay: 0.94,
                startVelocity: 30,
            });
        }
    };

    return (
        <div className="flex justify-center mb-8">
            <div ref={confettiRef} className="relative flex w-fit items-center rounded-full bg-muted/10 p-1 border border-border">
                <motion.div
                    className="absolute left-0 top-0 h-full rounded-full bg-foreground p-1 shadow-md"
                    style={pillStyle}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
                <button
                    ref={monthlyBtnRef}
                    onClick={() => handleToggle(true)}
                    className={cn(
                        "relative z-10 rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
                        isMonthly
                            ? "text-background"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    Monthly
                </button>
                <button
                    ref={annualBtnRef}
                    onClick={() => handleToggle(false)}
                    className={cn(
                        "relative z-10 rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
                        !isMonthly
                            ? "text-background"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    Annual
                    <span
                        className={cn(
                            "hidden sm:inline",
                            !isMonthly ? "text-background/80" : "text-muted-foreground/80 lowercase",
                        )}
                    >
                        {" "}
                        (save 20%)
                    </span>
                </button>
            </div>
        </div>
    );
}

// Pricing Card Component
function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
    const { isMonthly } = useContext(PricingContext);
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{
                y: plan.isPopular && isDesktop ? -20 : 0,
                opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.15,
            }}
            className={cn(
                "rounded-[2.5rem] p-8 md:p-10 flex flex-col relative bg-card/80 backdrop-blur-xl transition-all duration-300",
                plan.isPopular
                    ? "border-2 border-gold shadow-[0_0_40px_rgba(212,175,55,0.1)]"
                    : "border border-border/60 hover:border-border shadow-xl shadow-foreground/5",
            )}
        >
            {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <div className="bg-gold py-1.5 px-6 rounded-full flex items-center gap-2 shadow-lg shadow-gold/20">
                        <LucideStar className="text-background h-4 w-4 fill-current" />
                        <span className="text-background text-sm font-bold tracking-wide uppercase">
                            Most Popular
                        </span>
                    </div>
                </div>
            )}
            <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-display font-semibold text-foreground text-center">{plan.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                    {plan.description}
                </p>
                <div className="mt-8 flex items-baseline justify-center gap-x-1">
                    <span className="text-6xl font-display font-bold tracking-tight text-foreground">
                        <NumberFlow
                            value={
                                isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                            }
                            format={{
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                            }}
                            className="font-variant-numeric: tabular-nums"
                        />
                    </span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                        / {plan.period}
                    </span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-4 text-center">
                    {isMonthly ? "Billed Monthly" : "Billed Annually"}
                </p>

                <div className="my-8 w-full h-px bg-border/50" />

                <ul
                    role="list"
                    className="space-y-4 text-sm leading-6 text-left text-muted-foreground mb-8"
                >
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-x-4">
                            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                                <Check
                                    className="h-3 w-3 text-gold"
                                    aria-hidden="true"
                                />
                            </div>
                            <span className="font-medium text-foreground/80">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto pt-2 flex justify-center">
                    <ShinyButton href={plan.href || "/contact"} className="w-full !px-0">
                        {plan.buttonText}
                    </ShinyButton>
                </div>
            </div>
        </motion.div>
    );
}
