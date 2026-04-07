import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: ProductId;
    name: string;
    createdAt: Timestamp;
    description: string;
    stock: bigint;
    category: Category;
    price: bigint;
    images: Array<ProductImage>;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    productId: ProductId;
    productName: string;
    quantity: bigint;
    priceAtPurchase: bigint;
}
export interface OrderInput {
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
    stripeSessionId: string;
}
export interface CartSummary {
    itemCount: bigint;
    items: Array<CartItem>;
    subtotal: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface ProductInput {
    name: string;
    description: string;
    stock: bigint;
    category: Category;
    price: bigint;
    images: Array<ProductImage>;
}
export interface ShippingAddress {
    country: string;
    city: string;
    postalCode: string;
    fullName: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
    phone: string;
}
export type ProductImage = Uint8Array;
export interface Order {
    id: OrderId;
    status: OrderStatus;
    total: bigint;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
    stripeSessionId: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export type OrderId = bigint;
export interface UserProfile {
    name: string;
    email: string;
}
export enum Category {
    watches = "watches",
    bags = "bags",
    clothes = "clothes",
    shoes = "shoes",
    computers = "computers",
    electronics = "electronics"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered"
}
export enum SortOption {
    newest = "newest",
    priceDesc = "priceDesc",
    priceAsc = "priceAsc"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(input: ProductInput): Promise<Product>;
    addToCart(productId: ProductId, quantity: bigint): Promise<CartSummary>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<CartSummary>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: UserId): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAllOrders(): Promise<Array<Order>>;
    listMyOrders(): Promise<Array<Order>>;
    listProducts(category: Category | null, search: string | null, sortBy: SortOption | null): Promise<Array<Product>>;
    placeOrder(input: OrderInput): Promise<Order>;
    removeFromCart(productId: ProductId): Promise<CartSummary>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCartItemQuantity(productId: ProductId, quantity: bigint): Promise<CartSummary>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
}
