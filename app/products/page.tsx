"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "@/data/products.json";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { ShoppingBag, Sparkles, Baby, Home, Heart, Leaf, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  category: string;
  images?: string[];
  shortDescription?: string;
  description?: string;
};

const products = productsData.products as Product[];

const categories = [
  { id: "all", label: "All Products", icon: ShoppingBag },
  { id: "Skin Care", label: "Skin Care", icon: Sparkles },
  { id: "Body", label: "Body", icon: Heart },
  { id: "Baby", label: "Baby", icon: Baby },
  { id: "Supplements", label: "Supplements", icon: Leaf },
  { id: "Home Care", label: "Home Care", icon: Home },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

function getOrderNowHref(product: Product) {
  const message = `Hi Ozonated Wellness, I'd like to order: ${product.name}${product.price ? ` (${product.price})` : ""}.`;
  return `https://wa.me/27607758011?text=${encodeURIComponent(message)}`;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      variants={itemVariants}
      className="group h-full"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="card-bezel h-full">
        <div className="card-core h-full flex flex-col overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-stone-100">
            {!imageError && product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-50 to-stone-100">
                <ShoppingBag className="h-12 w-12 text-teal-200" strokeWidth={1} />
              </div>
            )}

            {/* Category Tag */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-white/90 backdrop-blur-sm text-stone-600 shadow-sm">
                {product.category}
              </span>
            </div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-stone-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="h-12 w-12 rounded-full bg-white flex items-center justify-center"
              >
                <ArrowUpRight className="h-5 w-5 text-stone-900" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-base font-medium text-stone-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>

            {product.description && (
              <p className="mt-1 text-sm text-stone-500 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="mt-auto pt-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-stone-900">
                {product.price || "Price on request"}
              </span>

              <Button
                href={getOrderNowHref(product)}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      variants={itemVariants}
      className="group lg:col-span-2 lg:row-span-2"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="card-bezel h-full">
        <div className="card-core h-full flex flex-col lg:flex-row overflow-hidden">
          {/* Image Side */}
          <div className="relative lg:w-1/2 aspect-square lg:aspect-auto overflow-hidden bg-stone-100">
            {!imageError && product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-50 to-stone-100">
                <Sparkles className="h-16 w-16 text-teal-200" strokeWidth={1} />
              </div>
            )}

            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-teal-600 text-white shadow-lg">
                Featured
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-teal-600">
              {product.category}
            </span>

            <h3 className="mt-2 text-2xl lg:text-3xl font-medium text-stone-900 leading-tight">
              {product.name}
            </h3>

            {product.description && (
              <p className="mt-4 text-stone-600 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-stone-900">
                {product.price || "Price on request"}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={getOrderNowHref(product)}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Order Now
              </Button>
              <Button
                href={`/products#${product.id}`}
                variant="outline"
                size="lg"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Get featured product (first skin care product with an image)
  const featuredProduct = useMemo(() => {
    return products.find((p) => p.category === "Skin Care" && p.images?.[0]) || products[0];
  }, []);

  const regularProducts = filteredProducts.filter((p) => p.id !== featuredProduct.id);

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.15em] bg-teal-50 text-teal-700">
              Natural Wellness
            </span>
          </Reveal>

          <div className="mt-6 max-w-3xl">
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 tracking-tight leading-[1.1]">
                Premium Wellness Products
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-lg text-stone-600 leading-relaxed max-w-2xl">
                Discover our curated collection of natural, organic products designed to
                nurture your body, home, and family. Every item is carefully selected for
                quality and effectiveness.
              </p>
            </Reveal>
          </div>

          {/* Category Filter */}
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-stone-900 text-white shadow-lg shadow-stone-900/10"
                        : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {/* Featured Card - only show in "all" or matching category */}
              {(activeCategory === "all" || activeCategory === featuredProduct.category) && (
                <FeaturedProductCard product={featuredProduct} />
              )}

              {/* Regular Product Cards */}
              {regularProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 mb-4">
                <ShoppingBag className="h-8 w-8 text-stone-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-stone-900">No products found</h3>
              <p className="mt-2 text-stone-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Natural Ingredients",
                  description: "All our products are made with carefully sourced natural and organic ingredients.",
                  icon: Leaf
                },
                {
                  title: "Local South African",
                  description: "Proudly supporting local manufacturers and suppliers across South Africa.",
                  icon: Heart
                },
                {
                  title: "Fast Delivery",
                  description: "Quick delivery throughout East London and surrounding areas.",
                  icon: ShoppingBag
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card-bezel">
                    <div className="card-core p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 mb-4">
                        <Icon className="h-5 w-5 text-teal-600" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-medium text-stone-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-center">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-[1.15]">
                  Questions About Our Products?
                </h2>
                <p className="mt-4 text-lg text-stone-400 leading-relaxed">
                  Our team is here to help you find the perfect wellness solutions
                  for your needs. Reach out anytime.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button
                    href="/contact"
                    size="lg"
                    className="bg-white text-stone-900 hover:bg-stone-100"
                  >
                    Contact Us
                  </Button>
                  <Button
                    href="https://wa.me/27607758011"
                    target="_blank"
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-teal-500/5 blur-3xl" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
