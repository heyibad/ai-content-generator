import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // For email/password login
import { db } from "@/../utils/db"; // Drizzle ORM setup
import { Users, subscriptionType } from "@/../utils/schema"; // Your Drizzle schema
import { eq } from "drizzle-orm"; // Drizzle's query utility
import bcrypt from "bcrypt"; // For password hashing

export const NextAuthOption: NextAuthOptions = {
  providers: [
    // OAuth providers for GitHub and Google
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Credentials Provider for email/password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Look up the user in the database
        const existingUser = await db
          .select()
          .from(Users)
          .where(eq(Users.email, credentials.email))
          .limit(1);

        if (!existingUser.length) {
          throw new Error("No user found with the provided email");
        }

        const user = existingUser[0];

        // Check the password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password!);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Return user data if authentication is successful
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          profileUrl: user.profileUrl,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Token expires after 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // JWT token expiration set to 24 hours
  },
  pages:{
    signIn: '/login',

},
  callbacks: {
    async jwt({ token, account, profile, user }:any) {
      // If account exists, this means the user is logging in via OAuth
      if (account && profile) {
        const email = profile.email!;
        const username = account.provider === "github" ? (profile as any).login : profile.name!;
        const picture = profile.image || profile.picture;

        // Check if the user exists in the database
        const existingUser = await db
          .select()
          .from(Users)
          .where(eq(Users.email, email))
          .limit(1);

        if (!existingUser.length) {
          // Insert new user if it does not exist (OAuth signup)
          await db.insert(Users).values({
            email,
            username,
            profileUrl: picture,
            name: profile.name || username,
            subscription: "basic", // Default subscription
          });
        }

        // Attach user data to the token
        token.email = email;
        token.username = username;
        token.picture = picture;
        token.name = profile.name || username;
      }

      // Attach user details if coming from credentials login
      if (user) {
        token.email = user.email;
        token.username = user.username;
        token.name = user.name;
        token.picture = user.profileUrl;
      }

      return token;
    },
    async session({ session, token }:any) {
      // Pass the JWT token fields to session
      if (token) {
        session.user!.email = token.email;
        session.user!.username = token.username;
        session.user!.name = token.name;
        session.user!.picture = token.picture;
      }

      return session;
    },
  },
  secret: process.env.JWT_SECRET!,
};


