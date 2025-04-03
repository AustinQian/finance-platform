import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({path:".env.local"})

// Get the database URL and ensure it uses the correct protocol
const databaseUrl = process.env.DATABASE_URL!;
const connectionString = databaseUrl.replace("postgresql://", "postgres://");

export default defineConfig({
    schema: "./db/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString,
    },
    verbose: true,
    strict: true,
})