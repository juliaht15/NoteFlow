module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './', // Esto le dice a Babel que @/ apunta a la raíz del proyecto
          },
        },
      ],
    ],
  };
};