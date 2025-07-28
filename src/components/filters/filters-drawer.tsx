import { useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import CategoriesSection from "../categories/categories-section";
import SortFilter from "./sort-filter";
import ResetFilter from "./reset-filter";
import { Separator } from "../ui/separator";

type FiltersDrawerProps = {
  className?: string;
};
export default function FiltersDrawer({ className }: FiltersDrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen} autoFocus={open}>
      <DrawerTrigger asChild className={className}>
        <Button>Filters</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl">Filters</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-5">
          <CategoriesSection />
          <div className="px-5">
            <h2 className="text-lg font-semibold">Sort</h2>
            <Separator className="my-2" />
            <SortFilter />
          </div>
          <ResetFilter className="mx-5" />
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
