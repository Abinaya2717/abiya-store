// Re-export all backend types for convenient use throughout the app
export type {
  Product,
  ProductId,
  ProductInput,
  ProductImage,
  CartItem,
  CartSummary,
  Order,
  OrderId,
  OrderInput,
  OrderItem,
  ShippingAddress,
  UserProfile,
  UserId,
  StripeConfiguration,
  StripeSessionStatus,
  ShoppingItem,
  Timestamp,
} from "../backend";

export { Category, OrderStatus, SortOption, UserRole } from "../backend";

// UI-only types
export interface NavItem {
  label: string;
  href: string;
}
