import { DEFAULT_ARTICLE_PARAMS } from "@/services/articles/default-params";
import { articleInfiniteQueryOptions } from "@/services/articles/queries";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

export default function Footer() {
  const queryClient = useQueryClient();

  function prefecthArticles() {
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

  return (
    <footer className="bg-background border-border border-t py-6">
      <div className="mx-auto flex max-w-[1024px] flex-col items-center justify-between gap-2 px-5 md:flex-row">
        <span className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Micanskuy.
        </span>
        <nav className="flex gap-4 text-sm">
          <Link
            to="/"
            className="hover:text-primary text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/articles"
            className="hover:text-primary text-foreground transition-colors"
            onMouseEnter={prefecthArticles}
          >
            Articles
          </Link>
        </nav>
      </div>
    </footer>
  );
}
