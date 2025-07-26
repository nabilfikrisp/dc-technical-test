import api from "@/configs/axios.config";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Article } from "@/schemas/article.schema";
import type { ApiResponse } from "@/schemas/api.schema";

type ArticlesState = {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  } | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ArticlesState = {
  data: [],
  status: "idle",
  error: null,
  meta: null,
};

export const fetchArticles = createAsyncThunk<ApiResponse<Article[]>>(
  "articles/fetchAll",
  async () => {
    const res = await api.get<ApiResponse<Article[]>>(
      "/api/articles?populate=*"
    );
    return res.data;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<ApiResponse<Article[]>>) => {
          state.status = "succeeded";
          state.data = action.payload.data;
          state.meta = action.payload.meta;
        }
      )
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const articlesReducer = articlesSlice.reducer;
export const articlesSelector = (state: RootState) => state.articles;
