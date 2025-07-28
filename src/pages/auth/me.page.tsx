import ArticleList from "@/components/articles/article-list";
import { ArticlesSkeleton } from "@/components/articles/articles-skeleton";
import CategoriesSection from "@/components/categories/categories-section";
import { CategoriesSkeleton } from "@/components/categories/categories-skeleton";
import ErrorUI from "@/components/error-ui";
import { Skeleton } from "@/components/ui/skeleton";
import { meQueryOptions } from "@/services/auth/queries";
import { useQuery } from "@tanstack/react-query";

export default function MePage() {
  const { data: response, error, isLoading } = useQuery(meQueryOptions());

  if (error) {
    return <ErrorUI error={error} />;
  }

  if (isLoading || !response) {
    return <LoadingState />;
  }

  const { articles, ...user } = response;
  const articlesWithUser = articles.map((article) => ({
    ...article,
    user: { ...user },
  }));

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-5 px-5 py-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">My Articles</h1>
            <ArticleList articles={articlesWithUser} />
          </div>
        </div>
        <div className="col-span-1 hidden md:block">
          <CategoriesSection />
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-5 px-5 py-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2">
          <div className="flex flex-col gap-5">
            <Skeleton>
              <h1 className="text-2xl font-bold text-transparent">
                My Articles
              </h1>
            </Skeleton>
            <ArticlesSkeleton />
          </div>
        </div>
        <div className="col-span-1 hidden md:block">
          <CategoriesSkeleton />
        </div>
      </div>
    </div>
  );
}
