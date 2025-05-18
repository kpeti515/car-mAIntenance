
import { SessionStrategy, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: { sub?: string } }) {
      // Add userId to session
      (session.user as { id?: string }).id = token.sub;
      return session;
    },
  },
  database: process.env.DATABASE_URL,
};
