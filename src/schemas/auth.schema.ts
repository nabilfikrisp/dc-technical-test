import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export type LoginSchema = z.infer<typeof loginSchema>;
