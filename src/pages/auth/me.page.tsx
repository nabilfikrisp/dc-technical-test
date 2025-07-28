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
import {
  ExternalLinkIcon,
  MessageSquareIcon,
  NewspaperIcon,
  PlusIcon,
} from "lucide-react";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CommentWithArticleSchema } from "@/schemas/user.schema";
import { useQueryState } from "nuqs";
import CommentDeleteDialog from "@/components/comments/comment-delete-dialog";
import { formatDistanceToNow } from "date-fns";

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
    <div className="flex flex-col gap-5 py-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-xl p-3">
            <NewspaperIcon className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Articles</h1>
            <p className="text-muted-foreground text-sm">
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </p>
          </div>
        </div>
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
    <div className="space-y-6 py-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-xl p-3">
          <MessageSquareIcon className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Comments</h1>
          <p className="text-muted-foreground text-sm">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </p>
        </div>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="group bg-card hover:border-primary/30 relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/5 flex h-8 w-8 items-center justify-center rounded-xl">
                  <MessageSquareIcon className="text-primary h-4 w-4" />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-foreground text-sm leading-snug">
                    {comment.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-muted-foreground bg-muted/50 inline-flex items-center rounded-full py-1 text-xs">
                      {comment.article ? (
                        <>
                          <span className="line-clamp-1 max-w-[160px]">
                            {comment.article.title}
                          </span>
                          {comment.article && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-1 h-5 w-5 text-blue-500 hover:bg-blue-500/10"
                              asChild
                            >
                              <Link
                                to={`/articles/${comment.article.documentId}`}
                              >
                                <ExternalLinkIcon className="h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                        </>
                      ) : (
                        "Deleted article"
                      )}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                <CommentDeleteDialog
                  documentId={comment.documentId}
                  className="mt-auto"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border-2 border-dashed p-8 text-center">
          <MessageSquareIcon className="text-muted-foreground h-10 w-10" />
          <h3 className="text-lg font-medium">No comments yet</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            Your comments will appear here once you start engaging with
            articles.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/articles">Browse articles</Link>
          </Button>
        </div>
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
