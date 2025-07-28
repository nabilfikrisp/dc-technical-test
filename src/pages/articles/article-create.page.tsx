import ArticleForm from "@/components/forms/article/article.form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function ArticleCreatePage() {
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold tracking-tight">New Article</h1>
      </div>

      <ArticleForm />
    </div>
  );
}
