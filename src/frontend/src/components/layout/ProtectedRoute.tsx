import { Skeleton } from "@/components/ui/skeleton";
import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuth, useIsAdmin } from "../../hooks/useAuth";

export function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export function AdminRoute() {
  const { isAuthenticated, isInitializing } = useAuth();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  if (isInitializing || isAdminLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
