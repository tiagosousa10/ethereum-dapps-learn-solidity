// ESLint configuration imports
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

// ESLint configuration for React project with modern syntax
export default [
  { ignores: ['dist'] }, // Ignore build output directory
  {
    files: ['**/*.{js,jsx}'], // Apply to JavaScript and JSX files
    languageOptions: {
      ecmaVersion: 2020, // Support ES2020 syntax
      globals: globals.browser, // Browser environment globals
      parserOptions: {
        ecmaVersion: 'latest', // Use latest ECMAScript features
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Use ES modules
      },
    },
    plugins: {
      'react-hooks': reactHooks, // React Hooks linting rules
      'react-refresh': reactRefresh, // React Fast Refresh compatibility
    },
    rules: {
      ...js.configs.recommended.rules, // Include recommended JavaScript rules
      ...reactHooks.configs.recommended.rules, // Include React Hooks rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Allow unused vars starting with uppercase or underscore
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Warn if non-components are exported (affects Fast Refresh)
      ],
    },
  },
]
