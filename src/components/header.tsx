import { Button } from "./ui/button";
import { Link } from "react-router";
import { LogIn } from "lucide-react";
import LogoutButton from "./logout-button";
import { ThemeToggle } from "./theme-toggle";
import useAuthStore from "@/stores/auth.store";

import { articleInfiniteQueryOptions } from "@/services/articles/queries";
import { useQueryClient } from "@tanstack/react-query";

const DEFAULT_PAGE_SIZE = 3;

export default function Header() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  function renderButton() {
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

  function prefecthArticles() {
    queryClient.prefetchInfiniteQuery(
      articleInfiniteQueryOptions({
        params: {
          pagination: { pageSize: DEFAULT_PAGE_SIZE },
          filters: {
            title: undefined,
            category: undefined,
          },
        },
      }),
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
            to="/articles"
            className="text-foreground hover:text-primary font-medium transition-colors"
            onMouseEnter={prefecthArticles}
          >
            Articles
          </Link>
          {renderButton()}
        </nav>
      </div>
    </header>
  );
}
