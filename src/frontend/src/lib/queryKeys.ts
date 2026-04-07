import { Category, OrderStatus, SortOption } from "../backend";

export const QUERY_KEYS = {
  products: (
    category?: Category | null,
    search?: string | null,
    sortBy?: SortOption | null,
  ) => ["products", category ?? null, search ?? null, sortBy ?? null] as const,
  product: (id: bigint) => ["product", id.toString()] as const,
  cart: ["cart"] as const,
  orders: ["orders"] as const,
  order: (id: bigint) => ["order", id.toString()] as const,
  allOrders: ["allOrders"] as const,
  userProfile: ["userProfile"] as const,
  userRole: ["userRole"] as const,
  isAdmin: ["isAdmin"] as const,
  stripeConfigured: ["stripeConfigured"] as const,
} as const;

export const CATEGORIES = [
  { value: Category.clothes, label: "Clothing" },
  { value: Category.bags, label: "Bags" },
  { value: Category.watches, label: "Watches" },
  { value: Category.shoes, label: "Shoes" },
  { value: Category.electronics, label: "Electronics" },
  { value: Category.computers, label: "Computers" },
] as const;

export const SORT_OPTIONS = [
  { value: SortOption.newest, label: "Newest" },
  { value: SortOption.priceAsc, label: "Price: Low to High" },
  { value: SortOption.priceDesc, label: "Price: High to Low" },
] as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
