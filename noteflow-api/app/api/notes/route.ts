import { NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '../../../lib/db'; // Corrección de ruta relativa para aislar entornos

const noteSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().optional().nullable(),
  type: z.enum(['note', 'checklist', 'idea']),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

interface DBNoteRow {
  id: string;
  title: string;
  content: string | null;
  type: 'note' | 'checklist' | 'idea';
  latitude: string | null;
  longitude: string | null;
  created_at: string;
  updated_at: string;
}

export async function GET() {
  try {
    const dbNotes = await query<DBNoteRow>('SELECT * FROM notes ORDER BY created_at DESC');
    
    // Corrección ESLint/TS: Tipado explícito de (note: DBNoteRow) para evitar el any implícito
    const notes = dbNotes.map((note: DBNoteRow) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      type: note.type,
      latitude: note.latitude ? parseFloat(note.latitude) : null,
      longitude: note.longitude ? parseFloat(note.longitude) : null,
      createdAt: note.created_at,
      updatedAt: note.updated_at,
    }));

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

    const result = await query<DBNoteRow>(
      `INSERT INTO notes (id, title, content, type, latitude, longitude) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, title, content, type, latitude, longitude, created_at, updated_at`,
      [
        validatedData.id,
        validatedData.title, 
        validatedData.content ?? null, 
        validatedData.type, 
        validatedData.latitude ?? null, 
        validatedData.longitude ?? null
      ]
    );

    const newNote = {
      id: result[0].id,
      title: result[0].title,
      content: result[0].content,
      type: result[0].type,
      latitude: result[0].latitude ? parseFloat(result[0].latitude) : null,
      longitude: result[0].longitude ? parseFloat(result[0].longitude) : null,
      createdAt: result[0].created_at,
      updatedAt: result[0].updated_at,
    };

    return NextResponse.json(newNote, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error POST:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}