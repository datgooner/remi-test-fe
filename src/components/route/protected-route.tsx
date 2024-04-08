import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => !!state.token);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export { ProtectedRoute };
