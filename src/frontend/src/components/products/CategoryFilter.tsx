import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "../../lib/queryKeys";
import type { Category } from "../../types";

const CATEGORY_ICONS: Record<string, string> = {
  clothes: "👗",
  bags: "👜",
  watches: "⌚",
  shoes: "👟",
  electronics: "📱",
  computers: "💻",
};

interface CategoryFilterProps {
  selected: Category | null;
  onChange: (category: Category | null) => void;
  variant?: "sidebar" | "tabs";
}

export function CategoryFilter({
  selected,
  onChange,
  variant = "sidebar",
}: CategoryFilterProps) {
  if (variant === "tabs") {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selected === null ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(null)}
          data-ocid="filter-all"
          className="rounded-full"
        >
          All
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={selected === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(cat.value)}
            data-ocid={`filter-${cat.value}`}
            className="rounded-full"
          >
            <span className="mr-1">{CATEGORY_ICONS[cat.value]}</span>
            {cat.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
          Category
        </h2>
      </div>

      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
            selected === null
              ? "bg-primary/10 text-primary font-semibold"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
          data-ocid="filter-all"
        >
          <span>All Products</span>
        </button>
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
              selected === cat.value
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            data-ocid={`filter-${cat.value}`}
          >
            <span>{CATEGORY_ICONS[cat.value]}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
