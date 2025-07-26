import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND_URL: z.string().min(1, "VITE_BACKEND_URL env key is required"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  const message = parsed.error.issues.map((i) => i.message).join(", ");
  throw new Error(`[ENV ERROR]: ${message}`);
}

export const ENV = {
  BACKEND_URL: parsed.data.VITE_BACKEND_URL,
};
