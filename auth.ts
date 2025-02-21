import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    error: "/",
    signIn: "/signin",
    signOut: "/",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await res.json();

        if (res.ok && data.token) {
          // Return the necessary user data
          return data.token;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      // Add user data to the token
      if (user) {
        token.userId = user.userId;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Add token data to the session
      if (token) {
        session.user.userId = token.userId;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.token = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 600,
  },
});
