import type { CategorySchema } from "@/schemas/category.schema";
import { Separator } from "../ui/separator";
import CategoryCard from "./category-card";

export default function CategoryList({
  categories,
}: {
  categories: CategorySchema[];
}) {
  return (
    <div className="border-border/50 rounded-xl border p-4">
      <h2 className="text-lg font-semibold">Categories</h2>
      <Separator className="my-2" />
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <CategoryCard key={category.id} categoryName={category.name} />
        ))}
      </div>
    </div>
  );
}
