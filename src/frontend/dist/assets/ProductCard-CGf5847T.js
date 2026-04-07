import { l as useAddToCart, m as useAuth, j as jsxRuntimeExports, L as Link, B as Badge, o as formatPrice, a as Button, n as ShoppingCart, P as Package } from "./index-DyFy3fPK.js";
function ProductImage({ product }) {
  if (product.images.length > 0) {
    const src = URL.createObjectURL(
      new Blob([product.images[0]], {
        type: "image/jpeg"
      })
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt: product.name,
        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex flex-col items-center justify-center text-muted-foreground/30 bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10" }) });
}
function ProductCard({ product, compact = false }) {
  const { mutate: addToCart, isPending } = useAddToCart();
  const { isAuthenticated, login } = useAuth();
  const isOutOfStock = product.stock === BigInt(0);
  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      login();
      return;
    }
    addToCart({ productId: product.id, quantity: BigInt(1) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-200 flex flex-col",
      "data-ocid": `product-card-${product.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `overflow-hidden bg-muted/20 ${compact ? "aspect-[4/3]" : "aspect-square"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductImage, { product })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs capitalize shrink-0 text-primary border-primary/30 bg-primary/5",
                children: product.category
              }
            ),
            isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs text-muted-foreground", children: "Out of stock" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors mt-1", children: product.name }) }),
          !compact && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mt-1 flex-1", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-foreground", children: formatPrice(product.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleAddToCart,
                disabled: isPending || isOutOfStock,
                className: "shrink-0",
                "data-ocid": `add-to-cart-${product.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5 mr-1.5" }),
                  isOutOfStock ? "Sold out" : "Add"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
