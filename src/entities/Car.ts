import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  // OneToMany, // Will be used later for relationships
} from "typeorm";
// import { MaintenanceLog } from "./MaintenanceLog"; // Example for future relationship
// import { Warranty } from "./Warranty";
// import { FuelLog } from "./FuelLog";
// import { CarExpense } from "./CarExpense";
// import { Reminder } from "./Reminder";

@Entity("cars") // Specifies the table name
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index() // Good to index user_id for faster lookups
  @Column({ type: "varchar", length: 255 })
  user_id!: string;

  @Column({ type: "varchar", length: 100 })
  make!: string;

  @Column({ type: "varchar", length: 100 })
  model!: string;

  @Column({ type: "int", nullable: true })
  year!: number | null;

  @Column({ type: "varchar", length: 17, unique: true, nullable: true })
  vin!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  license_plate!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  nickname!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  color!: string | null;

  @Column({ type: "date", nullable: true })
  purchase_date!: string | null; // Dates can be stored as strings in YYYY-MM-DD format or Date objects

  @Column({ type: "int", nullable: true })
  initial_mileage!: number | null;

  @Column({ type: "varchar", length: 2048, nullable: true })
  car_image_url!: string | null;

  // We'll add other document URLs (insurance_doc_url, registration_doc_url) later or as needed

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ type: "timestamp", nullable: true })
  lastAccessedAt!: Date | null;

  @Column({ type: "boolean", default: false })
  isDefault!: boolean;

  // Example of a relationship (uncomment and define MaintenanceLog entity later)
  // @OneToMany(() => MaintenanceLog, (log) => log.car)
  // maintenance_logs: MaintenanceLog[];

  // Add other relationships (warranties, fuel_logs, expenses, reminders) similarly
}