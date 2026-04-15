"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  Droplets,
  Sun,
  Heart,
  Star,
  Gem,
  Leaf,
  Flame,
  Snowflake,
  Waves,
  Zap,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { pricingCategories, type PricingCategory } from "@/content/pricing";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";

// Category icons mapped to spa/luxury aesthetic
const categoryIcons: Record<string, React.ReactNode> = {
  "Waxing & Threading": <Droplets className="w-5 h-5" />,
  Tinting: <EyeIcon />,
  "Body Wraps & Meso": <Leaf className="w-5 h-5" />,
  Microneedling: <Sparkles className="w-5 h-5" />,
  Facials: <Gem className="w-5 h-5" />,
  Nails: <Star className="w-5 h-5" />,
  Massage: <Heart className="w-5 h-5" />,
  "Japanese Head Spa": <Waves className="w-5 h-5" />,
  "Sun Bed": <Sun className="w-5 h-5" />,
  "Ozone packages": <Zap className="w-5 h-5" />,
  "Fat Freeze": <Snowflake className="w-5 h-5" />,
  Cavitation: <Flame className="w-5 h-5" />,
};

// Custom eye icon for tinting
function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function formatPrice(price: number | null): string {
  if (price === null) return "POA";
  return `R${price.toLocaleString("en-ZA")}`;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function PricingAccordion({ category, index }: { category: PricingCategory; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const Icon = categoryIcons[category.category] || <Sparkles className="w-5 h-5" />;

  return (
    <motion.div
      variants={itemVariants}
      className="group"
    >
      <div
        className={`
          overflow-hidden rounded-2xl border transition-all duration-500
          ${isOpen 
            ? "bg-white border-stone-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)]" 
            : "bg-white/60 border-stone-100 hover:bg-white hover:border-stone-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          }
        `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-5 sm:px-8 sm:py-6 text-left flex items-center justify-between gap-4"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-4">
            <span
              className={`
                flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300
                ${isOpen ? "bg-teal-50 text-teal-600" : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"}
              `}
            >
              {Icon}
            </span>
            <div>
              <h3 className="font-medium text-stone-900 text-base sm:text-lg tracking-tight">
                {category.category}
              </h3>
              <p className="text-sm text-stone-500 mt-0.5">
                {category.items.length} {category.items.length === 1 ? "service" : "services"}
              </p>
            </div>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
              ${isOpen ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"}
            `}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="pt-2 border-t border-stone-100">
                  <div className="space-y-0 mt-6">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={`${category.category}-${item.service}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: itemIndex * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`
                          group/item flex items-start sm:items-center justify-between gap-4 py-4
                          ${itemIndex !== category.items.length - 1 ? "border-b border-stone-100" : ""}
                        `}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-stone-700 text-sm sm:text-base group-hover/item:text-stone-900 transition-colors duration-200">
                            {item.service}
                          </p>
                          {item.duration && (
                            <p className="flex items-center gap-1.5 text-xs text-stone-600 mt-1">
                              <Clock className="w-3 h-3" />
                              {item.duration}
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          {item.price === null ? (
                            <span className="text-sm italic text-stone-600 font-light">
                              Price on request
                            </span>
                          ) : (
                            <p className="text-base sm:text-lg font-medium text-stone-900 tabular-nums tracking-tight">
                              {formatPrice(item.price)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-hidden">
        {/* Ambient gradient background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-teal-50/60 via-stone-50/30 to-transparent blur-[100px]" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] rounded-full bg-stone-100/50 blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-xs font-medium uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Treatment Menu
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light"
          >
            A curated collection of premium treatments designed to restore, rejuvenate, and reveal your natural radiance.
          </motion.p>
        </motion.div>
      </Section>

      {/* Pricing Accordion Section */}
      <Section className="pt-0 pb-16 sm:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {pricingCategories.map((category, index) => (
            <PricingAccordion
              key={category.category}
              category={category}
              index={index}
            />
          ))}
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/50 via-white to-stone-50/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-teal-50/40 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center px-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-50 to-stone-50 border border-stone-100 mb-8">
            <Heart className="w-6 h-6 text-teal-600" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-4">
            Ready to begin your journey?
          </h2>

          <p className="text-stone-600 text-lg leading-relaxed mb-10 max-w-lg mx-auto font-light">
            Our wellness specialists are here to guide you toward the perfect treatment. Book your appointment today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Book via WhatsApp
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
              Contact us
            </Button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-sm text-stone-600 font-light"
          >
            36 Jarvis Road, Berea, East London · 060 775 8011
          </motion.p>
        </motion.div>
      </Section>
    </>
  );
}
