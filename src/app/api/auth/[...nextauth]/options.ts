import GithubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import { Token, UserWithAdmin } from "@/types/types";

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
  // callbacks: {
  //   // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
  //   async jwt({ token, user }: { token: Token; user: UserWithAdmin }) {
  //     if (user) token.isAdmin = user.isAdmin;
  //     return token;
  //   },
  //   // If you want to use the role in client components
  //   async session({ session, token }: { session: any; token: Token }) {
  //     session.user.isAdmin = token.isAdmin;
  //     return session;
  //   },
  // },
};
