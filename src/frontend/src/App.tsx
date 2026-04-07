import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/layout/Layout";
import { AdminRoute, ProtectedRoute } from "./components/layout/ProtectedRoute";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("./pages/CheckoutSuccessPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetailPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageLoader() {
  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return function SuspenseWrapper() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    );
  };
}

// Root route with Layout
const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: withSuspense(NotFoundPage),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: withSuspense(HomePage),
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: withSuspense(ProductsPage),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: withSuspense(ProductDetailPage),
});

// Protected routes group
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoute,
});

const cartRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/cart",
  component: withSuspense(CartPage),
});

const checkoutRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/checkout",
  component: withSuspense(CheckoutPage),
});

const checkoutSuccessRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/checkout/success",
  component: withSuspense(CheckoutSuccessPage),
});

const ordersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/orders",
  component: withSuspense(OrdersPage),
});

const orderDetailRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/orders/$id",
  component: withSuspense(OrderDetailPage),
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: withSuspense(ProfilePage),
});

// Admin routes group
const adminRouteGroup = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: AdminRoute,
});

const adminRoute = createRoute({
  getParentRoute: () => adminRouteGroup,
  path: "/admin",
  component: withSuspense(AdminPage),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  protectedRoute.addChildren([
    cartRoute,
    checkoutRoute,
    checkoutSuccessRoute,
    ordersRoute,
    orderDetailRoute,
    profileRoute,
  ]),
  adminRouteGroup.addChildren([adminRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
