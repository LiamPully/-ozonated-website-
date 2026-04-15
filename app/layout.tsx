import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { AmbientBackground } from "@/components/AmbientBackground";

export const metadata: Metadata = {
  title: "Ozonated Health & Wellness Center",
  description: "Luxury spa and clinical wellness experiences in East London.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/assets/logo-ozonated.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/assets/logo-ozonated.svg", type: "image/svg+xml" }],
    shortcut: ["/assets/logo-ozonated.svg"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-stone-900 antialiased">
        <AmbientBackground />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
