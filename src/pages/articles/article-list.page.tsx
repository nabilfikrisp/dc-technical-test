import FiltersDrawer from "@/components/filters/filters-drawer";
import CategoriesSection from "@/components/categories/categories-section";
import { ArticlesSection } from "@/components/articles/articles-section";
import SearchFilter from "@/components/filters/search-filter";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import SortFilter from "@/components/filters/sort-filter";
import ResetFilter from "@/components/filters/reset-filter";

export default function ArticleListPage() {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-10">
      <div className="mb-5 flex items-center justify-start gap-5">
        <SearchFilter />
        <SortFilter className="hidden md:flex" />
        <FiltersDrawer className="block flex-1 rounded-xl md:hidden" />
        <ResetFilter className="hidden md:block" />
        <Button asChild size="sm" className="ml-auto">
          <Link to="/articles/create" className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            New Article
          </Link>
        </Button>
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
