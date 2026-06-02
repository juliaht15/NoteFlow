import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const notes = await query('SELECT * FROM notes ORDER BY created_at DESC');
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Error al conectar' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, type } = await request.json();
    await query(
      'INSERT INTO notes (title, content, type, created_at) VALUES ($1, $2, $3, NOW())',
      [title, content, type]
    );
    return NextResponse.json({ message: 'Nota creada' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
  }
}