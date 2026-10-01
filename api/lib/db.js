import { neon } from '@neondatabase/serverless';

/**
 * Returns a Neon SQL query client if DATABASE_URL or POSTGRES_URL is configured.
 * Returns null if running in development without a configured database.
 */
export function getDb() {
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL;

  if (!connectionString) {
    return null;
  }

  return neon(connectionString);
}

/**
 * Ensures the visitor_logs table and performance indices exist.
 */
export async function initDb() {
  const sql = getDb();
  if (!sql) return false;

  await sql`
    CREATE TABLE IF NOT EXISTS visitor_logs (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      ip VARCHAR(100),
      country VARCHAR(10),
      region VARCHAR(100),
      city VARCHAR(100),
      browser VARCHAR(100),
      os VARCHAR(100),
      device VARCHAR(50),
      referrer TEXT,
      page VARCHAR(255),
      session_id VARCHAR(100)
    );
  `;

  // Create indexing for fast query performance
  await sql`
    CREATE INDEX IF NOT EXISTS idx_visitor_logs_timestamp ON visitor_logs (timestamp DESC);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_visitor_logs_country ON visitor_logs (country);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_visitor_logs_session ON visitor_logs (session_id, timestamp);
  `;

  return true;
}
