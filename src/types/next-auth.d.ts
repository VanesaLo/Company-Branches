import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    email_verified_at: boolean;
    app_id: number;
    token: string;
  }

  interface Session {
    jwt: JWT;
    user: {
      email_verified_at: boolean;
      app_id: number;
    } & DefaultSession["user"]
  }
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    app_id: number;
    email_verified_at: boolean;
  }
}
