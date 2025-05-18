"use client";
import { useRouter } from "next/navigation";
import CarForm from "@/components/CarForm";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from '../[id]/page.module.css'; // Import styles from car details page

export default function NewCarPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [createdCarId, setCreatedCarId] = useState<number | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Handler to be passed to CarForm
  const handleSuccess = (car: { id: number }) => {
    setCreatedCarId(car.id);
    router.push(`/cars/${car.id}`);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className={styles.container}> {/* Use container class */}
      <button onClick={() => router.back()} className={styles.backButton}>&larr; Back</button> {/* Use backButton class */}
      <h2 className={styles.heading}>Add a New Vehicle</h2> {/* Use heading class */}
      <CarForm onSuccess={handleSuccess} />
    </div>
  );
}
