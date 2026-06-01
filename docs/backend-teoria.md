# Fundamentos del Backend (Fase 7)

## Patrón Cliente-Servidor
NoteFlow sigue una arquitectura de 3 capas:
1. **App Móvil (Cliente)**: Interfaz de usuario y lógica de estado local.
2. **API REST (Servidor)**: Capa intermedia que valida datos y gestiona permisos.
3. **PostgreSQL (Base de Datos)**: Almacenamiento persistente y relacional.

## Bases de Datos Relacionales y SQL
Utilizamos PostgreSQL para garantizar integridad **ACID** (Atomicidad, Consistencia, Aislamiento, Durabilidad).

### Esquema y Relaciones (Diagrama Entidad-Relación)
- **notes**: Entidad principal (ID, título, contenido, tipo).
- **checklist_items**: Depende de `notes` mediante una *Foreign Key* (`note_id`). Usamos `ON DELETE CASCADE` para que al borrar una nota, sus ítems se borren automáticamente.
- **note_tags**: Relación muchos-a-muchos para las etiquetas.



## Operaciones con JOINs
- **INNER JOIN**: Retorna registros que tienen coincidencia en ambas tablas.
- **LEFT JOIN**: Retorna todos los registros de la tabla izquierda, junto con los coincidentes de la derecha. Lo usamos para obtener notas aunque no tengan `checklist_items` asociados.