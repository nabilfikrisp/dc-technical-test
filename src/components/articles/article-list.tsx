import type { ArticleSchema } from "@/schemas/article.schema";
import ArticleCard from "./article-card";
import { FileTextIcon } from "lucide-react";

export default function ArticleList({
  articles,
}: {
  articles: ArticleSchema[];
}) {
  if (!articles || articles.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex w-full flex-col gap-5">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="bg-muted/50 rounded-full p-4">
        <FileTextIcon className="text-muted-foreground h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">No articles found</h3>
        <p className="text-muted-foreground max-w-md text-sm">
          There are no articles to display right now. Check back later or create
          a new article.
        </p>
      </div>
    </div>
  );
}
