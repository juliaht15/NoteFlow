# ADR 002: Elección de Expo Managed Workflow sobre React Native CLI

## Estado
Aceptado

## Contexto
Al iniciar el desarrollo del ecosistema móvil de NoteFlow, debíamos decidir entre utilizar el flujo gestionado de Expo (Managed Workflow con Expo SDK) o una inicialización limpia basada en React Native CLI (Bare Workflow), evaluando el coste de configuración de dependencias nativas frente a la flexibilidad a largo plazo.

## Decisión
Optamos por trabajar bajo el entorno de **Expo Managed Workflow** potenciado por **Expo Router v3**.

Razones técnicas:
1. **Manejo Automático de Código Nativo:** Expo abstrae la complejidad de configurar de forma manual Gradle (Android) y CocoaPods (iOS), garantizando compatibilidad inmediata con módulos de hardware como `expo-image-picker`.
2. **Navegación Basada en Archivos:** Expo Router unifica la arquitectura de enrutado emulando frameworks modernos de la Web (Next.js), permitiendo estructurar pestañas (`(tabs)`) de manera intuitiva y tipada.
3. **EAS Build:** Capacidad de delegar la compilación de binarios en producción (generación automatizada de APKs) a los servidores de Expo en la nube, optimizando los tiempos de despliegue.

## Consecuencias
* **Positivas:** Reducción drástica del tiempo invertido en configuraciones iniciales e infraestructura nativa, permitiendo centrar el esfuerzo de ingeniería en las funcionalidades core de la aplicación y la sincronización con el backend.
* **Negativas:** El tamaño inicial del bundle compilado de la aplicación es ligeramente superior debido a las librerías base incluidas por el SDK.