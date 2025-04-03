import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// This configuration works with both Neon and Railway PostgreSQL
const databaseUrl = process.env.DATABASE_URL!;
export const sql = neon(databaseUrl.replace("postgresql://", "postgres://"));
export const db = drizzle(sql);

