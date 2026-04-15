"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AccordionItem = {
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(index);
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
      }
      return isOpen ? [] : [index];
    });
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div key={item.title} className="overflow-hidden rounded-2xl border border-teal-100 bg-white">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => toggle(index)}
              type="button"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-slate-900">{item.title}</span>
              <span className={cn("text-xl text-teal-600 transition-transform duration-300", isOpen && "rotate-45")}>+</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
