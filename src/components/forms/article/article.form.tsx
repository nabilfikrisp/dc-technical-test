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

export default function ArticleForm() {
  const navigate = useNavigate();

  // Store and mutations
  const { formState, resetFormState, isUploading } = useArticleFormStore();
  const { mutateAsync, isPending } = usePostArticleMutation();

  // Form setup
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
        ...(values.categoryId && {
          category: Number(values.categoryId),
        }),
      };

      const response = await mutateAsync(requestBody);

      toast.success("Article created successfully");
      resetFormState();
      form.reset();

      navigate(`/articles/${response.data.id}`);
    } catch (error) {
      toast.error(
        parseApiError({ error, fallback: "Failed to create article" }),
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Cover Image Upload */}
        <FormItem>
          <FormLabel>Cover Image</FormLabel>
          <UploadFileField />
        </FormItem>

        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter article title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter article description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Selection */}
        <CategorySelectField />

        <Button
          type="submit"
          disabled={isPending || isUploading}
          className="w-full"
        >
          {isPending ? "Creating..." : "Create Article"}
        </Button>
      </form>
    </Form>
  );
}
