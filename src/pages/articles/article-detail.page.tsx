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
import useAuthStore from "@/stores/auth.store";
import ArticleDeleteDialog from "@/components/articles/article-delete-dialog";
import { useState } from "react";
import { useGoBack } from "@/hooks/use-go-back";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery(articleDetailQueryOptions(id!));

  if (error) return <ErrorUI error={error} />;
  if (isLoading || !data) return <ArticleDetailSkeleton />;

  return <ArticleDetail article={data.data} />;
}

function ArticleDetail({ article }: { article: ArticleSchema }) {
  const { user } = useAuthStore();
  const [imageError, setImageError] = useState(false);

  const showImage = article.cover_image_url && !imageError;
  const isAuthor = user!.id === article.user!.id;

  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="flex flex-col gap-5">
        <ArticleHeader
          title={article.title}
          publishedAt={article.publishedAt}
          category={article.category}
        />

        {article.user && (
          <UserInfo name={article.user.username} isAuthor={isAuthor} />
        )}

        {isAuthor && <AuthorActions documentId={article.documentId} />}

        {showImage && (
          <div className="overflow-hidden rounded-xl shadow-lg">
            <ImageWithBackdrop
              alt="Article cover image"
              src={article.cover_image_url}
              className="w-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
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
  const goBack = useGoBack("/articles");
  return (
    <Button
      variant="ghost"
      className="group text-muted-foreground hover:text-foreground -ml-3 gap-1.5"
      onClick={goBack}
    >
      <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back
    </Button>
  );
}

function UserInfo({ name, isAuthor }: { name: string; isAuthor: boolean }) {
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
      <div className="flex items-center gap-2">
        <p className="font-medium">{name}</p>
        {isAuthor && (
          <span className="text-muted-foreground text-sm">(you)</span>
        )}
      </div>
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

function AuthorActions({ documentId }: { documentId: string }) {
  const goBack = useGoBack("/articles");

  return (
    <div className="flex gap-2">
      <Button asChild variant="outline">
        <Link to={`/articles/${documentId}/edit`}>Edit</Link>
      </Button>
      <ArticleDeleteDialog documentId={documentId} onSuccess={goBack} />
    </div>
  );
}
