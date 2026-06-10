import { neon } from '@neondatabase/serverless';

// Inicializamos el cliente
const sql = neon(process.env.DATABASE_URL!);

// Usamos el tipo correcto para los parámetros de Neon
export async function query(text: string, params: (string | number | boolean | null)[] = []) {
  // Ejecutamos la consulta. 'as any' silencia el error de TypeScript sobre TemplateStringsArray
  return await (sql as any)(text, params);
}