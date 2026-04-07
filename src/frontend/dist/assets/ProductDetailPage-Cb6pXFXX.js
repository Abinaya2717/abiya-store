import { k as useParams, u as useActor, l as useAddToCart, m as useAuth, r as reactExports, b as useQuery, Q as QUERY_KEYS, j as jsxRuntimeExports, d as Skeleton, P as Package, L as Link, a as Button, f as CATEGORIES, n as ShoppingCart, B as Badge, o as formatPrice, e as createActor } from "./index-DyFy3fPK.js";
import { P as ProductCard } from "./ProductCard-CGf5847T.js";
import { A as ArrowLeft } from "./arrow-left-C9w6n-uV.js";
import { M as Minus } from "./minus-CIkppHwt.js";
import { P as Plus } from "./plus-D4FvCL6i.js";
import { T as Truck } from "./truck-C0dZFxBs.js";
function RelatedProducts({
  productId,
  category
}) {
  var _a;
  const { actor, isFetching } = useActor(createActor);
  const { data: products } = useQuery({
    queryKey: ["related", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(
        category,
        null,
        null
      );
    },
    enabled: !!actor && !isFetching
  });
  const related = products == null ? void 0 : products.filter((p) => p.id !== productId).slice(0, 4);
  if (!related || related.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16 pt-10 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground mb-6", children: [
      "More from",
      " ",
      ((_a = CATEGORIES.find((c) => c.value === category)) == null ? void 0 : _a.label) ?? category
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, compact: true }, p.id.toString())) })
  ] });
}
function ProductDetailPage() {
  var _a;
  const { id } = useParams({ strict: false });
  const { actor, isFetching } = useActor(createActor);
  const { mutate: addToCart, isPending } = useAddToCart();
  const { isAuthenticated, login } = useAuth();
  const [qty, setQty] = reactExports.useState(1);
  const { data: product, isLoading } = useQuery({
    queryKey: QUERY_KEYS.product(BigInt(id)),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(BigInt(id));
    },
    enabled: !!actor && !isFetching && !!id
  });
  function handleAddToCart() {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (product) {
      addToCart({ productId: product.id, quantity: BigInt(qty) });
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-7xl py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-44" })
        ] })
      ] })
    ] });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-7xl py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted/50 p-8 inline-flex mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-14 w-14 text-muted-foreground/30" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "This product may have been removed or doesn't exist." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Products"
      ] }) })
    ] });
  }
  const isOutOfStock = product.stock === BigInt(0);
  const maxQty = Math.min(Number(product.stock), 10);
  const categoryLabel = ((_a = CATEGORIES.find((c) => c.value === product.category)) == null ? void 0 : _a.label) ?? product.category;
  function getImageSrc() {
    if (product && product.images.length > 0) {
      return URL.createObjectURL(
        new Blob([product.images[0]], {
          type: "image/jpeg"
        })
      );
    }
    return null;
  }
  const imageSrc = getImageSrc();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-7xl py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary transition-colors", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hover:text-primary transition-colors", children: "Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground line-clamp-1", children: product.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden aspect-square", children: imageSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: imageSrc,
          alt: product.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center text-muted-foreground/20 bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-24 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground/50", children: "No image available" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "capitalize mb-3 text-primary border-primary/30 bg-primary/5",
              children: categoryLabel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-foreground leading-tight", children: product.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-primary", children: formatPrice(product.price) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-xl p-4 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: product.description }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-2 h-2 rounded-full ${isOutOfStock ? "bg-destructive" : "bg-green-500"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: isOutOfStock ? "Out of stock" : `${Number(product.stock)} in stock` })
        ] }),
        !isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setQty((q) => Math.max(1, q - 1)),
                disabled: qty <= 1,
                className: "px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40",
                "aria-label": "Decrease quantity",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 text-sm font-semibold text-foreground min-w-[2.5rem] text-center border-x border-border", children: qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setQty((q) => Math.min(maxQty, q + 1)),
                disabled: qty >= maxQty,
                className: "px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40",
                "aria-label": "Increase quantity",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            onClick: handleAddToCart,
            disabled: isPending || isOutOfStock,
            className: "w-full md:w-auto font-semibold px-8",
            "data-ocid": "product-add-to-cart",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "mr-2 h-5 w-5" }),
              isOutOfStock ? "Out of Stock" : isPending ? "Adding..." : "Add to Cart"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-primary flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Free shipping on orders over $75" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedProducts, { productId: product.id, category: product.category })
  ] }) });
}
export {
  ProductDetailPage as default
};
