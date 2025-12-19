  import NextAuth,{ DefaultSession,User as NextAuthUser } from "next-auth";
  import "next-auth/jwt";

  declare module "next-auth" {
    interface Session extends DefaultSession{
      user:  DefaultSession["user"] & {
        id: string;
        role: string;
      } ;
    }

    interface User extends NextAuthUser {
      id:string;
      role?:string;
    }

  }

  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      role?: string;
    }
  }
