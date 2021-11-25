module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/src/old.firestore.ts',
    'build-algolia-search.ts'
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'no-unused-vars': 'off',
    'quotes': ['error', 'single'],
    'import/no-unresolved': 0,

  },
};
