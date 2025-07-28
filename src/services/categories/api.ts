import api from "@/configs/axios.config";
import type { ApiResponse, Meta } from "@/schemas/api.schema";
import type { CategorySchema } from "@/schemas/category.schema";

export async function fetchCategories() {
  const response =
    await api.get<ApiResponse<CategorySchema[], Meta>>("/api/categories");
  return response.data;
}

export async function fetchPostCategory(name: string) {
  const requestBody = {
    data: {
      name,
    },
  };

  const response = await api.post<ApiResponse<CategorySchema>>(
    "/api/categories",
    requestBody,
  );
  return response.data;
}

export async function fetchDeleteCategory(documentId: string) {
  const response = await api.delete(`/api/categories/${documentId}`);
  return response.data;
}
