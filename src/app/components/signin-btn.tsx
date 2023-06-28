"use client";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";

export function SignIn() {
  return (
    <Button
      onClick={() =>
        signIn(undefined, { callbackUrl: "http://localhost:3000/members" })
      }
    >
      Sign in
    </Button>
  );
}
