import { c as createLucideIcon, u as useActor, w as useQueryClient, g as useSearch, r as reactExports, b as useQuery, t as useMutation, j as jsxRuntimeExports, L as Link, a as Button, d as Skeleton, B as Badge, o as formatPrice, P as Package, e as createActor } from "./index-DyFy3fPK.js";
import { S as Separator } from "./separator-CAQS9Xoj.js";
import { C as CircleX, L as LoaderCircle, a as CircleCheck } from "./loader-circle-NwMPVXfn.js";
import { S as ShoppingBag } from "./shopping-bag-CAKUbT2G.js";
import { M as MapPin } from "./map-pin-xM3Br5Xt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
function OrderItemRow({
  name,
  quantity,
  price
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Qty: ",
          Number(quantity)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground flex-shrink-0 ml-3", children: formatPrice(price * quantity) })
  ] });
}
function OrderSummaryCard({ order }) {
  const addr = order.shippingAddress;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden w-full max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-border flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Order Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground", children: [
          "#",
          order.id.toString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 font-medium capitalize", children: order.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-2 divide-y divide-border", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderItemRow,
      {
        name: item.productName,
        quantity: item.quantity,
        price: item.priceAtPurchase
      },
      `${item.productId.toString()}-${idx}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Order Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-foreground", children: formatPrice(order.total) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Shipping Address" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground space-y-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: addr.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: addr.addressLine1 }),
        addr.addressLine2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: addr.addressLine2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          addr.city,
          ", ",
          addr.state,
          " ",
          addr.postalCode
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: addr.country }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1", children: addr.phone })
      ] })
    ] })
  ] });
}
function LoadingState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-10 w-10 text-primary animate-spin" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Confirming your order..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto mb-6", children: "Please wait while we verify your payment with Stripe." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-w-xs mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5 rounded-full mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/5 rounded-full mx-auto" })
    ] })
  ] });
}
function FailedState({ error }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-10 w-10 text-destructive" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Payment Failed" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto mb-8", children: error ?? "Something went wrong with your payment. Your card was not charged." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          className: "font-semibold",
          "data-ocid": "retry-checkout-btn",
          children: "Try Again"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "lg", children: "Return to Cart" }) })
    ] })
  ] });
}
function SuccessState({ order }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 text-primary-foreground" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Order Confirmed!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center max-w-sm mb-8", children: "Thank you for shopping with Abiya. Your order has been placed and you will receive a confirmation shortly." }),
    order && /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSummaryCard, { order }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-lg justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "font-semibold w-full sm:w-auto",
          "data-ocid": "view-orders-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "mr-2 h-4 w-4" }),
            "View My Orders"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "lg", className: "w-full sm:w-auto", children: "Continue Shopping" }) })
    ] })
  ] });
}
function CheckoutSuccessPage() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const searchParams = useSearch({ strict: false });
  const sessionId = searchParams.session_id ?? "";
  const orderPlacedRef = reactExports.useRef(false);
  const { data: sessionStatus, isLoading: sessionLoading } = useQuery({
    queryKey: ["stripe-session", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if ((data == null ? void 0 : data.__kind__) === "completed" || (data == null ? void 0 : data.__kind__) === "failed")
        return false;
      return 3e3;
    },
    refetchIntervalInBackground: false
  });
  const { mutate: placeOrder, data: placedOrder } = useMutation({
    mutationFn: async () => {
      var _a;
      if (!actor || (sessionStatus == null ? void 0 : sessionStatus.__kind__) !== "completed")
        throw new Error("Not ready");
      const cart = queryClient.getQueryData(["cart"]);
      if (!((_a = cart == null ? void 0 : cart.items) == null ? void 0 : _a.length)) throw new Error("Empty cart");
      const orderItems = await Promise.all(
        cart.items.map(async (item) => {
          const product = await actor.getProduct(item.productId);
          return {
            productId: item.productId,
            productName: (product == null ? void 0 : product.name) ?? "Product",
            quantity: item.quantity,
            priceAtPurchase: (product == null ? void 0 : product.price) ?? BigInt(0)
          };
        })
      );
      const savedAddress = localStorage.getItem("abiya_shipping_address");
      const shippingAddress = savedAddress ? JSON.parse(savedAddress) : {
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phone: ""
      };
      return actor.placeOrder({
        items: orderItems,
        shippingAddress,
        stripeSessionId: sessionId
      });
    },
    onSuccess: (order) => {
      localStorage.removeItem("abiya_shipping_address");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.setQueryData(["cart"], {
        items: [],
        itemCount: BigInt(0),
        subtotal: BigInt(0)
      });
      queryClient.setQueryData(["order", order.id.toString()], order);
    }
  });
  reactExports.useEffect(() => {
    if ((sessionStatus == null ? void 0 : sessionStatus.__kind__) === "completed" && !orderPlacedRef.current && actor && !isFetching) {
      orderPlacedRef.current = true;
      placeOrder();
    }
  }, [sessionStatus, actor, isFetching, placeOrder]);
  const isCompleted = (sessionStatus == null ? void 0 : sessionStatus.__kind__) === "completed";
  const isFailed = (sessionStatus == null ? void 0 : sessionStatus.__kind__) === "failed";
  const isProcessing = sessionLoading || !isCompleted && !isFailed && !!sessionId;
  if (!sessionId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-lg py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-10 w-10 text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Invalid session" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "No checkout session was found. Please try again from the cart." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "font-semibold", children: "Return to Cart" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-lg py-8", children: [
    isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, {}),
    isFailed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FailedState,
      {
        error: sessionStatus.__kind__ === "failed" ? sessionStatus.failed.error : void 0
      }
    ),
    isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessState, { order: placedOrder ?? null })
  ] });
}
export {
  CheckoutSuccessPage as default
};
