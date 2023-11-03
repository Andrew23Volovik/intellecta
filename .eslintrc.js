module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: true,
        tabWidth: 2,
        printWidth: 120,
        singleQuote: true,
        bracketSpacing: true,
        singleAttributePerLine: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/no-v-html': 'off',
    'vue/html-closing-bracket-newline': 'error',
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      },
    ],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/padding-line-between-blocks': ['error', 'always'],
  },
};
