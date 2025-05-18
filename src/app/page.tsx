"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./page.module.css";
import Profile from "@/components/Profile";
import CarForm from "@/components/CarForm";


export default function Home() {
  const { status } = useSession();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to Car Maintainer App</h1>
        {status === "authenticated" ? (
          <>
            <Profile />
            <CarForm />
          </>
        ) : (
          <div className={styles.ctas}>
            <a href="/login" className={styles.primary}>Login</a>
            <a href="/signup" className={styles.secondary}>Sign Up</a>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
