module.exports = {
  root: true,
  env: { browser: true, es2020: true,"node": true,},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
      
    ],
    'import/no-unresolved': 'error',
    'import/no-unused-modules': 'error',
    "semi": ["error", "always"],
    "no-console": "warn",
    'camelcase': ['error', { 'properties': 'always' }],
    'indent': ['error', 2],
    'eqeqeq': 'error',
    'quotes': ['error', 'single'],

  },
}
