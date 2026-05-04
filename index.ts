import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import React from 'react';

// Definimos el punto de entrada de la aplicación
export function App() {
  // @ts-ignore: require.context es una función específica de Metro/Webpack
  const ctx = require.context('./app');
  
  // Usamos React.createElement para evitar problemas de parsing si el archivo
  // no se detecta correctamente como TSX, o simplemente la etiqueta directa:
  return React.createElement(ExpoRoot, { context: ctx });
}

registerRootComponent(App);