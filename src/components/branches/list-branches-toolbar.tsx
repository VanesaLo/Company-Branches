"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ViewToggle } from "./toolbar-toggle-view";
import DialogFormBranch from "./components/dialog-form-branch";

type ListBranchesToolbarProps = {
  handleViewChange: (newView: "list" | "map") => void;
};

export default function ListBranchesToolbar({
  handleViewChange,
}: ListBranchesToolbarProps) {
  // -- Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // -- States
  const [openCreateBranch, setOpenCreateBranch] = useState<boolean>(false);

  // -- Handlers
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set("query", term);
    else params.delete("query");
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  // -- Render
  return (
    <div className="flex items-center justify-between gap-4 ">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name or description"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
          className="h-8 w-[150px] lg:w-[350px]"
        />
      </div>

      <div className="flex items-center space-x-2">
        {/* View Toggle */}
        <ViewToggle onViewChange={handleViewChange} />

        {/* New branch */}
        {session ? (
          <>
            <Button onClick={() => setOpenCreateBranch(true)}>
              <PlusCircle />
              Add Branch
            </Button>
            <DialogFormBranch
              open={openCreateBranch}
              setOpen={setOpenCreateBranch}
              title="New Branch"
              description="Create a new branch to start selling your products"
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
