"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type FallbackKind = "head-spa" | "hocatt" | "mesotherapy" | "massage" | "wellness" | "generic";

const fallbackByKind: Record<FallbackKind, string> = {
  "head-spa": "/assets/photos/spa/facial-mask-2.jpg",
  hocatt: "/assets/photos/hocatt/hocatt-hero.webp",
  mesotherapy: "/assets/photos/clinic/clinic-1.jpg",
  massage: "/assets/photos/spa/towels-stones.jpg",
  wellness: "/assets/photos/spa/candles.jpg",
  generic: "/assets/placeholders/image-fallback.svg"
};

type SpaImageProps = {
  src?: string;
  alt: string;
  fallbackKind?: FallbackKind;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function SpaImage({
  src,
  alt,
  fallbackKind = "generic",
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false
}: SpaImageProps) {
  const fallback = fallbackByKind[fallbackKind];
  const initial = src?.trim() ? src : fallback;
  const [activeSrc, setActiveSrc] = useState(initial);

  const resolvedSrc = useMemo(() => activeSrc || fallback, [activeSrc, fallback]);

  return (
    <div className={cn("group relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_16px_35px_-24px_rgba(16,81,76,0.8)]", className)}>
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105", imageClassName)}
        onError={() => setActiveSrc(fallback)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-slate-900/5 to-transparent" />
    </div>
  );
}
