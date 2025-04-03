import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from 'pg';

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false // Allow connections to any PostgreSQL server
  }
});

const db = drizzle(pool);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration completed!");
    await pool.end(); // Close the connection pool when done
  } catch (error) {
    console.error("Error during migration:", error);
    await pool.end(); // Make sure to close the pool even if there's an error
    process.exit(1);
  }
};

main();