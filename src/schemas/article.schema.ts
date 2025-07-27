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

export type ArticleSchema = z.infer<typeof articleSchema>;
