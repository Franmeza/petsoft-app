import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
declare module "next-auth/core/jwt" {
  interface JWT {
    userId: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}
