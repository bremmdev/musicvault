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
    async jwt({ token, user }: any) {
      if (user) token.isAdmin = user.email === "bremmdev@gmail.com";
      return token;
    },

    // If you want to use the role in client components
    async session({ session, token }: any) {
      if (session?.user) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
};
