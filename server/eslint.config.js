import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  ...compat.config({
    env: {
      es2021: true,
      node: true
    },
    extends: [
      'standard',
      'plugin:n/recommended',
      'plugin:promise/recommended'
    ],
    plugins: [
      'import',
      'promise',
      'n'
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    rules: {
      semi: [2, 'always'],
      'import/no-unresolved': 'off',
      'n/no-unpublished-import': ['error', {
        allowModules: ['@eslint/eslintrc']
      }]
    },
    ignorePatterns: [
      'dist/',
      'build/'
    ]
  })
];
