import { z } from "zod";
import { categorySchema } from "./category.schema";
import { commentSchema } from "./comment.schema";
import { userSchema } from "./user.schema";

export const articleSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
  cover_image_url: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string().nullable(),
  category: categorySchema.optional(),
  user: userSchema.optional(),
  comments: z.array(commentSchema),
  localizations: z.array(z.unknown()),
});

export const postArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  cover_image_url: z.string().optional(),
  categoryId: z.string().optional(),
});

export const postArticleRequestBody = postArticleSchema
  .omit({
    categoryId: true,
  })
  .extend({
    category: z.number().nullable().optional(),
  });

export type ArticleSchema = z.infer<typeof articleSchema>;
export type PostArticleSchema = z.infer<typeof postArticleSchema>;
export type PostArticleRequestBody = z.infer<typeof postArticleRequestBody>;
