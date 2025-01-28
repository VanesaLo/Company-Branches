"use server";

import { getListBranches } from "app/app/actions/branches.action";
import ErrorReload from "../error-reload";
import { connection } from "next/server";
import ListBranches from "./list-branches";
import { Suspense } from "react";

{/* Import dynamic for the map */}

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListBranches branches={branches} baseUrlStorage={baseUrlStorage!} />
    </Suspense>
  )
}
