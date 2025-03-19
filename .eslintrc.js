
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = ({
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    "plugin:react/recommended",
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    projectService: true,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    allowDefaultProject: true,
    project: null
  },
  settings: {
    react: {
      // 自动检测 React 版本
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'off',

    // =================================================================
    // ================== ESLint-plugin-React Rules ====================
    // =================================================================
    'react/boolean-prop-naming': 'off',
    'react/button-has-type': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/forbid-component-props': 'off',
    'react/forbid-dom-props': 'off',
    'react/forbid-elements': 'off',
    'react/forbid-prop-types': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-array-index-key': 'off',
    'react/no-children-prop': 'off',
    'react/no-danger': 'off',
    'react/no-danger-with-children': 'off',
    'react/no-deprecated': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-did-update-set-state': 'off',
    'react/no-direct-mutation-state': 'off',
    'react/no-find-dom-node': 'warn',
    'react/no-is-mounted': 'warn',
    'react/no-multi-comp': 'off',
    'react/no-redundant-should-component-update': 'off',
    'react/no-render-return-value': 'off',
    'react/no-set-state': 'off',
    'react/no-typos': 'off',
    'react/no-string-refs': 'off',
    'react/no-this-in-sfc': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/no-unknown-property': 'off',
    'react/no-unsafe': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-unused-state': 'off',
    'react/no-will-update-set-state': 'off',
    'react/prefer-es6-class': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/require-optimization': 'off',
    'react/require-render-return': 'off',
    'react/self-closing-comp': 'off',
    'react/sort-comp': 'off',
    'react/sort-prop-types': 'off',
    'react/style-prop-object': 'off',
    'react/void-dom-elements-no-children': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-child-element-spacing': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-handler-names': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-key': 'off',
    'react/jsx-max-depth': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-comment-textnodes': 'off',
    'react/jsx-no-construct': 'off',
    'react/jsx-no-duplicate-props': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-no-undef': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-pascal-case': 'off',
    'react/jsx-props-no-multi-spaces': 'off',
    'react/jsx-sort-default-props': 'off',
    'react/jsx-sort-props': 'off',
    'react/jsx-space-before-closing': 'off',
    'react/jsx-tag-spacing': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'off',
    'react/jsx-wrap-multilines': 'warn',


    // =================================================================
    // ==================== typescript-eslint Rules ====================
    // =================================================================
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/ban-ts-comment': ['error', {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
      'ts-check': 'allow-with-description',
      'ts-nocheck': 'allow-with-description'
    }],
    '@typescript-eslint/ban-tslint-comment': 'off',
    '@typescript-eslint/class-literal-property-style': 'off',
    '@typescript-eslint/class-methods-use-this': 'off',
    '@typescript-eslint/consistent-generic-constructors': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/consistent-return': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-exports': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/default-param-last': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/max-params': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-array-constructor': 'off',
    '@typescript-eslint/no-array-delete': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-deprecated': 'off',
    '@typescript-eslint/no-dupe-class-members': 'off',
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    '@typescript-eslint/no-duplicate-type-constituents': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-for-in-array': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-meaningless-void-operator': 'off',
    '@typescript-eslint/no-misused-new': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-misused-spread': 'off',
    '@typescript-eslint/no-mixed-enums': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-types': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-this-alias': [
      "error",
      {
        "allowDestructuring": true,
        "allowedNames": ["that", "self", "_this", "_that"]
      }
    ],
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'off',
    '@typescript-eslint/no-unnecessary-qualifier': 'off',
    '@typescript-eslint/no-unnecessary-template-expression': 'off',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-type-assertion': 'off',
    '@typescript-eslint/no-unsafe-unary-minus': 'error',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-empty-export': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-wrapper-object-types': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/only-throw-error': 'off',
    '@typescript-eslint/parameter-properties': 'off',
    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/prefer-destructuring': 'off',
    '@typescript-eslint/prefer-enum-initializers': 'off',
    '@typescript-eslint/prefer-find': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/prefer-includes': 'off',
    '@typescript-eslint/prefer-literal-enum-member': 'off',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/prefer-promise-reject-errors': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/prefer-return-this-type': 'off',
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/related-getter-setter-pairs': 'off',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/sort-type-constituents': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/unified-signatures': 'off',
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',

    // =================================================================
    // ============================ Inner Rules ========================
    // =================================================================
    /**
     * 要求数组方法需要具有返回值, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/array-callback-return
     */
    'array-callback-return': 'off',

    /**
     * 构造函数需要 super 调用，typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/constructor-super
     */
    'constructor-super': 'off',

    /**
     * 检查是否使用了反方向的 for 循环
     * @see https://eslint.org/docs/v8.x/rules/for-direction
     * @example
     * for (let i = 0; i < 10; i--) {}
     */
    'for-direction': 'error',

    /**
     * 强制 getter 函数具有 return 语句, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/getter-return
     */
    'getter-return': 'off',

    /**
     * 不允许 promise 回调为异步函数
     * @see https://eslint.org/docs/v8.x/rules/no-async-promise-executor
     */
    'no-async-promise-executor': 'off',

    /**
     * 禁止在循环中使用 await
     * @see https://eslint.org/docs/v8.x/rules/no-await-in-loop
     */
    'no-await-in-loop': 'off',

    /**
     * 不能对类赋值, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-class-assign
     */
    'no-class-assign': 'off',

    /**
     * 不允许直接与 +-0 等于判断
     * @see https://eslint.org/docs/v8.x/rules/no-compare-neg-zero
     * @example
     * if (x === -0) {}
     */
    'no-compare-neg-zero': 'off',

    /**
     * 禁止在条件表达式中使用赋值运算符
     * @see https://eslint.org/docs/v8.x/rules/no-cond-assign
     * @example
     * if (x = 1) {}
     */
    'no-cond-assign': ['error'],

    /**
     * 禁止对 const 变量重新赋值, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-const-assign
     */
    'no-const-assign': 'off',

    /**
     * 不允许作不影响值的表达式, (有短路的条件表达式)
     * @see https://eslint.org/docs/v8.x/rules/no-constant-binary-expression
     * @example
     * const value1 = +x == null;
     * const value3 = !foo == null;
     */
    'no-constant-binary-expression': 'error',

    /**
     * 不允许在条件中使用常量表达式
     * @see https://eslint.org/docs/v8.x/rules/no-constant-condition
     * @example
     * if (true) {}
     */
    'no-constant-condition': 'error',

    /**
     * 构造函数不允许有返回值, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-constructor-return
     * @example
     * class A {
     *    constructor(a) {
     *       this.a = a;
     *       return a;
     *    }
     * }
     */
    'no-constructor-return': 'off',

    /**
     * 禁止在正则表达式中使用控制字符
     * @see https://eslint.org/docs/v8.x/rules/no-control-regex
     */
    'no-control-regex': 'off',

    /**
     * 禁止使用debugger
     * @see https://eslint.org/docs/v8.x/rules/no-debugger
     */
    'no-debugger': 'warn',

    /**
     * 禁止在定义中使用重复的参数function, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-dupe-args
     */
    'no-dupe-args': 'off',

    /**
     * 禁止在类成员中使用重复的名称, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-dupe-class-members
     */
    'no-dupe-class-members': 'off',

    /**
     * 禁止书写重复的 else if 条件, typescript 能够检查
     * @description ts: 如果重复类型为 never, 不需要 eslint
     * @see https://eslint.org/docs/v8.x/rules/no-dupe-else-if
     */
    'no-dupe-else-if': 'off',

    /**
     * 禁止在对象字面量中使用重复的键, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-dupe-keys
     */
    'no-dupe-keys': 'off',

    /**
     * 禁止在 switch 语句中使用重复的 case 标签, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-duplicate-case
     */
    'no-duplicate-case': 'off',

    /**
     * 禁止重复的导入路径
     * @see https://eslint.org/docs/v8.x/rules/no-duplicate-imports
     */
    'no-duplicate-imports': 'off',

    /**
     * 禁止在正则表达式中使用空字符类
     * @see https://eslint.org/docs/v8.x/rules/no-empty-character-class
     */
    'no-empty-character-class': 'error',

    /**
     * 不允许空的解构模式
     * @see https://eslint.org/docs/v8.x/rules/no-empty-pattern
     */
    'no-empty-pattern': 'error',

    /**
     * 不允许在子句中重新分配异常catch
     * @see https://eslint.org/docs/v8.x/rules/no-ex-assign
     * @example
     * try {} catch(e) {
     *    e = 1;
     * }
     */
    'no-ex-assign': 'error',

    /**
     * 不允许语句的传递case
     * @see https://eslint.org/docs/v8.x/rules/no-fallthrough
     */
    'no-fallthrough': 'error',

    /**
     * 不允许对 function 重新赋值, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-func-assign
     */
    'no-func-assign': 'off',

    /**
     * 不允许对导入的变量进行重新赋值, , typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-import-assign
     */
    'no-import-assign': 'off',

    /**
     * 不允许嵌套块函数中的变量或声明
     * @see https://eslint.org/docs/v8.x/rules/no-inner-declarations
     */
    'no-inner-declarations': 'off',

    /**
     * 检测正则的有效性
     * @see https://eslint.org/docs/v8.x/rules/no-invalid-regexp
     * @example
     * RegExp('[')
     */
    'no-invalid-regexp': 'error',

    /**
     * 不允许不规则的空格
     * @see https://eslint.org/docs/v8.x/rules/no-irregular-whitespace
     */
    'no-irregular-whitespace': 'error',

    /**
     * 不允许丢失精度的文本数字
     * @see https://eslint.org/docs/v8.x/rules/no-loss-of-precision
     */
    'no-loss-of-precision': 'error',

    /**
     * 不允许在字符类语法中使用多个码位创建的字符
     * @see https://eslint.org/docs/v8.x/rules/no-misleading-character-class
     */
    'no-misleading-character-class': 'error',

    /**
     * 禁止使用全局非构造函数的运算符new, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-new-native-nonconstructor
     */
    'no-new-native-nonconstructor': 'off',

    /**
     * 不允许使用对象newSymbol, typescript 能够检查
     * @see https://eslint.org/docs/v8.x/rules/no-new-symbol
     */
    'no-new-symbol': 'off',

    /**
     * 禁止将全局对象属性作为函数调用
     * @see https://eslint.org/docs/v8.x/rules/no-obj-calls
     */
    'no-obj-calls': 'off',

    /**
     * 不允许从 Promise executor 函数返回值
     * @description 由ts接管
     * @see https://eslint.org/docs/v8.x/rules/no-promise-executor-return
     */
    'no-promise-executor-return': 'off',

    /**
     * 禁止直接在对象上调用某些方法Object.prototype
     * @see https://eslint.org/docs/v8.x/rules/no-prototype-builtins
     */
    'no-prototype-builtins': 'error',

    /**
     * 不允许两边完全相同的作业
     * @see https://eslint.org/docs/v8.x/rules/no-self-assign
     */
    'no-self-assign': 'warn',

    /**
     * 不允许在两边完全相同的情况下进行比较
     * @see https://eslint.org/docs/v8.x/rules/no-self-compare
     */
    'no-self-compare': 'warn',

    /**
     * 不允许从 setter 返回值
     * @see https://eslint.org/docs/v8.x/rules/no-setter-return
     */
    'no-setter-return': 'off',

    /**
     * 不允许使用稀疏数组
     * @see https://eslint.org/docs/v8.x/rules/no-sparse-arrays
     */
    'no-sparse-arrays': 'error',

    /**
     * 禁止在常规字符串中使用模板文本占位符语法
     * @see https://eslint.org/docs/v8.x/rules/no-template-curly-in-string
     */
    'no-template-curly-in-string': 'off',

    /**
     * 在调用构造函数super()之前不允许 this/super
     * @description ts处理
     * @see https://eslint.org/docs/v8.x/rules/no-this-before-super
     */
    'no-this-before-super': 'off',

    /**
     * 不允许使用未声明的变量，除非在注释中提及/*global *\/
     * @description ts处理
     * @see https://eslint.org/docs/v8.x/rules/no-undef
     */
    'no-undef': 'off',

    /**
     * 不允许令人困惑的多行表达式
     * @see https://eslint.org/docs/v8.x/rules/no-unexpected-multiline
     */
    'no-unexpected-multiline': 'error',

    /**
     * 不允许未修改的循环条件
     * @see https://eslint.org/docs/v8.x/rules/no-unmodified-loop-condition
     */
    'no-unmodified-loop-condition': 'error',

    /**
     * 禁止不可达代码
     * @description ts处理
     * @see https://eslint.org/docs/v8.x/rules/no-unreachable
     */
    'no-unreachable': 'off',

    /**
     * 不允许 body 只允许一次迭代的循环
     * @description 永远无法到达第二次迭代的循环是代码中可能存在的错误。
     * @see https://eslint.org/docs/v8.x/rules/no-unreachable-loop
     */
    'no-unreachable-loop': 'warn',

    /**
     * 禁止在块中使用控制流语句finally
     * @see https://eslint.org/docs/v8.x/rules/no-unsafe-finally
     */
    'no-unsafe-finally': 'error',

    /**
     * 不允许否定关系运算符的左作数
     * @see https://eslint.org/docs/v8.x/rules/no-unsafe-negation
     * @example
     * if (!key in object) {}
     * if (!obj instanceof Ctor) {}
     */
    'no-unsafe-negation': 'error',

    /**
     * 不允许在不允许该值的上下文中使用可选链接undefined
     * @description ts处理
     * @see https://eslint.org/docs/v8.x/rules/no-unsafe-optional-chaining
     */
    'no-unsafe-optional-chaining': 'off',

    /**
     * 不允许未使用的私有类成员
     * @see https://eslint.org/docs/v8.x/rules/no-unused-private-class-members
     */
    'no-unused-private-class-members': 'warn',

    /**
     * 不允许未使用的变量
     * @see https://eslint.org/docs/v8.x/rules/no-unused-vars
     */
    'no-unused-vars': 'off',

    /**
     * 在定义变量之前禁止使用
     * @see https://eslint.org/docs/v8.x/rules/no-use-before-define
     */
    'no-use-before-define': 'off',

    /**
     * 禁止正则表达式中无用的反向引用
     * @see https://eslint.org/docs/v8.x/rules/no-useless-backreference
     */
    'no-useless-backreference': 'error',

    /**
     * 禁止因使用 await 或 yield 而导致争用条件的赋值
     * @see https://eslint.org/docs/v8.x/rules/require-atomic-updates
     */
    'require-atomic-updates': 'off',

    /**
     * 在检查isNaN()
     * @see https://eslint.org/docs/v8.x/rules/use-isnan
     */
    'use-isnan': 'error',

    /**
     * 强制将表达式与有效字符串进行比较typeof
     * @description ts处理
     * @see https://eslint.org/docs/v8.x/rules/valid-typeof
     */
    'valid-typeof': 'off',


    // =================================================================
    // ============================ Suggestions Rules ==================
    // =================================================================

    /**
     * 在对象和类中强制执行 getter 和 setter 对
     * @see https://eslint.org/docs/v8.x/rules/accessor-pairs
     */
    'accessor-pairs': 'off',

    /**
     * 要求在箭头函数体周围加上大括号
     * @see https://eslint.org/docs/v8.x/rules/arrow-body-style
     */
    'arrow-body-style': 'off',

    /**
     * 在定义的范围内强制使用变量
     * @see https://eslint.org/docs/v8.x/rules/block-scoped-var
     */
    'block-scoped-var': 'warn',

    /**
     * 驼峰命名规则
     * @description 命名规则不定式, 如果强制会导致见名知其意降低
     * @see https://eslint.org/docs/v8.x/rules/camelcase
     */
    'camelcase': 'off',

    /**
     * 强制注释大写字母开头
     * @see https://eslint.org/docs/v8.x/rules/capitalized-comments
     */
    'capitalized-comments': 'off',

    /**
     * 强制类方法使用 this
     * @see https://eslint.org/docs/v8.x/rules/class-methods-use-this
     */
    'class-methods-use-this': 'off',

    /**
     * 强制执行程序中允许的最大圈复杂度
     * @see https://eslint.org/docs/v8.x/rules/complexity
     */
    'complexity': 'off',

    /**
     * 要求语句始终或从不指定值return
     * @description 由ts接管
     * @see https://eslint.org/docs/v8.x/rules/consistent-return
     */
    'consistent-return': 'off',

    /**
     * 在捕获当前执行上下文时强制执行一致的命名
     * @see https://eslint.org/docs/v8.x/rules/consistent-this
     */
    'consistent-this': ["error", "that", "self", "_this", "_that"],

    /**
     * 对所有控制语句强制执行一致的大括号样式
     * @see https://eslint.org/docs/v8.x/rules/curly
     */
    'curly': 'off',

    /**
     * 强制 switch 语句中的 default 分支
     * @see https://eslint.org/docs/v8.x/rules/default-case
     */
    'default-case': 'warn',

    /**
     * 默认参数赋值只能在最后
     * @description 由ts接管
     * @see https://eslint.org/docs/v8.x/rules/default-param-last
     */
    'default-param-last': 'off',

    /**
     * 尽可能使用 . 运算符
     * @see https://eslint.org/docs/v8.x/rules/dot-notation
     */
    'dot-notation': 'off',

    /**
     * 强制使用 === and !==
     * @see https://eslint.org/docs/v8.x/eqeqeq
     */
    'eqeqeq': 'warn',

    /**
     * 要求函数名称与它们所分配到的变量或属性的名称匹配
     * @see https://eslint.org/docs/v8.x/func-name-matching
     */
    'func-name-matching': 'off',

    /**
     * 要求函数具名
     * @see https://eslint.org/docs/v8.x/func-names
     */
    'func-names': 'off',

    /**
     * 强制一致地使用声明或表达式function
     * @see https://eslint.org/docs/v8.x/func-style
     */
    'func-style': 'off',

    /**
     * 在对象字面量和类中需要分组的访问器对同一属性的 getter 和 setter 不必彼此相邻定义。
     * @see https://eslint.org/docs/v8.x/grouped-accessor-pairs
     */
    'grouped-accessor-pairs': 'off',

    /**
     * 要求循环包含语句for-in if
     * @see https://eslint.org/docs/v8.x/guard-for-in
     */
    'guard-for-in': 'off',

    /**
     * 禁止指定的标识符
     * @see https://eslint.org/docs/v8.x/id-denylist
     */
    'id-denylist': 'off',

    /**
     * 标识符长度
     * @see https://eslint.org/docs/v8.x/id-length
     */
    'id-length': 'off',

    /**
     * 标识符规则
     * @see https://eslint.org/docs/v8.x/id-match
     */
    'id-match': 'off',

    /**
     * 声明时需要初始化
     * @description 由ts接管
     * @see https://eslint.org/docs/v8.x/rules/init-declarations
     */
    'init-declarations': 'off',

    /**
     * 需要或不允许逻辑赋值运算符速记
     * @see https://eslint.org/docs/v8.x/logical-assignment-operators
     */
    'logical-assignment-operators': 'off',

    /**
     * 规定文件中的最大类数量
     * @see https://eslint.org/docs/v8.x/rules/max-classes-per-file
     */
    'max-classes-per-file': 'off',

    /**
     * 规定最大逻辑块深度
     * @see https://eslint.org/docs/v8.x/rules/max-depth
     */
    'max-depth': ['error', 10],

    /**
     * 强制每个文件的最大行数
     * @see https://eslint.org/docs/v8.x/rules/max-lines
     */
    'max-lines': 'off',

    /**
     * 在函数中强制执行最大代码行数
     * @see https://eslint.org/docs/v8.x/rules/max-lines-per-function
     */
    'max-lines-per-function': 'off',

    /**
     * 强制要求回调可以嵌套的最大深度
     * @see https://eslint.org/docs/v8.x/rules/max-nested-callbacks
     */
    'max-nested-callbacks': 'off',

    /**
     * 在函数定义中强制执行最大参数数
     * @see https://eslint.org/docs/v8.x/rules/max-params
     */
    'max-params': 'off',

    /**
     * 强制功能块中允许的最大语句数
     * @see https://eslint.org/docs/v8.x/rules/max-statements
     */
    'max-statements': 'off',

    /**
     * 对多行注释强制使用特定样式
     * @see https://eslint.org/docs/v8.x/rules/multiline-comment-style
     */
    'multiline-comment-style': 'off',

    /**
     * 要求构造函数名称以大写字母开头
     * @see https://eslint.org/docs/v8.x/rules/new-cap
     */
    'new-cap': 'off',

    /**
     * 禁止使用 alert、confirm 和prompt
     * @see https://eslint.org/docs/v8.x/rules/no-alert
     */
    'no-alert': 'off',

    /**
     * 禁止使用 Array 构造函数
     * @see https://eslint.org/docs/v8.x/rules/no-array-constructor
     */
    'no-array-constructor': 'off',

    /**
     * 禁止使用位运算
     * @see https://eslint.org/docs/v8.x/rules/no-bitwise
     */
    'no-bitwise': 'off',

    /**
     * 禁止使用 arguments.caller or arguments.callee
     * @see https://eslint.org/docs/v8.x/rules/no-caller
     */
    'no-caller': 'off',

    /**
     * 这条规则不允许在 case/default 子句中进行 lexical 声明（let、const、function 和 class）。
     * @see https://eslint.org/docs/v8.x/rules/no-case-declarations
     */
    'no-case-declarations': 'warn',

    /**
     * 这条规则将在可能与比较运算符相混淆的地方使用箭头函数语法时发出不要这样做的警告。
     * @see https://eslint.org/docs/v8.x/rules/no-confusing-arrow
     */
    'no-confusing-arrow': ['warn', {
      "allowParens": true,
      "onlyOneSimpleParam": false
    }],

    /**
     * 禁止使用 console 语句
     * @see https://eslint.org/docs/v8.x/rules/no-console
     */
    'no-console': 'off',

    /**
     * 禁止使用 continue 语句
     * @see https://eslint.org/docs/v8.x/rules/no-continue
     */
    'no-continue': 'off',

    /**
     * 禁用 delete
     * @see https://eslint.org/docs/v8.x/rules/no-delete-var
     */
    'no-delete-var': 'warn',

    /**
     * 正则表达式文字开头的字符 /= 可能与除法赋值运算符混淆。
     * @see https://eslint.org/docs/v8.x/rules/no-div-regex
     */
    'no-div-regex': 'off',

    /**
     * 如果 if 块内包含 return 语句，else 块就没有必要了。它的内容可以放在块的外面。
     * @see https://eslint.org/docs/v8.x/rules/no-else-return
     */
    'no-else-return': 'off',

    /**
     * 禁止空块
     * @see https://eslint.org/docs/v8.x/rules/no-empty
     */
    'no-empty': 'off',


    /**
     * 禁止空函数体
     * @see https://eslint.org/docs/v8.x/rules/no-empty-function
     */
    'no-empty-function': 'off',

    /**
     * 是否禁用静态块
     * @see https://eslint.org/docs/latest/rules/no-empty-static-block
     * @example
     * class Foo {
     *    static {}
     * }
     */
    'no-empty-static-block': 'off',

    /**
     * 没有类型检查运算符（== 或 !=）的情况下与 null 比较，可能会产生意想不到的结果
     * @see https://eslint.org/docs/v8.x/rules/no-eq-null
     */
    'no-eq-null': 'warn',

    /**
     * 在不受信任的代码上使用 eval() 可以使程序受到几种不同的注入攻击。
     * @see https://eslint.org/docs/v8.x/rules/no-eval
     */
    'no-eval': 'off',

    /**
     * 不允许直接修改内置对象的原型。
     * @see https://eslint.org/docs/v8.x/rules/no-extend-native
     */
    'no-extend-native': 'error',

    /**
     * 这条规则的目的是避免不必要地使用 bind()
     * @see https://eslint.org/docs/v8.x/rules/no-extra-bind
     */
    'no-extra-bind': 'off',

    /**
     * 这条规则不允许不必要的布尔值转换。
     * @see https://eslint.org/docs/v8.x/rules/no-extra-boolean-cast
     */
    'no-extra-boolean-cast': 'off',

    /**
     * 这一规则旨在消除不必要的标签。
     * @see https://eslint.org/docs/v8.x/rules/no-extra-label
     */
    'no-extra-label': 'off',

    /**
     * 这条规则禁止不必要的分号。
     * @see https://eslint.org/docs/v8.x/rules/no-extra-semi
     */
    'no-extra-semi': 'off',

    /**
     * 这条规则旨在消除浮动的小数点，只要一个数字值有小数点，但在小数点之前或之后缺少一个数字，就会发出警告。
     * @see https://eslint.org/docs/v8.x/rules/no-floating-decimal
     */
    'no-floating-decimal': 'warn',

    /**
     * 这条规则不允许修改只读的全局变量。
     * @see https://eslint.org/docs/v8.x/rules/no-global-assign
     */
    'no-global-assign': 'warn',

    /**
     * 这条规则的目的是为类型转换标出较短的符号，然后建议一个更容易解释的符号。
     * @see https://eslint.org/docs/v8.x/rules/no-implicit-coercion
     */
    'no-implicit-coercion': 'off',

    /**
     * 最好避免用本应属于脚本的局部变量"污染"全局范围。
     * @see https://eslint.org/docs/v8.x/rules/no-implicit-globals
     */
    'no-implicit-globals': 'off',

    /**
     * 本规则旨在通过使用 setTimeout()、setInterval() 或 execScript() 消除隐含的 eval()。
     * @see https://eslint.org/docs/v8.x/rules/no-implied-eval
     */
    'no-implied-eval': 'off',

    /**
     * 这条规则不允许与代码在同一行的注释。
     * @see https://eslint.org/docs/v8.x/rules/no-inline-comments
     */
    'no-inline-comments': 'off',

    /**
     * 这条规则的目的是在 this 的值为 undefined 的情况下标记 this 关键字的使用。
     * @see https://eslint.org/docs/v8.x/rules/no-invalid-this
     */
    'no-invalid-this': 'off',

    /**
     * 这条规则的目的是防止因使用 __iterator__ 属性而可能产生的错误，该属性在一些浏览器中没有实现。
     * @see https://eslint.org/docs/v8.x/rules/no-iterator
     */
    'no-iterator': 'warn',

    /**
     * 这条规则旨在创建更清晰的代码，不允许创建一个与范围内的变量同名的标签的坏做法。
     * @see https://eslint.org/docs/v8.x/rules/no-label-var
     */
    'no-label-var': 'error',

    /**
     * 这条规则的目的是消除 JavaScript 中标签语句的使用。
     * @see https://eslint.org/docs/v8.x/rules/no-labels
     */
    'no-labels': 'off',


    /**
     * 这条规则旨在消除脚本顶层或其他区块内不必要的、可能引起混淆的区块。
     * @see https://eslint.org/docs/v8.x/rules/no-lone-blocks
     */
    'no-lone-blocks': 'off',

    /**
     * 使用此规则禁用 if 语句作为 else 块的唯一语句。
     * @see https://eslint.org/docs/v8.x/rules/no-lonely-if
     */
    'no-lonely-if': 'off',

    /**
     * 这条规则不允许循环中的任何函数包含不安全的引用（例如对外部作用域的修改变量）。
     * @see https://eslint.org/docs/v8.x/rules/no-loop-func
     */
    'no-loop-func': 'off',

    /**
     * no-magic-numbers 规则的目的是通过确保特殊数字被声明为常量，使其含义明确。
     * @see https://eslint.org/docs/v8.x/rules/no-magic-numbers
     */
    'no-magic-numbers': 'off',

    /**
     * 用小括号将复杂的表达式括起来，可以澄清开发者的意图，从而使代码更易读。
     * @see https://eslint.org/docs/v8.x/rules/no-mixed-operators
     */
    'no-mixed-operators': 'off',

    /**
     * 这条规则不允许在一条语句中使用多个赋值。
     * @see https://eslint.org/docs/v8.x/rules/no-multi-assign
     */
    'no-multi-assign': 'error',

    /**
     * 这条规则的目的是防止使用多行字符串。
     * @see https://eslint.org/docs/v8.x/rules/no-multi-str
     */
    'no-multi-str': 'warn',

    /**
     * 这条规则不允许以下任何一种情况下的否定条件：
     * - if 语句有一个 else 分支
     * - 三元表达式
     * @see https://eslint.org/docs/v8.x/rules/no-negated-condition
     */
    'no-negated-condition': 'off',

    /**
     * 这条规则不允许使用嵌套的三元表达式。
     * @see https://eslint.org/docs/v8.x/rules/no-nested-ternary
     */
    'no-nested-ternary': 'off',

    /**
     * 这条规则的目的是保持一致性和惯例，不允许使用 new 关键字的构造函数调用，而不把产生的对象分配给一个变量。
     * @see https://eslint.org/docs/v8.x/rules/no-new
     */
    'no-new': 'off',

    /**
     * 不允许使用 new Function() 创建函数。
     * @see https://eslint.org/docs/v8.x/rules/no-new-func
     */
    'no-new-func': 'off',

    /**
     * 这条规则不允许使用 Object 构造函数创建对象。
     * @see https://eslint.org/docs/v8.x/rules/no-new-object
     */
    'no-new-object': 'off',

    /**
     * 这条规则的目的是消除使用 String、Number 和 Boolean 与 new 运算符创建包装对象。
     * @see https://eslint.org/docs/v8.x/rules/no-new-wrappers
     */
    'no-new-wrappers': 'off',

    /**
     * 这条规则不允许在字符串字面中使用 \8 和 \9 转义序列。
     * @see https://eslint.org/docs/v8.x/rules/no-nonoctal-decimal-escape
     */
    'no-nonoctal-decimal-escape': 'error',

    /**
     * 这条规则不允许八进制字头。
     * @see https://eslint.org/docs/v8.x/rules/no-octal
     */
    'no-octal': 'off',

    /**
     * 这条规则不允许在字符串字面中使用八进制转义序列。
     * @see https://eslint.org/docs/v8.x/rules/no-octal-escape
     */
    'no-octal-escape': 'error',

    /**
     * 这条规则的目的是防止因修改或重新分配函数参数而引起的非预期行为。
     * @see https://eslint.org/docs/v8.x/rules/no-param-reassign
     */
    'no-param-reassign': 'off',

    /**
     * 这条规则不允许使用单数运算符 ++ 和 --。
     * @see https://eslint.org/docs/v8.x/rules/no-plusplus
     */
    'no-plusplus': 'off',

    /**
     * 禁用 __proto__ 属性
     * @see https://eslint.org/docs/v8.x/rules/no-proto
     */
    'no-proto': 'warn',

    /**
     * 这条规则的目的是消除在同一范围内有多个声明的变量。
     * @description 关闭, 因为此选项会与 ts 函数重载发生冲突.
     * @see https://eslint.org/docs/v8.x/rules/no-redeclare
     */
    'no-redeclare': 'off',

    /**
     * 这条规则不允许在正则表达式字面上有多个空格。
     * @see https://eslint.org/docs/v8.x/rules/no-regex-spaces
     */
    'no-regex-spaces': 'off',

    /**
     * 这条规则不允许指定的命名被用作导出的名称。
     * @see https://eslint.org/docs/v8.x/rules/no-restricted-exports
     */
    'no-restricted-exports': 'off',

    /**
     * 这条规则允许你指定你不想在你的应用程序中使用的全局变量名称。
     * @see https://eslint.org/docs/v8.x/rules/no-restricted-globals
     */
    'no-restricted-globals': [
      'warn',
      'isNaN'
    ],

    /**
     * 这条规则允许你指定你不想在你的应用程序中使用的导入。
     * @see https://eslint.org/docs/v8.x/rules/no-restricted-imports
     */
    'no-restricted-imports': 'off',

    /**
     * 该规则查找访问给定对象名称上的给定属性键，无论是在读取属性的值还是作为函数调用它时。
     * @see https://eslint.org/docs/v8.x/rules/no-restricted-properties
     */
    'no-restricted-properties': 'off',

    /**
     * 这条规则不允许指定的（也就是用户定义的）语法。
     * @see https://eslint.org/docs/v8.x/rules/no-restricted-syntax
     */
    'no-restricted-syntax': 'off',

    /**
     * 这条规则的目的是消除 return 语句中的赋值。因此，只要发现有赋值作为 return 的一部分，它就会发出警告。
     * @see https://eslint.org/docs/v8.x/rules/no-return-assign
     */
    'no-return-assign': 'warn',

    /**
     * 禁用 javascript: urls
     * @see https://eslint.org/docs/v8.x/rules/no-script-url
     */
    'no-script-url': 'off',

    /**
     * 本规则禁止使用逗号运算符
     * @see https://eslint.org/docs/v8.x/rules/no-sequences
     */
    'no-sequences': 'off',

    /**
     * 这条规则的目的是消除阴影变量的声明。
     * @see https://eslint.org/docs/v8.x/rules/no-shadow
     */
    'no-shadow': 'off',

    /**
     * 禁止标识符隐藏受限名称
     * @see https://eslint.org/docs/v8.x/rules/no-shadow-restricted-names
     */
    'no-shadow-restricted-names': 'error',

    /**
     * 这条规则不允许三元运算符。
     * @see https://eslint.org/docs/v8.x/rules/no-ternary
     */
    'no-ternary': 'off',

    /**
     * 这条规则的目的是在抛出异常时保持一致性，不允许抛出不可能是 Error 对象的字面和其他表达式。
     * @see https://eslint.org/docs/v8.x/rules/no-throw-literal
     */
    'no-throw-literal': 'warn',

    /**
     * 该规则旨在消除初始化为 undefined 的 var 和 let 变量声明。
     * @see https://eslint.org/docs/v8.x/rules/no-undef-init
     */
    'no-undef-init': 'off',

    /**
     * 这条规则旨在消除 undefined 的使用，因此只要使用它就会产生一个警告。
     * @see https://eslint.org/docs/v8.x/rules/no-undefined
     */
    'no-undefined': 'warn',

    /**
     * 这条规则不允许在标识符中使用悬空的下划线。
     * @see https://eslint.org/docs/v8.x/rules/no-underscore-dangle
     */
    'no-underscore-dangle': 'off',

    /**
     * 当存在更简单的选择时，这条规则不允许三元运算符。
     * @see https://eslint.org/docs/v8.x/rules/no-unneeded-ternary
     */
    'no-unneeded-ternary': 'off',

    /**
     * 这条规则的目的是消除那些对程序状态没有影响的未使用的表达式。
     * @see https://eslint.org/docs/v8.x/rules/no-unused-expressions
     */
    'no-unused-expressions': 'off',

    /**
     * 在代码的任何地方声明了而没有使用的标签，很可能是由于不完整的重构造成的错误。
     * @see https://eslint.org/docs/v8.x/rules/no-unused-labels
     */
    'no-unused-labels': 'error',

    /**
     * 禁止 calls to .call() and .apply()
     * @see https://eslint.org/docs/v8.x/rules/no-useless-call
     */
    'no-useless-call': 'off',

    /**
     * 这条规则报告的 catch 子句只 throw 被捕获的错误。
     * @see https://eslint.org/docs/v8.x/rules/no-useless-catch
     */
    'no-useless-catch': 'error',

    /**
     * 这条规则不允许在非必要的情况下使用计算的属性键。
     * @see https://eslint.org/docs/v8.x/rules/no-useless-computed-key
     */
    'no-useless-computed-key': 'off',

    /**
     * 这条规则的目的是当两个字面量可以合并成一个字面量的时候，标记出它们的连接。字面量可以是字符串或模板字面量。
     * @see https://eslint.org/docs/v8.x/rules/no-useless-concat
     */
    'no-useless-concat': 'off',

    /**
     * 这条规则标记了可以安全删除的类构造函数，而不改变类的工作方式。
     * @see https://eslint.org/docs/v8.x/rules/no-useless-constructor
     */
    'no-useless-constructor': 'off',

    /**
     * 这条规则标志着可以安全地删除转义而不改变行为。
     * @see https://eslint.org/docs/v8.x/rules/no-useless-escape
     */
    'no-useless-escape': 'off',

    /**
     * 这条规则不允许将导入、导出和解构操作重命名为同一名称。
     * @see https://eslint.org/docs/v8.x/rules/no-useless-rename
     */
    'no-useless-rename': 'off',

    /**
     * 这条规则的目的是报告多余的 return 语句。
     * @see https://eslint.org/docs/v8.x/rules/no-useless-return
     */
    'no-useless-return': 'off',

    /**
     * 这条规则的目的是不鼓励使用 var，鼓励使用 const 或 let 代替。
     * @see https://eslint.org/docs/v8.x/rules/no-var
     */
    'no-var': 'warn',

    /**
     * 这条规则的目的是消除无效运算符的使用。
     * @see https://eslint.org/docs/v8.x/rules/no-void
     */
    'no-void': 'off',

    /**
     * 此规则报告包括其配置中指定的任何预定义术语的注释。
     * @see https://eslint.org/docs/v8.x/rules/no-warning-comments
     */
    'no-warning-comments': 'off',

    /**
     * 使用此规则禁用 with 语句。
     * @see https://eslint.org/docs/v8.x/rules/no-with
     */
    'no-with': 'error',

    /**
     * 该规则强制使用速记语法。这适用于 适用于在对象字面中定义的所有方法（包括生成器）和任何属性，其中的键名与分配的变量名相匹配。
     * @see https://eslint.org/docs/v8.x/rules/object-shorthand
     */
    'object-shorthand': 'off',

    /**
     * 这条规则强制要求变量在每个函数（对于 var）或块（对于 let 和 const）范围内一起或分别声明。
     * @see https://eslint.org/docs/v8.x/rules/one-var
     */
    'one-var': 'off',

    /**
     * 这条规则强制要求变量声明周围有一致的换行线
     * @see https://eslint.org/docs/v8.x/rules/one-var-declaration-per-line
     */
    'one-var-declaration-per-line': 'off',

    /**
     * 本规则要求或不允许在可能的情况下使用赋值运算符速记。
     * @see https://eslint.org/docs/v8.x/rules/operator-assignment
     */
    'operator-assignment': 'off',

    /**
     * 这条规则定位了用作回调或函数参数的函数表达式。对于任何可以用箭头函数替换而不改变结果的，将产生一个错误。
     * @see https://eslint.org/docs/v8.x/rules/prefer-arrow-callback
     */
    'prefer-arrow-callback': 'off',

    /**
     * 这条规则旨在标记那些使用 let 关键字声明的变量，但在初始赋值后从未重新赋值。
     * @see https://eslint.org/docs/v8.x/rules/prefer-const
     */
    'prefer-const': 'off',

    /**
     * 在 JavaScript ES6 中，增加了一种新的语法，用于从数组索引或对象属性创建变量，称为解构。这条规则强制使用解构，而不是通过成员表达式来访问一个属性。
     * @see https://eslint.org/docs/v8.x/rules/prefer-destructuring
     */
    'prefer-destructuring': 'off',

    /**
     * 这条规则不允许调用 Math.pow，建议使用 ** 运算符代替。
     * @see https://eslint.org/docs/v8.x/rules/prefer-exponentiation-operator
     */
    'prefer-exponentiation-operator': 'off',

    /**
     * 随着 ECMAScript 2018 的登陆，命名的捕获组可以在正则表达式中使用，这可以提高其可读性。 本规则的目的是在正则表达式中使用命名的捕获组而不是编号的捕获组。
     * @see https://eslint.org/docs/v8.x/rules/prefer-named-capture-group
     */
    'prefer-named-capture-group': 'off',

    /**
     * 如果调用 parseInt() 或 Number.parseInt()时有两个参数：一个字符串；以及 2（二进制）、8（八进制）或 16（十六进制）的进制选项，则本规则不允许调用。
     * @see https://eslint.org/docs/v8.x/rules/prefer-numeric-literals
     */
    'prefer-numeric-literals': 'off',

    /**
     * 在 ES2022 中引入的 Object.hasOwn() 是 Object.prototype.hasOwnProperty.call() 的一个更简短的替代方法。
     * @see https://eslint.org/docs/v8.x/rules/prefer-object-has-own
     */
    'prefer-object-has-own': 'off',

    /**
     *
     * @see https://eslint.org/docs/v8.x/rules/prefer-object-spread
     */
    'prefer-object-spread': 'off',

    /**
     * 这条规则的目的是确保只拒绝带有 Error 对象的 Promise。
     * @see https://eslint.org/docs/v8.x/rules/prefer-promise-reject-errors
     */
    'prefer-promise-reject-errors': 'off',

    /**
     * 这条规则不允许使用 RegExp 构造函数，其参数为字符串字面。
     * @see https://eslint.org/docs/v8.x/rules/prefer-regex-literals
     */
    'prefer-regex-literals': 'off',

    /**
     * 这条规则的目的是标记 arguments 变量的使用。
     * @see https://eslint.org/docs/v8.x/rules/prefer-rest-params
     */
    'prefer-rest-params': 'warn',

    /**
     * 这条规则的目的是在可以使用传播语法的情况下，标记出 Function.prototype.apply() 的用法。
     * @see https://eslint.org/docs/v8.x/rules/prefer-spread
     */
    'prefer-spread': 'off',

    /**
     * 这条规则的目的是标明使用 + 运算符连接的字符串。
     * @see https://eslint.org/docs/v8.x/rules/prefer-template
     */
    'prefer-template': 'off',

    /**
     * 这条规则要求在对象的字面属性名称周围加引号。
     * @see https://eslint.org/docs/v8.x/rules/quote-props
     */
    'quote-props': 'off',

    /**
     * 这条规则的目的是防止意外地将一个字符串转换为与预期不同的基数，或者如果只针对现代环境，则防止多余的 10 小数。
     * @see https://eslint.org/docs/v8.x/rules/radix
     */
    'radix': 'off',

    /**
     * 这条规则警告那些没有 await 表达式的异步函数。
     * @see https://eslint.org/docs/v8.x/rules/require-await
     */
    'require-await': 'off',

    /**
     * 这条规则的目的是在正则表达式上强制使用 u 或 v 标志。
     * @see https://eslint.org/docs/v8.x/rules/require-unicode-regexp
     */
    'require-unicode-regexp': 'off',

    /**
     * 该规则对没有 yield 关键字的生成器函数产生警告。
     * @see https://eslint.org/docs/v8.x/rules/require-yield
     */
    'require-yield': 'off',

    /**
     * 这个规则检查所有的导入声明，并验证所有的导入首先按照使用的成员语法排序，然后按照第一个成员或别名的字母顺序排序。
     * @see https://eslint.org/docs/v8.x/rules/sort-imports
     */
    'sort-imports': 'off',

    /**
     * 该规则检查对象表达式的所有属性定义，并验证所有变量是否按字母顺序排序。
     * @see https://eslint.org/docs/v8.x/rules/sort-keys
     */
    'sort-keys': 'off',

    /**
     * 该规则检查所有的变量声明块，并验证所有的变量是否按字母顺序排序。
     * @see https://eslint.org/docs/v8.x/rules/sort-vars
     */
    'sort-vars': 'off',

    /**
     * 这条规则将强制执行注释 // 或 /* 开始后的间距的一致性。它还为各种文档风格提供了一些例外情况。
     * @description 此规则会 typescript 的三斜线指令, 所以禁止
     * @see https://eslint.org/docs/v8.x/rules/spaced-comment
     */
    'spaced-comment': 'off',

    /**
     * 这条规则要求或不允许严格模式指令。
     * @see https://eslint.org/docs/v8.x/rules/strict
     */
    'strict': 'off',

    /**
     * 本规则要求在创建符号时要有描述。
     * @see https://eslint.org/docs/v8.x/rules/symbol-description
     */
    'symbol-description': 'warn',

    /**
     * 这条规则的目的是将所有的变量声明保持在前面的一系列语句中。 允许多个声明有助于促进可维护性，因此是允许的。
     * @see https://eslint.org/docs/v8.x/rules/vars-on-top
     */
    'vars-on-top': 'off',

    /**
     * 这条规则的目的是强制执行一致的条件风格，将一个变量与一个字面值进行比较。
     * @see https://eslint.org/docs/v8.x/rules/yoda
     */
    'yoda': 'off',

    // =================================================================
    // ==================== Layout & Formatting ========================
    // =================================================================

    /**
     * 强制行注释的位置
     * @see https://eslint.org/docs/v8.x/rules/line-comment-position
     */
    'line-comment-position': 'off',

    /**
     * 需要或禁止 Unicode 字节顺序标记 （BOM）
     * @see https://eslint.org/docs/v8.x/rules/unicode-bom
     */
    'unicode-bom': 'off',
  }
});
