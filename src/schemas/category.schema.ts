import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string().nullable(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CategorySchema = z.infer<typeof categorySchema>;
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
