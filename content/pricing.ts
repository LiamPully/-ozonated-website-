export type PriceEntry = {
  service: string;
  price: number | null;
  duration?: string;
};

export type PricingCategory = {
  category: string;
  items: PriceEntry[];
};

export const pricingCategories: PricingCategory[] = [
  {
    category: "Waxing & Threading",
    items: [
      { service: "Lip", price: 60 },
      { service: "Chin", price: 60 },
      { service: "Cheeks", price: 60 },
      { service: "Full Face", price: 180 },
      { service: "Brows", price: 80 },
      { service: "Lip Chin", price: 120 },
      { service: "Underarm", price: 180 },
      { service: "Arms Half", price: 140 },
      { service: "Arms Full", price: 200 },
      { service: "Bikini", price: 150 },
      { service: "Brazillian", price: 200 },
      { service: "Hollywood", price: 250 },
      { service: "Back", price: 250 },
      { service: "Chest & Stomach", price: 330 },
      { service: "Leg Half", price: 200 },
      { service: "Leg 3/4", price: 220 },
      { service: "Leg Full", price: 250 },
      { service: "Half Leg & Brazillian / Hollywood", price: 400 },
      { service: "3/4 Leg & Brazillian / Hollywood", price: 420 },
      { service: "Full Leg & Brazillian / Hollywood", price: 450 },
      { service: "Hollywood & Underarm", price: 390 },
      { service: "Hollywood, Underarm & Brows", price: 420 }
    ]
  },
  {
    category: "Tinting",
    items: [
      { service: "Eyelash", price: 80 },
      { service: "Eyebrow", price: 80 },
      { service: "Wax Thread & Tint", price: 150 },
      { service: "Brow Lamination", price: 300 },
      { service: "Brow Lamination, Shape & Tint", price: 420 },
      { service: "Brow Lamination, Shape / Tint", price: 300 },
      { service: "Lash Lift", price: 235 },
      { service: "Lash Lift & Tint", price: 320 },
      { service: "Wax / Thread & Tint", price: 150 },
      { service: "Combination of Everything", price: 650 }
    ]
  },
  {
    category: "Body Wraps & Meso",
    items: [
      { service: "1 Area / Session", price: 300 },
      { service: "10 Areas / Sessions", price: 2000 },
      { service: "Cryocurve Meso Injections", price: 350 },
      { service: "10 x Meso Injections", price: 3000 }
    ]
  },
  {
    category: "Microneedling",
    items: [
      { service: "Full Face - 1 Treatment", price: 700 },
      { service: "4 Treatments", price: 2200 },
      { service: "Face & Neck", price: 800 },
      { service: "4 Treatments (Face & Neck)", price: 2500 }
    ]
  },
  {
    category: "Facials",
    items: [
      { service: "Express", price: 450, duration: "30 mins" },
      { service: "Teen", price: 350, duration: "30 mins" },
      { service: "Full", price: 600, duration: "60 mins" },
      { service: "Radio Frequency Facial", price: 650, duration: "60 mins" },
      { service: "Dermaplane Facial", price: 550, duration: "60 mins" }
    ]
  },
  {
    category: "Nails",
    items: [
      { service: "Gel Overlay", price: 220 },
      { service: "Full Set Tips", price: 320 },
      { service: "Nail Repair", price: 50 },
      { service: "Gel Toes", price: 190 },
      { service: "Deluxe Pedicure", price: 300 },
      { service: "Mini Manicure", price: 150 },
      { service: "Mini Pedicure", price: 220 },
      { service: "Soak Off", price: 50 },
      { service: "Fill & Overlay", price: 230 },
      // TODO(pricing): Nail Art is listed as TBA in the 2026 rate card.
      { service: "Nail Art", price: null }
    ]
  },
  {
    category: "Massage",
    items: [
      { service: "Back, Neck & Shoulders", price: 285, duration: "30 mins" },
      { service: "Back Treatment Scrub & Massage", price: 380, duration: "30 mins" },
      { service: "Rejuvinating Full Body", price: 450, duration: "60 mins" },
      { service: "Deep Tissue Massage", price: 550, duration: "60 mins" },
      { service: "Lymph Drainage Massage", price: 450, duration: "60 mins" },
      { service: "Full Body Scrub Massage", price: 650, duration: "60 mins" }
    ]
  },
  {
    category: "Japanese Head Spa",
    items: [
      { service: "Includes Head Spa", price: 599, duration: "45 mins" },
      { service: "Jelly Facial", price: 400, duration: "30 mins" },
      { service: "Mask - Gloves", price: 100 },
      { service: "Mask - Foot", price: 100 },
      { service: "Leave in hair treatment", price: 120 }
    ]
  },
  {
    category: "Sun Bed",
    items: [
      { service: "1 Session", price: 50 },
      { service: "4 sessions + 1 free", price: 200 },
      { service: "7 sessions + 3 free", price: 350 },
      { service: "10 sessions + 10 free", price: 500 }
    ]
  },
  {
    category: "Ozone packages",
    items: [
      { service: "1 Ozone Session", price: 300 },
      { service: "5 Ozone Sessions", price: 1300 },
      { service: "10 Ozone Sessions", price: 2500 },
      { service: "20 Ozone Sessions", price: 4000 },
      { service: "Ozone Cupping / Bagging", price: 150 },
      { service: "Ozone Insufflations", price: 250 },
      { service: "Add FSM to Ozone Session", price: 50 }
    ]
  },
  {
    category: "Fat Freeze",
    items: [
      { service: "1 Session", price: 900 },
      { service: "3 Sessions", price: 2000 }
    ]
  },
  {
    category: "Cavitation",
    items: [
      { service: "1 Session", price: 300 },
      { service: "6 Sessions", price: 1500 },
      { service: "15 Sessions", price: 3600 }
    ]
  }
];
