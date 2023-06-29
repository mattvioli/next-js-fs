"use client";
import styles from "../page.module.css";
import { Heading } from "@chakra-ui/react";
import { Settings } from "../components/settings";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { status } = useSession();
  if (status !== "authenticated") return null;
  return (
    <main className={styles.main}>
      <Heading>Welcome, welcome to your profile!</Heading>
      <Settings />
    </main>
  );
}
