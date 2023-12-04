import GithubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

import NextAuth, { Account, DefaultSession, User } from "next-auth";

interface Token extends JWT {
  isAdmin?: boolean;
}

interface UserWithAdmin extends User {
  isAdmin?: boolean;
}

export const AuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          isAdmin: profile.login === "bremmdev" ? true : false,
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    jwt({ token, user }: { token: Token; user: UserWithAdmin }) {
      if (user) token.isAdmin = user.isAdmin;
      return token;
    },
    session({ session, token }: { session: any; token: Token }) {
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
