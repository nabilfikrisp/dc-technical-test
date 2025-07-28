import ArticleForm from "@/components/forms/article/article.form";

export default function ArticleCreatePage() {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <h1>Create Article</h1>
      <ArticleForm />
    </div>
  );
}
