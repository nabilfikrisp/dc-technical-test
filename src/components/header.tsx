import { Button } from "./ui/button";
import { Link } from "react-router";
import { LogIn } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-background border-border sticky top-0 z-50 border-b shadow-sm">
      <div className="mx-auto flex max-w-[1000px] items-center justify-end px-5 py-3 sm:justify-between">
        <Link to="/" className="hidden items-center gap-2 sm:flex">
          <span className="text-primary text-2xl font-bold tracking-tight">
            TravelTalk
          </span>
        </Link>

        <nav className="flex items-center gap-4">
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
          <Button size="sm" asChild>
            <Link to="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
