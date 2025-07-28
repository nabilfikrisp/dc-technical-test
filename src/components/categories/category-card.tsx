import { cn } from "@/lib/utils";

export default function CategoryCard({
  categoryName,
  isActive,
  onChange,
}: {
  categoryName: string;
  isActive?: boolean;
  onChange?: (newCategory: string | null) => void;
}) {
  return (
    <div
      onClick={() => onChange?.(isActive ? null : categoryName)}
      className={cn(
        "bg-background/70 text-foreground flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all hover:translate-y-0.5 hover:cursor-pointer",
        isActive
          ? "border-primary text-primary"
          : "border-border/50 text-muted-foreground hover:border-primary",
      )}
    >
      <span>#</span>
      <span>{categoryName}</span>
    </div>
  );
}
