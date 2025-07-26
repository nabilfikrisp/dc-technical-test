import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet } from "react-router";
import LoadingUI from "../loading-ui";

export default function GuestGuard() {
  const { user, hydrated, status } = useAuth();

  if (!hydrated || status === "loading") {
    return <LoadingUI message="Checking guest status..." />;
  }

  if (user) {
    return <Navigate to="/explore" replace />;
  }

  return <Outlet />;
}
