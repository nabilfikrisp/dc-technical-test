import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST_COMMENT_MUTATION_KEY } from "./keys";
import { postComment } from "./api";
import { articleDetailQueryOptions } from "../articles/queries";

export function usePostCommentMutation({ documentId }: { documentId: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [POST_COMMENT_MUTATION_KEY],
    mutationFn: (body: { articleId: number; content: string }) =>
      postComment({ data: body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: articleDetailQueryOptions(documentId).queryKey,
      });
    },
  });
}
