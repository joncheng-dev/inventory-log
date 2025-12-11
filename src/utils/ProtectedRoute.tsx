import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false
}: ProtectedRouteProps) {
  const { userProfile, isAdmin } = useAuth();

  if (!userProfile) {
    return <Navigate to="/signin" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      {children}
    </>
  );
}