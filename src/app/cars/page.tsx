"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css"; // Assuming the same styles can be used or create a new module.css

export default function CarsPage() {
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
    } else if (status === "unauthenticated") {
        router.push("/login"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  // Function to handle car card click and save to local storage
  const handleCarClick = (carId: number) => {
    localStorage.setItem('lastAccessedCarId', carId.toString());
    router.push(`/cars/${carId}`);
  };

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}> {/* Keep main for content */}
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
                  onClick={() => handleCarClick(car.id)} // Use the new handler
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
      </main>
      <footer className={styles.footer}> {/* Update footer */}
        <p>Car Maintainer App</p> {/* Move title to footer */}
        {/* Remove other footer content */}
      </footer>
    </div>
  );
}
