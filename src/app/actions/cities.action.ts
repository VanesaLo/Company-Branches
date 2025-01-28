"use server";

import { ICity } from "app/types/city";
import { fetchWithAuth } from "./utils";

export async function fetchCities(departmentId: string) : Promise<{[key: string]: ICity}> {
  try {
    const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/ciudades/${departmentId}`)
    const data = await response.json()
    return data.data || {}
  } catch (error) {
    console.error("Error fetching cities:", error)
    return {}
  }
}
