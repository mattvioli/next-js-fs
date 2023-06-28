"use client";
import { signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";

export function SignOut() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}
