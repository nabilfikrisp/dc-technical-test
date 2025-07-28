import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { parseApiError } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { useDeleteCommentMutation } from "@/services/comments/mutations";

export default function CommentDeleteDialog({
  documentId,
  onSuccess,
}: {
  documentId: string;
  onSuccess?: () => void;
}) {
  const { mutateAsync: deleteComment, isPending } = useDeleteCommentMutation();

  async function handleDelete() {
    try {
      await deleteComment(documentId);
      toast.success("Comment deleted successfully");
      onSuccess?.();
    } catch (error) {
      toast.error(
        parseApiError({
          error,
          fallback: "Failed to delete comment",
        }),
      );
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isPending} size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
