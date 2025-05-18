"use client";

import { useState, useEffect } from "react"; // Import useState and useEffect
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "./page.module.css";

// Define a type for car data
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  lastAccessedAt?: string; // Add lastAccessedAt property
  isDefault?: boolean; // Add isDefault property
  // Add other car properties as needed
}

export default function Home() {
  const { status } = useSession();
  const [lastAccessedCar, setLastAccessedCar] = useState<Car | null>(null); // State to store the last accessed car
  const [loading, setLoading] = useState(true); // State for loading indicator
  const router = useRouter(); // Initialize router

  useEffect(() => {
    if (status === "authenticated") {
      // Fetch the last accessed car when authenticated
      const fetchLastAccessedCar = async () => {
        try {
          const response = await fetch("/api/cars/lastAccessed"); // Call the new endpoint
          if (response.ok) {
            const data: Car | null = await response.json();
            setLastAccessedCar(data);
          } else {
            // Handle error fetching car
            console.error("Failed to fetch last accessed car:", response.statusText);
            setLastAccessedCar(null); // Set to null on error
          }
        } catch (error) {
          console.error("Error fetching last accessed car:", error);
          setLastAccessedCar(null); // Set to null on error
        } finally {
          setLoading(false);
        }
      };

      fetchLastAccessedCar();

    } else if (status === "unauthenticated") {
      setLoading(false); // Not loading if unauthenticated
      setLastAccessedCar(null); // No car for unauthenticated user
    }
  }, [status]); // Re-run effect when authentication status changes

  const renderCarContent = () => {
    if (loading) {
      return <p>Loading car...</p>;
    }

    if (status === "unauthenticated") {
      return (
        <div className={styles.ctas}>
          <a href="/login" className={styles.primary}>Login</a>
          <a href="/signup" className={styles.secondary}>Sign Up</a>
        </div>
      );
    }

    if (!lastAccessedCar) {
      return (
        <div className={styles.ctas}>
          <a href="/cars/new" className={styles.primary}>Add your first car</a>
        </div>
      );
    }

    // Display the last accessed car
    return (
      <div className={styles.carCard} onClick={() => router.push(`/cars/${lastAccessedCar.id}`)}>
        <h2>Last Accessed Car</h2>
        <p>Make: {lastAccessedCar.make}</p>
        <p>Model: {lastAccessedCar.model}</p>
        <p>Year: {lastAccessedCar.year}</p>
        {/* Display other car details */}
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {renderCarContent()}
      </main>
      <footer className={styles.footer}>
        <p>Car Maintainer App</p>
      </footer>
    </div>
  );
}
