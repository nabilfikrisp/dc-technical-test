import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/lib/utils";
import {
  registerUser,
  loginUser,
  logout as logoutAction,
  initializeAuth,
  markAuthHydrated,
} from "@/redux/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import type { LoginSchema, RegisterSchema } from "@/schemas/auth.schema";
import type { UserSchema } from "@/schemas/user.schema";
import { useEffect } from "react";

export default function useAuth() {
  const dispatch = useAppDispatch();

  const { user, status, error, hydrated, jwt } = useAppSelector(
    (state) => state.auth,
  );

  async function register(
    registerData: RegisterSchema,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    },
  ) {
    const res = await dispatch(registerUser(registerData));
    if (registerUser.fulfilled.match(res)) {
      setLocalStorageItem("jwt", res.payload.jwt);
      setLocalStorageItem("user", res.payload.user);
      options?.onSuccess?.();
    } else if (registerUser.rejected.match(res)) {
      options?.onError?.(res.payload as string);
    }
    return res;
  }

  async function login(
    loginData: LoginSchema,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    },
  ) {
    const res = await dispatch(loginUser(loginData));
    if (loginUser.fulfilled.match(res)) {
      setLocalStorageItem("jwt", res.payload.jwt);
      setLocalStorageItem("user", res.payload.user);
      options?.onSuccess?.();
    } else if (loginUser.rejected.match(res)) {
      options?.onError?.(res.payload as string);
    }
    return res;
  }

  function logout() {
    dispatch(logoutAction());
    removeLocalStorageItem("jwt");
    removeLocalStorageItem("user");
    return;
  }

  // get auth from local storage on refresh
  useEffect(() => {
    if (status === "idle" && !user) {
      const storedUser = getLocalStorageItem<UserSchema>("user");
      const storedJwt = getLocalStorageItem<string>("jwt");

      if (storedUser && storedJwt) {
        dispatch(initializeAuth({ user: storedUser, jwt: storedJwt }));
      } else {
        dispatch(markAuthHydrated());
      }
    }
  });

  return { user, status, error, register, logout, login, hydrated, jwt };
}
