import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet } from "react-router";
import LoadingUI from "../loading-ui";

export default function GuestGuard() {
  const { user, hydrated } = useAuth();

  if (!hydrated) {
    return <LoadingUI message="Checking authentication..." />;
  }

  if (user) {
    return <Navigate to="/explore" replace />;
  }

  return <Outlet />;
}
