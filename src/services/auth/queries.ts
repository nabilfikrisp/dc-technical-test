import { queryOptions } from "@tanstack/react-query";
import { fetchMe } from "./api";
import { ME_QUERY_KEY } from "./keys";

export function meQueryOptions() {
  return queryOptions({
    queryKey: [ME_QUERY_KEY],
    queryFn: () => fetchMe(),
  });
}
