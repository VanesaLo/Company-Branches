"use server";

import { getListBranches } from "app/app/actions/branches.action";
import ErrorReload from "../error-reload";
import { connection } from "next/server";
import ListBranchesItem from "./list-branches-item";
import SearchInput from "../search/search";
import CreateBranch from "../create-branches/create-branch";
import MapView from "../map/map";
import ListBranches from "./list-branches";

export default async function Branches() {
  // -- Nextjs
  await connection();

  // -- Variables
  const baseUrlStorage = process.env.SERVER_URL_STORAGE;

  // -- API
  const branches = await getListBranches();

  // -- Render Error
  if (branches === null)
    return <ErrorReload />

  // -- Render
  return <ListBranches branches={branches} baseUrlStorage={baseUrlStorage!} />
}
