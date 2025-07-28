import { z } from "zod";
import { userSchema } from "./user.schema";

export const commentSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string().nullable(),
  user: userSchema.optional(),
});

export const postCommentSchema = z.object({
  articleId: z.number(),
  content: z
    .string()
    .min(1, "Content cannot be empty")
    .max(500, "Content cannot exceed 500 characters"),
});

export type CommentSchema = z.infer<typeof commentSchema>;
export type PostCommentSchema = z.infer<typeof postCommentSchema>;
