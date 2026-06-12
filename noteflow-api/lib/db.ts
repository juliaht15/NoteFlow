import { neon, NeonQueryFunction } from '@neondatabase/serverless';

// Inicialización segura de la conexión
const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL!);

export async function query<T>(text: string, params: (string | number | boolean | null)[] = []) {
  return await sql(text, params) as T[];
}