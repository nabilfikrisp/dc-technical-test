import { useParams } from "react-router";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  return <div>{id}</div>;
}
