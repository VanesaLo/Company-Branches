"use server";

import { auth } from "app/auth";

export const getAppId = async () => {
  const session = await auth();
  return session?.user?.app_id ?? 1;
}

export async function fetchWithAuth(url: string, options?: RequestInit) : Promise<Response> {
  const session = await auth();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };
  if (session?.jwt) {
    headers["Authorization"] = `Bearer ${session.jwt}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
