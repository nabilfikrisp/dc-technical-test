import { categoryQueryOptions } from "@/services/categories/queries";
import { useQuery } from "@tanstack/react-query";
import ErrorUI from "../error-ui";
import { CategoriesSkeleton } from "./categories-skeleton";
import CategoryList from "./category-list";

export default function CategoriesSection() {
  const { data: categoryResponse, error: categoryError } = useQuery(
    categoryQueryOptions(),
  );

  if (categoryError) {
    return <ErrorUI error={categoryError} />;
  }

  if (!categoryResponse) {
    return <CategoriesSkeleton />;
  }

  return (
    <section className="sticky top-[80px] max-h-[calc(100vh-2rem)] overflow-y-auto">
      <CategoryList categories={categoryResponse.data} />
    </section>
  );
}
