import ArticleList from "@/components/articles/article-list";
import FiltersDrawer from "@/components/articles/filters-drawer";
import ErrorUI from "@/components/error-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { articleInfiniteQueryOptions } from "@/services/articles/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import CategoriesSection from "@/components/categories/categories-section";

const DEFAULT_PAGE_SIZE = 3;

export default function ArticleListPage() {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="mb-5 flex gap-5">
        <SearchFilter />
        <FiltersDrawer className="block flex-1 rounded-xl md:hidden" />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2">
          <ArticlesSection />
        </div>
        <div className="col-span-1 hidden md:block">
          <CategoriesSection />
        </div>
      </div>
    </div>
  );
}

function SearchFilter() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    throttleMs: 500,
  });

  return (
    <div className="relative flex w-full max-w-[400px]">
      <SearchIcon className="absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2" />
      <Input
        className="border-border/50 bg-background/50 hover:border-border focus:border-primary focus:bg-background focus:shadow-primary/10 rounded-xl pr-10 pl-10 backdrop-blur-sm transition-all duration-200 focus:shadow-lg"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search articles..."
      />
      {search && (
        <Button
          onClick={() => setSearch("")}
          size="icon"
          variant="ghost"
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 hover:bg-transparent focus:bg-transparent"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

function ArticlesSection() {
  const [searchParams] = useQueryState("search");
  const [categoryParams] = useQueryState("category");
  const {
    data: articleResponse,
    error: articleError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    articleInfiniteQueryOptions({
      params: {
        pagination: { pageSize: DEFAULT_PAGE_SIZE },
        filters: {
          title: searchParams ? { $contains: searchParams } : undefined,
          category: categoryParams
            ? { name: { $eqi: categoryParams } }
            : undefined,
        },
      },
    }),
  );

  if (articleError) {
    return <ErrorUI error={articleError} />;
  }

  if (!articleResponse) {
    return <ArticlesSkeleton />;
  }

  const articles = articleResponse.pages.flatMap((page) => page.data);

  return (
    <section className="flex w-full flex-col items-center gap-5">
      <ArticleList articles={articles} />
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          className="w-full place-self-center"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more articles..."
            : "Load more articles"}
        </Button>
      )}
    </section>
  );
}

function ArticlesSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
        <Skeleton key={index} className="h-[500px] animate-pulse rounded-xl" />
      ))}
    </div>
  );
}
