import { c as createLucideIcon, j as jsxRuntimeExports, a as Button, f as CATEGORIES, d as Skeleton, u as useActor, g as useSearch, r as reactExports, S as SortOption, b as useQuery, h as Search, I as Input, i as SORT_OPTIONS, e as createActor, Q as QUERY_KEYS } from "./index-DyFy3fPK.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CaTBTyfX.js";
import { P as ProductCard } from "./ProductCard-CGf5847T.js";
import { S as ShoppingBag } from "./shopping-bag-CAKUbT2G.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CATEGORY_ICONS = {
  clothes: "👗",
  bags: "👜",
  watches: "⌚",
  shoes: "👟",
  electronics: "📱",
  computers: "💻"
};
function CategoryFilter({
  selected,
  onChange,
  variant = "sidebar"
}) {
  if (variant === "tabs") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: selected === null ? "default" : "outline",
          size: "sm",
          onClick: () => onChange(null),
          "data-ocid": "filter-all",
          className: "rounded-full",
          children: "All"
        }
      ),
      CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: selected === cat.value ? "default" : "outline",
          size: "sm",
          onClick: () => onChange(cat.value),
          "data-ocid": `filter-${cat.value}`,
          className: "rounded-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: CATEGORY_ICONS[cat.value] }),
            cat.label
          ]
        },
        cat.value
      ))
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 sticky top-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground uppercase tracking-wide", children: "Category" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(null),
          className: `w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${selected === null ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
          "data-ocid": "filter-all",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All Products" })
        }
      ),
      CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange(cat.value),
          className: `w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${selected === cat.value ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
          "data-ocid": `filter-${cat.value}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CATEGORY_ICONS[cat.value] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.label })
          ]
        },
        cat.value
      ))
    ] })
  ] });
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 rounded-lg" })
    ] })
  ] }, i)) });
}
function ProductGrid({
  products,
  isLoading,
  category,
  onClearFilter,
  emptyMessage
}) {
  var _a;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {});
  }
  if (!products || products.length === 0) {
    const categoryLabel = category ? (_a = CATEGORIES.find((c) => c.value === category)) == null ? void 0 : _a.label : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 bg-card border border-border rounded-xl text-center",
        "data-ocid": "empty-products",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted/60 p-6 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: emptyMessage ?? "No products found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: categoryLabel ? `No products available in ${categoryLabel} yet.` : "No products match your current filters." }),
          onClearFilter && category && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClearFilter, size: "sm", children: "View all products" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product }, product.id.toString())) });
}
function ProductsPage() {
  var _a;
  const { actor, isFetching } = useActor(createActor);
  const searchParams = useSearch({ strict: false });
  const [category, setCategory] = reactExports.useState(
    searchParams.category || null
  );
  const [sortBy, setSortBy] = reactExports.useState(SortOption.newest);
  const [search, setSearch] = reactExports.useState(searchParams.search || "");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState(search);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);
  const { data: products, isLoading } = useQuery({
    queryKey: QUERY_KEYS.products(category, debouncedSearch || null, sortBy),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(category, debouncedSearch || null, sortBy);
    },
    enabled: !!actor && !isFetching
  });
  const handleClearFilter = reactExports.useCallback(() => setCategory(null), []);
  const categoryLabel = category ? ((_a = CATEGORIES.find((c) => c.value === category)) == null ? void 0 : _a.label) ?? "Products" : "All Products";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-7xl py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: categoryLabel }),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
        (products == null ? void 0 : products.length) ?? 0,
        " items"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-7xl py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "w-full md:w-52 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CategoryFilter,
        {
          selected: category,
          onChange: setCategory,
          variant: "sidebar"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 w-full sm:max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search products...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9",
                "data-ocid": "search-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: sortBy,
              onValueChange: (v) => setSortBy(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-full sm:w-48",
                    "data-ocid": "sort-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductGrid,
          {
            products,
            isLoading,
            category,
            onClearFilter: handleClearFilter
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ProductsPage as default
};
