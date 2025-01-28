"use client";

import { IBranch } from "app/types/branch";
import ListBranchesItem from "./list-branches-item";
import ListBranchesToolbar from "./list-branches-toolbar";
import { ViewToggle } from "./toolbar-toggle-view";
import { useState } from "react";
import MapView from "../map/map";

type ListBranchesProps = {
  branches: IBranch[];
  baseUrlStorage: string;
};
export default function ListBranches({
  branches,
  baseUrlStorage,
}: ListBranchesProps) {
  // -- States
  const [view, setView] = useState<"list" | "map">("list");

  // -- Handlers
  const handleViewChange = (newView: "list" | "map") => {
    setView(newView);
    console.log(`View changed to: ${newView}`);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Toolbar */}
      <ListBranchesToolbar />

      {/* View Toggle */}
      <div className="flex justify-end">
        <ViewToggle onViewChange={handleViewChange} />
      </div>

      {view === "list" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <ListBranchesItem
              key={branch.id}
              branch={branch}
              imageUrl={`${baseUrlStorage}/${branch.imagen}`}
            />
          ))}
        </div>
      ) : (
        <div className="h-[300px] mt-8 bg-gray-950 rounded-lg shadow-lg w-full">
          <MapView />
        </div>
      )}
    </div>
  );
}
