import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { usePostCommentMutation } from "@/services/comments/mutations";
import { toast } from "sonner";
import { parseApiError } from "@/lib/utils";
import {
  postCommentSchema,
  type PostCommentSchema,
} from "@/schemas/comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type CommentFormProps = {
  articleId: number;
  documentId: string;
};

export default function CommentForm({
  articleId,
  documentId,
}: CommentFormProps) {
  const form = useForm<PostCommentSchema>({
    resolver: zodResolver(postCommentSchema),
    defaultValues: { content: "", articleId: articleId },
  });
  const { mutateAsync, isPending } = usePostCommentMutation({
    documentId: documentId,
  });

  async function onSubmit(values: PostCommentSchema) {
    await mutateAsync(
      { articleId, content: values.content },
      {
        onSuccess: () => {
          toast.success("Comment posted successfully");
          form.reset();
        },
        onError: (error: unknown) => {
          const errorMessage = parseApiError({
            error,
            fallback: "Failed to post comment",
          });
          toast.error(errorMessage);
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="content"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a comment..."
                  rows={3}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="self-end">
          Post
        </Button>
      </form>
    </Form>
  );
}
