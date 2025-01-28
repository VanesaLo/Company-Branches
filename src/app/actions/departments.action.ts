"use server";

import { IDepartment } from "app/types/department";
import { fetchWithAuth } from "./utils";

export async function fetchDepartments(countryId: string) : Promise<{[key: string]: IDepartment}> {
  try {
    const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/departamentos/${countryId}`)
    const data = await response.json()
    return data.data || {}
  } catch (error) {
    console.error("Error fetching departments:", error)
    return {}
  }
}
