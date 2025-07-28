import {
  createCategorySchema,
  type CreateCategorySchema,
} from "@/schemas/category.schema";
import { usePostCategoryMutation } from "@/services/categories/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { parseApiError } from "@/lib/utils";

type CategoryFormProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};
export default function CategoryForm({
  onSuccess,
  onError,
}: CategoryFormProps) {
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
  });

  const { mutateAsync, isPending } = usePostCategoryMutation();

  async function onSubmit(data: CreateCategorySchema) {
    try {
      await mutateAsync(data.name);
      onSuccess?.();
      toast.success("Category created successfully");
      form.reset();
    } catch (error: unknown) {
      onError?.(error);
      toast.error(
        parseApiError({
          error,
          fallback: "Failed to create category",
        }),
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="New Category...." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
}
