"use client";

import { Box } from "@chakra-ui/react";
import { SignOut } from "./signout-btn";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { status } = useSession();
  if (status !== "authenticated") return null;
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      bg="white"
      borderBottom="black"
      px={4}
    >
      <SignOut />
    </Box>
  );
}
