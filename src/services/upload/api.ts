import api from "@/configs/axios.config";
import type { UploadResponseItem } from "@/schemas/upload.schema";

export async function postUploadFile(file: File) {
  const formData = new FormData();

  formData.append("files", file);

  const response = await api.post<UploadResponseItem[]>(
    "/api/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!response.data || response.data.length === 0) {
    throw new Error("Upload failed: No data returned from server.");
  }

  return response.data[0];
}
