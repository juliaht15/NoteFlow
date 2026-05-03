# Configuración de IA para el Proyecto

Para el desarrollo de NoteFlow se ha utilizado **Gemini** con un contexto persistente.

## Reglas Aplicadas:
- **Preferencia de Stack**: Expo Router + Zustand.
- **Tipado**: Uso obligatorio de TypeScript para evitar errores de estado.
- **Gestión de Errores**: Se instruyó a la IA para manejar los conflictos de tipos conocidos entre FlashList y React 19 mediante el uso de "componentes casted" (`const List = FlashList as any`).
- **Validación**: Uso de Zod para asegurar que ningún dato corrupto entre en el store de Zustand.