"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { WHATSAPP_BOOKING_URL } from "@/lib/constants";

export function StickyMobileCTA() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 1 }}
      className="fixed inset-x-0 bottom-0 z-40 p-4 sm:hidden"
    >
      <div className="mx-auto max-w-md grid grid-cols-2 gap-3">
        <Link
          href="tel:0607758011"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3.5 text-sm font-medium text-white shadow-lg"
        >
          <Phone className="w-4 h-4" />
          Call
        </Link>
        <Link
          href={WHATSAPP_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-stone-200 px-5 py-3.5 text-sm font-medium text-stone-700 shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Link>
      </div>
    </motion.div>
  );
}
