"use client";

import styles from "../page.module.css";
import {
  Heading,
  CircularProgress,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { SignIn } from "../components/signin-btn";
import { GET_POKEMON } from "./../../queries/pokemon";

export default function MembersSection() {
  const { status, data: sessions } = useSession();
  const { loading, data: pokemons } = useQuery(GET_POKEMON);
  console.log({ sessions });

  if (status === "loading") {
    return (
      <main className={styles.main}>
        <CircularProgress />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className={styles.main}>
        <span>
          Please <SignIn /> to view this page.{" "}
        </span>
      </main>
    );
  }

  if (status === "authenticated") {
    return (
      <main className={styles.main}>
        <Heading>Welcome, this is the members section!</Heading>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Generation one Pokedex</TableCaption>
              <Thead>
                <Tr>
                  <Th>Number</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pokemons.gen1_species.map((pokemon) => (
                  <Tr key={pokemon.id}>
                    <Td>{pokemon.id}</Td>
                    <Td>{pokemon.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </main>
    );
  }
}
