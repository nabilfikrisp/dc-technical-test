import useArticles from "@/hooks/api/use-articles";

export default function ArticleListPage() {
  const { data, status, error } = useArticles();

  if (status === "pending") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      article list
      {data.map((article) => (
        <div key={article.id}>{article.documentId}</div>
      ))}
    </div>
  );
}
