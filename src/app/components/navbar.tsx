"use client";

import { Box } from "@chakra-ui/react";
import { SignOut } from "./signout-btn";
import { useSession } from "next-auth/react";
import { Link } from "@chakra-ui/next-js";
import { Button, Text } from "@chakra-ui/react";

export function Navbar() {
  const { status, data: sessions } = useSession();
  if (status !== "authenticated") return null;
  const { username, jobTitle } = sessions.user;
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      bg="white"
      borderBottom="black"
      px={4}
      gap={"8px"}
    >
      {(username || jobTitle) && (
        <Text marginRight="24px" align="center" justifySelf="center">
          Hello, {jobTitle} {username}
        </Text>
      )}
      <Link href="/members">
        <Button>Members</Button>
      </Link>
      <Link href="/profile">
        <Button>Profile</Button>
      </Link>
      <SignOut />
    </Box>
  );
}
