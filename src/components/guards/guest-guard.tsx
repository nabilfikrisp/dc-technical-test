import { Navigate, Outlet } from "react-router";
import useAuthStore from "@/stores/auth.store";

export default function GuestGuard() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/articles" replace />;
  }

  return <Outlet />;
}
