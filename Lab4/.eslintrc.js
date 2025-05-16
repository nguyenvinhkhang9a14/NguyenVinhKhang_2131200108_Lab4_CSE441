module.exports = {
  parser: '@babel/eslint-parser', // hoặc '@babel/eslint-parser' nếu dùng babel mới
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // 👈 bật JSX support
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
