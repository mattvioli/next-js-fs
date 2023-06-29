/* eslint-disable */
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string | null;
      jobTitle: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string | null;
    jobTitle: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string | null;
    jobTitle: string | null;
  }
}
