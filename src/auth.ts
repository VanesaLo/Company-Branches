import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // API TOKEN
          const response = await fetch(`${process.env.SERVER_PRUEBATEST_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
          });
          if (!response.ok) return null;
          const { token } = await response.json();

          // API USER
          const responseUser = await fetch(`${process.env.SERVER_PRUEBATEST_URL}/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ email: credentials.email })
          });
          if (!responseUser.ok) return null;
          const { user } = await responseUser.json();

          return { ...user, id: user.id.toString(), token };
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 1 semana
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Actualizar token si se recibe nuevo desde el cliente
      if (trigger === "update" && session?.token) {
        token.jwt = session.token;
      }

      if (user) {
        token.jwt = user.token;
        token.id = user.id;
        token.app_id = user.app_id;
        token.email_verified_at = user.email_verified_at;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        jwt: token.jwt,
        user: {
          ...session.user,
          app_id: token.app_id,
          email_verified_at: token.email_verified_at,
        }
      }
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
});
