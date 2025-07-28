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

export type CommentSchema = z.infer<typeof commentSchema>;
