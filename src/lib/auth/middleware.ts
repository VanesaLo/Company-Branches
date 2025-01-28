import { auth } from "app/auth";
import { Session } from "next-auth";
import { z } from "zod";
import { formDataToJson } from "../utils";

// CODE OF https://github.dev/nextjs/saas-starter/blob/main/app/(login)/actions.ts

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message } as T;
    }

    return action(result.data, formData);
  };
}

type ValidatedActionFormDataWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  session: Session
) => Promise<T>;

export function validatedActionFormDataWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFormDataWithUserFunction<S, T>
) {
  return async (prevState: ActionState, data: FormData): Promise<T> => {
    const session = await auth();
    if (!session) {
      throw new Error('User is not authenticated');
    }

    const json = formDataToJson(data);
    const result = schema.safeParse(json);
    if (!result.success) {
      return { error: result.error.errors[0].message } as T;
    }

    return action(result.data, data, session);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  session: Session
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, data: z.infer<S>): Promise<T> => {
    const session = await auth();
    if (!session) {
      throw new Error('User is not authenticated');
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      return { error: result.error.errors[0].message } as T;
    }

    return action(result.data, session);
  };
}
