import api from "@/configs/axios.config";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ApiResponse, Meta } from "@/schemas/api.schema";
import type { ArticleSchema } from "@/schemas/article.schema";

type ArticlesState = {
  data: ArticleSchema[];
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

export const fetchArticles = createAsyncThunk("articles/fetchAll", async () => {
  const res = await api.get<ApiResponse<ArticleSchema[], Meta>>(
    "/api/articles?populate=*",
  );
  return res.data;
});

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
        (state, action: PayloadAction<ApiResponse<ArticleSchema[], Meta>>) => {
          state.status = "succeeded";
          state.data = action.payload.data;
          state.meta = action.payload.meta;
        },
      )
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const articlesReducer = articlesSlice.reducer;
export const articlesSelector = (state: RootState) => state.articles;
