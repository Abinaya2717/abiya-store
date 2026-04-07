import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  RotateCcw,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { createActor } from "../backend";
import { Category, SortOption } from "../backend";
import { ProductCard } from "../components/products/ProductCard";
import { QUERY_KEYS } from "../lib/queryKeys";
import type { Product } from "../types";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: BigInt(1),
    name: "Silk Wrap Dress",
    description:
      "Elegant silk wrap dress in deep midnight blue, perfect for evening wear or special occasions.",
    price: BigInt(18900),
    stock: BigInt(12),
    category: Category.clothes,
    images: [],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    name: "Leather Tote Bag",
    description:
      "Full-grain leather tote with gold-tone hardware. Spacious interior with interior pockets.",
    price: BigInt(24500),
    stock: BigInt(8),
    category: Category.bags,
    images: [],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    name: "Swiss Mechanical Watch",
    description:
      "Swiss-made automatic movement with sapphire crystal and stainless steel case.",
    price: BigInt(89500),
    stock: BigInt(5),
    category: Category.watches,
    images: [],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    name: "Italian Leather Loafers",
    description:
      "Hand-stitched loafers in buttery soft Italian leather. Cushioned insole for all-day comfort.",
    price: BigInt(31500),
    stock: BigInt(15),
    category: Category.shoes,
    images: [],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(5),
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "40-hour battery life, premium drivers, adaptive ANC. Foldable design for travel.",
    price: BigInt(29900),
    stock: BigInt(20),
    category: Category.electronics,
    images: [],
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    name: "Ultrabook Pro 14",
    description:
      "14-inch OLED display, Intel Core i7, 32GB RAM. 1.2kg featherweight chassis.",
    price: BigInt(149900),
    stock: BigInt(7),
    category: Category.computers,
    images: [],
    createdAt: BigInt(Date.now()),
  },
];

const FEATURES = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75. Fast, reliable delivery worldwide.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Your payment info is encrypted and never stored.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy on all items.",
  },
];

const HERO_CATEGORIES = [
  { label: "Clothing", href: "/products?category=clothes", emoji: "👗" },
  { label: "Bags", href: "/products?category=bags", emoji: "👜" },
  { label: "Watches", href: "/products?category=watches", emoji: "⌚" },
  { label: "Shoes", href: "/products?category=shoes", emoji: "👟" },
  { label: "Electronics", href: "/products?category=electronics", emoji: "📱" },
  { label: "Computers", href: "/products?category=computers", emoji: "💻" },
];

function FeaturedProducts() {
  const { actor, isFetching } = useActor(createActor);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: QUERY_KEYS.products(null, null, SortOption.newest),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(null, null, SortOption.newest);
    },
    enabled: !!actor && !isFetching,
  });

  const displayProducts =
    products && products.length > 0
      ? products.slice(0, 6)
      : SAMPLE_PRODUCTS.slice(0, 6);

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-1">
              Curated for you
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Featured Collection
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline" size="sm" data-ocid="featured-view-all">
              View all
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl w-full" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-5 w-3/4" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id.toString()} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-card border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                New Season Arrivals
              </Badge>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Elevate
                <br />
                <span className="text-primary">Your Style</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Discover the curated collection — premium fashion, luxury
                accessories, and cutting-edge electronics, all in one place.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="font-semibold"
                    data-ocid="hero-shop-cta"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#categories">
                  <Button size="lg" variant="outline" className="font-semibold">
                    Explore Categories
                  </Button>
                </a>
              </div>
              {/* Trust badges */}
              <div className="flex items-center gap-5 pt-2 border-t border-border">
                {[
                  "Free shipping over $75",
                  "Easy 30-day returns",
                  "Secure checkout",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-xs text-muted-foreground flex items-center gap-1"
                  >
                    <span className="text-primary">✓</span> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden bg-muted/30 border border-border aspect-[4/3] order-1 md:order-2">
              <img
                src="/assets/generated/hero-fashion.dim_800x600.jpg"
                alt="Abiya Fashion Collection — Elevate Your Style"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground pointer-events-none">
                <ShoppingBag className="h-24 w-24 mb-4 opacity-10" />
              </div>
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-md">
                <p className="text-xs text-muted-foreground">A/W Collection</p>
                <p className="text-sm font-semibold text-foreground font-display">
                  New Arrivals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="bg-muted/20 border-b border-border py-14"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-1">
              Browse by type
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {HERO_CATEGORIES.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 text-center"
                data-ocid={`category-${cat.label.toLowerCase()}`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {cat.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Features */}
      <section className="bg-muted/30 border-y border-border py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border"
                >
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Ready to discover Abiya?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Browse our full collection of premium products across all
            categories.
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="font-semibold"
              data-ocid="cta-browse-all"
            >
              Browse All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
