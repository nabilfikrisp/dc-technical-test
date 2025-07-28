import ArticleForm from "@/components/forms/article/article.form";
import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/use-go-back";
import { ArrowLeftIcon } from "lucide-react";

export default function ArticleCreatePage() {
  const goBack = useGoBack("/articles");

  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 space-y-5 px-4 py-10">
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-foreground gap-2 px-0"
        onClick={goBack}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </Button>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">New Article</h1>
      </div>

      <ArticleForm />
    </div>
  );
}
