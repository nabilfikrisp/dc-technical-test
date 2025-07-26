import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ArticleSchema } from "@/schemas/article.schema";
import { MessageCircleIcon, ShareIcon } from "lucide-react";

type ArticleCardProps = {
  article: ArticleSchema;
};
export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="w-full py-0">
      <CardHeader className="bg-muted relative aspect-video overflow-hidden border-y p-0">
        <img
          src={article.cover_image_url}
          alt={article.title}
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 pt-3 pb-4">
          <h2 className="line-clamp-2 font-semibold">{article.title}</h2>
          {article.category && (
            <span className="text-muted-foreground text-xs">
              {article.category.name}
            </span>
          )}
          <p className="text-muted-foreground mt-1 line-clamp-3 text-sm">
            {article.description}
          </p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between px-2">
        <Button variant="ghost" className="text-muted-foreground">
          <MessageCircleIcon />
          <span>{article.comments.length}</span>
          <span className="hidden sm:inline">Comments</span>
        </Button>
        <Button variant="ghost" className="text-muted-foreground">
          <span className="hidden sm:inline">Share</span> <ShareIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}
