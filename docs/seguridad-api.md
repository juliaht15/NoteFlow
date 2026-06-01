# Seguridad de la API NoteFlow

## SQL Injection
La inyección SQL es una vulnerabilidad donde código malicioso es insertado en consultas SQL.

### Ejemplo de ataque:
Si concatenamos `query = "SELECT * FROM notes WHERE title = '" + input + "'"`, un atacante podría introducir `'; DROP TABLE notes;--`.

### Prevención: Consultas Parametrizadas
La única forma segura de ejecutar SQL es mediante parámetros:
```sql
-- Seguro: El motor de BD trata el parámetro como dato, no como código
SELECT * FROM notes WHERE title = $1;