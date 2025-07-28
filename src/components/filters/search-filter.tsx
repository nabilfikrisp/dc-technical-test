import { SearchIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SearchFilter() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    throttleMs: 500,
  });

  return (
    <div className="relative flex w-full max-w-[400px]">
      <SearchIcon className="absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2" />
      <Input
        className="border-border/50 bg-background/50 hover:border-border focus:border-primary focus:bg-background focus:shadow-primary/10 rounded-xl pr-10 pl-10 backdrop-blur-sm transition-all duration-200 focus:shadow-lg"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search articles..."
      />
      {search && (
        <Button
          onClick={() => setSearch("")}
          size="icon"
          variant="ghost"
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 hover:bg-transparent focus:bg-transparent"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
