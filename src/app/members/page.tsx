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
import { useQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react";
import { SignIn } from "../components/signin-btn";

export const GET_POKEMON = gql`
  {
    gen1_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
      order_by: { id: asc }
    ) {
      name
      id
    }
  }
`;

export default function MembersSection() {
  const { status } = useSession();
  const { loading, data: pokemons } = useQuery(GET_POKEMON);
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
