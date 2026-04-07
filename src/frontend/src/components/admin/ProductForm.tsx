import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { ExternalBlob, createActor } from "../../backend";
import { Category } from "../../backend";
import { CATEGORIES } from "../../lib/queryKeys";
import type { Product, ProductInput } from "../../types";

interface ProductFormProps {
  initial?: Product | null;
  onSave: (data: ProductInput) => void;
  isPending: boolean;
}

interface ImagePreview {
  url: string;
  blob: ExternalBlob | null;
  isExisting: boolean;
}

export function ProductForm({ initial, onSave, isPending }: ProductFormProps) {
  const { actor } = useActor(createActor);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial ? Number(initial.price) : 0);
  const [stock, setStock] = useState(initial ? Number(initial.stock) : 0);
  const [category, setCategory] = useState<Category>(
    initial?.category ?? Category.clothes,
  );
  const [previews, setPreviews] = useState<ImagePreview[]>(() => {
    if (!initial?.images?.length) return [];
    return initial.images.map((img) => {
      // img is Uint8Array (ProductImage) from existing product
      const blob = ExternalBlob.fromBytes(
        img as unknown as Uint8Array<ArrayBuffer>,
      );
      return { url: blob.getDirectURL(), blob, isExisting: true };
    });
  });
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    for (const file of files) {
      const bytes = new Uint8Array(
        await file.arrayBuffer(),
      ) as unknown as Uint8Array<ArrayBuffer>;
      const idx = previews.length;
      setUploadingIdx(idx);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(() => {});
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => [
        ...prev,
        { url: previewUrl, blob, isExisting: false },
      ]);
      setUploadingIdx(null);
    }
    e.target.value = "";
  };

  const removeImage = (idx: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;

    // Convert previews back to Uint8Array for backend
    const images: Uint8Array[] = [];
    for (const preview of previews) {
      if (preview.blob) {
        const bytes = await preview.blob.getBytes();
        images.push(bytes as unknown as Uint8Array);
      }
    }

    onSave({
      name,
      description,
      price: BigInt(price),
      stock: BigInt(stock),
      category,
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="pname">Product Name *</Label>
        <Input
          id="pname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Leather Handbag"
          className="mt-1"
          required
          data-ocid="admin-product-name"
        />
      </div>

      <div>
        <Label htmlFor="pdesc">Description</Label>
        <Textarea
          id="pdesc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the product..."
          className="mt-1"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pprice">Price (cents) *</Label>
          <Input
            id="pprice"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="mt-1"
            data-ocid="admin-product-price"
          />
          <p className="text-xs text-muted-foreground mt-1">
            ${(price / 100).toFixed(2)} USD
          </p>
        </div>
        <div>
          <Label htmlFor="pstock">Stock *</Label>
          <Input
            id="pstock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value) || 0)}
            className="mt-1"
            data-ocid="admin-product-stock"
          />
        </div>
      </div>

      <div>
        <Label>Category</Label>
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as Category)}
        >
          <SelectTrigger className="mt-1" data-ocid="admin-product-category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Image upload */}
      <div>
        <Label>Product Images</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {previews.map((preview, idx) => (
            <div
              key={`preview-${idx}-${preview.url.slice(-8)}`}
              className="relative group"
            >
              <img
                src={preview.url}
                alt={`Preview ${idx + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-border"
              />
              {uploadingIdx === idx && (
                <div className="absolute inset-0 bg-background/70 rounded-lg flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-smooth"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-smooth text-muted-foreground hover:text-primary"
            data-ocid="admin-product-image-upload"
          >
            <ImagePlus className="h-5 w-5 mb-1" />
            <span className="text-xs">Add</span>
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending || !name.trim()}
        className="w-full font-semibold"
        data-ocid="admin-product-save"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving…
          </>
        ) : (
          "Save Product"
        )}
      </Button>
    </form>
  );
}
