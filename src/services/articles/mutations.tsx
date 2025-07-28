import type { PostArticleRequestBody } from "@/schemas/article.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postArticle, putArticle } from "./api";
import {
  articleDetailQueryOptions,
  articleInfiniteQueryOptions,
} from "./queries";

export function usePostArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestBody: PostArticleRequestBody) =>
      postArticle(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: articleInfiniteQueryOptions().queryKey,
      });
    },
  });
}

type PutArticleParams = {
  documentId: string;
  requestBody: PostArticleRequestBody;
};
export function usePutArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PutArticleParams) => putArticle(params),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [articleInfiniteQueryOptions().queryKey],
      });
      queryClient.invalidateQueries({
        queryKey: articleDetailQueryOptions(response.data.documentId).queryKey,
      });
    },
  });
}
