"use server";

import { validatedActionWithUser } from "app/lib/auth/middleware";
import { fetchWithAuth, getAppId } from "./utils";
import { IBranch } from "app/types/branch";
import { branchSchema, branchUpdateSchema } from "../schemas/branches.schema";


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

export const createBranch = validatedActionWithUser(branchSchema, async (data) => {

  const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/sucursal`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(data),
  });
  if (!response.ok) return { error: "Failed to create branch" };

  const { message } = await response.json();
  return { success: message };
});

export const updateBranch = validatedActionWithUser(branchUpdateSchema, async (data) => {
  const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/sucursal/${data.id}`, {
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify(data),
  });
  if (!response.ok){
    if (response.status === 422) {
      const { message } = await response.json();
      return { error: message };
    }
    return { error: "Failed to create branch" }
  };

  const { message } = await response.json();
  return { success: message };
});

export async function deleteBranch(id: number) {
  const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/sucursal/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });

  return response.ok;
}
