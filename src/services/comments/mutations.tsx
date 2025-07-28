import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_COMMENT_MUTATION_KEY, POST_COMMENT_MUTATION_KEY } from "./keys";
import { fetchDeleteComment, postComment } from "./api";
import { articleDetailQueryOptions } from "../articles/queries";
import { meQueryOptions } from "../auth/queries";

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

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [DELETE_COMMENT_MUTATION_KEY],
    mutationFn: (documentId: string) => fetchDeleteComment(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meQueryOptions().queryKey,
      });
    },
  });
}
