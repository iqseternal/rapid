
/** @type {import("eslint").Linter.RulesRecord} */
const Rules = {
  // =================================================================
  // ============================ Inner Rules ========================
  // =================================================================
  /**
   * 要求数组方法需要具有返回值, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/array-callback-return
   */
  'array-callback-return': 'off',

  /**
   * 构造函数需要 super 调用，typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/constructor-super
   */
  'constructor-super': 'off',

  /**
   * 检查是否使用了反方向的 for 循环
   * @link https://eslint.org/docs/v8.x/rules/for-direction
   * @example
   * for (let i = 0; i < 10; i--) {}
   */
  'for-direction': 'error',

  /**
   * 强制 getter 函数具有 return 语句, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/getter-return
   */
  'getter-return': 'off',

  /**
   * 不允许 promise 回调为异步函数
   * @link https://eslint.org/docs/v8.x/rules/no-async-promise-executor
   */
  'no-async-promise-executor': 'off',

  /**
   * 禁止在循环中使用 await
   * @link https://eslint.org/docs/v8.x/rules/no-await-in-loop
   */
  'no-await-in-loop': 'off',

  /**
   * 不能对类赋值, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-class-assign
   */
  'no-class-assign': 'off',

  /**
   * 不允许直接与 +-0 等于判断
   * @link https://eslint.org/docs/v8.x/rules/no-compare-neg-zero
   * @example
   * if (x === -0) {}
   */
  'no-compare-neg-zero': 'off',

  /**
   * 禁止在条件表达式中使用赋值运算符
   * @link https://eslint.org/docs/v8.x/rules/no-cond-assign
   * @example
   * if (x = 1) {}
   */
  'no-cond-assign': ['error'],

  /**
   * 禁止对 const 变量重新赋值, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-const-assign
   */
  'no-const-assign': 'off',

  /**
   * 不允许作不影响值的表达式, (有短路的条件表达式)
   * @link https://eslint.org/docs/v8.x/rules/no-constant-binary-expression
   * @example
   * const value1 = +x == null;
   * const value3 = !foo == null;
   */
  'no-constant-binary-expression': 'error',

  /**
   * 不允许在条件中使用常量表达式
   * @link https://eslint.org/docs/v8.x/rules/no-constant-condition
   * @example
   * if (true) {}
   */
  'no-constant-condition': 'error',

  /**
   * 构造函数不允许有返回值, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-constructor-return
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
   * @link https://eslint.org/docs/v8.x/rules/no-control-regex
   */
  'no-control-regex': 'off',

  /**
   * 禁止使用debugger
   * @link https://eslint.org/docs/v8.x/rules/no-debugger
   */
  'no-debugger': 'warn',

  /**
   * 禁止在定义中使用重复的参数function, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-dupe-args
   */
  'no-dupe-args': 'off',

  /**
   * 禁止在类成员中使用重复的名称, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-dupe-class-members
   */
  'no-dupe-class-members': 'off',

  /**
   * 禁止书写重复的 else if 条件, typescript 能够检查
   * @description ts: 如果重复类型为 never, 不需要 eslint
   * @link https://eslint.org/docs/v8.x/rules/no-dupe-else-if
   */
  'no-dupe-else-if': 'off',

  /**
   * 禁止在对象字面量中使用重复的键, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-dupe-keys
   */
  'no-dupe-keys': 'off',

  /**
   * 禁止在 switch 语句中使用重复的 case 标签, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-duplicate-case
   */
  'no-duplicate-case': 'off',

  /**
   * 禁止重复的导入路径
   * @link https://eslint.org/docs/v8.x/rules/no-duplicate-imports
   */
  'no-duplicate-imports': 'warn',

  /**
   * 禁止在正则表达式中使用空字符类
   * @link https://eslint.org/docs/v8.x/rules/no-empty-character-class
   */
  'no-empty-character-class': 'error',

  /**
   * 不允许空的解构模式
   * @link https://eslint.org/docs/v8.x/rules/no-empty-pattern
   */
  'no-empty-pattern': 'error',

  /**
   * 不允许在子句中重新分配异常catch
   * @link https://eslint.org/docs/v8.x/rules/no-ex-assign
   * @example
   * try {} catch(e) {
   *    e = 1;
   * }
   */
  'no-ex-assign': 'error',

  /**
   * 不允许语句的传递case
   * @link https://eslint.org/docs/v8.x/rules/no-fallthrough
   */
  'no-fallthrough': 'error',

  /**
   * 不允许对 function 重新赋值, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-func-assign
   */
  'no-func-assign': 'off',

  /**
   * 不允许对导入的变量进行重新赋值, , typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-import-assign
   */
  'no-import-assign': 'off',

  /**
   * 不允许嵌套块函数中的变量或声明
   * @link https://eslint.org/docs/v8.x/rules/no-inner-declarations
   */
  'no-inner-declarations': 'off',

  /**
   * 检测正则的有效性
   * @link https://eslint.org/docs/v8.x/rules/no-invalid-regexp
   * @example
   * RegExp('[')
   */
  'no-invalid-regexp': 'error',

  /**
   * 不允许不规则的空格
   * @link https://eslint.org/docs/v8.x/rules/no-irregular-whitespace
   */
  'no-irregular-whitespace': 'error',

  /**
   * 不允许丢失精度的文本数字
   * @link https://eslint.org/docs/v8.x/rules/no-loss-of-precision
   */
  'no-loss-of-precision': 'error',

  /**
   * 不允许在字符类语法中使用多个码位创建的字符
   * @link https://eslint.org/docs/v8.x/rules/no-misleading-character-class
   */
  'no-misleading-character-class': 'error',

  /**
   * 禁止使用全局非构造函数的运算符new, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-new-native-nonconstructor
   */
  'no-new-native-nonconstructor': 'off',

  /**
   * 不允许使用对象newSymbol, typescript 能够检查
   * @link https://eslint.org/docs/v8.x/rules/no-new-symbol
   */
  'no-new-symbol': 'off',

  /**
   * 禁止将全局对象属性作为函数调用
   * @link https://eslint.org/docs/v8.x/rules/no-obj-calls
   */
  'no-obj-calls': 'off',

  /**
   * 不允许从 Promise executor 函数返回值
   * @description 由ts接管
   * @link https://eslint.org/docs/v8.x/rules/no-promise-executor-return
   */
  'no-promise-executor-return': 'off',

  /**
   * 禁止直接在对象上调用某些方法Object.prototype
   * @link https://eslint.org/docs/v8.x/rules/no-prototype-builtins
   */
  'no-prototype-builtins': 'error',

  /**
   * 不允许两边完全相同的作业
   * @link https://eslint.org/docs/v8.x/rules/no-self-assign
   */
  'no-self-assign': 'warn',

  /**
   * 不允许在两边完全相同的情况下进行比较
   * @link https://eslint.org/docs/v8.x/rules/no-self-compare
   */
  'no-self-compare': 'warn',

  /**
   * 不允许从 setter 返回值
   * @link https://eslint.org/docs/v8.x/rules/no-setter-return
   */
  'no-setter-return': 'off',

  /**
   * 不允许使用稀疏数组
   * @link https://eslint.org/docs/v8.x/rules/no-sparse-arrays
   */
  'no-sparse-arrays': 'error',

  /**
   * 禁止在常规字符串中使用模板文本占位符语法
   * @link https://eslint.org/docs/v8.x/rules/no-template-curly-in-string
   */
  'no-template-curly-in-string': 'off',


  /**
   * 在调用构造函数super()之前不允许 this/super
   * @description ts处理
   * @link https://eslint.org/docs/v8.x/rules/no-this-before-super
   */
  'no-this-before-super': 'off',


  /**
   * 不允许使用未声明的变量，除非在注释中提及/*global *\/
   * @description ts处理
   * @link https://eslint.org/docs/v8.x/rules/no-undef
   */
  'no-undef': 'off',

  /**
   * 不允许令人困惑的多行表达式
   * @link https://eslint.org/docs/v8.x/rules/no-unexpected-multiline
   */
  'no-unexpected-multiline': 'error',

  /**
   * 不允许未修改的循环条件
   * @link https://eslint.org/docs/v8.x/rules/no-unmodified-loop-condition
   */
  'no-unmodified-loop-condition': 'error',

  /**
   * 禁止不可达代码
   * @description ts处理
   * @link https://eslint.org/docs/v8.x/rules/no-unreachable
   */
  'no-unreachable': 'off',

  /**
   * 不允许 body 只允许一次迭代的循环
   * @description 永远无法到达第二次迭代的循环是代码中可能存在的错误。
   * @link https://eslint.org/docs/v8.x/rules/no-unreachable-loop
   */
  'no-unreachable-loop': 'warn',

  /**
   * 禁止在块中使用控制流语句finally
   * @link https://eslint.org/docs/v8.x/rules/no-unsafe-finally
   */
  'no-unsafe-finally': 'error',

  /**
   * 不允许否定关系运算符的左作数
   * @link https://eslint.org/docs/v8.x/rules/no-unsafe-negation
   * @example
   * if (!key in object) {}
   * if (!obj instanceof Ctor) {}
   */
  'no-unsafe-negation': 'error',

  /**
   * 不允许在不允许该值的上下文中使用可选链接undefined
   * @description ts处理
   * @link https://eslint.org/docs/v8.x/rules/no-unsafe-optional-chaining
   */
  'no-unsafe-optional-chaining': 'off',

  /**
   * 不允许未使用的私有类成员
   * @link https://eslint.org/docs/v8.x/rules/no-unused-private-class-members
   */
  'no-unused-private-class-members': 'warn',

  /**
   * 不允许未使用的变量
   * @link https://eslint.org/docs/v8.x/rules/no-unused-vars
   */
  'no-unused-vars': 'off',

  /**
   * 在定义变量之前禁止使用
   * @link https://eslint.org/docs/v8.x/rules/no-use-before-define
   */
  'no-use-before-define': 'off',

  /**
   * 禁止正则表达式中无用的反向引用
   * @link https://eslint.org/docs/v8.x/rules/no-useless-backreference
   */
  'no-useless-backreference': 'error',

  /**
   * 禁止因使用 await 或 yield 而导致争用条件的赋值
   * @link https://eslint.org/docs/v8.x/rules/require-atomic-updates
   */
  'require-atomic-updates': 'off',

  /**
   * 在检查isNaN()
   * @link https://eslint.org/docs/v8.x/rules/use-isnan
   */
  'use-isnan': 'error',

  /**
   * 强制将表达式与有效字符串进行比较typeof
   * @description ts处理
   * @link https://eslint.org/docs/v8.x/rules/valid-typeof
   */
  'valid-typeof': 'off',


  // =================================================================
  // ============================ Suggestions Rules ==================
  // =================================================================

  /**
   * 在对象和类中强制执行 getter 和 setter 对
   * @link https://eslint.org/docs/v8.x/rules/accessor-pairs
   */
  'accessor-pairs': 'off',

  /**
   * 要求在箭头函数体周围加上大括号
   * @link https://eslint.org/docs/v8.x/rules/arrow-body-style
   */
  'arrow-body-style': 'off',

  /**
   * 在定义的范围内强制使用变量
   * @link https://eslint.org/docs/v8.x/rules/block-scoped-var
   */
  'block-scoped-var': 'warn',

  /**
   * 驼峰命名规则
   * @description 命名规则不定式, 如果强制会导致见名知其意降低
   * @link https://eslint.org/docs/v8.x/rules/camelcase
   */
  'camelcase': 'off',

  /**
   * 强制注释大写字母开头
   * @link https://eslint.org/docs/v8.x/rules/capitalized-comments
   */
  'capitalized-comments': 'off',

  /**
   * 强制类方法使用 this
   * @link https://eslint.org/docs/v8.x/rules/class-methods-use-this
   */
  'class-methods-use-this': 'off',

  /**
   * 强制执行程序中允许的最大圈复杂度
   * @link https://eslint.org/docs/v8.x/rules/complexity
   */
  'complexity': 'off',

  /**
   * 要求语句始终或从不指定值return
   * @description 由ts接管
   * @link https://eslint.org/docs/v8.x/rules/consistent-return
   */
  'consistent-return': 'off',

  /**
   * 在捕获当前执行上下文时强制执行一致的命名
   * @link https://eslint.org/docs/v8.x/rules/consistent-this
   */
  'consistent-this': ["error", "that", "self", "_this", "_that"],

  /**
   * 对所有控制语句强制执行一致的大括号样式
   * @link https://eslint.org/docs/v8.x/rules/curly
   */
  'curly': 'off',

  /**
   * 强制 switch 语句中的 default 分支
   * @link https://eslint.org/docs/v8.x/rules/default-case
   */
  'default-case': 'warn',

  /**
   * 默认参数赋值只能在最后
   * @description 由ts接管
   * @link https://eslint.org/docs/v8.x/rules/default-param-last
   */
  'default-param-last': 'off',

  /**
   * 尽可能使用 . 运算符
   * @link https://eslint.org/docs/v8.x/rules/dot-notation
   */
  'dot-notation': 'off',

  /**
   * 强制使用 === and !==
   * @link https://eslint.org/docs/v8.x/eqeqeq
   */
  'eqeqeq': 'warn',

  /**
   * 要求函数名称与它们所分配到的变量或属性的名称匹配
   * @link https://eslint.org/docs/v8.x/func-name-matching
   */
  'func-name-matching': 'off',

  /**
   * 要求函数具名
   * @link https://eslint.org/docs/v8.x/func-names
   */
  'func-names': 'off',

  /**
   * 强制一致地使用声明或表达式function
   * @link https://eslint.org/docs/v8.x/func-style
   */
  'func-style': 'off',

  /**
   * 在对象字面量和类中需要分组的访问器对同一属性的 getter 和 setter 不必彼此相邻定义。
   * @link https://eslint.org/docs/v8.x/grouped-accessor-pairs
   */
  'grouped-accessor-pairs': 'off',

  /**
   * 要求循环包含语句for-in if
   * @link https://eslint.org/docs/v8.x/guard-for-in
   */
  'guard-for-in': 'off',

  /**
   * 禁止指定的标识符
   * @link https://eslint.org/docs/v8.x/id-denylist
   */
  'id-denylist': 'off',

  /**
   * 标识符长度
   * @link https://eslint.org/docs/v8.x/id-length
   */
  'id-length': 'off',

  /**
   * 标识符规则
   * @link https://eslint.org/docs/v8.x/id-match
   */
  'id-match': 'off',

  /**
   * 声明时需要初始化
   * @description 由ts接管
   * @link https://eslint.org/docs/v8.x/init-declarations
   */
  'init-declarations': 'off',

  /**
   * 需要或不允许逻辑赋值运算符速记
   * @link https://eslint.org/docs/v8.x/logical-assignment-operators
   */
  'logical-assignment-operators': 'off',

  /**
   * 规定文件中的最大类数量
   * @link https://eslint.org/docs/v8.x/max-classes-per-file
   */
  'max-classes-per-file': 'off',

  /**
   * 规定最大逻辑块深度
   * @link https://eslint.org/docs/v8.x/max-depth
   */
  'max-depth': ['error', 10],

  /**
   * 强制每个文件的最大行数
   * @link https://eslint.org/docs/v8.x/max-lines
   */
  'max-lines': 'off',

  /**
   * 在函数中强制执行最大代码行数
   * @link https://eslint.org/docs/v8.x/max-lines-per-function
   */
  'max-lines-per-function': 'off',

  /**
   * 强制要求回调可以嵌套的最大深度
   * @link https://eslint.org/docs/v8.x/max-nested-callbacks
   */
  'max-nested-callbacks': 'off',

  /**
   * 在函数定义中强制执行最大参数数
   * @link https://eslint.org/docs/v8.x/max-params
   */
  'max-params': 'off',

  /**
   * 强制功能块中允许的最大语句数
   * @link https://eslint.org/docs/v8.x/rules/max-statements
   */
  'max-statements': 'off',

  /**
   * 对多行注释强制使用特定样式
   * @link https://eslint.org/docs/v8.x/rules/multiline-comment-style
   */
  'multiline-comment-style': ["error", "starred-block"],

  /**
   * 要求构造函数名称以大写字母开头
   * @link https://eslint.org/docs/v8.x/rules/new-cap
   */
  'new-cap': 'warn',

  /**
   * 禁止使用 alert、confirm 和prompt
   * @link https://eslint.org/docs/v8.x/rules/no-alert
   */
  'no-alert': 'off',

  /**
   * 禁止使用 Array 构造函数
   * @link https://eslint.org/docs/v8.x/rules/no-array-constructor
   */
  'no-array-constructor': 'off',



  // TODO: 添加剩余的规则





  // =================================================================
  // ==================== Layout & Formatting ========================
  // =================================================================

  /**
   * 强制行注释的位置
   * @link https://eslint.org/docs/v8.x/rules/line-comment-position
   */
  'line-comment-position': 'off',

  /**
   * 需要或禁止 Unicode 字节顺序标记 （BOM）
   * @link https://eslint.org/docs/v8.x/rules/unicode-bom
   */
  'unicode-bom': 'off',


  // TODO: 添加剩余的规则(其他插件, 例如 @typescriptlint)
};

const oldRules = {
  'comma-dangle': 'off',
  'arrow-parens': 'off',
  "function-paren-newline": 'off',
  "no-multiple-empty-lines": 'off',
  'no-unused-vars': 'off',

  // js/ts
  camelcase: ['error', { properties: 'never' }],
  'no-console': 'off',
  'no-debugger': 'warn',
  'no-restricted-syntax': ['off', 'LabeledStatement', 'WithStatement'],
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
    'off',
    'always',
    { ignoreConstructors: false, avoidQuotes: true },
  ],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',

  'no-redeclare': 'off',
  '@typescript-eslint/no-redeclare': 'error',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/triple-slash-reference': 'off',

  'no-undef': 'off',
  'multiline-ternary': 'off',
  '@typescript-eslint/no-unnecessary-type-constraint': 'off',
  'no-void': 'off',
  'no-undefined': 'error',
  'prefer-template': 'off',
  'no-constant-condition': 'off',
  'non-nullis': 'off',
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/prefer-as-const': 'off',
  '@typescript-eslint/consistent-type-imports': 'off',
  'no-async-promise-executor': 'off',
  'no-useless-escape': 'off',

  'no-ignore': 'off',

  // best-practice
  'array-callback-return': 'error',
  'block-scoped-var': 'error',
  'no-alert': 'off',
  'no-case-declarations': 'error',
  'no-multi-str': 'error',
  'no-with': 'error',
  'no-confirm': 'off',

  'sort-imports': [
    'error',
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



  // import
  'import/first': 'off',
  'import/no-duplicates': 'warn',
  'import/no-unresolved': 'off',
  'import/namespace': 'off',
  'import/default': 'off',
  'import/no-named-as-default': 'off',
  'import/no-named-as-default-member': 'off',
  'import/named': 'off',

  "@typescript-eslint/no-this-alias": [
    "error",
    {
      "allowDestructuring": false, // Disallow `const { props, state } = this`; true by default
      "allowedNames": ["self", 'that']
    }
  ]
}

/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  root: true,
  env: {
    es6: true,
    es2021: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',

    // 'plugin:import/recommended',
    // 'plugin:prettier/recommended',
    // 'prettier',
  ],
  plugins: [
    // '@typescript-eslint',
    // 'prettier'
  ],

  rules: {
    // prettier
    'prettier/prettier': 'off',
    ...Rules,

    /**
     * 未使用变量
     */
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-this-alias': 'off',
  }
}
