import { DEFAULT_ARTICLE_PARAMS } from "@/services/articles/default-params";
import { Skeleton } from "../ui/skeleton";

export function ArticlesSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: DEFAULT_ARTICLE_PARAMS.PAGE_SIZE }).map(
        (_, index) => (
          <Skeleton
            key={index}
            className="h-[500px] animate-pulse rounded-xl"
          />
        ),
      )}
    </div>
  );
}
