import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

type SortOption = {
  value: string;
  label: string;
  direction?: "asc" | "desc";
};

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { value: "publishedAt", label: "Publish Date", direction: "desc" },
  { value: "title", label: "Title", direction: "asc" },
];

const SORT_ORDER_OPTIONS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

interface SortFilterProps {
  options?: SortOption[];
  className?: string;
}

export default function SortFilter({
  options = DEFAULT_SORT_OPTIONS,
  className,
}: SortFilterProps) {
  const [sortBy, setSortBy] = useQueryState("sortBy");
  const [sortOrder, setSortOrder] = useQueryState("sortOrder");

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Sort By Select */}
      <Select
        value={sortBy || ""}
        onValueChange={(value) => {
          setSortBy(value);
          const option = options.find((opt) => opt.value === value);
          if (option?.direction) {
            setSortOrder(option.direction);
          }
        }}
      >
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Sort by">
            Sort:{" "}
            {options.find((opt) => opt.value === sortBy)?.label || "Select"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort Order Select */}
      <Select value={sortOrder || ""} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Order">
            {SORT_ORDER_OPTIONS.find((opt) => opt.value === sortOrder)?.label ||
              "Select"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SORT_ORDER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
