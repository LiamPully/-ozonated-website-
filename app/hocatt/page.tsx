"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Beaker,
  ChevronDown,
  Droplets,
  Flame,
  Heart,
  Lightbulb,
  Magnet,
  Wind,
  Zap,
  CheckCircle2,
  Sparkles,
  Trophy,
  Clock,
  Info
} from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";
import { useState } from "react";

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

const powerOf10 = [
  { title: "Steam Sauna Therapy", description: "Deep thermal cleansing", icon: Flame },
  { title: "Carbonic Acid Therapy", description: "Enhanced circulation", icon: Droplets },
  { title: "Frequency Therapy", description: "Bio-resonance support", icon: Activity },
  { title: "Plasma Light Therapy", description: "Cellular vitality", icon: Lightbulb },
  { title: "Far Infrared Therapy", description: "Deep tissue warmth", icon: Zap },
  { title: "PEMF Therapy", description: "Electromagnetic support", icon: Magnet },
  { title: "Ozone Therapy", description: "Activated oxygen", icon: Wind },
  { title: "Micro-Circulation", description: "Enhanced blood flow", icon: Heart },
  { title: "Negative Ion Field", description: "Energetic balance", icon: Wind },
  { title: "Pure Oxygen", description: "Cellular renewal", icon: Zap },
];

const expectFlow = [
  {
    title: "Start",
    subtitle: "Preparation & Personalization",
    content: "We begin with intake screening and individualized setup to align the chamber program with your goals.",
  },
  {
    title: "During",
    subtitle: "The HOCATT Experience",
    content: "You sit comfortably in the HOCATT chamber while ten technologies work in harmony for comprehensive wellness support.",
  },
  {
    title: "End",
    subtitle: "Recovery & Next Steps",
    content: "After completion, you cool down, hydrate, and receive tailored advice for recovery timing and your next appointment.",
  },
];

const preSessionChecklist = [
  "Hydrate well before arrival",
  "Avoid heavy meals 1-2 hours before",
  "Wear comfortable clothing",
  "Remove metallic accessories",
  "Inform team of medical concerns",
  "Arrive 10 minutes early",
];

const postSession = [
  "Continue hydration throughout the day",
  "Keep activities light if needed",
  "Avoid alcohol immediately after",
  "Track your recovery response",
  "Follow recommended session cadence",
];

const sportsBenefits = [
  { title: "Recovery", description: "Supports post-training", icon: Clock },
  { title: "Circulation", description: "Assists oxygen flow", icon: Activity },
  { title: "Fatigue", description: "Manages muscle fatigue", icon: Zap },
  { title: "Performance", description: "Complements training", icon: Trophy },
];

function EnhancedAccordion({ items }: { items: typeof expectFlow }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={item.title}
            initial={false}
            className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
              isOpen
                ? "border-teal-200 bg-white shadow-lg shadow-teal-900/5"
                : "border-stone-200 bg-white/60 hover:border-stone-300"
            }`}
          >
            <button
              className="flex w-full items-center justify-between px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-colors duration-500 ${
                    isOpen ? "bg-teal-600 text-white" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-teal-600 mb-0.5">
                    {item.subtitle}
                  </span>
                  <span className={`block text-lg font-semibold transition-colors duration-300 ${
                    isOpen ? "text-stone-900" : "text-stone-700"
                  }`}>
                    {item.title}
                  </span>
                </div>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`text-stone-400 ${isOpen ? "text-teal-600" : ""}`}
              >
                <ChevronDown className="h-5 w-5" />
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
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-stone-100 pt-4">
                      <p className="leading-relaxed text-stone-600 pl-14">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HocattPage() {
  return (
    <>
      <Section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 sm:pt-32">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-100/40 blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-stone-100/60 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Advanced Wellness Technology
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              custom={0.1}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight mb-6"
            >
              Ten Technologies.
              <br />
              <span className="text-stone-500">One Transformative Session.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed mb-8"
            >
              HOCATT integrates multiple wellness technologies in a single guided
              session focused on whole-body recovery, detox support, and
              revitalization.
            </motion.p>

            <motion.div variants={fadeInUp} custom={0.3} className="flex flex-wrap gap-4">
              <Button
                href={WHATSAPP_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book HOCATT Session
              </Button>
              <Button href="#technologies" variant="outline">
                Explore Technologies
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Section id="technologies" className="bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3 block">
              The Power of 10
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-4">
              Integrated Technologies
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              Each HOCATT session combines ten complementary modalities working
              in harmony for comprehensive wellness support.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {powerOf10.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.title}
                  variants={itemVariants}
                  custom={index * 0.05}
                >
                  <Card variant="elevated" className="h-full group relative overflow-hidden">
                    <span className="absolute top-4 right-4 text-4xl font-bold text-stone-100 group-hover:text-teal-50 transition-colors duration-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 mb-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-semibold text-stone-900 mb-1 group-hover:text-teal-900 transition-colors duration-300">
                        {tech.title}
                      </h3>
                      <p className="text-sm text-stone-500 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-teal-50/0 to-teal-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3 block">
                Your Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-4">
                What to Expect
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                Every HOCATT session follows a carefully designed protocol to
                ensure you receive the full benefits of this advanced wellness
                technology.
              </p>

              <Card variant="subtle" className="bg-gradient-to-br from-teal-50/50 to-stone-50/50 hidden lg:block">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600 shrink-0">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-1">
                      Session Duration
                    </h4>
                    <p className="text-sm text-stone-600">
                      Each session typically lasts 30-45 minutes.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <EnhancedAccordion items={expectFlow} />
            </motion.div>
          </div>
        </div>
      </Section>

      <Section className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400 mb-3 block">
              Preparation Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mb-4">
              Before & After Your Session
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Follow these guidelines to maximize your HOCATT experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-[2px] rounded-[1.5rem] bg-gradient-to-b from-teal-500/20 to-stone-800/20">
                <div className="bg-stone-800/50 backdrop-blur-xl rounded-[calc(1.5rem-2px)] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                      <Beaker className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      Pre-Session
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {preSessionChecklist.map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-start gap-3 text-stone-300"
                      >
                        <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-[2px] rounded-[1.5rem] bg-gradient-to-b from-teal-500/20 to-stone-800/20">
                <div className="bg-stone-800/50 backdrop-blur-xl rounded-[calc(1.5rem-2px)] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                      <Heart className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      Post-Session
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {postSession.map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.08 + 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-start gap-3 text-stone-300"
                      >
                        <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
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
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10 py-8 sm:py-12 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4">
                  Ready to Experience HOCATT?
                </h2>
                <p className="text-teal-100 text-lg mb-8 leading-relaxed">
                  Book your session today and discover why our clients call this
                  their secret weapon for wellness and recovery.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    href={WHATSAPP_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white !text-teal-700 hover:bg-teal-50"
                    icon={<ArrowRight className="w-4 h-4 text-teal-700" />}
                  >
                    Book Now
                  </Button>
                  <Button
                    href="/pricing"
                    variant="outline"
                    className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    View Pricing
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
