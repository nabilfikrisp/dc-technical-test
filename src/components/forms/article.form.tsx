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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { usePostArticleMutation } from "@/services/articles/mutations";
import { parseApiError } from "@/lib/utils";
import CategorySelectField from "./article-form-category-select-field";

export default function ArticleForm() {
  const { mutateAsync: postArticle, isPending } = usePostArticleMutation();
  const form = useForm<PostArticleSchema>({
    resolver: zodResolver(postArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      cover_image_url: "",
    },
  });

  async function onSubmit(values: PostArticleSchema) {
    const { categoryId, ...rest } = values;
    const requestBody = {
      ...rest,
      ...(categoryId ? { category: { id: Number(categoryId) } } : {}),
    };
    await postArticle(requestBody, {
      onSuccess: () => {
        toast.success("Article created successfully");
        form.reset();
      },
      onError: (error: unknown) => {
        const errorMessage = parseApiError({
          error,
          fallback: "Failed to create article",
        });
        toast.error(errorMessage);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Article description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cover_image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CategorySelectField />

        <Button type="submit" disabled={isPending}>
          Create Article
        </Button>
      </form>
    </Form>
  );
}
