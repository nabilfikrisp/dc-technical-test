import ArticleList from "@/components/articles/article-list";
import CategoryList from "@/components/articles/category-list";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { articleQueryOptions } from "@/services/articles/queries";
import { categoryQueryOptions } from "@/services/categories/queries";
import { useQuery } from "@tanstack/react-query";

export default function ArticleListPage() {
  const { data: articleResponse, error: articleError } = useQuery(
    articleQueryOptions({
      params: {
        pagination: { page: 1, pageSize: 9 },
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

  console.log(categoryResponse);

  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2">
          <ArticleList articles={articleResponse.data} />
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
