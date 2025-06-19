// babel.config.js
module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'expo-router/babel'  // ← Expo Router’ın çalışması için gerekli
      ],
    };
  };
  