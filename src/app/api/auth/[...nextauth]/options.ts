import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/db";

export const AuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/autherror", // Error code passed in query string as ?error=XXXX
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async signIn({ user, account, profile }) {
      const username = (profile as GithubProfile)?.login;
      const adminUser = await prisma.user.findUnique({
        where: { username, role: "admin" },
      });

      //we found an admin user with this username
      if (adminUser) {
        return true;
      }
      return false;
    },
  },
};
