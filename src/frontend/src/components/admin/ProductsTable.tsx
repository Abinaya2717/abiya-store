import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Package, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, createActor } from "../../backend";
import { SortOption } from "../../backend";
import { formatPrice } from "../../hooks/useCart";
import { QUERY_KEYS } from "../../lib/queryKeys";
import type { Product, ProductInput } from "../../types";
import { ProductForm } from "./ProductForm";

function ProductThumbnail({ product }: { product: Product }) {
  if (!product.images?.length) {
    return (
      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
        <Package className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }
  const img = product.images[0];
  const blob = ExternalBlob.fromBytes(
    img as unknown as Uint8Array<ArrayBuffer>,
  );
  return (
    <img
      src={blob.getDirectURL()}
      alt={product.name}
      className="w-10 h-10 object-cover rounded-md border border-border"
    />
  );
}

export function ProductsTable() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: QUERY_KEYS.products(null, null, SortOption.newest),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(null, null, SortOption.newest);
    },
    enabled: !!actor && !isFetching,
  });

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: async (input: ProductInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setAddDialogOpen(false);
      toast.success("Product added successfully");
    },
    onError: () => toast.error("Failed to add product"),
  });

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: ProductInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
      toast.success("Product updated");
    },
    onError: () => toast.error("Failed to update product"),
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Loading…" : `${products?.length ?? 0} products total`}
        </p>
        <Button
          onClick={() => setAddDialogOpen(true)}
          data-ocid="admin-add-product"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {!products?.length ? (
            <div className="text-center py-20" data-ocid="admin-empty-products">
              <Package className="h-14 w-14 mx-auto text-muted-foreground/25 mb-4" />
              <p className="font-display font-semibold text-foreground mb-1">
                No products yet
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first product to get started.
              </p>
              <Button variant="outline" onClick={() => setAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground w-12">
                      Image
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                      Category
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                      Price
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                      Stock
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product) => (
                    <tr
                      key={product.id.toString()}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin-product-row-${product.id}`}
                    >
                      <td className="px-4 py-3">
                        <ProductThumbnail product={product} />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground truncate max-w-[200px]">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {product.description}
                        </p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant="outline" className="capitalize text-xs">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm hidden md:table-cell">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell">
                        <span
                          className={
                            Number(product.stock) === 0
                              ? "text-destructive font-medium"
                              : Number(product.stock) < 5
                                ? "text-amber-600 font-medium"
                                : "text-foreground"
                          }
                        >
                          {Number(product.stock)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingProduct(product)}
                            aria-label="Edit product"
                            data-ocid={`admin-edit-product-${product.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Delete product"
                                className="text-destructive hover:text-destructive"
                                data-ocid={`admin-delete-product-${product.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete product?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete{" "}
                                  <strong>{product.name}</strong>. This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteProduct(product.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add product dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            initial={null}
            onSave={(data) => addProduct(data)}
            isPending={isAdding}
          />
        </DialogContent>
      </Dialog>

      {/* Edit product dialog */}
      <Dialog
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              initial={editingProduct}
              onSave={(input) =>
                updateProduct({ id: editingProduct.id, input })
              }
              isPending={isUpdating}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
