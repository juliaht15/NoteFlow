# ADR 001: Adopción de Zustand para la Gestión del Estado Global

## Estado
Aceptado

## Contexto
La aplicación maneja flujos de datos dinámicos divididos en tres tipologías de datos (notas, checklists e ideas) distribuidas a lo largo de un sistema de navegación por pestañas (`(tabs)`). Utilizar la `Context API` nativa de React provocaría re-renderizados masivos en el árbol de componentes cada vez que una nota sea modificada, añadida o eliminada mediante gestos en las listas. Redux Toolkit, por otro lado, añadía un boilerplate excesivo innecesario para el alcance actual del proyecto.

## Decisión
Elegimos **Zustand** como el motor de estado global para NoteFlow. 

Razones técnicas:
1. **Renderizado Atómico:** Permite a los componentes suscribirse de forma selectiva a fragmentos exactos del estado (selectores), aislando por completo los re-renders.
2. **Fuera del Árbol de React:** El almacén funciona como un modelo de datos puro en JavaScript, lo que facilita enormemente la integración limpia con animaciones fluidas y gestos de eliminación (`react-native-gesture-handler`) sin bloquear el hilo de la interfaz de usuario.
3. **Persistencia Sencilla:** Middleware nativo simplificado para una futura estrategia de caché local.

## Consecuencias
* **Positivas:** Código desacoplado, modularidad extrema en pantallas pesadas como `ideas/index.tsx` y una mejora drástica del rendimiento en dispositivos de gama media/baja al renderizar colecciones mediante `FlashList`.
* **Negativas:** Introduce una dependencia externa adicional en el core de la aplicación móvil.