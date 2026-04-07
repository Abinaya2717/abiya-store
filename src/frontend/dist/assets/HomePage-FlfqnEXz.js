import { c as createLucideIcon, j as jsxRuntimeExports, B as Badge, L as Link, a as Button, u as useActor, b as useQuery, Q as QUERY_KEYS, S as SortOption, C as Category, d as Skeleton, e as createActor } from "./index-DyFy3fPK.js";
import { P as ProductCard } from "./ProductCard-CGf5847T.js";
import { A as ArrowRight } from "./arrow-right-CExnZKLr.js";
import { S as ShoppingBag } from "./shopping-bag-CAKUbT2G.js";
import { T as Truck } from "./truck-C0dZFxBs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const SAMPLE_PRODUCTS = [
  {
    id: BigInt(1),
    name: "Silk Wrap Dress",
    description: "Elegant silk wrap dress in deep midnight blue, perfect for evening wear or special occasions.",
    price: BigInt(18900),
    stock: BigInt(12),
    category: Category.clothes,
    images: [],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(2),
    name: "Leather Tote Bag",
    description: "Full-grain leather tote with gold-tone hardware. Spacious interior with interior pockets.",
    price: BigInt(24500),
    stock: BigInt(8),
    category: Category.bags,
    images: [],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(3),
    name: "Swiss Mechanical Watch",
    description: "Swiss-made automatic movement with sapphire crystal and stainless steel case.",
    price: BigInt(89500),
    stock: BigInt(5),
    category: Category.watches,
    images: [],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(4),
    name: "Italian Leather Loafers",
    description: "Hand-stitched loafers in buttery soft Italian leather. Cushioned insole for all-day comfort.",
    price: BigInt(31500),
    stock: BigInt(15),
    category: Category.shoes,
    images: [],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(5),
    name: "Wireless Noise-Cancelling Headphones",
    description: "40-hour battery life, premium drivers, adaptive ANC. Foldable design for travel.",
    price: BigInt(29900),
    stock: BigInt(20),
    category: Category.electronics,
    images: [],
    createdAt: BigInt(Date.now())
  },
  {
    id: BigInt(6),
    name: "Ultrabook Pro 14",
    description: "14-inch OLED display, Intel Core i7, 32GB RAM. 1.2kg featherweight chassis.",
    price: BigInt(149900),
    stock: BigInt(7),
    category: Category.computers,
    images: [],
    createdAt: BigInt(Date.now())
  }
];
const FEATURES = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $75. Fast, reliable delivery worldwide."
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Your payment info is encrypted and never stored."
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy on all items."
  }
];
const HERO_CATEGORIES = [
  { label: "Clothing", href: "/products?category=clothes", emoji: "👗" },
  { label: "Bags", href: "/products?category=bags", emoji: "👜" },
  { label: "Watches", href: "/products?category=watches", emoji: "⌚" },
  { label: "Shoes", href: "/products?category=shoes", emoji: "👟" },
  { label: "Electronics", href: "/products?category=electronics", emoji: "📱" },
  { label: "Computers", href: "/products?category=computers", emoji: "💻" }
];
function FeaturedProducts() {
  const { actor, isFetching } = useActor(createActor);
  const { data: products, isLoading } = useQuery({
    queryKey: QUERY_KEYS.products(null, null, SortOption.newest),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(null, null, SortOption.newest);
    },
    enabled: !!actor && !isFetching
  });
  const displayProducts = products && products.length > 0 ? products.slice(0, 6) : SAMPLE_PRODUCTS.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary uppercase tracking-widest mb-1", children: "Curated for you" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Featured Collection" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", "data-ocid": "featured-view-all", children: [
        "View all",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20" })
      ] })
    ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: displayProducts.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product }, product.id.toString())) })
  ] }) });
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-card border-b border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-7xl py-12 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 order-2 md:order-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10", children: "New Season Arrivals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-6xl font-bold text-foreground leading-tight", children: [
          "Elevate",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Your Style" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed max-w-md", children: "Discover the curated collection — premium fashion, luxury accessories, and cutting-edge electronics, all in one place." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "font-semibold",
              "data-ocid": "hero-shop-cta",
              children: [
                "Shop Now",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#categories", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "font-semibold", children: "Explore Categories" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-5 pt-2 border-t border-border", children: [
          "Free shipping over $75",
          "Easy 30-day returns",
          "Secure checkout"
        ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs text-muted-foreground flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✓" }),
              " ",
              t
            ]
          },
          t
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden bg-muted/30 border border-border aspect-[4/3] order-1 md:order-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/hero-fashion.dim_800x600.jpg",
            alt: "Abiya Fashion Collection — Elevate Your Style",
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.target.style.display = "none";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-24 w-24 mb-4 opacity-10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "A/W Collection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display", children: "New Arrivals" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "categories",
        className: "bg-muted/20 border-b border-border py-14",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-7xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary uppercase tracking-widest mb-1", children: "Browse by type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Shop by Category" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4", children: HERO_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: cat.href,
              className: "group flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 text-center",
              "data-ocid": `category-${cat.label.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: cat.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground group-hover:text-primary transition-colors", children: cat.label })
              ]
            },
            cat.label
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedProducts, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-7xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: FEATURES.map((feature) => {
      const Icon = feature.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-4 p-6 bg-card rounded-xl border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 p-2.5 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: feature.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: feature.description })
            ] })
          ]
        },
        feature.title
      );
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-7xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Ready to discover Abiya?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-md mx-auto", children: "Browse our full collection of premium products across all categories." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "font-semibold",
          "data-ocid": "cta-browse-all",
          children: [
            "Browse All Products",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
          ]
        }
      ) })
    ] }) })
  ] });
}
export {
  HomePage as default
};
