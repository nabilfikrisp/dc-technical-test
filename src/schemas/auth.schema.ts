import { z } from "zod";
import type { UserSchema } from "./user.schema";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Invalid email address")
    .max(100, "Email address is too long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password is too long"),
});

export const registerSchema = z.object({
  username: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z
    .string()
    .min(1, "Invalid email address")
    .max(100, "Email address is too long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password is too long"),
});

export const registerFormSchema = registerSchema
  .extend({
    confirmPassword: z
      .string()
      .min(6, "Confirm password is required")
      .max(100, "Confirm password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
export type AuthResponse = {
  jwt: string;
  user: UserSchema;
};
