module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Asegúrate de que SOLO esté esto y NADA que mencione "worklets" explícitamente
      'react-native-reanimated/plugin',
    ],
  };
};