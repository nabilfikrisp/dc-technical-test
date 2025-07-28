import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CATEGORY_CREATE_MUTATION_KEY,
  CATEGORY_DELETE_MUTATION_KEY,
} from "./keys";
import { fetchDeleteCategory, fetchPostCategory } from "./api";
import { categoryQueryOptions } from "./queries";

export function usePostCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [CATEGORY_CREATE_MUTATION_KEY],
    mutationFn: (newCategory: string) => fetchPostCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryQueryOptions().queryKey,
      });
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [CATEGORY_DELETE_MUTATION_KEY],
    mutationFn: (categoryId: string) => fetchDeleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryQueryOptions().queryKey,
      });
    },
  });
}
