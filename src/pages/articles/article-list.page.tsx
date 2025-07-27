import ArticleCard from "@/components/articles/article-card";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { articleQueryOptions } from "@/services/articles/queries";
import { useQuery } from "@tanstack/react-query";

export default function ArticleListPage() {
  const { data: response, error } = useQuery(
    articleQueryOptions({
      params: {
        pagination: { page: 1, pageSize: 3 },
        filters: {
          title: { $contains: "c" },
        },
      },
    }),
  );

  console.log(response);

  if (error) {
    return <ErrorUI error={error} />;
  }

  if (!response) {
    return <LoadingUI />;
  }

  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {response.data.length > 0 ? (
          response.data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div className="text-muted-foreground text-center">
            No articles found
          </div>
        )}
      </div>
    </div>
  );
}
