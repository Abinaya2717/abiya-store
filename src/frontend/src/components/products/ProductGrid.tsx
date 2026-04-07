import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";
import { CATEGORIES } from "../../lib/queryKeys";
import type { Product } from "../../types";
import type { Category } from "../../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[] | undefined;
  isLoading: boolean;
  category?: Category | null;
  onClearFilter?: () => void;
  emptyMessage?: string;
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square rounded-xl w-full" />
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <div className="flex justify-between items-center pt-1">
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductGrid({
  products,
  isLoading,
  category,
  onClearFilter,
  emptyMessage,
}: ProductGridProps) {
  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (!products || products.length === 0) {
    const categoryLabel = category
      ? CATEGORIES.find((c) => c.value === category)?.label
      : null;

    return (
      <div
        className="flex flex-col items-center justify-center py-24 bg-card border border-border rounded-xl text-center"
        data-ocid="empty-products"
      >
        <div className="rounded-full bg-muted/60 p-6 mb-5">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          {emptyMessage ?? "No products found"}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
          {categoryLabel
            ? `No products available in ${categoryLabel} yet.`
            : "No products match your current filters."}
        </p>
        {onClearFilter && category && (
          <Button variant="outline" onClick={onClearFilter} size="sm">
            View all products
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id.toString()} product={product} />
      ))}
    </div>
  );
}
