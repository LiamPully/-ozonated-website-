export type Service = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  detail: string;
};

export const services: Service[] = [
  {
    id: "japanese-head-spa",
    title: "Japanese Head Spa",
    description: "Deep scalp cleansing and therapeutic relaxation ritual for healthy hair and stress relief.",
    href: "/japanese-head-spa",
    image: "/assets/photos/spa/facial-mask-1.jpeg",
    detail:
      "A curated treatment featuring exfoliation, steam activation, pressure-point massage, and restorative hydration for scalp and hair health."
  },
  {
    id: "hocatt-therapy",
    title: "HOCATT Therapy",
    description: "A multi-technology wellness chamber protocol for detox, circulation, and recovery support.",
    href: "/hocatt",
    image: "/assets/photos/hocatt/hocatt-hero.webp",
    detail:
      "The HOCATT session combines ozone support, thermal therapy, and oxygen-focused recovery in a single guided treatment."
  },
  {
    id: "ozone-technology",
    title: "Ozone Technology",
    description: "Advanced ozone-led wellness support with targeted protocols.",
    href: "/services",
    image: "/assets/photos/hocatt/hocatt-therapy.png",
    detail: "Only one in East London. Our ozone technology offering supports detox, performance, and recovery workflows."
  },
  {
    id: "massage-wellness",
    title: "Massage & Wellness",
    description: "Recovery-focused massage and integrative wellness sessions for body and mind.",
    href: "/services",
    image: "/assets/photos/spa/towels-stones.jpg",
    detail: "Choose from stress-release massage, post-training recovery support, and tailored wellness consultations."
  }
];
