import ArticleForm from "@/components/forms/article/article.form";
import { Button } from "@/components/ui/button";
import type { PostArticleSchema } from "@/schemas/article.schema";
import { articleDetailQueryOptions } from "@/services/articles/queries";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function ArticleEditPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: response,
    error,
    isLoading,
  } = useQuery(articleDetailQueryOptions(id!));
  const navigate = useNavigate();

  if (error) return <div>Error loading article</div>;
  if (isLoading || !response) return <div>Loading...</div>;

  const initialValues: PostArticleSchema = {
    title: response.data.title,
    description: response.data.description,
    cover_image_url: response.data.cover_image_url,
    categoryId: response.data.category?.id?.toString(),
  };

  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 space-y-5 px-4 py-10">
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-foreground gap-2 px-0"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </Button>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
      </div>

      <ArticleForm initialValues={initialValues} />
    </div>
  );
}
