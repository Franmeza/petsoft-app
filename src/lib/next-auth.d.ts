import {} from "next-auth/jwt";

declare module "next-auth/core/jwt" {
  interface JWT {
    userId: string;
  }
}
