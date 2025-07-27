import { queryOptions } from "@tanstack/react-query";
import { ARTICLE_LIST_QUERY_KEY } from "./keys";
import { fetchArticles, type FetchArticlesParams } from "./api";

type ArticleQueryOptions = {
  params?: FetchArticlesParams;
};
export function articleQueryOptions({ params }: ArticleQueryOptions = {}) {
  return queryOptions({
    queryKey: [ARTICLE_LIST_QUERY_KEY, params ?? {}],
    queryFn: () => fetchArticles(params),
  });
}
