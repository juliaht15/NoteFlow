import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Esta función asegura que la tabla existe antes de hacer nada
async function ensureTable() {
  const queryText = `
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      type VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(queryText);
}

// Ejecutamos la creación de la tabla al importar o iniciar
ensureTable().catch(console.error);

export async function query<T>(text: string, params?: any[]): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows;
}