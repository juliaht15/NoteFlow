![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![ReactNative](https://img.shields.io/badge/-React_Native-05122A?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)

# 📝 NoteFlow
> Gestión inteligente de notas, tareas e ideas

Aplicación móvil nativa de alto rendimiento diseñada para ofrecer una experiencia fluida con persistencia de datos local y una interfaz optimizada para dispositivos iOS y Android.

| Despliegue | URL |
|------------|-----|
| Expo Go (Latest Update) | [Probar en Expo](https://expo.dev/preview/update?message=readme+okey&updateRuntimeVersion=1.0.0&createdAt=2026-05-07T12%3A46%3A48.942Z&slug=exp&projectId=54b70d35-3f44-4720-9b03-68f2fedb30df&group=a9a25a69-b685-4724-95e1-a413755f89f7) |
| Gestión Ágil | [Trello](https://trello.com/b/wE5jLIdP/noteflow) |

---

## 🚀 Características Principales

- **Búsqueda en Tiempo Real:** Barra de búsqueda integrada en todas las pantallas para filtrado dinámico de contenido.
- **Edición Dinámica:** Sistema de guardado automático (Debounce) y gestión de Checklists interactiva desde la vista de detalle.
- **Checkboxes Visibles:** Interfaz mejorada para listas de tareas con indicadores visuales de estado.
- **Persistencia Local:** Almacenamiento de datos offline mediante **AsyncStorage**.
- **Rendimiento Optimizado:** Uso de **FlashList** para el renderizado eficiente de listas extensas.
- **Feedback Táctil:** Integración de **Expo Haptics** para una respuesta física en las interacciones.

---

## 🛠️ Tecnologías

| Mobile & UI | Uso |
|----------|-----|
| React Native / Expo 51 | Framework y SDK para desarrollo nativo |
| React Native Paper | Componentes UI basados en Material Design |
| Lucide React Native | Iconografía vectorial escalable |

| Estado y Lógica | Uso |
|---------|-----|
| Zustand | Gestión de estado global ligera y rápida |
| Expo Router | Navegación basada en archivos (File-based routing) |
| Zod | Validación de esquemas y tipos de datos |

---

## 📂 Estructura del Proyecto
```
noteflow/
├── app/                # Rutas y pantallas (Expo Router)
│   ├── (tabs)/         # Navegación por pestañas (Notas, Listas, Ideas)
│   ├── [id].tsx        # Pantalla de detalle universal y edición dinámica
│   └── _layout.tsx     # Configuración de navegación global
├── src/
│   ├── components/     # Componentes UI reutilizables (NoteCard, ChecklistCard, etc.)
│   ├── store/          # Gestión de estado global con Zustand (notesStore.ts)
│   └── constants/      # Temas de color, tipografía y espaciados (theme.ts)
├── assets/             # Recursos estáticos, iconos y splash screen
└── app.json            # Configuración de Expo y actualizaciones EAS
```

---

## 💻 Instalación y Desarrollo

```bash
# 1. Clonar el repositorio
git clone [https://github.com/juliaht15/NoteFlow.git](https://github.com/juliaht15/NoteFlow.git)
cd noteflow

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de Expo
npx expo start
```
> **Nota:** Escanea el código QR desde la app **Expo Go** (Android/iOS) para previsualizar en tu dispositivo físico.

---

## 🛰️ Despliegue y Actualizaciones (EAS)

Este proyecto utiliza **EAS Update** para el despliegue de actualizaciones críticas y mejoras de UI sin necesidad de reinstalar la aplicación.

### Actualización Over-the-Air (OTA)
Para enviar cambios inmediatos a los dispositivos:
```bash
eas update --auto
```

### Generación de Builds Nativa
```bash
# Crear build para Android (.apk / .aab)
eas build --platform android

# Crear build para iOS (.ipa)
eas build --platform ios
```

---

*Desarrollado durante las prácticas en [Corner Estudios](https://www.corner-estudios.com) — Julia Huertas — 2026*
```