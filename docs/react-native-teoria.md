# Teoría de React Native - NoteFlow

## ¿React Native vs App Nativa?
React Native permite escribir código en JavaScript/TypeScript que se comunica con componentes nativos de la plataforma (iOS/Android) a través de un "bridge" (puente) o la nueva arquitectura Fabric. A diferencia de un WebView, que es básicamente un navegador incrustado, React Native renderiza vistas nativas, lo que resulta en una experiencia fluida y de alto rendimiento.

## Metro Bundler
Es el empaquetador de JavaScript de Expo. Su trabajo es transformar tu código (TS, JSX, CSS) en un bundle único que la aplicación puede entender y ejecutar, gestionando las dependencias y la recarga en caliente (Fast Refresh).

## Expo Go vs Development Build
- **Expo Go:** Sandbox rápido, ideal para prototipos. Limitado para código nativo personalizado (como cámaras complejas o módulos C++).
- **Development Build:** Binario propio que permite incluir código nativo. Es el estándar profesional necesario para apps de producción.

## Sistema de Diseño: Gluestack UI
Se ha elegido **Gluestack UI** por su filosofía inspirada en Tailwind. Permite una personalización profunda mediante tokens y un manejo eficiente del modo oscuro/claro, esencial para una app de notas moderna.