import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronRight,
  CreditCard,
  Lock,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { formatPrice, useCart } from "../hooks/useCart";
import { QUERY_KEYS } from "../lib/queryKeys";
import type { Product, ShippingAddress, ShoppingItem } from "../types";

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phone: "",
};

function StepIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm mb-8">
      <Link
        to="/cart"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        Cart
      </Link>
      <ChevronRight className="h-3 w-3 text-muted-foreground" />
      <span className="font-semibold text-primary">Shipping</span>
      <ChevronRight className="h-3 w-3 text-muted-foreground" />
      <span className="text-muted-foreground">Payment</span>
    </div>
  );
}

function FormField({
  id,
  label,
  required = false,
  value,
  onChange,
  placeholder,
  "data-ocid": ocid,
  colSpan,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  "data-ocid"?: string;
  colSpan?: "full";
}) {
  return (
    <div className={colSpan === "full" ? "md:col-span-2" : undefined}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5"
        data-ocid={ocid}
      />
    </div>
  );
}

function OrderSummaryItem({
  productId,
  quantity,
  products,
}: {
  productId: bigint;
  quantity: bigint;
  products: Record<string, Product> | undefined;
}) {
  const product = products?.[productId.toString()];
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-10 h-10 rounded-lg bg-muted border border-border flex-shrink-0 overflow-hidden">
        {product?.images?.[0] ? (
          <img
            src={URL.createObjectURL(
              new Blob([
                product.images[0] as unknown as Uint8Array<ArrayBuffer>,
              ]),
            )}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-4 w-4 text-muted-foreground/40" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground line-clamp-1">
          {product?.name ?? "Loading..."}
        </p>
        <p className="text-xs text-muted-foreground">Qty: {Number(quantity)}</p>
      </div>
      <span className="text-sm font-semibold text-foreground flex-shrink-0">
        {product ? formatPrice(product.price * quantity) : "—"}
      </span>
    </div>
  );
}

export default function CheckoutPage() {
  const { actor, isFetching } = useActor(createActor);
  const { data: cart, isLoading: cartLoading } = useCart();
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const { data: products } = useQuery<Record<string, Product>>({
    queryKey: [
      "checkout-products",
      cart?.items.map((i) => i.productId.toString()).join(","),
    ],
    queryFn: async () => {
      if (!actor || !cart) return {};
      const results: Record<string, Product> = {};
      await Promise.all(
        cart.items.map(async (item) => {
          const p = await actor.getProduct(item.productId);
          if (p) results[item.productId.toString()] = p;
        }),
      );
      return results;
    },
    enabled: !!actor && !isFetching && !!cart && cart.items.length > 0,
  });

  const { mutate: checkout, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor || !cart) throw new Error("Not ready");
      setStripeError(null);

      const shoppingItems: ShoppingItem[] = cart.items.map((item) => {
        const product = products?.[item.productId.toString()];
        return {
          productName: product?.name ?? "Product",
          productDescription: product?.description ?? "",
          quantity: item.quantity,
          priceInCents: product?.price ?? BigInt(0),
          currency: "usd",
        };
      });

      const successUrl = `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/checkout`;

      // Persist address so CheckoutSuccessPage can retrieve it after Stripe redirects back
      localStorage.setItem("abiya_shipping_address", JSON.stringify(address));

      return actor.createCheckoutSession(shoppingItems, successUrl, cancelUrl);
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: (err: Error) => {
      const msg =
        err?.message ?? "Failed to create checkout session. Please try again.";
      setStripeError(msg);
      toast.error("Payment setup failed. Please try again.");
    },
  });

  function updateAddress(field: keyof ShippingAddress, value: string) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  function isFormValid() {
    return !!(
      address.fullName.trim() &&
      address.addressLine1.trim() &&
      address.city.trim() &&
      address.state.trim() &&
      address.postalCode.trim() &&
      address.country.trim() &&
      address.phone.trim()
    );
  }

  if (cartLoading) {
    return (
      <div className="container mx-auto px-4 max-w-5xl py-8">
        <Skeleton className="h-4 w-48 mb-8" />
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    );
  }

  const items = cart?.items ?? [];

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-lg py-20 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8">
          Add items before checking out.
        </p>
        <Link to="/products">
          <Button size="lg" className="font-semibold">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-5xl py-8">
      <StepIndicator />

      <h1 className="font-display text-3xl font-bold text-foreground mb-8">
        Shipping Details
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Shipping form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-border">
              <h2 className="font-display font-bold text-foreground">
                Shipping Information
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Fields marked with <span className="text-destructive">*</span>{" "}
                are required
              </p>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  id="fullName"
                  label="Full Name"
                  required
                  value={address.fullName}
                  onChange={(v) => updateAddress("fullName", v)}
                  placeholder="Jane Doe"
                  data-ocid="checkout-fullname"
                  colSpan="full"
                />
                <FormField
                  id="phone"
                  label="Phone"
                  required
                  value={address.phone}
                  onChange={(v) => updateAddress("phone", v)}
                  placeholder="+1 555 000 0000"
                  data-ocid="checkout-phone"
                />
                <FormField
                  id="addressLine1"
                  label="Address Line 1"
                  required
                  value={address.addressLine1}
                  onChange={(v) => updateAddress("addressLine1", v)}
                  placeholder="123 Main Street"
                  data-ocid="checkout-address1"
                  colSpan="full"
                />
                <FormField
                  id="addressLine2"
                  label="Address Line 2"
                  value={address.addressLine2}
                  onChange={(v) => updateAddress("addressLine2", v)}
                  placeholder="Apt 4B (optional)"
                  colSpan="full"
                />
                <FormField
                  id="city"
                  label="City"
                  required
                  value={address.city}
                  onChange={(v) => updateAddress("city", v)}
                  placeholder="New York"
                  data-ocid="checkout-city"
                />
                <FormField
                  id="state"
                  label="State / Province"
                  required
                  value={address.state}
                  onChange={(v) => updateAddress("state", v)}
                  placeholder="NY"
                />
                <FormField
                  id="postalCode"
                  label="Postal Code"
                  required
                  value={address.postalCode}
                  onChange={(v) => updateAddress("postalCode", v)}
                  placeholder="10001"
                />
                <FormField
                  id="country"
                  label="Country"
                  required
                  value={address.country}
                  onChange={(v) => updateAddress("country", v)}
                  placeholder="US"
                  data-ocid="checkout-country"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="sticky top-24 space-y-4">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-display font-bold text-foreground">
                Order Summary
              </h2>
            </div>
            <div className="px-5 py-4">
              <div className="space-y-1">
                {items.map((item) => (
                  <OrderSummaryItem
                    key={item.productId.toString()}
                    productId={item.productId}
                    quantity={item.quantity}
                    products={products}
                  />
                ))}
              </div>
            </div>
            <Separator />
            <div className="px-5 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  {formatPrice(cart?.subtotal ?? BigInt(0))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <Badge variant="outline" className="text-xs">
                  Free
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="px-5 py-4">
              <div className="flex justify-between mb-5">
                <span className="font-display font-bold text-foreground">
                  Total
                </span>
                <span className="font-display text-xl font-bold text-foreground">
                  {formatPrice(cart?.subtotal ?? BigInt(0))}
                </span>
              </div>

              {stripeError && (
                <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg mb-4 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{stripeError}</span>
                </div>
              )}

              <Button
                className="w-full font-semibold"
                size="lg"
                onClick={() => checkout()}
                disabled={isPending || !isFormValid()}
                data-ocid="checkout-pay-btn"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isPending ? "Redirecting..." : "Pay with Stripe"}
              </Button>

              {!isFormValid() && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Complete all required fields above
                </p>
              )}

              <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Secured by Stripe</span>
              </div>
            </div>
          </div>

          <Link
            to="/cart"
            className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Return to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
