import type { PostArticleRequestBody } from "@/schemas/article.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticle, postArticle, putArticle } from "./api";
import {
  articleDetailQueryOptions,
  articleInfiniteQueryOptions,
} from "./queries";
import {
  ARTICLE_CREATE_MUTATION_KEY,
  ARTICLE_DELETE_MUTATION_KEY,
} from "./keys";

export function usePostArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestBody: PostArticleRequestBody) =>
      postArticle(requestBody),
    mutationKey: [ARTICLE_CREATE_MUTATION_KEY],
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
    mutationKey: [ARTICLE_CREATE_MUTATION_KEY],
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

export function useDeleteArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) => deleteArticle(documentId),
    mutationKey: [ARTICLE_DELETE_MUTATION_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: articleInfiniteQueryOptions().queryKey,
      });
    },
  });
}
