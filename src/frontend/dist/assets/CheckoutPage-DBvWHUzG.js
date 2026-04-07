import { c as createLucideIcon, u as useActor, p as useCart, r as reactExports, b as useQuery, t as useMutation, j as jsxRuntimeExports, d as Skeleton, L as Link, a as Button, o as formatPrice, B as Badge, I as Input, P as Package, v as ue, e as createActor } from "./index-DyFy3fPK.js";
import { L as Label } from "./label-CJWC-SdK.js";
import { S as Separator } from "./separator-CAQS9Xoj.js";
import { S as ShoppingBag } from "./shopping-bag-CAKUbT2G.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const EMPTY_ADDRESS = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phone: ""
};
function StepIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/cart",
        className: "text-muted-foreground hover:text-primary transition-colors",
        children: "Cart"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Shipping" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment" })
  ] });
}
function FormField({
  id,
  label,
  required = false,
  value,
  onChange,
  placeholder,
  "data-ocid": ocid,
  colSpan
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colSpan === "full" ? "md:col-span-2" : void 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "text-sm font-medium text-foreground", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id,
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: "mt-1.5",
        "data-ocid": ocid
      }
    )
  ] });
}
function OrderSummaryItem({
  productId,
  quantity,
  products
}) {
  var _a;
  const product = products == null ? void 0 : products[productId.toString()];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted border border-border flex-shrink-0 overflow-hidden", children: ((_a = product == null ? void 0 : product.images) == null ? void 0 : _a[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: URL.createObjectURL(
          new Blob([
            product.images[0]
          ])
        ),
        alt: product.name,
        className: "w-full h-full object-cover"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-muted-foreground/40" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: (product == null ? void 0 : product.name) ?? "Loading..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Qty: ",
        Number(quantity)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground flex-shrink-0", children: product ? formatPrice(product.price * quantity) : "—" })
  ] });
}
function CheckoutPage() {
  const { actor, isFetching } = useActor(createActor);
  const { data: cart, isLoading: cartLoading } = useCart();
  const [address, setAddress] = reactExports.useState(EMPTY_ADDRESS);
  const [stripeError, setStripeError] = reactExports.useState(null);
  const { data: products } = useQuery({
    queryKey: [
      "checkout-products",
      cart == null ? void 0 : cart.items.map((i) => i.productId.toString()).join(",")
    ],
    queryFn: async () => {
      if (!actor || !cart) return {};
      const results = {};
      await Promise.all(
        cart.items.map(async (item) => {
          const p = await actor.getProduct(item.productId);
          if (p) results[item.productId.toString()] = p;
        })
      );
      return results;
    },
    enabled: !!actor && !isFetching && !!cart && cart.items.length > 0
  });
  const { mutate: checkout, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor || !cart) throw new Error("Not ready");
      setStripeError(null);
      const shoppingItems = cart.items.map((item) => {
        const product = products == null ? void 0 : products[item.productId.toString()];
        return {
          productName: (product == null ? void 0 : product.name) ?? "Product",
          productDescription: (product == null ? void 0 : product.description) ?? "",
          quantity: item.quantity,
          priceInCents: (product == null ? void 0 : product.price) ?? BigInt(0),
          currency: "usd"
        };
      });
      const successUrl = `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/checkout`;
      localStorage.setItem("abiya_shipping_address", JSON.stringify(address));
      return actor.createCheckoutSession(shoppingItems, successUrl, cancelUrl);
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: (err) => {
      const msg = (err == null ? void 0 : err.message) ?? "Failed to create checkout session. Please try again.";
      setStripeError(msg);
      ue.error("Payment setup failed. Please try again.");
    }
  });
  function updateAddress(field, value) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }
  function isFormValid() {
    return !!(address.fullName.trim() && address.addressLine1.trim() && address.city.trim() && address.state.trim() && address.postalCode.trim() && address.country.trim() && address.phone.trim());
  }
  if (cartLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl" })
      ] })
    ] });
  }
  const items = (cart == null ? void 0 : cart.items) ?? [];
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-lg py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-10 w-10 text-muted-foreground/40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Add items before checking out." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "font-semibold", children: "Browse Products" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-8", children: "Shipping Details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "Shipping Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            "Fields marked with ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }),
            " ",
            "are required"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "fullName",
              label: "Full Name",
              required: true,
              value: address.fullName,
              onChange: (v) => updateAddress("fullName", v),
              placeholder: "Jane Doe",
              "data-ocid": "checkout-fullname",
              colSpan: "full"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "phone",
              label: "Phone",
              required: true,
              value: address.phone,
              onChange: (v) => updateAddress("phone", v),
              placeholder: "+1 555 000 0000",
              "data-ocid": "checkout-phone"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "addressLine1",
              label: "Address Line 1",
              required: true,
              value: address.addressLine1,
              onChange: (v) => updateAddress("addressLine1", v),
              placeholder: "123 Main Street",
              "data-ocid": "checkout-address1",
              colSpan: "full"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "addressLine2",
              label: "Address Line 2",
              value: address.addressLine2,
              onChange: (v) => updateAddress("addressLine2", v),
              placeholder: "Apt 4B (optional)",
              colSpan: "full"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "city",
              label: "City",
              required: true,
              value: address.city,
              onChange: (v) => updateAddress("city", v),
              placeholder: "New York",
              "data-ocid": "checkout-city"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "state",
              label: "State / Province",
              required: true,
              value: address.state,
              onChange: (v) => updateAddress("state", v),
              placeholder: "NY"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "postalCode",
              label: "Postal Code",
              required: true,
              value: address.postalCode,
              onChange: (v) => updateAddress("postalCode", v),
              placeholder: "10001"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "country",
              label: "Country",
              required: true,
              value: address.country,
              onChange: (v) => updateAddress("country", v),
              placeholder: "US",
              "data-ocid": "checkout-country"
            }
          )
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "Order Summary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            OrderSummaryItem,
            {
              productId: item.productId,
              quantity: item.quantity,
              products
            },
            item.productId.toString()
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatPrice((cart == null ? void 0 : cart.subtotal) ?? BigInt(0)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Free" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold text-foreground", children: formatPrice((cart == null ? void 0 : cart.subtotal) ?? BigInt(0)) })
            ] }),
            stripeError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg mb-4 text-sm text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stripeError })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full font-semibold",
                size: "lg",
                onClick: () => checkout(),
                disabled: isPending || !isFormValid(),
                "data-ocid": "checkout-pay-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "mr-2 h-4 w-4" }),
                  isPending ? "Redirecting..." : "Pay with Stripe"
                ]
              }
            ),
            !isFormValid() && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Complete all required fields above" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secured by Stripe" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/cart",
            className: "block text-center text-sm text-muted-foreground hover:text-primary transition-colors",
            children: "← Return to cart"
          }
        )
      ] })
    ] })
  ] });
}
export {
  CheckoutPage as default
};
