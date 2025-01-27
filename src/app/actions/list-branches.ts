"use server";

import { fetchWithAuth, getAppId } from "./utils";
import IBranches from "app/types/braches";



export async function getListBranches() : Promise<IBranches[] | null> {
  const appId = await getAppId();

  const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/sucursal/${appId}`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!response.ok) return null;
  const { data } = await response.json();

  return data;
}
