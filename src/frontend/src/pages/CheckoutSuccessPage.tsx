import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  ClipboardList,
  Loader2,
  MapPin,
  Package,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { createActor } from "../backend";
import { formatPrice } from "../hooks/useCart";
import type { Order, StripeSessionStatus } from "../types";

function OrderItemRow({
  name,
  quantity,
  price,
}: { name: string; quantity: bigint; price: bigint }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Package className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground line-clamp-1">
            {name}
          </p>
          <p className="text-xs text-muted-foreground">
            Qty: {Number(quantity)}
          </p>
        </div>
      </div>
      <span className="text-sm font-semibold text-foreground flex-shrink-0 ml-3">
        {formatPrice(price * quantity)}
      </span>
    </div>
  );
}

function OrderSummaryCard({ order }: { order: Order }) {
  const addr = order.shippingAddress;
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden w-full max-w-lg mx-auto">
      {/* Order header */}
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Order Number
          </p>
          <p className="font-display font-bold text-foreground">
            #{order.id.toString()}
          </p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 font-medium capitalize">
          {order.status}
        </Badge>
      </div>

      {/* Items */}
      <div className="px-6 py-2 divide-y divide-border">
        {order.items.map((item, idx) => (
          <OrderItemRow
            key={`${item.productId.toString()}-${idx}`}
            name={item.productName}
            quantity={item.quantity}
            price={item.priceAtPurchase}
          />
        ))}
      </div>

      <Separator />

      {/* Total */}
      <div className="px-6 py-4 flex justify-between">
        <span className="font-display font-bold text-foreground">
          Order Total
        </span>
        <span className="font-display font-bold text-xl text-foreground">
          {formatPrice(order.total)}
        </span>
      </div>

      <Separator />

      {/* Shipping address */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Shipping Address
          </span>
        </div>
        <div className="text-sm text-muted-foreground space-y-0.5">
          <p className="font-medium text-foreground">{addr.fullName}</p>
          <p>{addr.addressLine1}</p>
          {addr.addressLine2 && <p>{addr.addressLine2}</p>}
          <p>
            {addr.city}, {addr.state} {addr.postalCode}
          </p>
          <p>{addr.country}</p>
          <p className="pt-1">{addr.phone}</p>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Confirming your order...
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
        Please wait while we verify your payment with Stripe.
      </p>
      <div className="space-y-2 max-w-xs mx-auto">
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-4/5 rounded-full mx-auto" />
        <Skeleton className="h-3 w-3/5 rounded-full mx-auto" />
      </div>
    </div>
  );
}

function FailedState({ error }: { error?: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-5">
        <XCircle className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Payment Failed
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-8">
        {error ??
          "Something went wrong with your payment. Your card was not charged."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/checkout">
          <Button
            size="lg"
            className="font-semibold"
            data-ocid="retry-checkout-btn"
          >
            Try Again
          </Button>
        </Link>
        <Link to="/cart">
          <Button variant="outline" size="lg">
            Return to Cart
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SuccessState({ order }: { order: Order | null }) {
  return (
    <div className="flex flex-col items-center py-6">
      {/* Success icon */}
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
          <ShoppingBag className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>

      <h2 className="font-display text-3xl font-bold text-foreground mb-2">
        Order Confirmed!
      </h2>
      <p className="text-muted-foreground text-center max-w-sm mb-8">
        Thank you for shopping with Abiya. Your order has been placed and you
        will receive a confirmation shortly.
      </p>

      {order && <OrderSummaryCard order={order} />}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-lg justify-center">
        <Link to="/orders">
          <Button
            size="lg"
            className="font-semibold w-full sm:w-auto"
            data-ocid="view-orders-btn"
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            View My Orders
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const searchParams = useSearch({ strict: false }) as Record<string, string>;
  const sessionId = searchParams.session_id ?? "";
  const orderPlacedRef = useRef(false);

  const { data: sessionStatus, isLoading: sessionLoading } =
    useQuery<StripeSessionStatus | null>({
      queryKey: ["stripe-session", sessionId],
      queryFn: async () => {
        if (!actor || !sessionId) return null;
        return actor.getStripeSessionStatus(sessionId);
      },
      enabled: !!actor && !isFetching && !!sessionId,
      refetchInterval: (query) => {
        const data = query.state.data;
        if (data?.__kind__ === "completed" || data?.__kind__ === "failed")
          return false;
        return 3000;
      },
      refetchIntervalInBackground: false,
    });

  // Place the order once payment is confirmed
  const { mutate: placeOrder, data: placedOrder } = useMutation({
    mutationFn: async () => {
      if (!actor || sessionStatus?.__kind__ !== "completed")
        throw new Error("Not ready");
      const cart = queryClient.getQueryData<{
        items: Array<{ productId: bigint; quantity: bigint }>;
      }>(["cart"]);
      if (!cart?.items?.length) throw new Error("Empty cart");

      // Fetch product info for each cart item to build order items
      const orderItems = await Promise.all(
        cart.items.map(async (item) => {
          const product = await actor.getProduct(item.productId);
          return {
            productId: item.productId,
            productName: product?.name ?? "Product",
            quantity: item.quantity,
            priceAtPurchase: product?.price ?? BigInt(0),
          };
        }),
      );

      // Retrieve the shipping address saved before the Stripe redirect
      const savedAddress = localStorage.getItem("abiya_shipping_address");
      const shippingAddress = savedAddress
        ? (JSON.parse(savedAddress) as {
            fullName: string;
            addressLine1: string;
            addressLine2: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
          })
        : {
            fullName: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phone: "",
          };

      return actor.placeOrder({
        items: orderItems,
        shippingAddress,
        stripeSessionId: sessionId,
      });
    },
    onSuccess: (order) => {
      localStorage.removeItem("abiya_shipping_address");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.setQueryData(["cart"], {
        items: [],
        itemCount: BigInt(0),
        subtotal: BigInt(0),
      });
      queryClient.setQueryData(["order", order.id.toString()], order);
    },
  });

  // Trigger placeOrder once on payment completion
  useEffect(() => {
    if (
      sessionStatus?.__kind__ === "completed" &&
      !orderPlacedRef.current &&
      actor &&
      !isFetching
    ) {
      orderPlacedRef.current = true;
      placeOrder();
    }
  }, [sessionStatus, actor, isFetching, placeOrder]);

  const isCompleted = sessionStatus?.__kind__ === "completed";
  const isFailed = sessionStatus?.__kind__ === "failed";
  const isProcessing =
    sessionLoading || (!isCompleted && !isFailed && !!sessionId);

  if (!sessionId) {
    return (
      <div className="container mx-auto px-4 max-w-lg py-16 text-center">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <XCircle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Invalid session
        </h2>
        <p className="text-muted-foreground mb-8">
          No checkout session was found. Please try again from the cart.
        </p>
        <Link to="/cart">
          <Button size="lg" className="font-semibold">
            Return to Cart
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-lg py-8">
      {isProcessing && <LoadingState />}
      {isFailed && (
        <FailedState
          error={
            sessionStatus.__kind__ === "failed"
              ? sessionStatus.failed.error
              : undefined
          }
        />
      )}
      {isCompleted && <SuccessState order={placedOrder ?? null} />}
    </div>
  );
}
