import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthResponse } from "@/schemas/auth.schema";

type AuthState = {
  jwt: AuthResponse["jwt"] | null;
  user: AuthResponse["user"] | null;
};

type AuthActions = {
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
};

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      jwt: null,
      user: null,
      setAuth: (data) =>
        set({
          jwt: data.jwt,
          user: data.user,
        }),
      clearAuth: () =>
        set({
          jwt: null,
          user: null,
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ jwt: state.jwt, user: state.user }),
    },
  ),
);

export default useAuthStore;
