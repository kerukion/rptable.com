module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    amd: true,
  },
  extends: [
    'preact',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
  ],
  settings: {
    react: {
      pragma: 'h'
    }
  },
  globals: {
    JSX: 'readonly',
    React: 'readonly'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      }
    }
  ],
  rules: {
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-indent': ['error', 4],
    'react/jsx-indent-props': ['error', 4],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        // The default grouping, but with no blank lines.
        groups: [['^\\u0000', '^@?\\w', '^', '^\\.']],
      },
    ],
  },
  ignorePatterns: [
    'public/',
    'backend/dist/',
  ],
};