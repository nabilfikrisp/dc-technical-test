import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { articleDetailQueryOptions } from "@/services/articles/queries";
import ErrorUI from "@/components/error-ui";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import ImageWithBackdrop from "@/components/image-with-backdrop";
import { type ArticleSchema } from "@/schemas/article.schema";

type ArticleDetailProps = {
  article: ArticleSchema;
};

type CommentListProps = {
  comments: ArticleSchema["comments"];
};

type ArticleMetaProps = {
  publishedAt: string;
  category?: ArticleSchema["category"];
};

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useQuery(articleDetailQueryOptions(id));

  if (error) return <ErrorUI error={error} />;
  if (isLoading || !data) return <ArticleDetailSkeleton />;

  return <ArticleDetail article={data.data} />;
}

function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="flex flex-col gap-5">
        <ArticleHeader
          title={article.title}
          publishedAt={article.publishedAt}
          category={article.category}
        />

        {article.cover_image_url && (
          <ArticleCoverImage
            src={article.cover_image_url}
            alt={article.title}
          />
        )}

        <ArticleContent content={article.description} />

        {article.comments.length > 0 && (
          <CommentList comments={article.comments} />
        )}
      </div>
    </div>
  );
}

function ArticleHeader({
  title,
  publishedAt,
  category,
}: {
  title: string;
} & ArticleMetaProps) {
  return (
    <header>
      <BackButton />
      <ArticleMeta publishedAt={publishedAt} category={category} />
      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
    </header>
  );
}

function BackButton() {
  return (
    <Button
      asChild
      variant="ghost"
      className="text-muted-foreground hover:text-foreground mb-6 gap-1.5"
    >
      <Link to="/articles">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Articles
      </Link>
    </Button>
  );
}

function ArticleMeta({ publishedAt, category }: ArticleMetaProps) {
  return (
    <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
      <span>
        {new Date(publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      {category && (
        <>
          <span>•</span>
          <Button
            asChild
            variant="link"
            className={cn(
              "text-muted-foreground hover:text-primary h-auto p-0 text-sm font-normal",
            )}
          >
            <Link to={`/articles?category=${category.name}`}>
              #{category.name}
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}

function ArticleCoverImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl">
      <ImageWithBackdrop alt={alt} src={src} />
    </div>
  );
}

function ArticleContent({ content }: { content: string }) {
  return (
    <article className="prose prose-sm dark:prose-invert sm:prose-base max-w-none">
      {content}
    </article>
  );
}

function CommentList({ comments }: CommentListProps) {
  return (
    <section>
      <h2 className="mb-6 text-xl font-semibold">Comments</h2>
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}

function CommentItem({
  comment,
}: {
  comment: ArticleSchema["comments"][number];
}) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-medium">{comment.user?.username}</p>
          <p className="text-muted-foreground text-xs">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm">{comment.content}</p>
    </div>
  );
}

function ArticleDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <ArticleHeaderSkeleton />
      <ArticleCoverImageSkeleton />
      <ArticleContentSkeleton />
      <CommentListSkeleton />
    </div>
  );
}

function ArticleHeaderSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="mb-6 h-9 w-32" />
      <Skeleton className="mb-4 h-4 w-48" />
      <Skeleton className="mb-4 h-10 w-full" />
    </div>
  );
}

function ArticleCoverImageSkeleton() {
  return <Skeleton className="mb-8 aspect-video w-full rounded-xl" />;
}

function ArticleContentSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4 w-full", i % 3 === 0 ? "w-11/12" : "w-full")}
        />
      ))}
    </div>
  );
}

function CommentListSkeleton() {
  return (
    <div className="mt-12">
      <Skeleton className="mb-6 h-6 w-32" />
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>
        ))}
      </div>
    </div>
  );
}
