import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string().nullable(),
});

export type CommentSchema = z.infer<typeof commentSchema>;
