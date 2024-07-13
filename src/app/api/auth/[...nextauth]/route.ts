import NextAuth, { Account, Awaitable, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import axios, { AxiosError } from "axios";

const secret = process.env.NEXTAUTH_SECRET;
console.log("==========>", process.env.NEXT_PUBLIC_VOCABULARY_API_BASE_URL);
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
  secret: secret,
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
        return axios
          .post<{ token: string }>(
            `${process.env.NEXT_PUBLIC_VOCABULARY_API_BASE_URL}/signInOrSignUp`,
            {
              displayName: user.name || "user",
              provider: account.provider,
              userProviderId: user.id,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.API_ADMIN_TOKEN}`,
              },
            }
          )
          .then((result) => {
            token.backendToken = result.data.token;
            return token;
          })
          .catch((error) => {
            console.error((error as AxiosError).response?.data);
            throw error;
          });
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
