"use server";

import { z } from "zod";
import { validatedAction } from "app/lib/auth/middleware";
import { redirect } from "next/navigation";
import { signIn as signInApi } from "app/auth";
import { AuthError } from "next-auth";

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  try {
    await signInApi("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password. Please try again.",
            email,
            password,
          };
        default:
          return { error: "Something went wronng" };
      }
    }
  }

  redirect('/');
});
