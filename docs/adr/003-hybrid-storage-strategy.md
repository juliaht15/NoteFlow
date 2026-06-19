# ADR 003: Estrategia Híbrida de Almacenamiento (PostgreSQL y Firebase/S3)

## Estado
Aceptado

## Contexto
NoteFlow requiere persistencia tanto de datos estructurados complejos (títulos, descripciones de tareas, metadatos de geolocalización, marcas de tiempo) como de archivos binarios pesados (fotografías de perfil tomadas desde el hardware del dispositivo). Almacenar archivos binarios pesados directamente en una base de datos relacional degrada drásticamente la velocidad de las consultas y satura el ancho de banda del servidor de la API.

## Decisión
Implementamos una **arquitectura híbrida desacoplada**:
1. Los registros de texto, estados de completado de checklists y coordenadas GPS se almacenan en una base de datos relacional **PostgreSQL** (gestionada de forma remota en Neon) mediante una API estructurada en Next.js.
2. Los elementos binarios (archivos multimedia/imágenes de perfil) se gestionan a través de almacenamiento en la nube orientado a objetos (**Firebase Storage / AWS S3**).

La aplicación móvil actúa como cliente enviando el binario al bucket, recuperando una URL pública persistente (`HTTPS`) que es la que se guarda finalmente como un string corto dentro del registro del usuario en la base de datos relacional.

## Consecuencias
* **Positivas:** Consultas a la API extremadamente rápidas y eficientes (tablas relacionales ligeras), minimización de los costes de almacenamiento y una escalabilidad de infraestructura óptima alineada con los estándares de la industria.
* **Negativas:** Requiere coordinar dos servicios en la nube diferentes, obligando a manejar de forma precisa la consistencia de datos si una subida de archivos se interrumpe.