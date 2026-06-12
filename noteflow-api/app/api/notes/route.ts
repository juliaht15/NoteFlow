import { NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';

const noteSchema = z.object({
  title: z.string().min(3),
  content: z.string().optional().nullable(),
  type: z.enum(['note', 'checklist', 'idea']),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

export async function GET() {
  try {
    const notes = await query('SELECT * FROM notes ORDER BY created_at DESC');
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error GET:', error);
    return NextResponse.json({ error: 'Error al obtener notas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = noteSchema.parse(body);

    const result = await query(
      `INSERT INTO notes (title, content, type, latitude, longitude) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        validatedData.title, 
        validatedData.content ?? null, 
        validatedData.type, 
        validatedData.latitude ?? null, 
        validatedData.longitude ?? null
      ]
    );

    return NextResponse.json(result[0], { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error POST:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}