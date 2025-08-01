import { Input } from "../ui/input";
import { useUploadFileMutation } from "@/services/upload/mutations";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { XIcon, UploadCloudIcon } from "lucide-react";
import ImageWithBackdrop from "@/components/image-with-backdrop";
import { parseApiError } from "@/lib/utils";
import { cn } from "@/lib/utils";

type UploadFileProps = {
  initialValue?: string;
  onUploadSuccess?: (url: string) => void;
  onUploading?: () => void;
  onRemove?: () => void;
  onEnd?: () => void;
};
export default function UploadFile({
  initialValue,
  onUploadSuccess,
  onRemove,
  onUploading,
  onEnd,
}: UploadFileProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialValue || null,
  );
  const { mutateAsync } = useUploadFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    // on upload
    onUploading?.();
    const toastId = toast.loading("Uploading your file...");

    try {
      const response = await mutateAsync(file);

      setImagePreview(response.url);
      onUploadSuccess?.(response.url);
      toast.success("File uploaded successfully", { id: toastId });
    } catch (error: unknown) {
      const errorMessage = parseApiError({
        error,
        fallback: "Failed to upload file",
      });
      toast.error(errorMessage, { id: toastId });
    } finally {
      onEnd?.();
    }
  }

  function handleRemove() {
    setImagePreview(null);
    onRemove?.();
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Image removed");
  }

  if (imagePreview) {
    return (
      <div className="group border-muted relative overflow-hidden rounded-lg border">
        <ImageWithBackdrop
          src={imagePreview}
          alt="preview"
          className="w-full object-cover"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="bg-background/80 hover:bg-destructive/20 absolute top-3 right-3 z-10 rounded-full p-2 backdrop-blur-sm transition-colors"
          onClick={handleRemove}
        >
          <XIcon className="text-destructive h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group relative">
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="absolute top-0 left-0 z-0 h-full w-full cursor-pointer opacity-0"
        onChange={handleUpload}
      />
      <div
        className={cn(
          "border-muted z-10 cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          "group-hover:border-primary group-hover:bg-muted/50",
          "focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2",
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <UploadCloudIcon className="text-muted-foreground h-10 w-10" />
          <div className="space-y-1">
            <p className="text-foreground text-sm font-medium">
              Click to upload an image
            </p>
            <p className="text-muted-foreground text-xs">JPG, PNG up to 5MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
