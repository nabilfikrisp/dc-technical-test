import ArticleList from "@/components/articles/article-list";
import { ArticlesSkeleton } from "@/components/articles/articles-skeleton";
import CategoriesSection from "@/components/categories/categories-section";
import { CategoriesSkeleton } from "@/components/categories/categories-skeleton";
import ErrorUI from "@/components/error-ui";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ArticleSchema } from "@/schemas/article.schema";
import { meQueryOptions } from "@/services/auth/queries";
import { useQuery } from "@tanstack/react-query";
import { ExternalLinkIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CommentWithArticleSchema } from "@/schemas/user.schema";
import { useQueryState } from "nuqs";

function filterValidArticles(data: ArticleSchema[]): ArticleSchema[] {
  // no null published articles
  const onlyPublished = data.filter((article) => article.publishedAt !== null);

  // no null published comments
  const cleaned = onlyPublished.map((article) => {
    const commentsArray = article.comments ?? [];
    const validComments = commentsArray.filter(
      (c) => c !== null && c.publishedAt !== null,
    );
    return { ...article, comments: validComments };
  });

  return cleaned;
}

function filterMyComments(
  data: CommentWithArticleSchema[],
): CommentWithArticleSchema[] {
  return data.filter((comment) => comment.publishedAt !== null);
}

export default function MePage() {
  const [tabsValue, setTabsValue] = useQueryState("tabs");
  const { data: response, error, isLoading } = useQuery(meQueryOptions());

  if (error) {
    return <ErrorUI error={error} />;
  }

  if (isLoading || !response) {
    return <LoadingState />;
  }

  const { articles, comments, ...user } = response;

  const validArticles = filterValidArticles(articles);
  const validComments = filterMyComments(comments);

  const articlesWithUser = validArticles.map((article) => ({
    ...article,
    user,
  }));

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-1 flex-col gap-5 px-5 py-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2">
          <Tabs
            defaultValue={tabsValue ?? "my-articles"}
            onValueChange={setTabsValue}
          >
            <TabsList>
              <TabsTrigger value="my-articles">My Articles</TabsTrigger>
              <TabsTrigger value="my-comments">My Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="my-articles">
              <MyArticles articles={articlesWithUser} />
            </TabsContent>
            <TabsContent value="my-comments">
              <MyComments comments={validComments} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="col-span-1 hidden md:block">
          <CategoriesSection />
        </div>
      </div>
    </div>
  );
}

function MyArticles({ articles }: { articles: ArticleSchema[] }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">My Articles</h1>
        <Button asChild size="sm" className="ml-auto">
          <Link to="/articles/create" className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            New Article
          </Link>
        </Button>
      </div>

      <ArticleList articles={articles} />
    </div>
  );
}

function MyComments({ comments }: { comments: CommentWithArticleSchema[] }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My Comments ({comments.length})</h1>

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-2 rounded-lg border p-4">
              <p className="text-sm">{comment.content}</p>

              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>
                  on:
                  {comment.article ? comment.article.title : "deleted article"}
                </span>
                {comment.article && (
                  <Link
                    to={`/articles/${comment.article.documentId}`}
                    className="flex items-center gap-1 text-blue-500 hover:underline"
                  >
                    View Article
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-8 text-center">
          No comments found.
        </p>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-5 px-5 py-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2">
          <div className="flex flex-col gap-5">
            <Skeleton>
              <h1 className="text-2xl font-bold text-transparent">
                My Articles
              </h1>
            </Skeleton>
            <ArticlesSkeleton />
          </div>
        </div>
        <div className="col-span-1 hidden md:block">
          <CategoriesSkeleton />
        </div>
      </div>
    </div>
  );
}
