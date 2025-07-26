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
import { API_STATUS, type ApiStatus } from "@/schemas/api-status.shema";

type AuthState = {
  user: UserSchema | null;
  jwt: string | null;
  status: ApiStatus;
  error: string | null;
  hydrated: boolean; // buat cek hydration localStorage
};

const initialState: AuthState = {
  user: null,
  jwt: null,
  status: API_STATUS.IDLE,
  error: null,
  hydrated: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginSchema, { rejectWithValue }) => {
    try {
      const res = await api.post<AuthResponse>("/api/auth/local", data);
      return res.data;
    } catch (error: unknown) {
      return rejectWithValue(
        parseApiError({
          error,
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
    } catch (error: unknown) {
      return rejectWithValue(
        parseApiError({
          error,
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
      state.status = API_STATUS.IDLE;
      state.error = null;
    },
    initializeAuth: (state, { payload }: { payload: AuthResponse }) => {
      state.user = payload.user;
      state.jwt = payload.jwt;
      state.status = API_STATUS.SUCCEEDED;
      state.hydrated = true;
    },
    markAuthHydrated: (state) => {
      state.hydrated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = API_STATUS.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = API_STATUS.FAILED;
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.status = API_STATUS.LOADING;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = API_STATUS.FAILED;
        state.error = action.payload as string;
      });
  },
});

export const { logout, initializeAuth, markAuthHydrated } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
