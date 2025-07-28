import { categoryQueryOptions } from "@/services/categories/queries";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PostArticleSchema } from "@/schemas/article.schema";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

export default function CategorySelectField() {
  const { data: categoryResponse, isLoading } = useQuery(
    categoryQueryOptions(),
  );
  const { control, watch } = useFormContext<PostArticleSchema>();

  // Watch the categoryId value
  const categoryId = watch("categoryId");

  return (
    <FormField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value ?? ""}
              disabled={isLoading || !categoryResponse}
            >
              <SelectTrigger
                className={cn("w-full", !categoryId && "text-muted-foreground")}
              >
                <SelectValue placeholder="Select a category">
                  {categoryId
                    ? categoryResponse?.data.find(
                        (c) => c.id.toString() === categoryId,
                      )?.name
                    : "Select a category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categoryResponse?.data.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
