import { Button } from "./ui/button";
import { NavLink } from "react-router";
import { LogIn } from "lucide-react";
import LogoutButton from "./logout-button";
import { ThemeToggle } from "./theme-toggle";
import useAuthStore from "@/stores/auth.store";
import { cn } from "@/lib/utils";

import { articleInfiniteQueryOptions } from "@/services/articles/queries";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_ARTICLE_PARAMS } from "@/services/articles/default-params";
import { meQueryOptions } from "@/services/auth/queries";

export default function Header() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  function renderButton() {
    if (user) {
      return (
        <>
          <NavLink
            to="/me"
            className={({ isActive }) =>
              cn(
                "font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )
            }
            onMouseEnter={prefetchMe}
          >
            Me
          </NavLink>
          <LogoutButton />
        </>
      );
    }

    return (
      <Button size="sm" asChild>
        <NavLink to="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </NavLink>
      </Button>
    );
  }

  function prefetchArticles() {
    queryClient.prefetchInfiniteQuery(
      articleInfiniteQueryOptions({
        params: {
          pagination: { pageSize: DEFAULT_ARTICLE_PARAMS.PAGE_SIZE },
          filters: {
            title: undefined,
            category: undefined,
          },
        },
      }),
    );
  }

  function prefetchMe() {
    queryClient.prefetchQuery(meQueryOptions());
  }

  return (
    <header className="bg-background border-border sticky top-0 z-50 border-b shadow-sm">
      <div className="mx-auto flex max-w-[1024px] items-center justify-end px-5 py-3 sm:justify-between">
        <NavLink to="/" className="hidden items-center gap-2 sm:flex">
          <span className="text-primary text-2xl font-bold tracking-tight">
            TravelTalk
          </span>
        </NavLink>

        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              cn(
                "font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
              )
            }
            onMouseEnter={prefetchArticles}
          >
            Articles
          </NavLink>
          {renderButton()}
        </nav>
      </div>
    </header>
  );
}
