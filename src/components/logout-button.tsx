import useAuth from "@/hooks/api/use-auth";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
