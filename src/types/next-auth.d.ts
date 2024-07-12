import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    backendToken?: string;
  }
  interface JWT extends DefaultJWT {
    backendToken?: string;
  }
}
