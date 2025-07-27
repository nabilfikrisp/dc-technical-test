import { cn } from "@/lib/utils";

export default function ImageWithBackdrop({
  src,
  alt,
  onError,
  className = "",
}: {
  src: string;
  alt: string;
  onError?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-muted relative w-full overflow-hidden rounded-lg",
        className,
      )}
    >
      {/* Blurred background layer */}
      <img
        src={src}
        alt="blur background"
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-md"
      />

      {/* Centered actual image */}
      <div className="relative z-10 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          onError={() => onError && onError()}
          className="max-h-[500px] max-w-full shadow-md"
        />
      </div>
    </div>
  );
}
