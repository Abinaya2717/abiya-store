import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Package, ShoppingBag } from "lucide-react";
import { createActor } from "../backend";
import { formatPrice } from "../hooks/useCart";
import { QUERY_KEYS } from "../lib/queryKeys";
import { getStatusBadgeClasses } from "../lib/statusBadge";
import type { Order } from "../types";
export default function OrderDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { actor, isFetching } = useActor(createActor);

  const { data: order, isLoading } = useQuery<Order | null>({
    queryKey: QUERY_KEYS.order(BigInt(id ?? "0")),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOrder(BigInt(id));
    },
    enabled: !!actor && !isFetching && !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 max-w-2xl py-10">
        <Skeleton className="h-5 w-32 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 max-w-2xl py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Order not found
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          This order doesn't exist or you don't have access to it.
        </p>
        <Link to="/orders">
          <Button variant="outline" data-ocid="order-not-found-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const addr = order.shippingAddress;
  const statusConfig = getStatusBadgeClasses(order.status);
  const orderDate = new Date(
    Number(order.createdAt) / 1_000_000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl py-10">
        {/* Back link */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          data-ocid="order-detail-back"
        >
          <ArrowLeft className="h-4 w-4" />
          My Orders
        </Link>

        {/* Order header card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <div className="px-6 py-5 border-b border-border">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-xl font-bold text-foreground">
                  Order #{order.id.toString()}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Placed on {orderDate}
                </p>
              </div>
              <span
                className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${statusConfig.className}`}
                data-ocid="order-status-badge"
              >
                {statusConfig.label}
              </span>
            </div>
          </div>

          {/* Items section */}
          <div className="px-6 py-5">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
                Items
              </h2>
            </div>

            <div className="space-y-4" data-ocid="order-items-list">
              {order.items.map((item, idx) => (
                <div
                  key={`${item.productId.toString()}-${idx}`}
                  className="flex items-center justify-between gap-4"
                  data-ocid={`order-item-${item.productId}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatPrice(item.priceAtPurchase)} ×{" "}
                      {Number(item.quantity)}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground text-sm flex-shrink-0">
                    {formatPrice(item.priceAtPurchase * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-5" />

            {/* Subtotal breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className="text-primary font-medium">Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-semibold text-foreground">
                <span className="font-display">Total</span>
                <span className="font-display text-xl">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping address card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider">
                Shipping Address
              </h2>
            </div>
            <address
              className="not-italic text-sm space-y-1"
              data-ocid="order-shipping-address"
            >
              <p className="font-semibold text-foreground">{addr.fullName}</p>
              <p className="text-muted-foreground">
                {addr.addressLine1}
                {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
              </p>
              <p className="text-muted-foreground">
                {addr.city}, {addr.state} {addr.postalCode}
              </p>
              <p className="text-muted-foreground">{addr.country}</p>
              {addr.phone && (
                <p className="text-muted-foreground pt-1">{addr.phone}</p>
              )}
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
