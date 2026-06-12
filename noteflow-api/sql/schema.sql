-- El comando CASCADE se encarga de borrar las dependencias (como checklist_items) automáticamente
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS checklist_items CASCADE;

-- Ahora creamos las tablas desde cero
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    type TEXT NOT NULL CHECK (type IN ('note', 'checklist', 'idea')),
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE checklist_items (
    id SERIAL PRIMARY KEY,
    note_id INTEGER REFERENCES notes(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE
);