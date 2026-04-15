"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  icon?: ReactNode;
};

const EXTERNAL_HREF_PATTERN = /^(https?:|mailto:|tel:)/;

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
  target,
  rel,
  icon,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2.5",
    "rounded-full font-medium",
    "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50",
    sizeClasses[size]
  );

  const variantStyles = {
    primary: cn(
      "bg-stone-900 text-white",
      "hover:bg-stone-800",
      "active:scale-[0.98]"
    ),
    outline: cn(
      "bg-white/50 text-stone-700",
      "border border-stone-200",
      "hover:bg-white hover:border-stone-300",
      "hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
      "active:scale-[0.98]"
    ),
    ghost: cn(
      "bg-transparent text-stone-600",
      "hover:bg-stone-100/50",
      "active:scale-[0.98]"
    ),
  };

  const buttonClasses = cn(base, variantStyles[variant], className);

  const MotionWrapper = ({ children }: { children: ReactNode }) => (
    <motion.span
      className="inline-block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.span>
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <motion.span
          className={cn(
            "flex items-center justify-center rounded-full",
            variant === "primary" ? "bg-white/10" : "bg-stone-100",
            size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6"
          )}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  if (href) {
    const isExternal = EXTERNAL_HREF_PATTERN.test(href);
    const linkContent = isExternal ? (
      <a
        href={href}
        target={target}
        rel={rel || "noopener noreferrer"}
        className={buttonClasses}
      >
        {content}
      </a>
    ) : (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );

    return <MotionWrapper>{linkContent}</MotionWrapper>;
  }

  return (
    <MotionWrapper>
      <button type={type} onClick={onClick} className={buttonClasses}>
        {content}
      </button>
    </MotionWrapper>
  );
}
