"use client";

import { Plus } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const items = [
    {
        id: "01",
        title: "What can I automate with NovaFlow?",
        content:
            "NovaFlow helps you automate research, documentation, support workflows, content pipelines, lead qualification, reporting, and multi-step tasks that span several tools.",
    },
    {
        id: "02",
        title: "Do I need coding experience to use it?",
        content:
            "No. You can configure agents, prompts, and workflows through a structured interface, while still keeping the flexibility to go deeper when your team needs custom logic.",
    },
    {
        id: "03",
        title: "Can NovaFlow connect with my existing tools?",
        content:
            "Yes. NovaFlow is designed around connected workflows, so your agents can work across docs, code, messaging, research tools, and other systems your team already uses.",
    },
    {
        id: "04",
        title: "How is this different from a basic AI chatbot?",
        content:
            "A chatbot answers prompts one at a time. NovaFlow is built for execution, chaining decisions, tool usage, and repeatable workflows into a system that can actually complete work.",
    },
    {
        id: "05",
        title: "Is NovaFlow suitable for teams?",
        content:
            "Yes. Teams can share proven agent setups, standardize processes, and create reusable workflows so results stay consistent as operations scale.",
    },
    {
        id: "06",
        title: "How quickly can we get started?",
        content:
            "Most teams can start with a focused workflow in a short time, then expand into more advanced automations as they identify where the biggest time savings come from.",
    },
];

export function Accordion01() {
    return (
        <div className="mx-auto w-full max-w-3xl">
            <Accordion type="single" defaultValue="04" collapsible className="w-full rounded-3xl border border-border bg-card/60 px-6 shadow-xl backdrop-blur-sm sm:px-8">
                {items.map((item) => (
                    <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger className="group cursor-pointer text-left duration-300 hover:pl-3">
                            <div className="flex flex-1 items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-display text-sm uppercase tracking-[0.3em] text-gold/80">
                                        {item.id}
                                    </span>
                                    <h3 className="text-lg font-semibold text-foreground md:text-xl">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="flex items-center rounded-sm bg-gold p-2 text-background transition-colors duration-300 group-data-[state=open]:bg-gold-hover">
                                    <Plus
                                        className={cn(
                                            "size-4 shrink-0 transition-transform duration-300",
                                            "group-data-[state=open]:rotate-45",
                                        )}
                                    />
                                </div>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="pr-0 text-base leading-relaxed text-muted-foreground md:pr-16 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}