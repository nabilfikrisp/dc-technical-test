import type { ArticleSchema } from "@/schemas/article.schema";
import CommentForm from "../forms/comment.form";
import { Separator } from "../ui/separator";
import CommentItem from "./comment-item";

export default function CommentSection({
  comments,
  articleId,
  documentId,
}: {
  comments: ArticleSchema["comments"];
  articleId: number;
  documentId: string;
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
      </div>
      <CommentForm articleId={articleId} documentId={documentId} />
      <Separator />
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}
