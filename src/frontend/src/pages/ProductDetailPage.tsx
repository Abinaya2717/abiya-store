import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { createActor } from "../backend";
import { ProductCard } from "../components/products/ProductCard";
import { useAuth } from "../hooks/useAuth";
import { formatPrice, useAddToCart } from "../hooks/useCart";
import { CATEGORIES, QUERY_KEYS } from "../lib/queryKeys";
import type { Product } from "../types";

function RelatedProducts({
  productId,
  category,
}: { productId: bigint; category: string }) {
  const { actor, isFetching } = useActor(createActor);
  const { data: products } = useQuery<Product[]>({
    queryKey: ["related", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(
        category as import("../backend").Category,
        null,
        null,
      );
    },
    enabled: !!actor && !isFetching,
  });

  const related = products?.filter((p) => p.id !== productId).slice(0, 4);
  if (!related || related.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="font-display text-xl font-bold text-foreground mb-6">
        More from{" "}
        {CATEGORIES.find((c) => c.value === category)?.label ?? category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {related.map((p) => (
          <ProductCard key={p.id.toString()} product={p} compact />
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { actor, isFetching } = useActor(createActor);
  const { mutate: addToCart, isPending } = useAddToCart();
  const { isAuthenticated, login } = useAuth();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading } = useQuery<Product | null>({
    queryKey: QUERY_KEYS.product(BigInt(id)),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(BigInt(id));
    },
    enabled: !!actor && !isFetching && !!id,
  });

  function handleAddToCart() {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (product) {
      addToCart({ productId: product.id, quantity: BigInt(qty) });
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-8">
        <Skeleton className="h-5 w-36 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-44" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-20 text-center">
        <div className="rounded-full bg-muted/50 p-8 inline-flex mb-6">
          <Package className="h-14 w-14 text-muted-foreground/30" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Product not found
        </h2>
        <p className="text-muted-foreground mb-8">
          This product may have been removed or doesn't exist.
        </p>
        <Link to="/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === BigInt(0);
  const maxQty = Math.min(Number(product.stock), 10);
  const categoryLabel =
    CATEGORIES.find((c) => c.value === product.category)?.label ??
    product.category;

  function getImageSrc(): string | null {
    if (product && product.images.length > 0) {
      return URL.createObjectURL(
        new Blob([product.images[0] as unknown as Uint8Array<ArrayBuffer>], {
          type: "image/jpeg",
        }),
      );
    }
    return null;
  }

  const imageSrc = getImageSrc();

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image panel */}
          <div className="bg-card border border-border rounded-xl overflow-hidden aspect-square">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/20 bg-muted/20">
                <ShoppingCart className="h-24 w-24" />
                <p className="mt-4 text-sm text-muted-foreground/50">
                  No image available
                </p>
              </div>
            )}
          </div>

          {/* Details panel */}
          <div className="space-y-6">
            <div>
              <Badge
                variant="outline"
                className="capitalize mb-3 text-primary border-primary/30 bg-primary/5"
              >
                {categoryLabel}
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p className="font-display text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description */}
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <p className="text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-destructive" : "bg-green-500"}`}
              />
              <span className="text-sm text-muted-foreground">
                {isOutOfStock
                  ? "Out of stock"
                  : `${Number(product.stock)} in stock`}
              </span>
            </div>

            {/* Quantity selector */}
            {!isOutOfStock && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">
                  Quantity
                </span>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-foreground min-w-[2.5rem] text-center border-x border-border">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                    disabled={qty >= maxQty}
                    className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Add to cart */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isPending || isOutOfStock}
              className="w-full md:w-auto font-semibold px-8"
              data-ocid="product-add-to-cart"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isOutOfStock
                ? "Out of Stock"
                : isPending
                  ? "Adding..."
                  : "Add to Cart"}
            </Button>

            {/* Shipping note */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
              <Truck className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Free shipping on orders over $75</span>
            </div>
          </div>
        </div>

        {/* Related products */}
        <RelatedProducts productId={product.id} category={product.category} />
      </div>
    </div>
  );
}
