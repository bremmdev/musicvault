import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   * add isAdmin to the user object and merge the original session object in to prevent overwriting
   */
  interface Session {
    user: {
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}
