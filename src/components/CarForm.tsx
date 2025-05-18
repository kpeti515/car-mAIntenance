"use client";
import { useState } from "react";
import styles from './CarForm.module.css'; // Import the new CSS module

export default function CarForm({ onSuccess }: { onSuccess?: (car: any) => void }) {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    license_plate: "",
    nickname: "",
    color: "",
    purchase_date: "",
    initial_mileage: "",
    car_image_url: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add car");
      const car = await res.json();
      setSuccess(true);
      setForm({
        make: "",
        model: "",
        year: "",
        vin: "",
        license_plate: "",
        nickname: "",
        color: "",
        purchase_date: "",
        initial_mileage: "",
        car_image_url: "",
        notes: ""
      });
      if (onSuccess) onSuccess(car);
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err && typeof err === "object" && "message" in err) {
        message = (err as { message?: string }).message || message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}> {/* Use the form class */}
      {/* <h2>Add a Car</h2> */}
      <input name="make" value={form.make} onChange={handleChange} placeholder="Make" required className={styles.input} /> {/* Use input class */}
      <input name="model" value={form.model} onChange={handleChange} placeholder="Model" required className={styles.input} /> {/* Use input class */}
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" type="number" className={styles.input} /> {/* Use input class */}
      <input name="vin" value={form.vin} onChange={handleChange} placeholder="VIN" className={styles.input} /> {/* Use input class */}
      <input name="license_plate" value={form.license_plate} onChange={handleChange} placeholder="License Plate" className={styles.input} /> {/* Use input class */}
      <input name="nickname" value={form.nickname} onChange={handleChange} placeholder="Nickname" className={styles.input} /> {/* Use input class */}
      <input name="color" value={form.color} onChange={handleChange} placeholder="Color" className={styles.input} /> {/* Use input class */}
      <input name="purchase_date" value={form.purchase_date} onChange={handleChange} placeholder="Purchase Date (YYYY-MM-DD)" type="date" className={styles.input} /> {/* Use input class */}
      <input name="initial_mileage" value={form.initial_mileage} onChange={handleChange} placeholder="Initial Mileage" type="number" className={styles.input} /> {/* Use input class */}
      <input name="car_image_url" value={form.car_image_url} onChange={handleChange} placeholder="Image URL" className={styles.input} /> {/* Use input class */}
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className={styles.textarea} /> {/* Use textarea class */}
      <button type="submit" disabled={loading} className={styles.button}>{loading ? "Adding..." : "Add Car"}</button> {/* Use button class */}
      {error && <div className={styles.error}>{error}</div>} {/* Use error class */}
      {success && <div className={styles.success}>Car added!</div>} {/* Use success class */}
    </form>
  );
}
