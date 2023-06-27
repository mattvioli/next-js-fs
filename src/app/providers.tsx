"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({
  children,
  session
}: {
  children?: React.ReactNode;
  session?: Session;
}) {
  return (
    <SessionProvider session={session}>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
