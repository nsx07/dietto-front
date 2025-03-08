"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <button
            onClick={() => toggleItem(index)}
            className="flex w-full items-center justify-between p-4 text-left font-medium transition-all"
            aria-expanded={openIndex === index}
            aria-controls={`faq-${index}`}
          >
            <span>{item.question}</span>
            <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                id={`faq-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t p-4 text-sm text-muted-foreground">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
