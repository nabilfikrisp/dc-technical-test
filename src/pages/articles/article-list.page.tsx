import FiltersDrawer from "@/components/filters/filters-drawer";
import CategoriesSection from "@/components/categories/categories-section";
import { ArticlesSection } from "@/components/articles/articles-section";
import SearchFilter from "@/components/filters/search-filter";

export default function ArticleListPage() {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="mb-5 flex gap-5">
        <SearchFilter />
        <FiltersDrawer className="block flex-1 rounded-xl md:hidden" />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 md:col-span-2">
          <ArticlesSection />
        </div>
        <div className="col-span-1 hidden md:block">
          <CategoriesSection />
        </div>
      </div>
    </div>
  );
}
