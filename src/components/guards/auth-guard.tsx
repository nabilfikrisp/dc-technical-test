import useAuthStore from "@/stores/auth.store";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
