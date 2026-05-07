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
| Expo Go (Demo) | [Probar en Expo](https://expo.dev/preview/update?message=Despliegue+final+fase+6&updateRuntimeVersion=1.0.0&createdAt=2026-05-03T18%3A31%3A10.198Z&slug=exp&projectId=54b70d35-3f44-4720-9b03-68f2fedb30df&group=0b8ea657-287c-4d87-9439-07e5d0adee57) |
| Gestión Ágil | [Trello](https://trello.com/b/wE5jLIdP/noteflow) |

---

## Características

- **Persistencia Local:** Almacenamiento de datos offline mediante AsyncStorage.
- **Navegación Nativa:** Sistema de rutas basado en archivos (File-based routing) con Expo Router.
- **Feedback Táctil:** Integración de Expo Haptics para una experiencia de usuario inmersiva.
- **Rendimiento Optimizado:** Uso de FlashList para el renderizado eficiente de listas extensas.

---

## Tecnologías

| Mobile | Uso |
|----------|-----|
| React Native | Framework principal para desarrollo multiplataforma |
| Expo SDK 51 | Herramientas y servicios para el ecosistema nativo |
| Expo Router | Gestión de navegación y deep linking |
| FlashList | Renderizado de listas de alto rendimiento |

| Estado y Lógica | Uso |
|---------|-----|
| Zustand | Gestión de estado global ligera y rápida |
| AsyncStorage | Persistencia de datos en el dispositivo |
| Zod | Validación de esquemas y tipos de datos |

| Interfaz | Uso |
|------------|-----|
| React Native Paper | Librería de componentes UI con Material Design |
| Expo Haptics | Respuesta física táctil en interacciones |
| Lucide React Native | Iconografía vectorial escalable |

---

## Estructura del proyecto
```
noteflow/
├── app/                    # Rutas y pantallas (Expo Router)
│   ├── (tabs)/             # Navegación por pestañas
│   ├── _layout.tsx         # Configuración de navegación global
│   └── index.tsx           # Pantalla de inicio
├── src/
│   ├── components/         # Componentes UI reutilizables
│   ├── store/              # Estado global con Zustand
│   ├── hooks/              # Lógica y hooks personalizados
│   └── utils/              # Funciones auxiliares y validaciones Zod
├── docs/                   # Documentación técnica y manuales
├── assets/                 # Imágenes, fuentes y recursos estáticos
├── app.json                # Configuración de Expo y EAS
└── package.json
```

---

## Descargar y ejecutar

```bash
# 1. Clonar el repositorio
git clone [https://github.com/juliaht15/NoteFlow.git](https://github.com/juliaht15/NoteFlow.git)
cd noteflow

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de Expo
npx expo start
```
> **Nota:** Para visualizar la app en un dispositivo físico, descarga la app **Expo Go** y escanea el código QR que aparecerá en tu terminal.

---

## Desplegar en Expo (EAS)

### Build y Update

1. Configurar el proyecto en el dashboard de Expo.
2. Ejecutar el build para producción:
   ```bash
   eas build --platform all
   ```
3. Publicar actualizaciones mediante OTA (Over-the-Air):
   ```bash
   eas update --message "Descripción del cambio"
   ```

---

*Desarrollado durante las prácticas en [Corner Estudios](https://www.corner-estudios.com) — Julia Huertas — 2026*
```
