import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const notes = await query('SELECT * FROM notes ORDER BY created_at DESC');
    return NextResponse.json(notes);
  } catch (error: any) {
    // Esto mostrará el error real en tu navegador y en los logs de Render
    console.error('DATABASE_ERROR:', error);
    return NextResponse.json({ 
        error: 'Error al conectar', 
        details: error.message 
    }, { status: 500 });
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
  } catch (error: any) {
    console.error('DATABASE_ERROR:', error);
    return NextResponse.json({ 
        error: 'Error al guardar', 
        details: error.message 
    }, { status: 500 });
  }
}