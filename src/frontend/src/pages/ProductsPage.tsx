import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { type Category, SortOption, createActor } from "../backend";
import { CategoryFilter } from "../components/products/CategoryFilter";
import { ProductGrid } from "../components/products/ProductGrid";
import { CATEGORIES, QUERY_KEYS, SORT_OPTIONS } from "../lib/queryKeys";
import type { Product } from "../types";

export default function ProductsPage() {
  const { actor, isFetching } = useActor(createActor);
  const searchParams = useSearch({ strict: false }) as Record<string, string>;

  const [category, setCategory] = useState<Category | null>(
    (searchParams.category as Category) || null,
  );
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.newest);
  const [search, setSearch] = useState<string>(searchParams.search || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: QUERY_KEYS.products(category, debouncedSearch || null, sortBy),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(category, debouncedSearch || null, sortBy);
    },
    enabled: !!actor && !isFetching,
  });

  const handleClearFilter = useCallback(() => setCategory(null), []);

  const categoryLabel = category
    ? (CATEGORIES.find((c) => c.value === category)?.label ?? "Products")
    : "All Products";

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <h1 className="font-display text-2xl font-bold text-foreground">
            {categoryLabel}
          </h1>
          {!isLoading && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {products?.length ?? 0} items
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="w-full md:w-52 flex-shrink-0">
            <CategoryFilter
              selected={category}
              onChange={setCategory}
              variant="sidebar"
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                  data-ocid="search-input"
                />
              </div>
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as SortOption)}
              >
                <SelectTrigger
                  className="w-full sm:w-48"
                  data-ocid="sort-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
              category={category}
              onClearFilter={handleClearFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
