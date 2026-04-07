import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Package, ShoppingBag } from "lucide-react";
import { createActor } from "../backend";
import { formatPrice } from "../hooks/useCart";
import { QUERY_KEYS } from "../lib/queryKeys";
import { getStatusBadgeClasses } from "../lib/statusBadge";
import type { Order } from "../types";
function OrderRowSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

export default function OrdersPage() {
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: QUERY_KEYS.orders,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            My Orders
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track and manage your purchase history
          </p>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="space-y-3" data-ocid="orders-loading">
            <OrderRowSkeleton />
            <OrderRowSkeleton />
            <OrderRowSkeleton />
          </div>
        ) : !orders || orders.length === 0 ? (
          /* Empty state */
          <div
            className="text-center py-20 bg-card border border-border rounded-2xl"
            data-ocid="empty-orders"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No orders yet
            </h3>
            <p className="text-muted-foreground text-sm mb-7 max-w-xs mx-auto">
              Once you place an order, it will appear here so you can track its
              status.
            </p>
            <Link to="/products">
              <Button data-ocid="empty-orders-cta">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          /* Orders list */
          <div className="space-y-3" data-ocid="orders-list">
            {orders.map((order) => {
              const statusConfig = getStatusBadgeClasses(order.status);
              const orderDate = new Date(
                Number(order.createdAt) / 1_000_000,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <Link
                  key={order.id.toString()}
                  to="/orders/$id"
                  params={{ id: order.id.toString() }}
                  className="block group"
                  data-ocid={`order-row-${order.id}`}
                >
                  <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200 group-hover:bg-card">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        {/* Order ID + status */}
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <span className="font-display font-semibold text-foreground">
                            Order #{order.id.toString()}
                          </span>
                          <span
                            className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusConfig.className}`}
                          >
                            {statusConfig.label}
                          </span>
                        </div>
                        {/* Meta */}
                        <p className="text-sm text-muted-foreground">
                          {orderDate} · {Number(order.items.length)} item
                          {Number(order.items.length) !== 1 ? "s" : ""}
                        </p>
                      </div>

                      {/* Price + arrow */}
                      <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                        <span className="font-display font-bold text-foreground text-lg">
                          {formatPrice(order.total)}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                      </div>
                    </div>

                    {/* Item preview */}
                    {order.items.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border truncate">
                        {order.items
                          .slice(0, 3)
                          .map((item) => item.productName)
                          .join(", ")}
                        {order.items.length > 3 &&
                          ` +${order.items.length - 3} more`}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
