import { config } from "dotenv";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

config({ path: ".env.local" });

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