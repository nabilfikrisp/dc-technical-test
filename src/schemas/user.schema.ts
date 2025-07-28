import { z } from "zod";

import { articleSchema } from "./article.schema";

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

export const meSchema = userSchema.extend({
  articles: z.array(z.lazy(() => articleSchema.omit({ user: true }))),
});
export type UserSchema = z.infer<typeof userSchema>;
export type MeSchema = z.infer<typeof meSchema>;
