import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet } from "react-router";
import LoadingUI from "../loading-ui";

export default function AuthGuard() {
  const { user, hydrated, status } = useAuth();

  if (!hydrated || status === "loading") {
    return <LoadingUI message="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
