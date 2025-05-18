"use client";
import { useState } from "react";

export default function CarForm() {
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Add a Car</h2>
      <input name="make" value={form.make} onChange={handleChange} placeholder="Make" required />
      <input name="model" value={form.model} onChange={handleChange} placeholder="Model" required />
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" type="number" />
      <input name="vin" value={form.vin} onChange={handleChange} placeholder="VIN" />
      <input name="license_plate" value={form.license_plate} onChange={handleChange} placeholder="License Plate" />
      <input name="nickname" value={form.nickname} onChange={handleChange} placeholder="Nickname" />
      <input name="color" value={form.color} onChange={handleChange} placeholder="Color" />
      <input name="purchase_date" value={form.purchase_date} onChange={handleChange} placeholder="Purchase Date (YYYY-MM-DD)" type="date" />
      <input name="initial_mileage" value={form.initial_mileage} onChange={handleChange} placeholder="Initial Mileage" type="number" />
      <input name="car_image_url" value={form.car_image_url} onChange={handleChange} placeholder="Image URL" />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Car"}</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>Car added!</div>}
    </form>
  );
}
