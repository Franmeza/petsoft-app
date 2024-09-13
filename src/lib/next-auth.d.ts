import { User } from "next-auth";
declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    email: string;
    isSuscribed: boolean;
  }
}
declare module "next-auth" {
  interface User {
    email: string;
    isSuscribed: boolean;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}
