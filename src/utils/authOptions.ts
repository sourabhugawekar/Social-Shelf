import type {NextAuthOptions} from "next-auth";
import NextAuth,{DefaultSession} from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
// import clientPromise from "./mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise, CustomMongoDBAdapter } from "@/dbConfig/custom-mongodb-adapter";
import {ObjectId} from "mongodb"

interface ExtendedUser {
  id?:string;
  name?:string;
  email?:string;
}


// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       role?: string;
//     } & DefaultSession["user"];
//   }
// }

export const authOptions: NextAuthOptions = {
  // adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await ConnectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.fullname || user.email.split("@")[0],
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: CustomMongoDBAdapter(),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        console.log(session);
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token?.role as string;
      }
      return session;
    },
  },
  events:{
     async createUser(userObj) {
      const user = userObj?.user;
      console.log("User is ",userObj)
     const {id,name,email} = user as ExtendedUser;
      const client = await clientPromise;
      const db = client.db("Social");

      // const userId = (user as any).id;
      // const userName = (user as any).name;
      // const userEmail = (user as any).email;
      if(!id || !name ) {
        console.log('No User with name is Found !');
        return
      }

      await db.collection("users").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            fullname: name,
            email: email,
            password: "password", 
            role: "student", 
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
