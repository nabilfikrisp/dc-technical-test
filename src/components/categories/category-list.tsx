import type { CategorySchema } from "@/schemas/category.schema";
import { Separator } from "../ui/separator";
import CategoryCard from "./category-card";
import { useQueryState } from "nuqs";
import CategoryCreateDialog from "./category-create-dialog";

export default function CategoryList({
  categories,
}: {
  categories: CategorySchema[];
}) {
  const [categoryParams, setCategoryParams] = useQueryState("category");

  const handleCategoryChange = (newCategory: string | null) => {
    setCategoryParams(newCategory);
  };

  return (
    <div className="border-border/50 rounded-xl border p-4">
      <div className="flex items-center gap-5">
        <h2 className="text-lg font-semibold">Categories</h2>
        <CategoryCreateDialog className="ml-auto" />
      </div>
      <Separator className="my-2" />
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            categoryName={category.name}
            isActive={categoryParams === category.name}
            onChange={handleCategoryChange}
          />
        ))}
      </div>
    </div>
  );
}
