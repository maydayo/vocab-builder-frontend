import { login } from "@/services/vocaularyBuilderApi/login";
import NextAuth, { Account, Awaitable, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_PROVIDER_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_PROVIDER_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: secret,
  },
  callbacks: {
    jwt: ({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: User;
      account: Account | null;
    }): Awaitable<JWT> => {
      if (account && user) {
        return login({ username: "maydayodayo", password: "maySoCool55" }).then(
          (data) => {
            token.backendToken = data;
            return token;
          }
        );
      } else {
        return token;
      }
    },
    session: ({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user: AdapterUser;
    }) => {
      const modifiedSession: Session = {
        ...session,
        backendToken: token.backendToken as string,
      };
      return modifiedSession;
    },
  },
});

export { handler as GET, handler as POST };
