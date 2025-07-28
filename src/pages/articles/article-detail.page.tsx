import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { articleDetailQueryOptions } from "@/services/articles/queries";
import ErrorUI from "@/components/error-ui";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import ImageWithBackdrop from "@/components/image-with-backdrop";
import { type ArticleSchema } from "@/schemas/article.schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import ArticleDetailSkeleton from "@/components/articles/article-detail-skeleton";
import CommentSection from "@/components/comments/comment-section";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery(articleDetailQueryOptions(id!));

  if (error) return <ErrorUI error={error} />;
  if (isLoading || !data) return <ArticleDetailSkeleton />;

  return <ArticleDetail article={data.data} />;
}

function ArticleDetail({ article }: { article: ArticleSchema }) {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="flex flex-col gap-5">
        <ArticleHeader
          title={article.title}
          publishedAt={article.publishedAt}
          category={article.category}
        />

        {article.user && <UserInfo name={article.user.username} />}

        {article.cover_image_url && (
          <ArticleCoverImage
            src={article.cover_image_url}
            alt={article.title}
          />
        )}

        <ArticleContent content={article.description} />

        {article.comments && (
          <CommentSection
            comments={article.comments}
            documentId={article.documentId}
            articleId={article.id}
          />
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
  publishedAt: string;
  category?: ArticleSchema["category"];
}) {
  return (
    <header className="space-y-4">
      <BackButton />
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        {category && (
          <>
            <span>•</span>
            <Button
              asChild
              variant="link"
              className="text-muted-foreground hover:text-primary h-auto p-0 text-sm font-normal"
            >
              <Link to={`/articles?category=${category.name}`}>
                #{category.name}
              </Link>
            </Button>
          </>
        )}
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
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
      className="group text-muted-foreground hover:text-foreground -ml-3 gap-1.5"
    >
      <Link to="/articles">
        <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Articles
      </Link>
    </Button>
  );
}

function UserInfo({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{name}</p>
      </div>
    </div>
  );
}

function ArticleCoverImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl shadow-lg">
      <ImageWithBackdrop alt={alt} src={src} className="w-full object-cover" />
    </div>
  );
}

function ArticleContent({ content }: { content: string }) {
  return (
    <article className="prose prose-sm dark:prose-invert sm:prose-base lg:prose-lg max-w-none">
      <div className="space-y-6">
        {content.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
