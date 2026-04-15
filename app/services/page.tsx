"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Waves,
  Zap,
  Gem,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/services";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";

// Map services to premium icons
const serviceIcons: Record<string, React.ReactNode> = {
  "japanese-head-spa": <Waves className="w-6 h-6" />,
  "hocatt-therapy": <Zap className="w-6 h-6" />,
  "ozone-technology": <Sparkles className="w-6 h-6" />,
  "massage-wellness": <Gem className="w-6 h-6" />,
};

// Bento grid layout configuration
const bentoLayouts = [
  "col-span-12 md:col-span-6 lg:col-span-7",
  "col-span-12 md:col-span-6 lg:col-span-5",
  "col-span-12 md:col-span-6 lg:col-span-5",
  "col-span-12 md:col-span-6 lg:col-span-7",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const Icon = serviceIcons[service.id] || <Leaf className="w-6 h-6" />;
  const layoutClass = bentoLayouts[index % bentoLayouts.length];
  const isLarge = layoutClass.includes("col-span-7");

  return (
    <motion.div variants={itemVariants} className={layoutClass}>
      <Link href={service.href} className="block h-full group">
        <Card
          variant="elevated"
          className="h-full overflow-hidden relative"
          hover
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              sizes={isLarge ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent" />
          </div>

          <div className="relative h-full min-h-[280px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-8">
            <motion.div
              className="absolute top-6 left-6 sm:top-8 sm:left-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-stone-100/80 backdrop-blur-md text-stone-700 border border-stone-200/50">
                {Icon}
              </span>
            </motion.div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
                {service.title}
              </h2>

              <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-medium max-w-md">
                {service.description}
              </p>

              {isLarge && (
                <p className="text-stone-600 text-sm leading-relaxed max-w-lg hidden sm:block font-medium">
                  {service.detail}
                </p>
              )}

              {service.id === "ozone-technology" && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Only one in East London
                </div>
              )}

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-stone-700 text-sm font-semibold group-hover:text-stone-900 transition-colors duration-300">
                  Learn more
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Section className="relative pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-hidden">
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
            Our Offerings
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight"
          >
            Wellness Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Discover our curated collection of premium treatments designed to restore, rejuvenate, and reveal your natural radiance.
          </motion.p>
        </motion.div>
      </Section>

      <Section className="pt-0 pb-16 sm:pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-12 gap-4 sm:gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </Section>

      <Section className="relative py-20 sm:py-28 bg-stone-100">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50" />
        </div>

        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-teal-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              More Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight mb-4">
              Additional Treatments
            </h2>
            <p className="text-stone-700 text-lg leading-relaxed">
              Complementary services to enhance your wellness journey
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {[
            { name: "Ultrasonic Cavitation", description: "Non-invasive body contouring treatment", icon: Waves },
            { name: "Thermal Body Wraps", description: "Detoxifying and slimming treatments", icon: Leaf },
            { name: "Fat Freezing", description: "Cryolipolysis for targeted fat reduction", icon: Zap },
            { name: "Facials", description: "Customized skincare treatments", icon: Gem },
            { name: "Manicures & Pedicures", description: "Luxury nail care services", icon: Heart },
            { name: "Waxing & Threading", description: "Professional hair removal services", icon: Sparkles },
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                variants={itemVariants}
                className="group"
              >
                <Card variant="default" className="h-full bg-white shadow-sm border-stone-200/60">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-100 group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-stone-900 text-base">
                        {service.name}
                      </h3>
                      <p className="text-stone-600 text-sm mt-1.5 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      <Section className="relative py-20 sm:py-28 overflow-hidden">
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
