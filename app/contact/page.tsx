"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const BUSINESS_WHATSAPP_NUMBER = "27607758011";

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

function buildWhatsAppUrl(values: FormValues) {
  const message = `New Website Enquiry (Ozonated Wellness)\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\nMessage:\n${values.message}\n\nPage: /contact`;
  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const contactMethods = [
  {
    icon: Phone,
    label: "Phone",
    value: "060 775 8011",
    href: "tel:+27607758011",
    description: "Call us directly"
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@ozonatedel.co.za",
    href: "mailto:info@ozonatedel.co.za",
    description: "Send us an email"
  },
  {
    icon: MapPin,
    label: "Address",
    value: "36 Jarvis Road, Berea",
    href: "https://maps.google.com/?q=36+Jarvis+Road+Berea+East+London",
    description: "East London, South Africa",
    external: true
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri 9–5, Sat 9–12",
    description: "Sunday closed"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

function ContactCard({ method, index }: { method: typeof contactMethods[0]; index: number }) {
  const Icon = method.icon;
  const isClickable = method.href;

  const content = (
    <div className="card-bezel h-full">
      <div className="card-core h-full p-6 flex flex-col items-start">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="h-5 w-5 text-teal-600" strokeWidth={1.5} />
        </motion.div>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-stone-600">
          {method.label}
        </p>
        <p className="mt-1 text-lg font-medium text-stone-800">
          {method.value}
        </p>
        {method.description && (
          <p className="mt-1 text-sm text-stone-600">
            {method.description}
          </p>
        )}
      </div>
    </div>
  );

  if (isClickable) {
    return (
      <motion.a
        href={method.href}
        target={method.external ? "_blank" : undefined}
        rel={method.external ? "noopener noreferrer" : undefined}
        variants={itemVariants}
        className="group block h-full"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div variants={itemVariants} className="h-full">
      {content}
    </motion.div>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  isTextarea = false
}: {
  label: string;
  name: keyof FormValues;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
  isTextarea?: boolean;
}) {
  const inputClasses = cn(
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3.5",
    "text-stone-700 placeholder:text-stone-400",
    "focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50",
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-600">
        {label}
        {required && <span className="text-teal-600 ml-1">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={inputClasses}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-rose-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(next: FormValues) {
    const nextErrors: FormErrors = {};

    if (!next.name.trim()) nextErrors.name = "Name is required";
    if (!next.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!next.phone.trim()) {
      nextErrors.phone = "Phone is required";
    } else if (!/^[0-9+\s()-]{7,20}$/.test(next.phone)) {
      nextErrors.phone = "Enter a valid phone number";
    }
    if (!next.message.trim()) nextErrors.message = "Message is required";

    return nextErrors;
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const normalizedValues: FormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim()
    };

    const nextErrors = validate(normalizedValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    const whatsappUrl = buildWhatsAppUrl(normalizedValues);
    window.localStorage.setItem("ozonatedCustomerName", normalizedValues.name);
    window.localStorage.setItem("ozonatedCustomerPhone", normalizedValues.phone);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] bg-teal-50 text-teal-700">
              Get in Touch
            </span>
          </Reveal>

          <div className="mt-6 max-w-2xl">
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 tracking-tight leading-[1.1]">
                Book Your Session
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-lg text-stone-600 leading-relaxed">
                Ready to begin your wellness journey? Reach out to schedule your appointment
                or ask any questions. We're here to help you feel your best.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Methods Bento Grid */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {contactMethods.map((method, index) => (
              <ContactCard key={method.label} method={method} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form Side */}
            <Reveal>
              <div className="card-bezel">
                <div className="card-core p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                      <MessageCircle className="h-5 w-5 text-teal-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-xl font-medium text-stone-900">Send a Message</h2>
                      <p className="text-sm text-stone-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormInput
                        label="Full Name"
                        name="name"
                        value={values.name}
                        onChange={(v) => handleChange("name", v)}
                        placeholder="Your name"
                        error={errors.name}
                        required
                      />
                      <FormInput
                        label="Phone Number"
                        name="phone"
                        value={values.phone}
                        onChange={(v) => handleChange("phone", v)}
                        placeholder="Your phone"
                        error={errors.phone}
                        required
                      />
                    </div>

                    <FormInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(v) => handleChange("email", v)}
                      placeholder="your@email.com"
                      error={errors.email}
                      required
                    />

                    <FormInput
                      label="Your Message"
                      name="message"
                      value={values.message}
                      onChange={(v) => handleChange("message", v)}
                      placeholder="How can we help you? Tell us about what you're looking for..."
                      error={errors.message}
                      required
                      isTextarea
                    />

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        className={cn(
                          "flex-1 sm:flex-none",
                          isSubmitting && "opacity-70 cursor-wait"
                        )}
                        icon={
                          <Send className="h-4 w-4" strokeWidth={1.5} />
                        }
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                      <span className="text-sm text-stone-600">or</span>
                      <Button
                        href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`}
                        target="_blank"
                        variant="outline"
                        size="lg"
                      >
                        WhatsApp Us
                      </Button>
                    </div>

                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-teal-50 border border-teal-100 px-4 py-4 text-sm text-teal-800 flex items-start gap-3"
                      >
                        <div className="h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="h-3 w-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Message sent!</p>
                          <p className="text-teal-600/80 mt-0.5">Opening WhatsApp to complete your inquiry...</p>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </Reveal>

            {/* Info Side */}
            <Reveal delay={0.15}>
              <div className="space-y-8 lg:pt-8">
                <div>
                  <h3 className="text-2xl font-medium text-stone-900 leading-tight">
                    Visit Our Wellness Center
                  </h3>
                  <p className="mt-4 text-stone-600 leading-relaxed">
                    Experience tranquility in the heart of East London. Our serene space is
                    designed to help you unwind from the moment you step through our doors.
                  </p>
                </div>

                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.1234567890123!2d27.90123456789012!3d-33.01234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e66f1234567890%3A0x1234567890abcdef!2s36%20Jarvis%20Rd%2C%20Berea%2C%20East%20London%2C%205241%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    href={`https://maps.google.com/?q=36+Jarvis+Road+Berea+East+London`}
                    target="_blank"
                    variant="outline"
                  >
                    Get Directions
                  </Button>
                  <Button
                    href={`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`}
                    target="_blank"
                    variant="ghost"
                  >
                    Quick WhatsApp
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-[1.15]">
                  Ready to Transform Your Wellness Journey?
                </h2>
                <p className="mt-4 text-lg text-stone-400 leading-relaxed">
                  Book your first session today and experience the difference that
                  personalized, holistic care can make.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    href="/pricing"
                    size="lg"
                    className="bg-white text-stone-900 hover:bg-stone-100"
                  >
                    View Pricing
                  </Button>
                  <Button
                    href="/services"
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    Explore Services
                  </Button>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-900/20 to-transparent" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
