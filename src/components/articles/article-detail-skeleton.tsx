import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "@radix-ui/react-separator";

export default function ArticleDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <Skeleton className="aspect-video w-full rounded-xl" />

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn("h-4 w-full", i % 3 === 0 ? "w-11/12" : "w-full")}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
          </div>
          <Separator />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
