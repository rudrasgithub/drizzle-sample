import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
console.log(connectionString)
if (!connectionString) {
    throw new Error("DATABASE_URL is not set in environment variables");
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

(async () => {
    try {
      await client.unsafe('SELECT 1');
      console.log("Database connection established successfully!");
    } catch (error) {
      console.log("Error connecting to the database:", error);
      process.exit(1);
    }
  })();

export { db, client }