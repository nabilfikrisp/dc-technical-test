import ArticleList from "@/components/articles/article-list";
import CategoryList from "@/components/articles/category-list";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { Button } from "@/components/ui/button";
import { articleInfiniteQueryOptions } from "@/services/articles/queries";
import { categoryQueryOptions } from "@/services/categories/queries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const DEFAULT_PAGE_SIZE = 3;

export default function ArticleListPage() {
  // const { data: articleResponse, error: articleError } = useQuery(
  //   articleQueryOptions({
  //     params: {
  //       pagination: { page: page, pageSize: DEFAULT_PAGE_SIZE },
  //       filters: {
  //         title: { $contains: "c" },
  //       },
  //     },
  //   }),
  // );

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
        // filters: {
        //   title: { $contains: "c" },
        // },
      },
    }),
  );

  const { data: categoryResponse, error: categoryError } = useQuery(
    categoryQueryOptions(),
  );

  if (articleError || categoryError) {
    return <ErrorUI error={articleError || categoryError} />;
  }

  if (!articleResponse || !categoryResponse) {
    return <LoadingUI />;
  }

  const articles = articleResponse.pages.flatMap((page) => page.data);

  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 flex flex-col items-center gap-5 md:col-span-2">
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
        </div>
        <div className="col-span-3 md:col-span-1">
          <div className="sticky top-[80px] max-h-[calc(100vh-2rem)] overflow-y-auto">
            <CategoryList categories={categoryResponse.data} />
          </div>
        </div>
      </div>
    </div>
  );
}
