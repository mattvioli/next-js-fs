"use client";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";

export function SignIn() {
  return <Button onClick={() => signIn()}>Sign in</Button>;
}
