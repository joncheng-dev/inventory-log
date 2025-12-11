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
  const { isAdmin } = useAuth();

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/inventory" replace />;
  }

  return (
    <>
      {children}
    </>
  );
}