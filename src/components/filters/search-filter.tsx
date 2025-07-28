import { SearchIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function SearchFilter() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    throttleMs: 500,
  });
  const [localSearch, setLocalSearch] = useState(search);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearch(localSearch);
  }

  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit}>
      <div className="relative flex w-full max-w-[400px]">
        <Input
          className="border-border/50 bg-background/50 hover:border-border focus:border-primary focus:bg-background focus:shadow-primary/10 rounded-xl pr-10 backdrop-blur-sm transition-all duration-200 focus:shadow-lg"
          value={localSearch}
          placeholder="Search articles..."
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        {search && (
          <Button
            onClick={() => {
              setSearch("");
              setLocalSearch("");
            }}
            size="icon"
            variant="ghost"
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 hover:bg-transparent focus:bg-transparent"
            type="button"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" className="rounded-xl">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </form>
  );
}
