import type { PostArticleRequestBody } from "@/schemas/article.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postArticle } from "./api";
import { articleInfiniteQueryOptions } from "./queries";

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
