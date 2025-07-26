import { z } from "zod";
import { CategorySchema } from "./category.schema";
import { CommentSchema } from "./comment.schema";

export const ArticleSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
  cover_image_url: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string().nullable(),
  category: CategorySchema,
  comments: z.array(CommentSchema),
  localizations: z.array(z.unknown()),
});

export type Article = z.infer<typeof ArticleSchema>;
