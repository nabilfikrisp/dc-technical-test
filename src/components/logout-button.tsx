import { Button } from "./ui/button";
import useAuthStore from "@/stores/auth.store";

export default function LogoutButton() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  function handleLogout() {
    clearAuth();
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
