import GithubProvider from "next-auth/providers/github";

export const AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user, session }: any) {
      if (user) {
        return {
          ...token,
          isAdmin: user.email === "bremmdev@gmail.com" ? true : false,
        };
      }
    },
    // If you want to use the role in client components
    async session({ session, token, user }: any) {
      if (session) {
        return {
          ...session,
          user: {
            ...session.user,
            isAdmin: session.user.email === "bremmdev@gmail.com" ? true : false,
          },
        };
      }
    },
  },
};
