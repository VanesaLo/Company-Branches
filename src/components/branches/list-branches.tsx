"use client";

import { IBranch } from "app/types/branch";
import ListBranchesItem from "./list-branches-item";
import ListBranchesToolbar from "./list-branches-toolbar";
import { ViewToggle } from "./toolbar-toggle-view";
import { useMemo, useState } from "react";
// import MapView from "../map/map";
import dynamic from "next/dynamic";

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
  };


  const MapComponent = useMemo(
    () =>
      dynamic(() => import('../map/map'), {
        ssr: false,
        loading: () => <div>...Cargando Mapa</div>,
      }),
    []
  );



  return (
    <div className="flex flex-col space-y-4">
      {/* Toolbar */}
      <ListBranchesToolbar handleViewChange={handleViewChange} />

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
        <div className="h-[600px] mt-8 bg-gray-950 rounded-lg shadow-lg w-full">
          <MapComponent branches={branches}/>
        </div>
      )}
    </div>
  );
}
