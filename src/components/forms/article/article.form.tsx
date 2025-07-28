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
import {
  usePostArticleMutation,
  usePutArticleMutation,
} from "@/services/articles/mutations";
import { parseApiError } from "@/lib/utils";
import useArticleFormStore from "@/stores/article-form.store";
import CategorySelectField from "./category-select.field";
import UploadFileField from "../upload-file";
import { useNavigate } from "react-router";
import { Loader2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const resetFormState: PostArticleSchema = {
  title: "",
  description: "",
  cover_image_url: "",
  categoryId: undefined,
};

// initial value for edit
type ArticleFormProps = {
  initialValues?: PostArticleSchema & {
    documentId: string;
  };
};

export default function ArticleForm({ initialValues }: ArticleFormProps) {
  const navigate = useNavigate();
  const { formState, isUploading, setIsUploading, updateField, setFormState } =
    useArticleFormStore();
  const { mutateAsync: postArticle, isPending: isPostPending } =
    usePostArticleMutation();
  const { mutateAsync: putArticle, isPending: isPutPending } =
    usePutArticleMutation();

  const isEditMode = Boolean(initialValues);

  const form = useForm<PostArticleSchema>({
    resolver: zodResolver(postArticleSchema),
    defaultValues: initialValues || formState,
  });

  const coverImageUrl = form.watch("cover_image_url");

  function handleReset() {
    setFormState(resetFormState);
    setIsUploading(false);
    if (isEditMode) {
      form.reset(initialValues);
    } else {
      form.reset(resetFormState);
    }
  }

  async function handleSubmit(values: PostArticleSchema) {
    try {
      const requestBody = {
        title: values.title,
        description: values.description,
        cover_image_url: values.cover_image_url,
        ...(values.categoryId && { category: Number(values.categoryId) }),
      };

      let response;
      if (isEditMode) {
        response = await putArticle({
          documentId: initialValues!.documentId,
          requestBody,
        });
      } else {
        response = await postArticle(requestBody);
      }

      toast.success("Article published successfully", {
        action: {
          label: "View",
          onClick: () => navigate(`/articles/${response.data.documentId}`),
        },
      });

      handleReset();
    } catch (error) {
      toast.error(
        parseApiError({ error, fallback: "Failed to create article" }),
      );
    }
  }

  useEffect(() => {
    if (!isEditMode) {
      const subscription = form.watch((values) => {
        setFormState(values as PostArticleSchema);
      });
      return () => subscription.unsubscribe();
    }
  }, [form, setFormState, isEditMode]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-5"
      >
        {/* Cover Image Upload */}
        <FormItem>
          <FormLabel className="text-base">Cover Image</FormLabel>
          <UploadFileField
            key={isEditMode ? undefined : coverImageUrl}
            initialValue={coverImageUrl}
            onUploadSuccess={(url) => {
              form.setValue("cover_image_url", url);
              if (!isEditMode) {
                updateField("cover_image_url", url);
              }
            }}
            onRemove={() => {
              form.setValue("cover_image_url", "");
              if (!isEditMode) {
                updateField("cover_image_url", "");
              }
            }}
            onUploading={() => setIsUploading(true)}
            onEnd={() => setIsUploading(false)}
          />
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
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isPostPending || isPutPending || isUploading}
            className="flex-1"
          >
            {isPostPending || isPutPending || isUploading ? (
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
