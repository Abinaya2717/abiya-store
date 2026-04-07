import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { createActor } from "../backend";
import {
  formatPrice,
  useCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "../hooks/useCart";
import { QUERY_KEYS } from "../lib/queryKeys";
import type { Product } from "../types";

function ProductImage({
  images,
  name,
}: { images: Product["images"]; name: string }) {
  if (images.length > 0) {
    return (
      <img
        src={URL.createObjectURL(
          new Blob([images[0] as unknown as Uint8Array<ArrayBuffer>]),
        )}
        alt={name}
        className="w-full h-full object-cover"
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Package className="h-6 w-6 text-muted-foreground/30" />
    </div>
  );
}

function CartItemRow({
  productId,
  quantity,
}: { productId: bigint; quantity: bigint }) {
  const { actor, isFetching } = useActor(createActor);
  const { mutate: remove, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: updateQty, isPending: isUpdating } = useUpdateCartQuantity();

  const { data: product, isLoading } = useQuery<Product | null>({
    queryKey: QUERY_KEYS.product(productId),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading || !product) {
    return (
      <div className="flex items-center gap-4 py-5">
        <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
    );
  }

  const lineTotal = product.price * quantity;

  return (
    <div
      className="flex items-center gap-4 py-5"
      data-ocid={`cart-item-${productId}`}
    >
      {/* Product image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-muted overflow-hidden border border-border">
        <ProductImage images={product.images} name={product.name} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          to="/products/$id"
          params={{ id: productId.toString() }}
          className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <Badge variant="outline" className="mt-1 text-xs capitalize">
          {product.category}
        </Badge>
        <p className="text-sm font-medium text-primary mt-1">
          {formatPrice(product.price)} each
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden bg-background">
        <button
          type="button"
          className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40"
          onClick={() =>
            quantity > BigInt(1)
              ? updateQty({ productId, quantity: quantity - BigInt(1) })
              : remove(productId)
          }
          disabled={isUpdating || isRemoving}
          aria-label="Decrease quantity"
          data-ocid={`cart-decrease-${productId}`}
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-8 text-center text-sm font-semibold text-foreground">
          {Number(quantity)}
        </span>
        <button
          type="button"
          className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40"
          onClick={() =>
            updateQty({ productId, quantity: quantity + BigInt(1) })
          }
          disabled={isUpdating}
          aria-label="Increase quantity"
          data-ocid={`cart-increase-${productId}`}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Line total */}
      <div className="text-right min-w-[72px]">
        <p className="font-bold text-foreground">{formatPrice(lineTotal)}</p>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => remove(productId)}
        disabled={isRemoving}
        aria-label="Remove from cart"
        data-ocid={`cart-remove-${productId}`}
        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <Skeleton className="h-8 w-40 mb-2" />
      <Skeleton className="h-4 w-24 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-0 bg-card border border-border rounded-xl px-6 divide-y divide-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 py-5">
              <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}

export default function CartPage() {
  const { data: cart, isLoading } = useCart();

  if (isLoading) return <CartSkeleton />;

  const items = cart?.items ?? [];
  const isEmpty = items.length === 0;

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Shopping Cart
        </h1>
        {!isEmpty && (
          <p className="text-muted-foreground mt-1">
            {Number(cart?.itemCount ?? 0)} item
            {Number(cart?.itemCount ?? 0) !== 1 ? "s" : ""} in your cart
          </p>
        )}
      </div>

      {isEmpty ? (
        <div
          className="text-center py-24 bg-card border border-border rounded-2xl"
          data-ocid="empty-cart"
        >
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Your cart is empty
          </h3>
          <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
            Discover our curated collection of clothes, bags, watches, shoes,
            and electronics.
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="font-semibold"
              data-ocid="shop-now-btn"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart items */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-6 divide-y divide-border">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId.toString()}
                  productId={item.productId}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="sticky top-24">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-border">
                <h2 className="font-display font-bold text-foreground">
                  Order Summary
                </h2>
              </div>
              <div className="px-6 py-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({Number(cart?.itemCount ?? 0)} items)
                  </span>
                  <span className="font-medium">
                    {formatPrice(cart?.subtotal ?? BigInt(0))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-medium">
                    Calculated at checkout
                  </span>
                </div>
              </div>
              <Separator />
              <div className="px-6 py-5">
                <div className="flex justify-between mb-5">
                  <span className="font-display font-bold text-foreground">
                    Total
                  </span>
                  <span className="font-display text-xl font-bold text-foreground">
                    {formatPrice(cart?.subtotal ?? BigInt(0))}
                  </span>
                </div>
                <Link to="/checkout">
                  <Button
                    className="w-full font-semibold"
                    size="lg"
                    data-ocid="proceed-to-checkout"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <Link
              to="/products"
              className="block text-center mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
