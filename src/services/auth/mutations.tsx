import type { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { LOGIN_MUTATION_KEY, REGISTER_MUTATION_KEY } from "./keys";
import useAuthStore from "@/stores/auth.store";
import { fetchLogin, fetchRegister } from "./api";

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: (body: LoginSchema) => fetchLogin(body),
    onSuccess: (data) => {
      setAuth(data);
    },
  });
}

export function useRegisterMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationKey: [REGISTER_MUTATION_KEY],
    mutationFn: (body: RegisterSchema) => fetchRegister(body),
    onSuccess: (data) => {
      setAuth(data);
    },
  });
}
