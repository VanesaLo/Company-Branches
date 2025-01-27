"use server";

import { getListBranches } from "app/app/actions/branches.action";
import ErrorReload from "../error-reload";
import { connection } from "next/server";
import ListBranchesItem from "./list-branches-item";
import { getImageUrl } from "app/app/actions/images.action";
import SearchInput from "../search/search";
import CreateBranch from "../create-branches/create-branch";
import MapView from "../map/map";

export default async function ListBranches() {
  // -- Nextjs
  await connection();

  // -- API
  const branches = await getListBranches();

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
}
