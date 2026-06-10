import { NextResponse } from 'next/server';
import { query } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Cuerpo recibido:", body); // Esto te ayudará a ver qué llega en la consola de tu terminal
    
    const { title, content, type } = body;

    // Validación básica
    if (!title) {
        return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
    }

    const newNote = await query(
      `INSERT INTO notes (title, content, type) VALUES ($1, $2, $3) RETURNING *`,
      [title, content, type || 'note']
    );

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Error detallado:', error); // Mira esto en tu terminal de VS Code
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}