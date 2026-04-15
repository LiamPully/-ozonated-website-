"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Shield,
  Users,
  ArrowUpRight,
  Clock,
  MapPin,
  Award,
} from "lucide-react";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
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

const values = [
  {
    icon: Heart,
    title: "Client-Centered Care",
    description: "Every treatment is tailored to your unique wellness goals and needs.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "We maintain the highest standards of hygiene and safety protocols.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Premium products and evidence-based techniques for optimal results.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Highly trained professionals dedicated to your wellness journey.",
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Happy Clients" },
  { value: "12", label: "Premium Services" },
  { value: "1", label: "HOCATT in East London" },
];

export default function AboutPage() {
  return (
    <>
      <Section className="relative pt-24 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-teal-50/60 via-stone-50/30 to-transparent blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                About Us
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              custom={0.1}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight mb-6"
            >
              Where Luxury Ritual Meets
              <span className="block text-stone-500">Clinical Wellness</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
            >
              Ozonated Health & Wellness Center is designed for clients seeking calm, 
              recovery, and high-quality personalized care in East London.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-stone-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                custom={index * 0.1}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-stone-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-stone-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3 block">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-6">
                A Decade of Wellness Excellence
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Founded with a vision to bring world-class wellness treatments to East London, 
                  Ozonated has grown into a trusted sanctuary for those seeking holistic health 
                  and rejuvenation.
                </p>
                <p>
                  We are proud to be the only facility in East London offering the HOCATT 
                  multi-technology wellness chamber, alongside our signature Japanese Head Spa 
                  and comprehensive range of therapeutic services.
                </p>
                <p>
                  Our approach combines time-honored spa traditions with cutting-edge wellness 
                  technology, creating transformative experiences that nurture both body and mind.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-4"
            >
              <Card variant="elevated">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Our Mission</h3>
                    <p className="text-stone-600 text-sm">
                      Deliver premium wellness experiences that are restorative, safe, 
                      and outcomes-focused.
                    </p>
                  </div>
                </div>
              </Card>

              <Card variant="elevated">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Our Approach</h3>
                    <p className="text-stone-600 text-sm">
                      Integrative protocols blending spa rituals with modern, 
                      evidence-informed wellness systems.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
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
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight mb-4">
              What We Stand For
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  custom={index * 0.1}
                >
                  <Card variant="elevated" className="h-full">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-stone-600 text-sm">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
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
                  Visit Us Today
                </h2>
                <p className="text-teal-100 text-lg mb-8 leading-relaxed">
                  Experience the Ozonated difference. Book your appointment and begin 
                  your wellness journey.
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
                  <Button
                    href="/contact"
                    variant="outline"
                    className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    Contact Us
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
