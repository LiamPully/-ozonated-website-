"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/japanese-head-spa", label: "Japanese Head Spa" },
  { href: "/hocatt", label: "HOCATT" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "Products" },
];

const menuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 12 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
    },
  }),
};

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4",
        "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-6xl flex items-center justify-between",
          "px-4 sm:px-6 py-3",
          "rounded-full",
          "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-stone-200/50"
            : "bg-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="relative h-9 w-9 overflow-hidden rounded-xl"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Image
              src="/assets/logo-ozonated.svg"
              alt="Ozonated logo"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <span className="font-medium text-stone-800 text-sm hidden sm:block">
            Ozonated
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {links.slice(0, 6).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full",
                "transition-colors duration-200",
                pathname === link.href
                  ? "text-stone-900 bg-stone-100"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div ref={menuRef} className="flex items-center gap-2">
          <Button
            href={WHATSAPP_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="hidden sm:flex"
          >
            Book Now
          </Button>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "relative h-10 w-10 rounded-full",
              "flex items-center justify-center",
              "border border-stone-200",
              isMenuOpen ? "bg-stone-900 text-white" : "bg-white text-stone-700"
            )}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-stone-950/20 backdrop-blur-sm z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.nav
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className={cn(
                    "absolute right-4 top-[calc(100%+0.75rem)] z-50",
                    "w-[min(20rem,calc(100vw-2rem))]",
                    "rounded-2xl p-3",
                    "bg-white/95 backdrop-blur-xl",
                    "border border-stone-200/60",
                    "shadow-[0_24px_56px_-20px_rgba(0,0,0,0.15)]"
                  )}
                >
                  <ul className="space-y-1">
                    {links.map((link, i) => {
                      const isActive = pathname === link.href;
                      return (
                        <motion.li
                          key={link.href}
                          custom={i}
                          variants={itemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                              "block rounded-xl px-4 py-3 text-sm font-medium",
                              "transition-all duration-200",
                              isActive
                                ? "bg-stone-900 text-white"
                                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
