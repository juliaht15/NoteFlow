# NoteFlow 📱

**NoteFlow** es una aplicación móvil nativa de alto rendimiento diseñada para la gestión inteligente de notas, tareas e ideas. Desarrollada bajo el ecosistema de **React Native**, la aplicación ofrece una experiencia fluida con persistencia de datos local y una interfaz optimizada para dispositivos iOS y Android.

---

## 🚀 Demo en Vivo
La aplicación está publicada y lista para ser probada directamente en tu móvil:

1. Instala la app **Expo Go** desde la App Store o Play Store.
2. Escanea el código QR disponible en el siguiente enlace de lanzamiento:
👉 [**Probar NoteFlow en Expo Go**](https://expo.dev/preview/update?message=Despliegue+final+fase+6&updateRuntimeVersion=1.0.0&createdAt=2026-05-03T18%3A31%3A10.198Z&slug=exp&projectId=54b70d35-3f44-4720-9b03-68f2fedb30df&group=0b8ea657-287c-4d87-9439-07e5d0adee57)

---

## 🛠️ Instalación y Desarrollo
Si deseas ejecutar el entorno de desarrollo localmente:

1. **Clonar el proyecto:**
   ```bash
   git clone [https://github.com/juliaht15/NoteFlow.git](https://github.com/juliaht15/NoteFlow.git)
   cd noteflow
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Iniciar servidor de Expo:**
   ```bash
   npx expo start
   ```

---

## 🏗️ Stack Tecnológico
*   **Framework:** [React Native](https://reactnative.dev/) & [Expo SDK 51](https://expo.dev/).
*   **Navegación:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing).
*   **Gestión de Estado:** [Zustand](https://docs.pmnd.rs/zustand/) con persistencia en `AsyncStorage`.
*   **Rendimiento:** [Shopify FlashList](https://shopify.github.io/flash-list/) para listas optimizadas.
*   **Interfaz:** [React Native Paper](https://reactnativepaper.com/) y [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) para feedback táctil.
*   **Validación:** [Zod](https://zod.dev/) para esquemas de datos.

---

## 📋 Gestión y Documentación
Este proyecto ha sido gestionado bajo metodologías ágiles y cuenta con documentación técnica detallada:

*   🔗 [**Tablero de Trello**](https://trello.com/b/wE5jLIdP/noteflow): Seguimiento de hitos y tareas.
*   📚 [**Documentación Técnica**](./docs/): Carpeta con detalles sobre arquitectura, hilos nativos y manual de usuario.

---

## 👤 Autora
**Julia**  
[Perfil de Expo](https://expo.dev/accounts/juliaht15) | [GitHub](https://github.com/juliaht15)

---

> **Nota de entrega:** Proyecto finalizado para la Fase 6. Incluye persistencia de datos, navegación nativa y despliegue exitoso en EAS.
```