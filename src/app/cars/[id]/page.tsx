'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import use
import styles from './page.module.css';
import { useSession } from "next-auth/react"; // Import useSession

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get session and status
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Unwrap the params Promise and assert type
  const carId = params.id;

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading session
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }

    async function fetchCar() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/cars/${carId}`); // Use carId
        if (res.status === 404) {
          setError("Car not found."); // Set specific error for 404
          setCar(null); // Clear car data
          return; // Stop further processing
        }
        if (!res.ok) throw new Error("Failed to fetch car details");
        setCar(await res.json());
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [carId, status, router]); // Depend on carId, status, and router

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading state while session is loading
  }

  if (status === "unauthenticated") {
    return null; // Or a message, but redirecting is better UX
  }

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>&larr; Back</button>
      <h2 className={styles.heading}>Car Details</h2>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {car && (
        <div className={styles.carDetails}>
          <div><b>Make:</b> {car.make}</div>
          <div><b>Model:</b> {car.model}</div>
          <div><b>Year:</b> {car.year}</div>
          <div><b>VIN:</b> {car.vin}</div>
          <div><b>License Plate:</b> {car.license_plate}</div>
          <div><b>Nickname:</b> {car.nickname}</div>
          <div><b>Color:</b> {car.color}</div>
          <div><b>Purchase Date:</b> {car.purchase_date}</div>
          <div><b>Initial Mileage:</b> {car.initial_mileage}</div>
          <div><b>Notes:</b> {car.notes}</div>
        </div>
      )}
    </div>
  );
}
