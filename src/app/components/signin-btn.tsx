"use client";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";

export function SignIn() {
  return (
    <Button onClick={() => signIn(undefined, { callbackUrl: "/members" })}>
      Sign in
    </Button>
  );
}
