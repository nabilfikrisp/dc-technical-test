import ArticleList from "@/components/articles/article-list";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { articleQueryOptions } from "@/services/articles/queries";
import { useQuery } from "@tanstack/react-query";

export default function ArticleListPage() {
  const { data: response, error } = useQuery(
    articleQueryOptions({
      params: {
        pagination: { page: 1, pageSize: 9 },
        filters: {
          title: { $contains: "c" },
        },
      },
    }),
  );

  if (error) {
    return <ErrorUI error={error} />;
  }

  if (!response) {
    return <LoadingUI />;
  }

  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <ArticleList articles={response.data} />
        </div>
        <div className="sticky col-span-1">category</div>
      </div>
    </div>
  );
}
