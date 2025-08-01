import { articleInfiniteQueryOptions } from "@/services/articles/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import ErrorUI from "../error-ui";
import { ArticlesSkeleton } from "./articles-skeleton";
import ArticleList from "./article-list";
import { Button } from "../ui/button";
import { DEFAULT_ARTICLE_PARAMS } from "@/services/articles/default-params";

export function ArticlesSection() {
  const [searchParams] = useQueryState("search");
  const [categoryParams] = useQueryState("category");
  const [sortByParams] = useQueryState("sortBy");
  const [sortOrderParams] = useQueryState("sortOrder");

  const paramsBuilder = {
    pagination: { pageSize: DEFAULT_ARTICLE_PARAMS.PAGE_SIZE },
    filters: {
      title: searchParams ? { $containsi: searchParams } : undefined,
      category: categoryParams ? { name: { $eqi: categoryParams } } : undefined,
    },
    sort: sortByParams
      ? `${sortByParams}:${sortOrderParams || "desc"}`
      : undefined,
  };

  const {
    data: articleResponse,
    error: articleError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    articleInfiniteQueryOptions({
      params: paramsBuilder,
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
