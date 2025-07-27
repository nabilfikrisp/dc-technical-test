import api from "@/configs/axios.config";
import type { ApiResponse, Meta } from "@/schemas/api.schema";
import type { CategorySchema } from "@/schemas/category.schema";

export async function fetchCategories() {
  const response =
    await api.get<ApiResponse<CategorySchema[], Meta>>("/api/categories");
  return response.data;
}
