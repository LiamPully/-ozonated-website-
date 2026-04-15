"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Wind,
  Droplets,
  Moon,
  ArrowUpRight,
  Clock,
  Check,
} from "lucide-react";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { SpaImage } from "@/components/SpaImage";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerContainer = {
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
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const benefits = [
  {
    icon: Droplets,
    title: "Deep Cleansing",
    description: "Removes buildup and impurities for healthier scalp",
  },
  {
    icon: Wind,
    title: "Stress Relief",
    description: "Tension-melting massage techniques",
  },
  {
    icon: Heart,
    title: "Scalp Health",
    description: "Nourishes and revitalizes the scalp",
  },
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Promotes relaxation and restful sleep",
  },
];

const treatmentSteps = [
  { step: "01", title: "Consultation", desc: "Assessment of scalp condition" },
  { step: "02", title: "Cleansing", desc: "Deep scalp exfoliation" },
  { step: "03", title: "Steam Therapy", desc: "Opens pores and softens skin" },
  { step: "04", title: "Massage", desc: "Japanese pressure-point techniques" },
  { step: "05", title: "Treatment", desc: "Nourishing serum application" },
  { step: "06", title: "Relaxation", desc: "Calming finish with warm towels" },
];

export default function JapaneseHeadSpaPage() {
  return (
    <>
      <Section className="relative pt-24 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-teal-50/60 via-stone-50/30 to-transparent blur-[100px]" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-stone-100/40 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Japanese Head Spa
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              custom={0.1}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight mb-6"
            >
              Scalp Rituals for
              <br />
              <span className="text-stone-500">Renewal & Relaxation</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed mb-8"
            >
              This traditional Japanese treatment combines deep cleansing, therapeutic massage, 
              steam therapy, and nourishing care for scalp health and total relaxation.
            </motion.p>

            <motion.div variants={fadeInUp} custom={0.3} className="flex flex-wrap gap-3">
              <Button
                href={WHATSAPP_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Book Session
              </Button>
              <Button href="/pricing" variant="outline">
                View Pricing
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              {
                src: "/assets/photos/head-spa/head-spa-treatment-1.jpg",
                alt: "Japanese Head Spa Scalp Treatment",
                span: true
              },
              {
                src: "/assets/photos/head-spa/head-spa-treatment-2.jpg",
                alt: "Relaxing Head Massage Therapy",
                span: false
              },
              {
                src: "/assets/photos/head-spa/head-spa-treatment-3.jpg",
                alt: "Premium Head Spa Experience",
                span: false
              },
            ].map((image, index) => (
              <motion.div
                key={image.src}
                variants={itemVariants}
                custom={index * 0.1}
                className={image.span ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden group bg-stone-100">
                  <SpaImage
                    src={image.src}
                    alt={image.alt}
                    fallbackKind="head-spa"
                    className="h-full"
                    sizes={image.span ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section className="bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3 block">
              Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-4">
              Why Choose Japanese Head Spa
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  custom={index * 0.1}
                >
                  <Card variant="elevated" className="h-full group">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-stone-600 text-sm">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3 block">
              The Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-4">
              Your Treatment Journey
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {treatmentSteps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                custom={index * 0.1}
                className="group"
              >
                <Card variant="subtle" className="h-full relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-5xl font-bold text-stone-100 group-hover:text-teal-50 transition-colors duration-500">
                    {step.step}
                  </span>
                  <div className="relative z-10">
                    <h3 className="font-semibold text-stone-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-stone-600 text-sm">
                      {step.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section className="pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card
              variant="elevated"
              className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-stone-900 text-white border-0"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
              </div>

              <div className="relative z-10 py-8 sm:py-12 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4">
                  Ready to Experience Bliss?
                </h2>
                <p className="text-teal-100 text-lg mb-8 leading-relaxed">
                  Book your Japanese Head Spa session and discover the ancient art of scalp wellness.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    href={WHATSAPP_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white !text-teal-700 hover:bg-teal-50"
                    icon={<ArrowUpRight className="w-4 h-4 text-teal-700" />}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
