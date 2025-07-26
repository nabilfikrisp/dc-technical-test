import { Button } from "./ui/button";
import { Link } from "react-router";
import { LogIn } from "lucide-react";
import useAuth from "@/hooks/api/use-auth";
import LogoutButton from "./logout-button";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const { user, hydrated } = useAuth();

  function renderButton() {
    if (!hydrated) {
      return (
        <Button size="sm" variant="outline" disabled>
          Loading...
        </Button>
      );
    }

    if (user) {
      return <LogoutButton />;
    }

    return (
      <Button size="sm" asChild>
        <Link to="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );
  }

  return (
    <header className="bg-background border-border sticky top-0 z-50 border-b shadow-sm">
      <div className="mx-auto flex max-w-[1024px] items-center justify-end px-5 py-3 sm:justify-between">
        <Link to="/" className="hidden items-center gap-2 sm:flex">
          <span className="text-primary text-2xl font-bold tracking-tight">
            TravelTalk
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/"
            className="text-foreground hover:text-primary font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-foreground hover:text-primary font-medium transition-colors"
          >
            Explore
          </Link>
          {renderButton()}
        </nav>
      </div>
    </header>
  );
}
