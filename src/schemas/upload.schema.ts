import { z } from "zod";

export interface UploadFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

export interface UploadResponseItem {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: UploadFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export const uploadImageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size < 5_000_000, "Max 5MB file size")
    .refine((file) => file.type.startsWith("image/"), "Only images allowed"),
});

export type UploadImageSchema = z.infer<typeof uploadImageSchema>;
