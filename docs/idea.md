# NoteFlow - Documentación de la Idea

## 1. Problema que resuelve
NoteFlow aborda la fragmentación de la información personal. Actualmente, los usuarios suelen mezclar recordatorios rápidos, listas de tareas estructuradas y pensamientos creativos en una sola lista desordenada o en múltiples apps. NoteFlow centraliza estos tres tipos de contenido en una interfaz fluida, permitiendo que cada uno tenga su propia lógica y visualización optimizada.

## 2. Usuario Objetivo y Caso de Uso
*   **Perfil:** Estudiantes, profesionales creativos y personas que buscan organizar su día a día de forma minimalista.
*   **Uso diario:** 
    *   El usuario abre la app para anotar una **Idea** rápida con una etiqueta de color para no olvidarla.
    *   Consulta su **Checklist** del supermercado o de tareas pendientes.
    *   Redacta una **Nota** extensa sobre una reunión o clase.

## 3. Funcionalidades Principales (MVP - Fase 6)
Estas son las funciones necesarias para la primera versión funcional:
*   **Gestión de Notas:** Crear, editar y eliminar notas de texto enriquecido.
*   **Sistema de Checklists:** Listas de tareas con posibilidad de marcar/desmarcar ítems y ver el progreso.
*   **Tablero de Ideas:** Notas rápidas categorizadas por colores y etiquetas (chips).
*   **Persistencia Local:** Los datos se guardan en el dispositivo mediante AsyncStorage, permaneciendo allí aunque se cierre la app.
*   **Diseño Adaptativo:** Soporte completo para modo claro y oscuro.
*   **Navegación Intuitiva:** Sistema de pestañas (Tabs) para cambiar rápidamente entre los tres tipos de contenido.

## 4. Funcionalidades Opcionales (Futuras)
Ideas para escalar el proyecto tras completar la fase actual:
*   **Búsqueda Global:** Un buscador en la cabecera para filtrar notas por título o contenido en tiempo real.
*   **Archivado:** Opción para ocultar notas finalizadas en una sección de "Archivo" en lugar de eliminarlas.
*   **Animaciones Avanzadas:** Uso de Reanimated para transiciones suaves al añadir o borrar elementos de las listas.
*   **Recordatorios:** Notificaciones locales para avisar sobre tareas pendientes en los checklists.
