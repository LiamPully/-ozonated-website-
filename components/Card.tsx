"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "subtle";
  hover?: boolean;
};

export function Card({ children, className, variant = "default", hover = true }: CardProps) {
  const variantStyles = {
    default: cn(
      "bg-white/80 backdrop-blur-xl",
      "border border-white/60",
      "shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)]",
    ),
    elevated: cn(
      "bg-white",
      "border border-stone-100",
      "shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]",
    ),
    subtle: cn(
      "bg-stone-50/50",
      "border border-stone-200/50",
      "shadow-none",
    ),
  };

  const CardContent = () => (
    <article
      className={cn(
        "rounded-[1.25rem] p-6 sm:p-8",
        variantStyles[variant],
        hover && "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        className
      )}
    >
      {children}
    </article>
  );

  if (hover) {
    return (
      <motion.div
        className="h-full"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <CardContent />
      </motion.div>
    );
  }

  return <CardContent />;
}

// Double-bezel card variant for premium layouts
export function CardBezel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("p-[2px] rounded-[1.5rem] bg-gradient-to-b from-white/40 to-stone-200/50", className)}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="w-full h-full rounded-[calc(1.5rem-2px)] bg-white p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
}
