"use server";

import { fetchWithAuth, getAppId } from "./utils";
import ICompany from "app/types/company";



export async function getListCompanies() : Promise<ICompany[] | null> {
  const appId = await getAppId();

  const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/empresa/${appId}`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!response.ok) return null;
  const { data } = await response.json();

  return data;
}
