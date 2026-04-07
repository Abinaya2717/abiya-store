import { p as useCart, j as jsxRuntimeExports, L as Link, a as Button, o as formatPrice, d as Skeleton, u as useActor, q as useRemoveFromCart, s as useUpdateCartQuantity, b as useQuery, Q as QUERY_KEYS, B as Badge, P as Package, e as createActor } from "./index-DyFy3fPK.js";
import { S as Separator } from "./separator-CAQS9Xoj.js";
import { S as ShoppingBag } from "./shopping-bag-CAKUbT2G.js";
import { A as ArrowRight } from "./arrow-right-CExnZKLr.js";
import { M as Minus } from "./minus-CIkppHwt.js";
import { P as Plus } from "./plus-D4FvCL6i.js";
import { T as Trash2 } from "./trash-2-DB_JWzbs.js";
function ProductImage({
  images,
  name
}) {
  if (images.length > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: URL.createObjectURL(
          new Blob([images[0]])
        ),
        alt: name,
        className: "w-full h-full object-cover"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-muted-foreground/30" }) });
}
function CartItemRow({
  productId,
  quantity
}) {
  const { actor, isFetching } = useActor(createActor);
  const { mutate: remove, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: updateQty, isPending: isUpdating } = useUpdateCartQuantity();
  const { data: product, isLoading } = useQuery({
    queryKey: QUERY_KEYS.product(productId),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching
  });
  if (isLoading || !product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-20 rounded-xl flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" })
    ] });
  }
  const lineTotal = product.price * quantity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 py-5",
      "data-ocid": `cart-item-${productId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 flex-shrink-0 rounded-xl bg-muted overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductImage, { images: product.images, name: product.name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products/$id",
              params: { id: productId.toString() },
              className: "font-semibold text-foreground hover:text-primary transition-colors line-clamp-1",
              children: product.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mt-1 text-xs capitalize", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-primary mt-1", children: [
            formatPrice(product.price),
            " each"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 border border-border rounded-lg overflow-hidden bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40",
              onClick: () => quantity > BigInt(1) ? updateQty({ productId, quantity: quantity - BigInt(1) }) : remove(productId),
              disabled: isUpdating || isRemoving,
              "aria-label": "Decrease quantity",
              "data-ocid": `cart-decrease-${productId}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm font-semibold text-foreground", children: Number(quantity) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40",
              onClick: () => updateQty({ productId, quantity: quantity + BigInt(1) }),
              disabled: isUpdating,
              "aria-label": "Increase quantity",
              "data-ocid": `cart-increase-${productId}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right min-w-[72px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: formatPrice(lineTotal) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => remove(productId),
            disabled: isRemoving,
            "aria-label": "Remove from cart",
            "data-ocid": `cart-remove-${productId}`,
            className: "p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
function CartSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40 mb-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-0 bg-card border border-border rounded-xl px-6 divide-y divide-border", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-20 rounded-xl flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" })
    ] })
  ] });
}
function CartPage() {
  const { data: cart, isLoading } = useCart();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(CartSkeleton, {});
  const items = (cart == null ? void 0 : cart.items) ?? [];
  const isEmpty = items.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Shopping Cart" }),
      !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
        Number((cart == null ? void 0 : cart.itemCount) ?? 0),
        " item",
        Number((cart == null ? void 0 : cart.itemCount) ?? 0) !== 1 ? "s" : "",
        " in your cart"
      ] })
    ] }),
    isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-24 bg-card border border-border rounded-2xl",
        "data-ocid": "empty-cart",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-10 w-10 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8 max-w-xs mx-auto", children: "Discover our curated collection of clothes, bags, watches, shoes, and electronics." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "font-semibold",
              "data-ocid": "shop-now-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }),
                "Browse Products"
              ]
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 divide-y divide-border", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CartItemRow,
        {
          productId: item.productId,
          quantity: item.quantity
        },
        item.productId.toString()
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "Order Summary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "Subtotal (",
                Number((cart == null ? void 0 : cart.itemCount) ?? 0),
                " items)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatPrice((cart == null ? void 0 : cart.subtotal) ?? BigInt(0)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Calculated at checkout" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold text-foreground", children: formatPrice((cart == null ? void 0 : cart.subtotal) ?? BigInt(0)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full font-semibold",
                size: "lg",
                "data-ocid": "proceed-to-checkout",
                children: [
                  "Proceed to Checkout",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products",
            className: "block text-center mt-4 text-sm text-muted-foreground hover:text-primary transition-colors",
            children: "← Continue Shopping"
          }
        )
      ] })
    ] })
  ] });
}
export {
  CartPage as default
};
