"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache()
});

export function Providers({
  children,
  session
}: {
  children?: React.ReactNode;
  session?: Session;
}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
