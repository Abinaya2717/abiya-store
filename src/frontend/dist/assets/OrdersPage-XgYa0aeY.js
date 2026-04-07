import { u as useActor, x as useInternetIdentity, b as useQuery, j as jsxRuntimeExports, P as Package, L as Link, a as Button, o as formatPrice, d as Skeleton, e as createActor, Q as QUERY_KEYS } from "./index-DyFy3fPK.js";
import { g as getStatusBadgeClasses } from "./statusBadge--_gN4i6f.js";
import { S as ShoppingBag } from "./shopping-bag-CAKUbT2G.js";
import { A as ArrowRight } from "./arrow-right-CExnZKLr.js";
function OrderRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" })
  ] });
}
function OrdersPage() {
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();
  const { data: orders, isLoading } = useQuery({
    queryKey: QUERY_KEYS.orders,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching && !!identity
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "My Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Track and manage your purchase history" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "orders-loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRowSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRowSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRowSkeleton, {})
    ] }) : !orders || orders.length === 0 ? (
      /* Empty state */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 bg-card border border-border rounded-2xl",
          "data-ocid": "empty-orders",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No orders yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-7 max-w-xs mx-auto", children: "Once you place an order, it will appear here so you can track its status." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "empty-orders-cta", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }),
              "Start Shopping"
            ] }) })
          ]
        }
      )
    ) : (
      /* Orders list */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders-list", children: orders.map((order) => {
        const statusConfig = getStatusBadgeClasses(order.status);
        const orderDate = new Date(
          Number(order.createdAt) / 1e6
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/orders/$id",
            params: { id: order.id.toString() },
            className: "block group",
            "data-ocid": `order-row-${order.id}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200 group-hover:bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground", children: [
                      "Order #",
                      order.id.toString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusConfig.className}`,
                        children: statusConfig.label
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    orderDate,
                    " · ",
                    Number(order.items.length),
                    " item",
                    Number(order.items.length) !== 1 ? "s" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 pt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-lg", children: formatPrice(order.total) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" })
                ] })
              ] }),
              order.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3 pt-3 border-t border-border truncate", children: [
                order.items.slice(0, 3).map((item) => item.productName).join(", "),
                order.items.length > 3 && ` +${order.items.length - 3} more`
              ] })
            ] })
          },
          order.id.toString()
        );
      }) })
    )
  ] }) });
}
export {
  OrdersPage as default
};
