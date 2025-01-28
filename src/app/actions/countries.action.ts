"use server";

import { ICountry } from "app/types/country";
import { fetchWithAuth } from "./utils";

export async function fetchCountries() : Promise<{[key: string]: ICountry}> {
  try {
    const response = await fetchWithAuth(`${process.env.SERVER_PRUEBATEST_URL}/paises`)
    const data = await response.json()
    return data.data || {}
  } catch (error) {
    console.error("Error fetching countries:", error)
    return {}
  }
}
