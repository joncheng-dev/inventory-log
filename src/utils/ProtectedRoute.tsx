import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSignIn?: boolean;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireSignIn = true,
  requireAdmin = false
}: ProtectedRouteProps) {
  const { isAdmin, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (!isSignedIn && requireSignIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" replace state={{ from: location }} />;
  }

  return (
    <>
      {children}
    </>
  );
}
