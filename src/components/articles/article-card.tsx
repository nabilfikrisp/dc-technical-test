import type { ArticleSchema } from "@/schemas/article.schema";
import { useState } from "react";
import ImageWithBackdrop from "../image-with-backdrop";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import {
  ClockIcon,
  UserIcon,
  ArrowUpRightIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import CategoryCard from "../categories/category-card";

type ArticleCardProps = {
  article: ArticleSchema;
  className?: string;
};

export default function ArticleCard({
  article,
  className = "",
}: ArticleCardProps) {
  const [imageError, setImageError] = useState(false);

  const authorName = article.user?.username || "Unknown Author";
  const relativeTime = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: false,
    locale: id,
  });

  const hasImage = article.cover_image_url && !imageError;
  const commentsCount = article.comments.length;
  const categoryName = article.category?.name;

  return (
    <article
      className={cn(
        `group border-border/50 bg-card/50 hover:border-border hover:bg-card relative flex flex-col overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5`,
        className,
      )}
    >
      {/* Image Section */}
      {hasImage && (
        <div className="relative">
          <ImageWithBackdrop
            src={article.cover_image_url}
            alt={article.title}
            onError={() => setImageError(true)}
            className="transition-transform duration-300 group-hover:scale-105"
          />

          {/* Category badge on image */}
          {categoryName && (
            <div className="absolute top-3 left-3 z-10">
              <CategoryCard categoryName={categoryName} />
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Header with author and time */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="text-muted-foreground/80 group-hover:text-muted-foreground flex items-center gap-1.5 transition-colors">
            <div className="bg-muted/50 flex h-6 w-6 items-center justify-center rounded-full">
              <UserIcon className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium">{authorName}</span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <div className="text-muted-foreground/60 flex items-center gap-1.5">
            <div className="bg-muted/50 flex h-6 w-6 items-center justify-center rounded-full">
              <ClockIcon className="h-3.5 w-3.5" />
            </div>
            <span>{relativeTime}</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-1 flex-col gap-3">
          <h2 className="text-foreground group-hover:text-primary line-clamp-2 text-lg leading-tight font-bold tracking-tight transition-colors">
            {article.title}
          </h2>

          {article.description && (
            <p className="text-muted-foreground group-hover:text-muted-foreground/90 line-clamp-3 text-sm leading-relaxed transition-colors">
              {article.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          {/* Comments count */}
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <div className="bg-muted/50 flex h-5 w-5 items-center justify-center rounded-full">
              <MessageCircleIcon className="h-3 w-3" />
            </div>

            {commentsCount === 0 ? (
              <span>No comments</span>
            ) : (
              <div className="flex items-center gap-2">
                <span>{commentsCount}</span>
                <span>comment{commentsCount === 1 ? "" : "s"} </span>
              </div>
            )}
          </div>

          {/* Read more link */}
          <Link
            to={`/articles/${article.documentId}`}
            className="text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Read more
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="from-primary to-primary/60 h-0.5 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full" />
    </article>
  );
}
