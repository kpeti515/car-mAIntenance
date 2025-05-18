import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Car } from "./entities/Car";

// Ensure environment variables are loaded. For Next.js, this happens automatically.
// For standalone TypeORM CLI usage, you might need to load .env files explicitly
// if not using Next.js's runtime environment.

const getDataSourceOptions = (): DataSourceOptions => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "PostgreSQL connection string environment variable (DATABASE_URL) is not set"
    );
  }

  return {
    type: "postgres",
    url: connectionString,
    synchronize: false, // Never use TRUE in production!
    logging: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"], // Log queries in dev
    entities: [Car],
    migrations: [],
    subscribers: [],
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    // For Vercel Postgres and many other cloud providers, rejectUnauthorized: false is common.
    // Always consult your provider's documentation.
  };
};

export const AppDataSource = new DataSource(getDataSourceOptions());

// It's good practice to initialize the DataSource when the application starts
// or when it's first needed, rather than on every import.
// However, for CLI usage, it needs to be exportable directly.S