"use client";

import { IBranch } from "app/types/branch";
import ListBranchesItem from "./list-branches-item";
import ListBranchesToolbar from "./list-branches-toolbar";

type ListBranchesProps = {
  branches: IBranch[];
  baseUrlStorage: string;
};
export default function ListBranches({
  branches,
  baseUrlStorage,
}: ListBranchesProps) {
  return (
    <div className="flex flex-col space-y-4">
      {/* Toolbar */}
      <ListBranchesToolbar />

      {/* List Branches */}
      <div className="grid gap-4 md:grids-col-2 lg:grid-cols-3">
        {branches.map((branch) => (
          <ListBranchesItem
            key={branch.id}
            branch={branch}
            imageUrl={`${baseUrlStorage}/${branch.imagen}`}
          />
        ))}
      </div>
    </div>
  );

  /*
  // -- Render
  if (branches) {
    return (
      <>
        <div className="flex justify-between items-center">
          <SearchInput />
          <CreateBranch />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {branches.map((branch) => (
            <ListBranchesItem
              key={branch.id}
              branch={branch}
              image={getImageUrl(branch.imagen)}
            />
          ))}
        </div>
        <div className="h-[300px] mt-8 bg-gray-950 rounded-lg shadow-lg w-full">
          <MapView />
        </div>
      </>
    );
  } else if (branches === null) {
    return <ErrorReload />;
  }
  */
}
