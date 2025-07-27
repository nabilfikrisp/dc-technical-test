import ArticleCard from "@/components/articles/article-card";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import useArticles from "@/hooks/api/use-articles";

export default function ArticleListPage() {
  const { data, status, error } = useArticles();

  if (status === "loading") {
    return <LoadingUI />;
  }

  if (error) return <ErrorUI error={error} />;

  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
