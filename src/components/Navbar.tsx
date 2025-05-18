"use client";

import { useSession } from "next-auth/react";
import Link from "next/link"; // Use Link for client-side navigation
import styles from "./Navbar.module.css"; // Import Navbar styles
import Profile from "@/components/Profile"; // Import Profile component

const Navbar = () => {
  const { status } = useSession();

  return (
    <header className={styles.header}> {/* Corrected header tag */}
      <div className={styles.navLeft}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link> {/* Use Link */}
          {status === "authenticated" && (
            <>
              <Link href="/cars" className={styles.navLink}>Cars</Link>
              <Link href="/cars/new" className={styles.navLink}>Add New Vehicle</Link>
            </>
          )}
        </nav>
      </div>
      {status === "authenticated" && (
        <div className={styles.navRight}>
          <Profile />
        </div>
      )}
    </header>
  );
};

export default Navbar;
