import api from "@/configs/axios.config";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ApiResponse, Meta } from "@/schemas/api.schema";
import type { ArticleSchema } from "@/schemas/article.schema";
import { parseApiError } from "@/lib/utils";
import { API_STATUS, type ApiStatus } from "@/schemas/api-status.shema";

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
  status: ApiStatus;
  error: string | null;
};

const initialState: ArticlesState = {
  data: [],
  status: API_STATUS.IDLE,
  error: null,
  meta: null,
};

type FetchArticlesParams =
  | {
      pageSize?: number;
      page?: number;
      category?: string;
    }
  | undefined;

export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async (params: FetchArticlesParams = {}, { rejectWithValue }) => {
    try {
      const { pageSize, page, category } = params;
      const res = await api.get<ApiResponse<ArticleSchema[], Meta>>(
        "/api/articles",
        {
          params: {
            "populate[comments][populate][user]": "*",
            "populate[user]": "*",
            "populate[category]": "*",
            "pagination[page]": page,
            "pagination[pageSize]": pageSize,
            ...(category && { "filters[category][name][$eqi]": category }),
          },
        },
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        parseApiError({
          error,
          fallback: "Register failed. Please check your credentials.",
        }),
      );
    }
  },
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = API_STATUS.LOADING;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<ApiResponse<ArticleSchema[], Meta>>) => {
          state.status = API_STATUS.SUCCEEDED;
          state.data = action.payload.data;
          state.meta = action.payload.meta;
        },
      )
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = API_STATUS.FAILED;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const articlesReducer = articlesSlice.reducer;
export const articlesSelector = (state: RootState) => state.articles;
