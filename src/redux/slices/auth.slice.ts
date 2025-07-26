// redux/slices/auth.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/configs/axios.config";
import type { RootState } from "../store";
import type {
  AuthResponse,
  LoginSchema,
  RegisterSchema,
} from "@/schemas/auth.schema";
import { parseApiError } from "@/lib/utils";
import type { UserSchema } from "@/schemas/user.schema";

type AuthState = {
  user: UserSchema | null;
  jwt: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hydrated: boolean; // state to track if auth has been initialized
};

const initialState: AuthState = {
  user: null,
  jwt: null,
  status: "idle",
  error: null,
  hydrated: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginSchema, { rejectWithValue }) => {
    try {
      const res = await api.post<AuthResponse>("/api/auth/local", data);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(
        parseApiError({
          err,
          fallback: "Login failed. Please check your credentials.",
        }),
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterSchema, { rejectWithValue }) => {
    try {
      const res = await api.post<AuthResponse>(
        "/api/auth/local/register",
        data,
      );
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(
        parseApiError({
          err,
          fallback: "Register failed. Please check your credentials.",
        }),
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      state.status = "idle";
      state.error = null;
    },
    initializeAuth: (state, { payload }: { payload: AuthResponse }) => {
      state.user = payload.user;
      state.jwt = payload.jwt;
      state.status = "succeeded";
      state.hydrated = true;
    },
    markAuthHydrated: (state) => {
      state.hydrated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, initializeAuth, markAuthHydrated } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
