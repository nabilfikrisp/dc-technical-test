import {
  postArticleSchema,
  type PostArticleSchema,
} from "@/schemas/article.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { usePostArticleMutation } from "@/services/articles/mutations";
import { parseApiError } from "@/lib/utils";
import useArticleFormStore from "@/stores/article-form.store";
import CategorySelectField from "./category-select.field";
import UploadFileField from "./upload-file.field";
import { useNavigate } from "react-router";
import { Loader2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function ArticleForm() {
  const navigate = useNavigate();
  const { formState, resetFormState, isUploading } = useArticleFormStore();
  const { mutateAsync, isPending } = usePostArticleMutation();

  const form = useForm<PostArticleSchema>({
    resolver: zodResolver(postArticleSchema),
    defaultValues: formState,
  });

  async function handleSubmit(values: PostArticleSchema) {
    try {
      const requestBody = {
        title: values.title,
        description: values.description,
        cover_image_url: values.cover_image_url,
        ...(values.categoryId && { category: Number(values.categoryId) }),
      };

      const response = await mutateAsync(requestBody);

      toast.success("Article published successfully", {
        action: {
          label: "View",
          onClick: () => navigate(`/articles/${response.data.documentId}`),
        },
      });

      resetFormState();
      form.reset();
    } catch (error) {
      toast.error(
        parseApiError({ error, fallback: "Failed to create article" }),
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-5"
      >
        {/* Cover Image Upload */}
        <FormItem>
          <FormLabel className="text-base">Cover Image</FormLabel>
          <UploadFileField />
        </FormItem>

        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter article title"
                  className="h-12 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter article description"
                  className="min-h-[120px] text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Selection */}
        <CategorySelectField />

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => {
              resetFormState();
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isPending || isUploading}
            className="flex-1"
          >
            {isPending || isUploading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                {isUploading ? "Uploading..." : "Publishing..."}
              </>
            ) : (
              "Publish Article"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
