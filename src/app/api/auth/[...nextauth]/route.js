import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      // Add userId to session
      session.user.id = token.sub
      return session
    },
  },
  // Optional SQL or MongoDB database to persist users
  database: process.env.DATABASE_URL
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
