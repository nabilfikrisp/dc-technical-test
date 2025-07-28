import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import useAuthStore from "@/stores/auth.store";
import { meQueryOptions } from "@/services/auth/queries";

export default function LogoutButton() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  async function handleLogout() {
    await queryClient.removeQueries({
      queryKey: meQueryOptions().queryKey,
    });
    clearAuth();
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
