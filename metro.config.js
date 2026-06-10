const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Asegurar que soporte los alias configurados en tsconfig/babel
config.resolver.alias = {
  ...config.resolver.alias,
  '@': './',
};

// Asegurar que maneje extensiones correctamente
config.resolver.sourceExts.push('mjs', 'jsx', 'js', 'ts', 'tsx');

module.exports = config;