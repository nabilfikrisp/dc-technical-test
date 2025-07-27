import { queryOptions } from "@tanstack/react-query";
import { CATEGORY_LIST_QUERY_KEY } from "./keys";
import { fetchCategories } from "./api";

export function categoryQueryOptions() {
  return queryOptions({
    queryKey: [CATEGORY_LIST_QUERY_KEY],
    queryFn: () => fetchCategories(),
  });
}
