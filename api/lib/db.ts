import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function query<T>(text: string, params?: any[]): Promise<T[]> {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida en el entorno");
  }
  const res = await pool.query(text, params);
  return res.rows;
}