import api from "@/configs/axios.config";
import type { ApiResponse, Meta } from "@/schemas/api.schema";
import type {
  ArticleSchema,
  PostArticleRequestBody,
} from "@/schemas/article.schema";
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

export async function fetchArticleDetail(documentId: string) {
  const params = {
    populate: {
      comments: { populate: { user: "*" } },
      user: "*",
      category: "*",
    },
  };

  const query = qs.stringify(params, { encodeValuesOnly: true, encode: false });

  const response = await api.get<ApiResponse<ArticleSchema, Meta>>(
    `/api/articles/${documentId}?${query}`,
  );
  return response.data;
}

export async function postArticle(requestBody: PostArticleRequestBody) {
  const formattedRequestBody = {
    data: {
      ...requestBody,
    },
  };
  const response = await api.post<ApiResponse<ArticleSchema>>(
    "/api/articles",
    formattedRequestBody,
  );
  return response.data;
}

export async function putArticle({
  requestBody,
  documentId,
}: {
  requestBody: PostArticleRequestBody;
  documentId: string;
}) {
  const formattedRequestBody = {
    data: {
      ...requestBody,
    },
  };
  const response = await api.put<ApiResponse<ArticleSchema>>(
    `/api/articles/${documentId}`,
    formattedRequestBody,
  );
  return response.data;
}
