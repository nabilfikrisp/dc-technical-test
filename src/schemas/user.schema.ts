import { z } from "zod";

import { articleSchema } from "./article.schema";
import { commentSchema } from "./comment.schema";

export const userSchema = z.object({
  id: z.string(),
  documentId: z.string(),
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Invalid email address"),
  provider: z.string(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.nullable(z.string()),
});

export const commentWithArticleSchema = z.lazy(() =>
  commentSchema.extend({
    article: articleSchema.omit({ user: true, comments: true }).nullable(),
  }),
);

export const meSchema = userSchema.extend({
  articles: z.array(z.lazy(() => articleSchema.omit({ user: true }))),
  comments: z.array(commentWithArticleSchema),
});
export type MeSchema = z.infer<typeof meSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type CommentWithArticleSchema = z.infer<typeof commentWithArticleSchema>;
