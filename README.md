# 🚀 NoteFlow: Mobile Productivity Suite

**NoteFlow** es una aplicación nativa de alto rendimiento diseñada para la gestión inteligente de notas, tareas y pensamientos creativos. Construida con un enfoque en la experiencia de usuario (UX) y la eficiencia técnica, NoteFlow demuestra la implementación de arquitecturas móviles modernas bajo el ecosistema de **Expo**.



## 🛠️ Stack Tecnológico de Alto Nivel

Para cumplir con los requisitos de la **Fase 6**, se seleccionaron las siguientes tecnologías líderes en la industria:

*   **Core**: [React Native](https://reactnative.dev/) con [Expo SDK](https://expo.dev/) (Framework de desarrollo móvil).
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para reducir errores en tiempo de ejecución).
*   **Navegación**: [Expo Router](https://expo.github.io/router/docs/) (Arquitectura basada en archivos para una navegación fluida entre pestañas y modales).
*   **Estado Global**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) (Gestión de estado ligera y escalable que evita re-renders innecesarios).
*   **Persistencia**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) (Guardado local de datos para funcionamiento offline).
*   **Rendimiento de Listas**: [Shopify FlashList](https://shopify.github.io/flash-list/) (Reciclaje de componentes para scroll fluido a 60 FPS).
*   **Validación de Datos**: [Zod](https://zod.dev/) (Esquemas de validación para formularios seguros).
*   **Sistema de Diseño**: [React Native Paper](https://reactnativepaper.com/) (Implementación de Material Design 3).

## 📱 Características Principales

1.  **Tres Formatos de Contenido**: Notas de texto plano, checklists con progreso dinámico e ideas con etiquetas de colores.
2.  **Feedback Háptico**: Integración de vibraciones táctiles para acciones de éxito (guardar) o error (validación).
3.  **Persistencia de Datos**: Los datos se mantienen seguros en el dispositivo incluso después de cerrar la aplicación.
4.  **Navegación Dinámica**: Sistema de detalle de notas implementado mediante rutas dinámicas `[id].tsx`.

## 📂 Organización y Documentación

El proyecto sigue una estructura profesional de carpetas y contiene documentación técnica detallada en el directorio `/docs`:

*   [Idea y Objetivos](./docs/idea.md): Propuesta de valor y funcionalidades.
*   [Arquitectura Técnica](./docs/react-native-teoria.md): Fundamentos de hilos, Metro Bundler y rendimiento.
*   [Configuración de IA](./docs/ai-setup.md): Cómo se utilizaron herramientas como Gemini para asistir el desarrollo.

## 📈 Gestión del Proyecto

El desarrollo ha sido gestionado siguiendo metodologías ágiles a través de **Trello**:
🔗 [https://trello.com/b/wE5jLIdP/noteflow]

---

### ⚙️ Instalación y Uso Local

1. Clona el repositorio: `git clone https://github.com/juliaht15/NoteFlow.git`
2. Instala las dependencias: `npm install` (o `npm install --force` en caso de conflictos con React 19)
3. Inicia el proyecto: `npx expo start`

---
Desarrollado con compromiso técnico por **juliaht15**.