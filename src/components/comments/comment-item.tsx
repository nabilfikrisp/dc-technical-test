import type { ArticleSchema } from "@/schemas/article.schema";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { formatDate } from "@/lib/utils";

export default function CommentItem({
  comment,
}: {
  comment: ArticleSchema["comments"][number];
}) {
  return (
    <div className="group flex gap-4">
      <Avatar className="h-10 w-10">
        <AvatarFallback>
          {comment.user?.username?.charAt(0).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{comment.user?.username || "Anonymous"}</p>
          <span className="text-muted-foreground text-xs">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p className="mt-1 text-sm">{comment.content}</p>
      </div>
    </div>
  );
}
