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
import { useDeleteCategoryMutation } from "@/services/categories/mutations";
import { Trash2Icon } from "lucide-react";

export default function CategoryDeleteDialog({
  documentId,
  onSuccess,
}: {
  documentId: string;
  onSuccess?: () => void;
}) {
  const { mutateAsync: deleteCategory, isPending } =
    useDeleteCategoryMutation();

  async function handleDelete() {
    try {
      await deleteCategory(documentId);
      toast.success("Category deleted successfully");
      onSuccess?.();
    } catch (error) {
      toast.error(
        parseApiError({
          error,
          fallback: "Failed to delete category",
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
