import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

config({ path: ".env.local" });

// Get the database URL and ensure it uses the correct protocol
const databaseUrl = process.env.DATABASE_URL!;
const connectionString = databaseUrl.replace("postgresql://", "postgres://");

const sql = neon(connectionString);
const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration completed!");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();