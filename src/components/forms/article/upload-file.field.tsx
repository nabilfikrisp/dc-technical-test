import type { PostArticleSchema } from "@/schemas/article.schema";
import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { useUploadFileMutation } from "@/services/upload/mutations";
import { Button } from "../../ui/button";
import { useRef } from "react";
import { toast } from "sonner";
import useArticleFormStore from "@/stores/article-form.store";
import { XIcon } from "lucide-react";
import ImageWithBackdrop from "@/components/image-with-backdrop";
import { parseApiError } from "@/lib/utils";

export default function UploadFileField() {
  const { formState, updateField, setIsUploading } = useArticleFormStore();
  const { setValue } = useFormContext<PostArticleSchema>();
  const { mutateAsync } = useUploadFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];
    console.log(`File selected: ${file?.name}`);
    if (!file) return;

    setIsUploading(true);
    toast("Uploading file...");
    try {
      const response = await mutateAsync(file);

      updateField("cover_image_url", response.url);
      setValue("cover_image_url", response.url);
      toast.success("File uploaded successfully");
    } catch (error: unknown) {
      const errorMessage = parseApiError({
        error,
        fallback: "Failed to upload file",
      });
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    updateField("cover_image_url", "");
    setValue("cover_image_url", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Image removed");
  }

  const imagePreview = formState.cover_image_url;

  if (imagePreview) {
    return (
      <div className="relative">
        <ImageWithBackdrop src={imagePreview} alt="preview" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="bg-background/80 hover:bg-background absolute top-2 right-2 z-10 rounded-full p-1 backdrop-blur-sm"
          onClick={handleRemove}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="w-full"
        onChange={handleUpload}
      />
    </div>
  );
}
