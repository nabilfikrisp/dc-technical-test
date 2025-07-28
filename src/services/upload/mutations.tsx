import { useMutation } from "@tanstack/react-query";
import { UPLOAD_FILE_MUTATION_KEY } from "./keys";
import { postUploadFile } from "./api";

export function useUploadFileMutation() {
  return useMutation({
    mutationKey: [UPLOAD_FILE_MUTATION_KEY],
    mutationFn: (file: File) => postUploadFile(file),
  });
}
