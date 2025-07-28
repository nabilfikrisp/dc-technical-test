import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { ARTICLE_DETAIL_QUERY_KEY, ARTICLE_LIST_QUERY_KEY } from "./keys";
import {
  fetchArticleDetail,
  fetchArticles,
  type FetchArticlesParams,
} from "./api";

type ArticleQueryOptions = {
  params?: FetchArticlesParams;
};
export function articleQueryOptions({ params }: ArticleQueryOptions = {}) {
  return queryOptions({
    queryKey: [ARTICLE_LIST_QUERY_KEY, params ?? {}],
    queryFn: () => fetchArticles(params),
    select: (data) => {
      const sortedData = data.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      return {
        data: sortedData,
        meta: data.meta,
      };
    },
  });
}

export function articleInfiniteQueryOptions({
  params,
}: ArticleQueryOptions = {}) {
  return infiniteQueryOptions({
    queryKey: [ARTICLE_LIST_QUERY_KEY, params ?? {}],
    queryFn: ({ pageParam }) =>
      fetchArticles({
        ...params,
        pagination: {
          pageSize: params?.pagination?.pageSize,
          page: pageParam,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.pagination.page + 1;
      const hasNextPage = nextPage <= lastPage.meta.pagination.pageCount;
      return hasNextPage ? nextPage : undefined;
    },
  });
}

export function articleDetailQueryOptions(documentId: string) {
  return queryOptions({
    queryKey: [ARTICLE_DETAIL_QUERY_KEY, documentId],
    queryFn: () => fetchArticleDetail(documentId),
  });
}
