import api from "@/configs/axios.config";
import type { ApiResponse, Meta } from "@/schemas/api.schema";
import type { ArticleSchema } from "@/schemas/article.schema";
import qs from "qs";

export interface FetchArticlesParams {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  filters?: {
    title?: { $contains?: string };
    category?: { name?: { $eqi?: string } };
  };
  populate?: {
    comments?: {
      populate?: {
        user?: "*";
      };
    };
    user?: "*";
    category?: "*";
  };
}

export async function fetchArticles(params: FetchArticlesParams = {}) {
  const {
    pagination = { page: 1, pageSize: 9 },
    filters,
    populate = {
      comments: { populate: { user: "*" } },
      user: "*",
      category: "*",
    },
  } = params;

  const query = qs.stringify(
    { pagination, filters, populate },
    { encodeValuesOnly: true, encode: false },
  );

  const response = await api.get<ApiResponse<ArticleSchema[], Meta>>(
    `/api/articles?${query}`,
  );
  return response.data;
}
