import api from "@/configs/axios.config";
import type {
  AuthResponse,
  LoginSchema,
  RegisterSchema,
} from "@/schemas/auth.schema";

export async function fetchLogin(body: LoginSchema) {
  const response = await api.post<AuthResponse>("/api/auth/local", body);
  return response.data;
}

export async function fetchRegister(body: RegisterSchema) {
  const response = await api.post<AuthResponse>(
    "/api/auth/local/register",
    body,
  );
  return response.data;
}
