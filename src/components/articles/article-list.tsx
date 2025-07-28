import type { ArticleSchema } from "@/schemas/article.schema";
import ArticleCard from "./article-card";

export default function ArticleList({
  articles,
}: {
  articles: ArticleSchema[];
}) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-muted-foreground text-center">No articles found</div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
