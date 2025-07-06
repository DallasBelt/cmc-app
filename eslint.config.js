// eslint.config.js
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,

  // JS/JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tsParser,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/jsx-no-target-blank': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': ['warn', { singleQuote: true, jsxSingleQuote: true }],
    },
  },

  // TS/TSX
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      '@typescript-eslint': tseslint,
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/jsx-no-target-blank': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': ['warn', { singleQuote: true, jsxSingleQuote: true }],
    },
  },

  prettierConfig,

  {
    ignores: ['dist', '.eslintrc.cjs'],
  },
];
