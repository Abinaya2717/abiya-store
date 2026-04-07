import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { createActor } from "../../backend";
import { OrderStatus } from "../../backend";
import { formatPrice } from "../../hooks/useCart";
import { ORDER_STATUS_LABELS, QUERY_KEYS } from "../../lib/queryKeys";
import type { Order } from "../../types";

const STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  shipped: "default",
  delivered: "outline",
  cancelled: "destructive",
};

function truncatePrincipal(principal: string): string {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}…${principal.slice(-6)}`;
}

export function OrdersTable() {
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: QUERY_KEYS.allOrders,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllOrders();
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  const { mutate: updateOrderStatus } = useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: OrderStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allOrders });
      toast.success("Order status updated");
    },
    onError: () => toast.error("Failed to update order status"),
  });

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        {isLoading ? "Loading…" : `${orders?.length ?? 0} orders total`}
      </p>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {!orders?.length ? (
            <div className="text-center py-20" data-ocid="admin-empty-orders">
              <ShoppingBag className="h-14 w-14 mx-auto text-muted-foreground/25 mb-4" />
              <p className="font-display font-semibold text-foreground mb-1">
                No orders yet
              </p>
              <p className="text-sm text-muted-foreground">
                Orders will appear here once customers start purchasing.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                      Date
                    </th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                      Items
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((order) => (
                    <tr
                      key={order.id.toString()}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin-order-row-${order.id}`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-mono text-xs text-foreground font-medium">
                          #{order.id.toString()}
                        </p>
                        <Badge
                          variant={STATUS_VARIANTS[order.status] ?? "secondary"}
                          className="mt-1 text-xs sm:hidden"
                        >
                          {ORDER_STATUS_LABELS[order.status] ?? order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground">
                          {truncatePrincipal(order.userId.toString())}
                        </code>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">
                        {new Date(
                          Number(order.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-center hidden md:table-cell text-muted-foreground">
                        {order.items.length}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium text-foreground">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Select
                          value={order.status}
                          onValueChange={(v) =>
                            updateOrderStatus({
                              id: order.id,
                              status: v as OrderStatus,
                            })
                          }
                        >
                          <SelectTrigger
                            className="w-32 h-8 text-xs"
                            data-ocid={`admin-order-status-${order.id}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(OrderStatus).map((s) => (
                              <SelectItem key={s} value={s} className="text-xs">
                                {ORDER_STATUS_LABELS[s] ?? s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
