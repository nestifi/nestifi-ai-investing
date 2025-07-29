// @ts-check

import tseslint from 'typescript-eslint';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginImport from 'eslint-plugin-import-x';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReactRecommended from 'eslint-plugin-react/configs/recommended.js';
import pluginReactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';

export default tseslint.config(
  {
    ignores: ['node_modules', '.expo', 'ios', 'android', 'src/assets']
  },
  {
    files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ...pluginReactRecommended.languageOptions,
      ...pluginReactJsxRuntime.languageOptions,
      parser: tseslint.parser,
      parserOptions: {
        project: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import-x/resolver': {
        typescript: true,
        node: true
      },
      'import-x/extensions': ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: {
      react: pluginReact,
      'react-native': pluginReactNative,
      'react-hooks': pluginReactHooks,
      '@typescript-eslint': tseslint.plugin,
      unicorn: pluginUnicorn,
      import: pluginImport,
      prettier: pluginPrettier
    },
    rules: {
      // React
      ...pluginReactRecommended.rules,
      ...pluginReactJsxRuntime.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/display-name': 'off',
      'react/prop-types': 'off',

      // React Native
      'react-native/no-unused-styles': 'error',

      // TypeScript
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowNullableString: true,
          allowAny: true
        }
      ],

      // General
      'no-console': 'warn',
      'no-restricted-imports': ['error', { patterns: ['**/../*', '.*'] }],
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportDeclaration[source.value='react'] > ImportDefaultSpecifier",
          message: 'React import is unnecessary since React 17'
        }
      ],

      // Import
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],

      // Unicorn
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],

      // Prettier
      'prettier/prettier': 'error'
    }
  }
);
