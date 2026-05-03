# Fundamentos de React Native en NoteFlow

## Arquitectura: JS Thread vs Native UI Thread
React Native utiliza un "puente" (Bridge) o la nueva arquitectura (JSI) para comunicar dos mundos:
1. **JS Thread**: Donde vive nuestra lógica de Zustand, validaciones de Zod y componentes React.
2. **UI Thread**: Donde el sistema operativo (Android/iOS) renderiza las vistas reales.
NoteFlow está optimizada para no bloquear el JS Thread, asegurando 60 FPS constantes.

## Metro Bundler
Es el empaquetador de JavaScript para React Native. Su función es tomar todo nuestro código y dependencias y unirlas en un solo archivo que el motor JS del móvil pueda ejecutar.

## Expo Go vs Development Build
Usamos **Expo Go** por su rapidez en el desarrollo inicial. Sin embargo, para NoteFlow, si quisiéramos añadir módulos nativos personalizados que no están en el SDK estándar, necesitaríamos un **Development Build** generado con EAS.

## Sistema de Diseño: React Native Paper
Elegimos **React Native Paper** porque implementa **Material Design 3**, lo que proporciona una estética nativa y profesional en Android de forma automática, además de ofrecer un excelente soporte para el Modo Oscuro.

## Rendimiento: FlashList vs FlatList
Implementamos **Shopify FlashList** porque recicla los componentes de la lista de forma más agresiva que FlatList, eliminando los "espacios en blanco" al hacer scroll rápido.