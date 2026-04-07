import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Package, ShoppingCart } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { formatPrice, useAddToCart } from "../../hooks/useCart";
import type { Product } from "../../types";

function ProductImage({ product }: { product: Product }) {
  if (product.images.length > 0) {
    const src = URL.createObjectURL(
      new Blob([product.images[0] as unknown as Uint8Array<ArrayBuffer>], {
        type: "image/jpeg",
      }),
    );
    return (
      <img
        src={src}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30 bg-muted/40">
      <Package className="h-10 w-10" />
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { mutate: addToCart, isPending } = useAddToCart();
  const { isAuthenticated, login } = useAuth();
  const isOutOfStock = product.stock === BigInt(0);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      login();
      return;
    }
    addToCart({ productId: product.id, quantity: BigInt(1) });
  }

  return (
    <div
      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-200 flex flex-col"
      data-ocid={`product-card-${product.id}`}
    >
      <Link to="/products/$id" params={{ id: product.id.toString() }}>
        <div
          className={`overflow-hidden bg-muted/20 ${compact ? "aspect-[4/3]" : "aspect-square"}`}
        >
          <ProductImage product={product} />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Badge
            variant="outline"
            className="text-xs capitalize shrink-0 text-primary border-primary/30 bg-primary/5"
          >
            {product.category}
          </Badge>
          {isOutOfStock && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Out of stock
            </Badge>
          )}
        </div>

        <Link to="/products/$id" params={{ id: product.id.toString() }}>
          <h3 className="font-display font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors mt-1">
            {product.name}
          </h3>
        </Link>

        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="font-display text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isPending || isOutOfStock}
            className="shrink-0"
            data-ocid={`add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            {isOutOfStock ? "Sold out" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
