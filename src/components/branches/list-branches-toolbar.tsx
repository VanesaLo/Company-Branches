"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";
import BranchForm from "./branch-form";

export default function ListBranchesToolbar() {
  // -- Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // -- Handlers
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set("query", term);
    else params.delete("query");
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  // -- Render
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name or description"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>

      {/* New branch */}
      <div className="ml-auto mr-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[750px]">
            <DialogHeader>
              <DialogTitle>New Branch</DialogTitle>
              <DialogDescription>
                Create a new branch to start selling your products
              </DialogDescription>
            </DialogHeader>

            {/* Form */}
            <BranchForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
