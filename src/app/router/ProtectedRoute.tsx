import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuthenticated?: boolean;
  isLoading?: boolean;
  redirectTo?: string;
  children?: ReactNode;
};

export default function ProtectedRoute({
  isAuthenticated = true,
  isLoading = false,
  redirectTo = "/auth/login",
  children,
}: ProtectedRouteProps) {
  const location = useLocation();

  if (isLoading) {
    return children ? <>{children}</> : <Outlet />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children ? <>{children}</> : <Outlet />;
}
