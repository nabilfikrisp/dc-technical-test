import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

export default function CategoryCard({
  categoryName,
}: {
  categoryName: string;
}) {
  const [categoryParams, setCategoryParams] = useQueryState("category");

  function handleClick() {
    if (categoryParams === categoryName) {
      setCategoryParams("");
    } else {
      setCategoryParams(categoryName);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "bg-background/70 text-foreground flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all hover:translate-y-0.5 hover:cursor-pointer",
        categoryParams === categoryName
          ? "border-primary text-primary"
          : "border-border/50 text-muted-foreground hover:border-primary",
      )}
    >
      <span>#</span>
      <span>{categoryName}</span>
    </div>
  );
}
