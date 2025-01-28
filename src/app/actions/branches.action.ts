"use server";

import { fetchWithAuth, getAppId } from "./utils";
import { IBranch } from "app/types/branch";


export async function getListBranches() : Promise<IBranch[] | null> {
  const appId = await getAppId();

  const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/sucursal/${appId}`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!response.ok) return null;
  const { data } = await response.json();

  return data;
}


export async function deleteBranch(id: number) {
  const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/sucursal/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });

  return response.ok;
}
