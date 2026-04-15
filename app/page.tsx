"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SpaImage } from "@/components/SpaImage";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";

const spaGallery = [
  "/assets/photos/gallery/hocatt-cocoon-solo.jpg",
  "/assets/photos/gallery/hocatt-blue-wrap.jpg",
  "/assets/photos/gallery/hocatt-male.jpg",
  "/assets/photos/gallery/lounge-drinks.jpg"
];

type FallbackKind = "head-spa" | "hocatt" | "mesotherapy" | "massage" | "wellness" | "generic";

const fallbackByServiceId: Record<string, FallbackKind> = {
  "japanese-head-spa": "head-spa",
  "hocatt-therapy": "hocatt",
  "ozone-technology": "hocatt",
  "massage-wellness": "massage"
};

const cardTitleById: Record<string, string> = {
  "japanese-head-spa": "Pedicure",
  "ozone-technology": "Thermal Body Wrap"
};

const cardImageById: Record<string, string> = {
  "hocatt-therapy": "/assets/photos/clinic/clinic-1.jpg",
  "ozone-technology": "/assets/photos/clinic/thermal-body-wrap.jpg"
};

// Animation variants
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

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const byId = useMemo(() =>
    Object.fromEntries(services.map((service) => [service.id, service])),
    []
  );

  const heroCards = [
    byId["japanese-head-spa"],
    byId["hocatt-therapy"],
    byId["ozone-technology"],
    byId["massage-wellness"],
  ].filter(Boolean);

  return (
    <>
      {/* Hero Section - Asymmetric Layout */}
      <Section ref={heroRef} className="relative min-h-[90dvh] flex items-center pt-24 sm:pt-32">
        {/* Ambient Background */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-100/30 blur-[100px]" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-stone-100/50 blur-[80px]" />
        </motion.div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Eyebrow Tag */}
            <motion.div variants={fadeInUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-xs font-medium uppercase tracking-wider mb-6">
                Ozonated Health & Wellness Center
              </span>
            </motion.div>

            {/* Headline - Editorial Style */}
            <motion.h1
              variants={fadeInUp}
              custom={0.1}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight mb-6"
            >
              Luxury spa care.
              <br />
              <span className="text-stone-500">Clinical wellness precision.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-lg text-stone-600 max-w-xl leading-relaxed mb-8"
            >
              Restore balance with advanced wellness support and premium spa
              therapies in East London.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              custom={0.3}
              className="flex flex-wrap gap-3"
            >
              <Button
                href={WHATSAPP_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Book Now
              </Button>
              <Button href="/pricing" variant="outline">
                View Pricing
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Services Section - Bento Grid */}
      <Section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-teal-600 mb-3 block">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight">
              What we do
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {heroCards.map((service, index) => {
              const fallbackKind = fallbackByServiceId[service.id] ?? "generic";
              const displayTitle = cardTitleById[service.id] ?? service.title;
              const displayImage = cardImageById[service.id] ?? service.image;

              return (
                <motion.article
                  key={service.id}
                  variants={fadeInUp}
                  custom={index * 0.1}
                >
                  <Card className="h-full flex flex-col">
                    <SpaImage
                      src={displayImage}
                      alt={displayTitle}
                      fallbackKind={fallbackKind}
                      priority={index === 0}
                      className="h-[220px] md:h-[260px]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="mt-5 flex-1">
                      <h3 className="text-xl font-medium text-stone-900 mb-2">
                        {displayTitle}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <Button
                      href={service.href}
                      variant="outline"
                      size="sm"
                      className="mt-5 w-fit"
                    >
                      Learn more
                    </Button>
                  </Card>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section className="py-24 sm:py-32 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-teal-600 mb-3 block">
              Gallery
            </span>
            <p className="text-stone-600 max-w-2xl">
              Hocatt™ Ozone Technology • Fat Freezing • Massages • Ultrasonic Cavitation
              • Ozone Cupping • Insufflations • Body Wraps
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          >
            {spaGallery.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex-shrink-0 snap-center"
              >
                <SpaImage
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  fallbackKind="head-spa"
                  className="w-[80vw] sm:w-[45vw] lg:w-[30vw] aspect-[4/3] rounded-xl"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/japanese-head-spa">Explore Head Spa</Button>
            <Button
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Book Now
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* HOCATT Highlight */}
      <Section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="elevated" className="bg-gradient-to-br from-teal-50/80 via-white to-white">
              <div className="max-w-2xl">
                <span className="text-xs font-medium uppercase tracking-wider text-teal-600 mb-3 block">
                  Featured
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight mb-4">
                  HOCATT Highlight
                </h2>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Discover a powerful multi-system session combining ozone, infrared
                  heat, and oxygen support.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button href="/hocatt">View HOCATT</Button>
                  <Button
                    href={WHATSAPP_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Testimonials - Bento Grid with Editorial Styling */}
      <Section className="py-24 sm:py-32 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header with Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50/80 text-teal-700 text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">
              Client Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight leading-[1.15]">
              Words from our
              <span className="block text-stone-500">wellness community</span>
            </h2>
          </motion.div>

          {/* Bento Grid Layout */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-min"
          >
            {/* Featured Testimonial - Carol Radloff (spans 2x2) */}
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="md:col-span-2 md:row-span-2"
            >
              <Card variant="elevated" className="h-full flex flex-col justify-between relative overflow-hidden group">
                {/* Decorative Quote Mark */}
                <div className="absolute top-4 right-6 text-[120px] leading-none font-serif text-teal-100/50 select-none pointer-events-none">
                  "
                </div>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-teal-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote - Large Editorial Style */}
                  <blockquote className="text-xl sm:text-2xl font-light text-stone-800 leading-[1.5] italic mb-8">
                    "I booked for the Valentines special on Sunday and want to congratulate and thank the ladies for an amazing and relaxing spoil. From the minute we entered to the end was lovely. Such care and detail from the beautiful aroma, awesome massages, spoils and feeling of complete and utter relaxation was just perfect!"
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-stone-200/60 ring-offset-2 ring-offset-white">
                    <Image
                      src="/assets/testimonials/carol-radloff.svg"
                      alt="Carol Radloff"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Carol Radloff</p>
                    <p className="text-sm text-stone-500">Valentine's Special Guest</p>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-teal-50/0 via-teal-50/0 to-teal-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                />
              </Card>
            </motion.div>

            {/* Standard Testimonials */}
            {/* Sipokazi Mpange */}
            <motion.div variants={fadeInUp} custom={0.1} className="md:col-span-1">
              <Card variant="subtle" className="h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-teal-500/70 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-stone-600 leading-relaxed flex-1">
                  "Professional service and great advice"
                </blockquote>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-200/50">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-stone-200/40">
                    <Image
                      src="/assets/testimonials/sipokazi-mpange.svg"
                      alt="Sipokazi Mpange"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium text-stone-900 text-sm">Sipokazi Mpange</p>
                </div>
              </Card>
            </motion.div>

            {/* Sitandiwe Nqelenga */}
            <motion.div variants={fadeInUp} custom={0.15} className="md:col-span-1">
              <Card variant="default" className="h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-teal-500/70 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-stone-600 leading-relaxed flex-1">
                  "Best service with great advice on how to maintain and live a long lasting healthy lifestyle"
                </blockquote>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-200/50">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-stone-200/40">
                    <Image
                      src="/assets/testimonials/sitandiwe-nqelenga.svg"
                      alt="Sitandiwe Nqelenga"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium text-stone-900 text-sm">Sitandiwe Nqelenga</p>
                </div>
              </Card>
            </motion.div>

            {/* Kayla Boorer - Medium Length */}
            <motion.div variants={fadeInUp} custom={0.2} className="md:col-span-1">
              <Card variant="elevated" className="h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-teal-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-stone-600 leading-relaxed flex-1 text-sm">
                  "What an amazing morning spent with Mel and her amazing team at Ozonated. My Acudetox and ozone treatment left me feeling all kinds of peace and contentment."
                </blockquote>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-100">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-stone-200/60 ring-offset-2 ring-offset-white">
                    <Image
                      src="/assets/testimonials/kayla-boorer.svg"
                      alt="Kayla Boorer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium text-stone-900 text-sm">Kayla Boorer</p>
                </div>
              </Card>
            </motion.div>

            {/* Wendy Tobbell */}
            <motion.div variants={fadeInUp} custom={0.25} className="md:col-span-1">
              <Card variant="subtle" className="h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-teal-500/70 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-stone-600 leading-relaxed flex-1">
                  "Highly recommended... relaxation at its best"
                </blockquote>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-stone-200/50">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-stone-200/40">
                    <Image
                      src="/assets/testimonials/wendy-tobbell.svg"
                      alt="Wendy Tobbell"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium text-stone-900 text-sm">Wendy Tobbell</p>
                </div>
              </Card>
            </motion.div>

            {/* Petal Sanka - Spans 2 columns on desktop */}
            <motion.div variants={fadeInUp} custom={0.3} className="md:col-span-2">
              <Card variant="default" className="h-full flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-teal-500/70 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-stone-600 leading-relaxed">
                    "Excellent service by Mel and her team. The attention to detail and genuine care for wellness makes every visit special."
                  </blockquote>
                </div>
                <div className="flex items-center gap-3 sm:border-l sm:border-stone-200/50 sm:pl-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-200/50">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-stone-200/40">
                    <Image
                      src="/assets/testimonials/petal-sanka.svg"
                      alt="Petal Sanka"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900 text-sm">Petal Sanka</p>
                    <p className="text-xs text-stone-500">Regular Client</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16"
          >
            <Card variant="elevated" className="relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-stone-50/50" />

              <div className="relative z-10 py-4 sm:py-6 text-center">
                <h3 className="text-xl sm:text-2xl font-medium text-stone-900 mb-3">
                  Ready to experience it yourself?
                </h3>
                <p className="text-stone-600 mb-6 max-w-md mx-auto">
                  Join our wellness community and discover the transformative power of personalized care.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    href={WHATSAPP_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    Book Your Session
                  </Button>
                  <Button href="/pricing" variant="outline">
                    View Pricing
                  </Button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-teal-100/30 blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-stone-200/30 blur-[60px] pointer-events-none" />
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Visit Us */}
      <Section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="subtle">
              <div className="max-w-2xl">
                <span className="text-xs font-medium uppercase tracking-wider text-teal-600 mb-3 block">
                  Visit Us
                </span>
                <h2 className="text-2xl font-medium text-stone-900 tracking-tight mb-4">
                  Come experience wellness
                </h2>
                <div className="space-y-2 text-stone-600">
                  <p>36 Jarvis Road, Berea, East London</p>
                  <p>060 775 8011 | info@ozonatedel.co.za</p>
                  <p className="text-sm text-stone-500 mt-4">
                    Mon-Fri 9-5, Sat 9-12, Sun closed
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
