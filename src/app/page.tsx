"use client";
import { SignIn } from "./components/signin-btn";
import { SignUp } from "./components/signup-form";
import styles from "./page.module.css";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Heading>Welcome, this is a website!</Heading>
      <SignIn />
      <SignUp />
    </main>
  );
}
