module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'import/prefer-default-export': [0],
    'react/jsx-props-no-spreading': [0],
    'react/require-default-props': [0],
    'jsx-quotes': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/extensions': [
      0,
      {
        tsx: 'never',
        ts: 'never',
      },
    ],
    'operator-linebreak': 'off',
    'max-len': ['error', { ignoreComments: true, code: 100, ignoreStrings: true }],
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    indent: 'off',
    'object-curly-newline': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
