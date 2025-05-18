"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./page.module.css";
import Profile from "@/components/Profile";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const [cars, setCars] = useState<any[]>([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [carsError, setCarsError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      async function fetchCars() {
        setLoadingCars(true);
        setCarsError("");
        try {
          const res = await fetch("/api/cars");
          if (!res.ok) throw new Error("Failed to fetch cars");
          setCars(await res.json());
        } catch (err: any) {
          setCarsError(err.message || "Unknown error");
        } finally {
          setLoadingCars(false);
        }
      }
      fetchCars();
    }
  }, [status]);

  return (
    <div className={styles.page}>
      <header className={styles.header}> {/* Add header */}
        <div className={styles.navLeft}> {/* Container for left side of nav */}
          <nav className={styles.nav}> {/* Add navigation */}
            <a href="/" className={styles.navLink}>Home</a>
            {status === "authenticated" && (
              <a href="/cars/new" className={styles.navLink}>Add New Vehicle</a>
            )}
          </nav>
        </div>
        {status === "authenticated" && (
          <div className={styles.navRight}> {/* Container for right side of nav */}
            <Profile /> {/* Include Profile component */}
          </div>
        )}
      </header>
      <main className={styles.main}> {/* Keep main for content */}
        {status === "authenticated" ? (
          <>
            {/* Profile component is now in the header */}
            {
              loadingCars ? (
                <p>Loading cars...</p>
              ) : carsError ? (
                <p style={{ color: 'red' }}>{carsError}</p>
              ) : cars.length > 0 ? (
                <div className={styles.carList}>
                  <h2>Your Vehicles</h2>
                  {cars.map(car => (
                    <div
                      key={car.id}
                      className={styles.carCard}
                      onClick={() => router.push(`/cars/${car.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <h3>{car.make} {car.model}</h3>
                      <p>License Plate: {car.license_plate}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No cars found. Add a new vehicle!</p>
              )
            }
          </>
        ) : status === "unauthenticated" ? (
          <div className={styles.ctas}>
            <a href="/login" className={styles.primary}>Login</a>
            <a href="/signup" className={styles.secondary}>Sign Up</a>
          </div>
        ) : null}
      </main>
      <footer className={styles.footer}> {/* Update footer */}
        <p>Car Maintainer App</p> {/* Move title to footer */}
        {/* Remove other footer content */}
      </footer>
    </div>
  );
}
