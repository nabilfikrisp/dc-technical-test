import api from "@/configs/axios.config";
import type {
  AuthResponse,
  LoginSchema,
  RegisterSchema,
} from "@/schemas/auth.schema";
import type { FetchArticlesParams } from "../articles/api";
import qs from "qs";
import type { MeSchema } from "@/schemas/user.schema";

export async function fetchLogin(body: LoginSchema) {
  const response = await api.post<AuthResponse>("/api/auth/local", body);
  return response.data;
}

export async function fetchRegister(body: RegisterSchema) {
  const response = await api.post<AuthResponse>(
    "/api/auth/local/register",
    body,
  );
  return response.data;
}

type FetchMeParams = {
  populate: {
    articles: FetchArticlesParams;
    categories?: "*";
    comments?: { populate: "article" };
  };
};

export async function fetchMe() {
  const params: FetchMeParams = {
    populate: {
      articles: {
        populate: {
          comments: {
            populate: {
              user: "*",
            },
          },
          category: "*",
        },
        sort: "publishedAt:asc",
      },
      comments: {
        populate: "article",
      },
    },
  };
  const queryString = qs.stringify(params, {
    encodeValuesOnly: true,
    encode: false,
  });
  const response = await api.get<MeSchema>(`/api/users/me?${queryString}`);
  return response.data;
}
