
/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  plugins: [
    'vue',
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    "function-paren-newline": 'off',
    "no-multiple-empty-lines": 'off',
    'no-unused-vars': 'off',

    // js/ts
    camelcase: ['error', { properties: 'never' }],
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-return-await': 'error',
    'no-var': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'prefer-const': [
      'warn',
      { destructuring: 'all', ignoreReadBeforeAssign: true },
    ],
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: true },
    ],
    'object-shorthand': [
      'error',
      'always',
      { ignoreConstructors: false, avoidQuotes: true },
    ],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-undef': 'off',
    'vue/attribute-hyphenation': ['error', 'never'],
    'multiline-ternary': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    'no-void': 'off',
    'no-undefined': 'error',
    'vue/no-ref-as-operand': 'off',
    'prefer-template': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'no-constant-condition': 'off',
    'non-nullis': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/prefer-as-const': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    'no-async-promise-executor': 'off',
    'no-useless-escape': 'off',

    // best-practice
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'no-alert': 'off',
    'no-case-declarations': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-confim': 'off',

    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ['none', 'multiple', 'single', 'all'],
        allowSeparatedGroups: false,
      },
    ],
    // ts
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }],

    // vue
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/prefer-import-from-vue': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // prettier
    'prettier/prettier': 'off',

    // import
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/named': 'off',
  }
}
