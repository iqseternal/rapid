import {
  isBoolean, isNumber, isString, isNull, isUndefined,

  isDef, isUnDef, isUseful, isUnUseful,
  isObject, isRawObject, isFunction, isDate, isPromiseLike,
  isArray, isClass
} from './judgeType';

test(`类型判断: isBoolean 函数`, () => {
  // number
  expect(isBoolean(0)).toBe(false);
  expect(isBoolean(-0)).toBe(false);
  expect(isBoolean(+0)).toBe(false);
  expect(isBoolean(1)).toBe(false);
  expect(isBoolean(1.1111)).toBe(false);
  expect(isBoolean(new Number(0))).toBe(false);
  expect(isBoolean(new Number(-0))).toBe(false);
  expect(isBoolean(new Number(+0))).toBe(false);
  expect(isBoolean(new Number(1))).toBe(false);
  expect(isBoolean(new Number(1.1111))).toBe(false);
  expect(isBoolean(Infinity)).toBe(false);
  expect(isBoolean(-Infinity)).toBe(false);
  expect(isBoolean(NaN)).toBe(false);

  // 布尔值
  expect(isBoolean(false)).toBe(true);
  expect(isBoolean(true)).toBe(true);
  expect(isBoolean(new Boolean(true))).toBe(true);
  expect(isBoolean(new Boolean(false))).toBe(true);

  // 字符串
  expect(isBoolean('')).toBe(false);
  expect(isBoolean('1')).toBe(false);
  expect(isBoolean(new String(''))).toBe(false);
  expect(isBoolean(new String('1'))).toBe(false);

  // 函数
  expect(isBoolean(() => { })).toBe(false);
  expect(isBoolean(function () { })).toBe(false);
  expect(isBoolean(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isBoolean(/\d/g)).toBe(false);
  expect(isBoolean(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isBoolean([])).toBe(false);
  expect(isBoolean([][0])).toBe(false);
  expect(isBoolean([1, 2, 3])).toBe(false);
  expect(isBoolean(new Array()[0])).toBe(false);
  expect(isBoolean(new Array(1, 2, 3))).toBe(false);
  expect(isBoolean(new Array(1, 2, 3)[0])).toBe(false);

  // 对象
  expect(isBoolean(class { })).toBe(false);
  expect(isBoolean(new (class { }))).toBe(false);
  expect(isBoolean({})).toBe(false);
  expect(isBoolean({ toString: () => 'Boolean' })).toBe(false);
  expect(isBoolean({ a: 1 })).toBe(false);
  expect(isBoolean(new Object())).toBe(false);
  expect(isBoolean(new Object()['a'])).toBe(false);
  expect(isBoolean(new Proxy({}, {}))).toBe(false);
  expect(isBoolean(new Date())).toBe(false);

  // undefined
  expect(isBoolean(void 0)).toBe(false);
  expect(isBoolean(undefined)).toBe(false);

  // null
  expect(isBoolean(null)).toBe(false);

  // promise
  expect(isBoolean(Promise.resolve())).toBe(false);
  expect(isBoolean({ then: () => { } })).toBe(false);

  // symbol
  expect(isBoolean(Symbol())).toBe(false);
  expect(isBoolean(Symbol('1'))).toBe(false);

  // bigint
  expect(isBoolean(1n)).toBe(false);
  expect(isBoolean(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isBoolean(generatorFunc())).toBe(false);
  expect(isBoolean(asyncGeneratorFunc())).toBe(false);

  expect(isBoolean(new Int8Array())).toBe(false);
  expect(isBoolean(new Uint8Array())).toBe(false);
  expect(isBoolean(new Float32Array())).toBe(false);
  expect(isBoolean(new ArrayBuffer(8))).toBe(false);
  expect(isBoolean(new WeakMap())).toBe(false);
  expect(isBoolean(new WeakSet())).toBe(false);
  expect(isBoolean(new Map())).toBe(false);
  expect(isBoolean(new Set())).toBe(false);
  expect(isBoolean(new Map([['a', 1]]))).toBe(false);
  expect(isBoolean(new Set([1, 2, 3]))).toBe(false);
  expect(isBoolean(new Error())).toBe(false);
  expect(isBoolean(new TypeError())).toBe(false);
  expect(isBoolean(new RangeError())).toBe(false);
  expect(isBoolean(Object.create(null))).toBe(false);
  expect(isBoolean(Object.create({}))).toBe(false);
})

test(`类型判断: isNumber 函数`, () => {
  // number
  expect(isNumber(0)).toBe(true);
  expect(isNumber(-0)).toBe(true);
  expect(isNumber(+0)).toBe(true);
  expect(isNumber(1)).toBe(true);
  expect(isNumber(1.1111)).toBe(true);
  expect(isNumber(new Number(0))).toBe(true);
  expect(isNumber(new Number(-0))).toBe(true);
  expect(isNumber(new Number(+0))).toBe(true);
  expect(isNumber(new Number(1))).toBe(true);
  expect(isNumber(new Number(1.1111))).toBe(true);
  expect(isNumber(Infinity)).toBe(true);
  expect(isNumber(-Infinity)).toBe(true);
  expect(isNumber(NaN)).toBe(true);

  // 布尔值
  expect(isNumber(true)).toBe(false);
  expect(isNumber(false)).toBe(false);
  expect(isNumber(new Boolean(true))).toBe(false);
  expect(isNumber(new Boolean(false))).toBe(false);

  // 字符串
  expect(isNumber('')).toBe(false);
  expect(isNumber('1')).toBe(false);
  expect(isNumber(new String(''))).toBe(false);
  expect(isNumber(new String('1'))).toBe(false);

  // 函数
  expect(isNumber(() => { })).toBe(false);
  expect(isNumber(function () { })).toBe(false);
  expect(isNumber(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isNumber(/\d/g)).toBe(false);
  expect(isNumber(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isNumber([])).toBe(false);
  expect(isNumber([][0])).toBe(false);
  expect(isNumber([1, 2, 3])).toBe(false);
  expect(isNumber(new Array()[0])).toBe(false);
  expect(isNumber(new Array(1, 2, 3))).toBe(false);
  expect(isNumber(new Array(1, 2, 3)[0])).toBe(true);

  // 对象
  expect(isNumber(class { })).toBe(false);
  expect(isNumber(new (class { }))).toBe(false);
  expect(isNumber({})).toBe(false);
  expect(isNumber({ toString: () => 'Boolean' })).toBe(false);
  expect(isNumber({ a: 1 })).toBe(false);
  expect(isNumber(new Object())).toBe(false);
  expect(isNumber(new Object()['a'])).toBe(false);
  expect(isNumber(new Proxy({}, {}))).toBe(false);
  expect(isNumber(new Date())).toBe(false);

  // undefined
  expect(isNumber(void 0)).toBe(false);
  expect(isNumber(undefined)).toBe(false);

  // null
  expect(isNumber(null)).toBe(false);

  // promise
  expect(isNumber(Promise.resolve())).toBe(false);
  expect(isNumber({ then: () => { } })).toBe(false);

  // symbol
  expect(isNumber(Symbol())).toBe(false);
  expect(isNumber(Symbol('1'))).toBe(false);

  // bigint
  expect(isNumber(1n)).toBe(false);
  expect(isNumber(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isNumber(generatorFunc())).toBe(false);
  expect(isNumber(asyncGeneratorFunc())).toBe(false);

  expect(isNumber(new Int8Array())).toBe(false);
  expect(isNumber(new Uint8Array())).toBe(false);
  expect(isNumber(new Float32Array())).toBe(false);
  expect(isNumber(new ArrayBuffer(8))).toBe(false);
  expect(isNumber(new WeakMap())).toBe(false);
  expect(isNumber(new WeakSet())).toBe(false);
  expect(isNumber(new Map())).toBe(false);
  expect(isNumber(new Set())).toBe(false);
  expect(isNumber(new Map([['a', 1]]))).toBe(false);
  expect(isNumber(new Set([1, 2, 3]))).toBe(false);
  expect(isNumber(new Error())).toBe(false);
  expect(isNumber(new TypeError())).toBe(false);
  expect(isNumber(new RangeError())).toBe(false);
  expect(isNumber(Object.create(null))).toBe(false);
  expect(isNumber(Object.create({}))).toBe(false);
})

test(`类型判断: isString 函数`, () => {
  // number
  expect(isString(0)).toBe(false);
  expect(isString(-0)).toBe(false);
  expect(isString(+0)).toBe(false);
  expect(isString(1)).toBe(false);
  expect(isString(1.1111)).toBe(false);
  expect(isString(new Number(0))).toBe(false);
  expect(isString(new Number(-0))).toBe(false);
  expect(isString(new Number(+0))).toBe(false);
  expect(isString(new Number(1))).toBe(false);
  expect(isString(new Number(1.1111))).toBe(false);
  expect(isString(Infinity)).toBe(false);
  expect(isString(-Infinity)).toBe(false);
  expect(isString(NaN)).toBe(false);

  // 布尔值
  expect(isString(false)).toBe(false);
  expect(isString(true)).toBe(false);
  expect(isString(new Boolean(false))).toBe(false);
  expect(isString(new Boolean(false))).toBe(false);

  // 字符串
  expect(isString('')).toBe(true);
  expect(isString('1')).toBe(true);
  expect(isString(new String(''))).toBe(true);
  expect(isString(new String('1'))).toBe(true);

  // 函数
  expect(isString(() => { })).toBe(false);
  expect(isString(function () { })).toBe(false);
  expect(isString(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isString(/\d/g)).toBe(false);
  expect(isString(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isString([])).toBe(false);
  expect(isString([][0])).toBe(false);
  expect(isString([1, 2, 3])).toBe(false);
  expect(isString(new Array()[0])).toBe(false);
  expect(isString(new Array(1, 2, 3))).toBe(false);
  expect(isString(new Array(1, 2, 3)[0])).toBe(false);

  // 对象
  expect(isString(class { })).toBe(false);
  expect(isString(new (class { }))).toBe(false);
  expect(isString({})).toBe(false);
  expect(isString({ toString: () => 'Boolean' })).toBe(false);
  expect(isString({ a: 1 })).toBe(false);
  expect(isString(new Object())).toBe(false);
  expect(isString(new Object()['a'])).toBe(false);
  expect(isString(new Proxy({}, {}))).toBe(false);
  expect(isString(new Date())).toBe(false);

  // undefined
  expect(isString(void 0)).toBe(false);
  expect(isString(undefined)).toBe(false);

  // null
  expect(isString(null)).toBe(false);

  // promise
  expect(isString(Promise.resolve())).toBe(false);
  expect(isString({ then: () => { } })).toBe(false);

  // symbol
  expect(isString(Symbol())).toBe(false);
  expect(isString(Symbol('1'))).toBe(false);

  // bigint
  expect(isString(1n)).toBe(false);
  expect(isString(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isString(generatorFunc())).toBe(false);
  expect(isString(asyncGeneratorFunc())).toBe(false);

  expect(isString(new Int8Array())).toBe(false);
  expect(isString(new Uint8Array())).toBe(false);
  expect(isString(new Float32Array())).toBe(false);
  expect(isString(new ArrayBuffer(8))).toBe(false);
  expect(isString(new WeakMap())).toBe(false);
  expect(isString(new WeakSet())).toBe(false);
  expect(isString(new Map())).toBe(false);
  expect(isString(new Set())).toBe(false);
  expect(isString(new Map([['a', 1]]))).toBe(false);
  expect(isString(new Set([1, 2, 3]))).toBe(false);
  expect(isString(new Error())).toBe(false);
  expect(isString(new TypeError())).toBe(false);
  expect(isString(new RangeError())).toBe(false);
  expect(isString(Object.create(null))).toBe(false);
  expect(isString(Object.create({}))).toBe(false);
})

test(`类型判断: isNull 函数`, () => {
  // number
  expect(isNull(0)).toBe(false);
  expect(isNull(-0)).toBe(false);
  expect(isNull(+0)).toBe(false);
  expect(isNull(1)).toBe(false);
  expect(isNull(1.1111)).toBe(false);
  expect(isNull(new Number(0))).toBe(false);
  expect(isNull(new Number(-0))).toBe(false);
  expect(isNull(new Number(+0))).toBe(false);
  expect(isNull(new Number(1))).toBe(false);
  expect(isNull(new Number(1.1111))).toBe(false);
  expect(isNull(Infinity)).toBe(false);
  expect(isNull(-Infinity)).toBe(false);
  expect(isNull(NaN)).toBe(false);

  // 布尔值
  expect(isNull(false)).toBe(false);
  expect(isNull(true)).toBe(false);
  expect(isNull(new Boolean(false))).toBe(false);
  expect(isNull(new Boolean(false))).toBe(false);

  // 字符串
  expect(isNull('')).toBe(false);
  expect(isNull('1')).toBe(false);
  expect(isNull(new String(''))).toBe(false);
  expect(isNull(new String('1'))).toBe(false);

  // 函数
  expect(isNull(() => { })).toBe(false);
  expect(isNull(function () { })).toBe(false);
  expect(isNull(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isNull(/\d/g)).toBe(false);
  expect(isNull(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isNull([])).toBe(false);
  expect(isNull([][0])).toBe(false);
  expect(isNull([1, 2, 3])).toBe(false);
  expect(isNull(new Array()[0])).toBe(false);
  expect(isNull(new Array(1, 2, 3))).toBe(false);
  expect(isNull(new Array(1, 2, 3)[0])).toBe(false);

  // 对象
  expect(isNull(class { })).toBe(false);
  expect(isNull(new (class { }))).toBe(false);
  expect(isNull({})).toBe(false);
  expect(isNull({ toString: () => 'Boolean' })).toBe(false);
  expect(isNull({ a: 1 })).toBe(false);
  expect(isNull(new Object())).toBe(false);
  expect(isNull(new Object()['a'])).toBe(false);
  expect(isNull(new Proxy({}, {}))).toBe(false);
  expect(isNull(new Date())).toBe(false);

  // undefined
  expect(isNull(void 0)).toBe(false);
  expect(isNull(undefined)).toBe(false);

  // null
  expect(isNull(null)).toBe(true);

  // promise
  expect(isNull(Promise.resolve())).toBe(false);
  expect(isNull({ then: () => { } })).toBe(false);

  // symbol
  expect(isNull(Symbol())).toBe(false);
  expect(isNull(Symbol('1'))).toBe(false);

  // bigint
  expect(isNull(1n)).toBe(false);
  expect(isNull(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isNull(generatorFunc())).toBe(false);
  expect(isNull(asyncGeneratorFunc())).toBe(false);

  expect(isNull(new Int8Array())).toBe(false);
  expect(isNull(new Uint8Array())).toBe(false);
  expect(isNull(new Float32Array())).toBe(false);
  expect(isNull(new ArrayBuffer(8))).toBe(false);
  expect(isNull(new WeakMap())).toBe(false);
  expect(isNull(new WeakSet())).toBe(false);
  expect(isNull(new Map())).toBe(false);
  expect(isNull(new Set())).toBe(false);
  expect(isNull(new Map([['a', 1]]))).toBe(false);
  expect(isNull(new Set([1, 2, 3]))).toBe(false);
  expect(isNull(new Error())).toBe(false);
  expect(isNull(new TypeError())).toBe(false);
  expect(isNull(new RangeError())).toBe(false);
  expect(isNull(Object.create(null))).toBe(false);
  expect(isNull(Object.create({}))).toBe(false);
})

test(`类型判断: isUndefined 函数`, () => {
  // number
  expect(isUndefined(0)).toBe(false);
  expect(isUndefined(-0)).toBe(false);
  expect(isUndefined(+0)).toBe(false);
  expect(isUndefined(1)).toBe(false);
  expect(isUndefined(1.1111)).toBe(false);
  expect(isUndefined(new Number(0))).toBe(false);
  expect(isUndefined(new Number(-0))).toBe(false);
  expect(isUndefined(new Number(+0))).toBe(false);
  expect(isUndefined(new Number(1))).toBe(false);
  expect(isUndefined(new Number(1.1111))).toBe(false);
  expect(isUndefined(Infinity)).toBe(false);
  expect(isUndefined(-Infinity)).toBe(false);
  expect(isUndefined(NaN)).toBe(false);

  // 布尔值
  expect(isUndefined(false)).toBe(false);
  expect(isUndefined(true)).toBe(false);
  expect(isUndefined(new Boolean(false))).toBe(false);
  expect(isUndefined(new Boolean(false))).toBe(false);

  // 字符串
  expect(isUndefined('')).toBe(false);
  expect(isUndefined('1')).toBe(false);
  expect(isUndefined(new String(''))).toBe(false);
  expect(isUndefined(new String('1'))).toBe(false);

  // 函数
  expect(isUndefined(() => { })).toBe(false);
  expect(isUndefined(function () { })).toBe(false);
  expect(isUndefined(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isUndefined(/\d/g)).toBe(false);
  expect(isUndefined(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isUndefined([])).toBe(false);
  expect(isUndefined([][0])).toBe(true);
  expect(isUndefined([1, 2, 3])).toBe(false);
  expect(isUndefined(new Array()[0])).toBe(true);
  expect(isUndefined(new Array(1, 2, 3))).toBe(false);
  expect(isUndefined(new Array(1, 2, 3)[0])).toBe(false);

  // 对象
  expect(isUndefined(class { })).toBe(false);
  expect(isUndefined(new (class { }))).toBe(false);
  expect(isUndefined({})).toBe(false);
  expect(isUndefined({ toString: () => 'Boolean' })).toBe(false);
  expect(isUndefined({ a: 1 })).toBe(false);
  expect(isUndefined(new Object())).toBe(false);
  expect(isUndefined(new Object()['a'])).toBe(true);
  expect(isUndefined(new Proxy({}, {}))).toBe(false);
  expect(isUndefined(new Date())).toBe(false);

  // undefined
  expect(isUndefined(void 0)).toBe(true);
  expect(isUndefined(undefined)).toBe(true);

  // null
  expect(isUndefined(null)).toBe(false);

  // promise
  expect(isUndefined(Promise.resolve())).toBe(false);
  expect(isUndefined({ then: () => { } })).toBe(false);

  // symbol
  expect(isUndefined(Symbol())).toBe(false);
  expect(isUndefined(Symbol('1'))).toBe(false);

  // bigint
  expect(isUndefined(1n)).toBe(false);
  expect(isUndefined(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isUndefined(generatorFunc())).toBe(false);
  expect(isUndefined(asyncGeneratorFunc())).toBe(false);

  expect(isUndefined(new Int8Array())).toBe(false);
  expect(isUndefined(new Uint8Array())).toBe(false);
  expect(isUndefined(new Float32Array())).toBe(false);
  expect(isUndefined(new ArrayBuffer(8))).toBe(false);
  expect(isUndefined(new WeakMap())).toBe(false);
  expect(isUndefined(new WeakSet())).toBe(false);
  expect(isUndefined(new Map())).toBe(false);
  expect(isUndefined(new Set())).toBe(false);
  expect(isUndefined(new Map([['a', 1]]))).toBe(false);
  expect(isUndefined(new Set([1, 2, 3]))).toBe(false);
  expect(isUndefined(new Error())).toBe(false);
  expect(isUndefined(new TypeError())).toBe(false);
  expect(isUndefined(new RangeError())).toBe(false);
  expect(isUndefined(Object.create(null))).toBe(false);
  expect(isUndefined(Object.create({}))).toBe(false);
})

test(`类型判断: isDef 函数`, () => {
  // number
  expect(isDef(0)).toBe(true);
  expect(isDef(-0)).toBe(true);
  expect(isDef(+0)).toBe(true);
  expect(isDef(1)).toBe(true);
  expect(isDef(1.1111)).toBe(true);
  expect(isDef(new Number(0))).toBe(true);
  expect(isDef(new Number(-0))).toBe(true);
  expect(isDef(new Number(+0))).toBe(true);
  expect(isDef(new Number(1))).toBe(true);
  expect(isDef(new Number(1.1111))).toBe(true);
  expect(isDef(Infinity)).toBe(true);
  expect(isDef(-Infinity)).toBe(true);
  expect(isDef(NaN)).toBe(true);

  // 布尔值
  expect(isDef(false)).toBe(true);
  expect(isDef(true)).toBe(true);
  expect(isDef(new Boolean(false))).toBe(true);
  expect(isDef(new Boolean(false))).toBe(true);

  // 字符串
  expect(isDef('')).toBe(true);
  expect(isDef('1')).toBe(true);
  expect(isDef(new String(''))).toBe(true);
  expect(isDef(new String('1'))).toBe(true);

  // 函数
  expect(isDef(() => { })).toBe(true);
  expect(isDef(function () { })).toBe(true);
  expect(isDef(globalThis.parseInt)).toBe(true);

  // 正则
  expect(isDef(/\d/g)).toBe(true);
  expect(isDef(new RegExp(/\d/g))).toBe(true);

  // 数组
  expect(isDef([])).toBe(true);
  expect(isDef([][0])).toBe(false);
  expect(isDef([1, 2, 3])).toBe(true);
  expect(isDef(new Array()[0])).toBe(false);
  expect(isDef(new Array(1, 2, 3))).toBe(true);
  expect(isDef(new Array(1, 2, 3)[0])).toBe(true);

  // 对象
  expect(isDef(class { })).toBe(true);
  expect(isDef(new (class { }))).toBe(true);
  expect(isDef({})).toBe(true);
  expect(isDef({ toString: () => 'Boolean' })).toBe(true);
  expect(isDef({ a: 1 })).toBe(true);
  expect(isDef(new Object())).toBe(true);
  expect(isDef(new Object()['a'])).toBe(false);
  expect(isDef(new Proxy({}, {}))).toBe(true);
  expect(isDef(new Date())).toBe(true);

  // undefined
  expect(isDef(void 0)).toBe(false);
  expect(isDef(undefined)).toBe(false);

  // null
  expect(isDef(null)).toBe(false);

  // promise
  expect(isDef(Promise.resolve())).toBe(true);
  expect(isDef({ then: () => { } })).toBe(true);

  // symbol
  expect(isDef(Symbol())).toBe(true);
  expect(isDef(Symbol('1'))).toBe(true);

  // bigint
  expect(isDef(1n)).toBe(true);
  expect(isDef(BigInt(42))).toBe(true);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isDef(generatorFunc())).toBe(true);
  expect(isDef(asyncGeneratorFunc())).toBe(true);

  expect(isDef(new Int8Array())).toBe(true);
  expect(isDef(new Uint8Array())).toBe(true);
  expect(isDef(new Float32Array())).toBe(true);
  expect(isDef(new ArrayBuffer(8))).toBe(true);
  expect(isDef(new WeakMap())).toBe(true);
  expect(isDef(new WeakSet())).toBe(true);
  expect(isDef(new Map())).toBe(true);
  expect(isDef(new Set())).toBe(true);
  expect(isDef(new Map([['a', 1]]))).toBe(true);
  expect(isDef(new Set([1, 2, 3]))).toBe(true);
  expect(isDef(new Error())).toBe(true);
  expect(isDef(new TypeError())).toBe(true);
  expect(isDef(new RangeError())).toBe(true);
  expect(isDef(Object.create(null))).toBe(true);
  expect(isDef(Object.create({}))).toBe(true);
})

test(`类型判断: isUnDef 函数`, () => {
  // number
  expect(isUnDef(0)).toBe(false);
  expect(isUnDef(-0)).toBe(false);
  expect(isUnDef(+0)).toBe(false);
  expect(isUnDef(1)).toBe(false);
  expect(isUnDef(1.1111)).toBe(false);
  expect(isUnDef(new Number(0))).toBe(false);
  expect(isUnDef(new Number(-0))).toBe(false);
  expect(isUnDef(new Number(+0))).toBe(false);
  expect(isUnDef(new Number(1))).toBe(false);
  expect(isUnDef(new Number(1.1111))).toBe(false);
  expect(isUnDef(Infinity)).toBe(false);
  expect(isUnDef(-Infinity)).toBe(false);
  expect(isUnDef(NaN)).toBe(false);

  // 布尔值
  expect(isUnDef(false)).toBe(false);
  expect(isUnDef(true)).toBe(false);
  expect(isUnDef(new Boolean(false))).toBe(false);
  expect(isUnDef(new Boolean(false))).toBe(false);

  // 字符串
  expect(isUnDef('')).toBe(false);
  expect(isUnDef('1')).toBe(false);
  expect(isUnDef(new String(''))).toBe(false);
  expect(isUnDef(new String('1'))).toBe(false);

  // 函数
  expect(isUnDef(() => { })).toBe(false);
  expect(isUnDef(function () { })).toBe(false);
  expect(isUnDef(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isUnDef(/\d/g)).toBe(false);
  expect(isUnDef(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isUnDef([])).toBe(false);
  expect(isUnDef([][0])).toBe(true);
  expect(isUnDef([1, 2, 3])).toBe(false);
  expect(isUnDef(new Array()[0])).toBe(true);
  expect(isUnDef(new Array(1, 2, 3))).toBe(false);
  expect(isUnDef(new Array(1, 2, 3)[0])).toBe(false);

  // 对象
  expect(isUnDef(class { })).toBe(false);
  expect(isUnDef(new (class { }))).toBe(false);
  expect(isUnDef({})).toBe(false);
  expect(isUnDef({ toString: () => 'Boolean' })).toBe(false);
  expect(isUnDef({ a: 1 })).toBe(false);
  expect(isUnDef(new Object())).toBe(false);
  expect(isUnDef(new Object()['a'])).toBe(true);
  expect(isUnDef(new Proxy({}, {}))).toBe(false);
  expect(isUnDef(new Date())).toBe(false);

  // undefined
  expect(isUnDef(void 0)).toBe(true);
  expect(isUnDef(undefined)).toBe(true);

  // null
  expect(isUnDef(null)).toBe(true);

  // promise
  expect(isUnDef(Promise.resolve())).toBe(false);
  expect(isUnDef({ then: () => { } })).toBe(false);

  // symbol
  expect(isUnDef(Symbol())).toBe(false);
  expect(isUnDef(Symbol('1'))).toBe(false);

  // bigint
  expect(isUnDef(1n)).toBe(false);
  expect(isUnDef(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isUnDef(generatorFunc())).toBe(false);
  expect(isUnDef(asyncGeneratorFunc())).toBe(false);

  expect(isUnDef(new Int8Array())).toBe(false);
  expect(isUnDef(new Uint8Array())).toBe(false);
  expect(isUnDef(new Float32Array())).toBe(false);
  expect(isUnDef(new ArrayBuffer(8))).toBe(false);
  expect(isUnDef(new WeakMap())).toBe(false);
  expect(isUnDef(new WeakSet())).toBe(false);
  expect(isUnDef(new Map())).toBe(false);
  expect(isUnDef(new Set())).toBe(false);
  expect(isUnDef(new Map([['a', 1]]))).toBe(false);
  expect(isUnDef(new Set([1, 2, 3]))).toBe(false);
  expect(isUnDef(new Error())).toBe(false);
  expect(isUnDef(new TypeError())).toBe(false);
  expect(isUnDef(new RangeError())).toBe(false);
  expect(isUnDef(Object.create(null))).toBe(false);
  expect(isUnDef(Object.create({}))).toBe(false);
})

test(`类型判断: isUseful 函数`, () => {
  // number
  expect(isUseful(0)).toBe(true);
  expect(isUseful(-0)).toBe(true);
  expect(isUseful(+0)).toBe(true);
  expect(isUseful(1)).toBe(true);
  expect(isUseful(1.1111)).toBe(true);
  expect(isUseful(new Number(0))).toBe(true);
  expect(isUseful(new Number(-0))).toBe(true);
  expect(isUseful(new Number(+0))).toBe(true);
  expect(isUseful(new Number(1))).toBe(true);
  expect(isUseful(new Number(1.1111))).toBe(true);
  expect(isUseful(Infinity)).toBe(true);
  expect(isUseful(-Infinity)).toBe(true);
  expect(isUseful(NaN)).toBe(true);

  // 布尔值
  expect(isUseful(false)).toBe(true);
  expect(isUseful(true)).toBe(true);
  expect(isUseful(new Boolean(false))).toBe(true);
  expect(isUseful(new Boolean(false))).toBe(true);

  // 字符串
  expect(isUseful('')).toBe(true);
  expect(isUseful('1')).toBe(true);
  expect(isUseful(new String(''))).toBe(true);
  expect(isUseful(new String('1'))).toBe(true);

  // 函数
  expect(isUseful(() => { })).toBe(true);
  expect(isUseful(function () { })).toBe(true);
  expect(isUseful(globalThis.parseInt)).toBe(true);

  // 正则
  expect(isUseful(/\d/g)).toBe(true);
  expect(isUseful(new RegExp(/\d/g))).toBe(true);

  // 数组
  expect(isUseful([])).toBe(true);
  expect(isUseful([][0])).toBe(false);
  expect(isUseful([1, 2, 3])).toBe(true);
  expect(isUseful(new Array()[0])).toBe(false);
  expect(isUseful(new Array(1, 2, 3))).toBe(true);
  expect(isUseful(new Array(1, 2, 3)[0])).toBe(true);

  // 对象
  expect(isUseful(class { })).toBe(true);
  expect(isUseful(new (class { }))).toBe(true);
  expect(isUseful({})).toBe(true);
  expect(isUseful({ toString: () => 'Boolean' })).toBe(true);
  expect(isUseful({ a: 1 })).toBe(true);
  expect(isUseful(new Object())).toBe(true);
  expect(isUseful(new Object()['a'])).toBe(false);
  expect(isUseful(new Proxy({}, {}))).toBe(true);
  expect(isUseful(new Date())).toBe(true);

  // undefined
  expect(isUseful(void 0)).toBe(false);
  expect(isUseful(undefined)).toBe(false);

  // null
  expect(isUseful(null)).toBe(false);

  // promise
  expect(isUseful(Promise.resolve())).toBe(true);
  expect(isUseful({ then: () => { } })).toBe(true);

  // symbol
  expect(isUseful(Symbol())).toBe(true);
  expect(isUseful(Symbol('1'))).toBe(true);

  // bigint
  expect(isUseful(1n)).toBe(true);
  expect(isUseful(BigInt(42))).toBe(true);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isUseful(generatorFunc())).toBe(true);
  expect(isUseful(asyncGeneratorFunc())).toBe(true);

  expect(isUseful(new Int8Array())).toBe(true);
  expect(isUseful(new Uint8Array())).toBe(true);
  expect(isUseful(new Float32Array())).toBe(true);
  expect(isUseful(new ArrayBuffer(8))).toBe(true);
  expect(isUseful(new WeakMap())).toBe(true);
  expect(isUseful(new WeakSet())).toBe(true);
  expect(isUseful(new Map())).toBe(true);
  expect(isUseful(new Set())).toBe(true);
  expect(isUseful(new Map([['a', 1]]))).toBe(true);
  expect(isUseful(new Set([1, 2, 3]))).toBe(true);
  expect(isUseful(new Error())).toBe(true);
  expect(isUseful(new TypeError())).toBe(true);
  expect(isUseful(new RangeError())).toBe(true);
  expect(isUseful(Object.create(null))).toBe(true);
  expect(isUseful(Object.create({}))).toBe(true);
})

test(`类型判断: isUnUseful 函数`, () => {
  // number
  expect(isUnUseful(0)).toBe(false);
  expect(isUnUseful(-0)).toBe(false);
  expect(isUnUseful(+0)).toBe(false);
  expect(isUnUseful(1)).toBe(false);
  expect(isUnUseful(1.1111)).toBe(false);
  expect(isUnUseful(new Number(0))).toBe(false);
  expect(isUnUseful(new Number(-0))).toBe(false);
  expect(isUnUseful(new Number(+0))).toBe(false);
  expect(isUnUseful(new Number(1))).toBe(false);
  expect(isUnUseful(new Number(1.1111))).toBe(false);
  expect(isUnUseful(Infinity)).toBe(false);
  expect(isUnUseful(-Infinity)).toBe(false);
  expect(isUnUseful(NaN)).toBe(false);

  // 布尔值
  expect(isUnUseful(false)).toBe(false);
  expect(isUnUseful(true)).toBe(false);
  expect(isUnUseful(new Boolean(false))).toBe(false);
  expect(isUnUseful(new Boolean(false))).toBe(false);

  // 字符串
  expect(isUnUseful('')).toBe(false);
  expect(isUnUseful('1')).toBe(false);
  expect(isUnUseful(new String(''))).toBe(false);
  expect(isUnUseful(new String('1'))).toBe(false);

  // 函数
  expect(isUnUseful(() => { })).toBe(false);
  expect(isUnUseful(function () { })).toBe(false);
  expect(isUnUseful(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isUnUseful(/\d/g)).toBe(false);
  expect(isUnUseful(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isUnUseful([])).toBe(false);
  expect(isUnUseful([][0])).toBe(true);
  expect(isUnUseful([1, 2, 3])).toBe(false);
  expect(isUnUseful(new Array()[0])).toBe(true);
  expect(isUnUseful(new Array(1, 2, 3))).toBe(false);
  expect(isUnUseful(new Array(1, 2, 3)[0])).toBe(false);

  // 对象
  expect(isUnUseful(class { })).toBe(false);
  expect(isUnUseful(new (class { }))).toBe(false);
  expect(isUnUseful({})).toBe(false);
  expect(isUnUseful({ toString: () => 'Boolean' })).toBe(false);
  expect(isUnUseful({ a: 1 })).toBe(false);
  expect(isUnUseful(new Object())).toBe(false);
  expect(isUnUseful(new Object()['a'])).toBe(true);
  expect(isUnUseful(new Proxy({}, {}))).toBe(false);
  expect(isUnUseful(new Date())).toBe(false);

  // undefined
  expect(isUnUseful(void 0)).toBe(true);
  expect(isUnUseful(undefined)).toBe(true);

  // null
  expect(isUnUseful(null)).toBe(true);

  // promise
  expect(isUnUseful(Promise.resolve())).toBe(false);
  expect(isUnUseful({ then: () => { } })).toBe(false);

  // symbol
  expect(isUnUseful(Symbol())).toBe(false);
  expect(isUnUseful(Symbol('1'))).toBe(false);

  // bigint
  expect(isUnUseful(1n)).toBe(false);
  expect(isUnUseful(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isUnUseful(generatorFunc())).toBe(false);
  expect(isUnUseful(asyncGeneratorFunc())).toBe(false);

  expect(isUnUseful(new Int8Array())).toBe(false);
  expect(isUnUseful(new Uint8Array())).toBe(false);
  expect(isUnUseful(new Float32Array())).toBe(false);
  expect(isUnUseful(new ArrayBuffer(8))).toBe(false);
  expect(isUnUseful(new WeakMap())).toBe(false);
  expect(isUnUseful(new WeakSet())).toBe(false);
  expect(isUnUseful(new Map())).toBe(false);
  expect(isUnUseful(new Set())).toBe(false);
  expect(isUnUseful(new Map([['a', 1]]))).toBe(false);
  expect(isUnUseful(new Set([1, 2, 3]))).toBe(false);
  expect(isUnUseful(new Error())).toBe(false);
  expect(isUnUseful(new TypeError())).toBe(false);
  expect(isUnUseful(new RangeError())).toBe(false);
  expect(isUnUseful(Object.create(null))).toBe(false);
  expect(isUnUseful(Object.create({}))).toBe(false);
})

test(`类型判断: isObject 函数`, () => {
  // number
  expect(isObject(0)).toBe(false);
  expect(isObject(-0)).toBe(false);
  expect(isObject(+0)).toBe(false);
  expect(isObject(1)).toBe(false);
  expect(isObject(1.1111)).toBe(false);
  expect(isObject(new Number(0))).toBe(true);
  expect(isObject(new Number(-0))).toBe(true);
  expect(isObject(new Number(+0))).toBe(true);
  expect(isObject(new Number(1))).toBe(true);
  expect(isObject(new Number(1.1111))).toBe(true);
  expect(isObject(Infinity)).toBe(false);
  expect(isObject(-Infinity)).toBe(false);
  expect(isObject(NaN)).toBe(false);

  // 布尔值
  expect(isObject(false)).toBe(false);
  expect(isObject(true)).toBe(false);
  expect(isObject(new Boolean(false))).toBe(true);
  expect(isObject(new Boolean(true))).toBe(true);

  // 字符串
  expect(isObject('')).toBe(false);
  expect(isObject('1')).toBe(false);
  expect(isObject(new String(''))).toBe(true);
  expect(isObject(new String('1'))).toBe(true);

  // 函数
  expect(isObject(() => { })).toBe(false);
  expect(isObject(function () { })).toBe(false);
  expect(isObject(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isObject(/\d/g)).toBe(true);
  expect(isObject(new RegExp(/\d/g))).toBe(true);

  // 数组
  expect(isObject([])).toBe(true);
  expect(isObject([][0])).toBe(false);
  expect(isObject([1, 2, 3])).toBe(true);
  expect(isObject(new Array()[0])).toBe(false);
  expect(isObject(new Array(1, 2, 3))).toBe(true);
  expect(isObject(new Array(1, 2, 3)[0])).toBe(false);

  // 对象
  expect(isObject(class { })).toBe(false);
  expect(isObject(new (class { }))).toBe(true);
  expect(isObject({})).toBe(true);
  expect(isObject({ toString: () => 'Boolean' })).toBe(true);
  expect(isObject({ a: 1 })).toBe(true);
  expect(isObject(new Object())).toBe(true);
  expect(isObject(new Object()['a'])).toBe(false);
  expect(isObject(new Proxy({}, {}))).toBe(true);
  expect(isObject(new Date())).toBe(true);

  // undefined
  expect(isObject(void 0)).toBe(false);
  expect(isObject(undefined)).toBe(false);

  // null
  expect(isObject(null)).toBe(false);

  // promise
  expect(isObject(Promise.resolve())).toBe(true);
  expect(isObject({ then: () => { } })).toBe(true);

  // symbol
  expect(isObject(Symbol())).toBe(false);
  expect(isObject(Symbol('1'))).toBe(false);

  // bigint
  expect(isObject(1n)).toBe(false);
  expect(isObject(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isObject(generatorFunc())).toBe(true);
  expect(isObject(asyncGeneratorFunc())).toBe(true);

  expect(isObject(new Int8Array())).toBe(true);
  expect(isObject(new Uint8Array())).toBe(true);
  expect(isObject(new Float32Array())).toBe(true);
  expect(isObject(new ArrayBuffer(8))).toBe(true);
  expect(isObject(new WeakMap())).toBe(true);
  expect(isObject(new WeakSet())).toBe(true);
  expect(isObject(new Map())).toBe(true);
  expect(isObject(new Set())).toBe(true);
  expect(isObject(new Map([['a', 1]]))).toBe(true);
  expect(isObject(new Set([1, 2, 3]))).toBe(true);
  expect(isObject(new Error())).toBe(true);
  expect(isObject(new TypeError())).toBe(true);
  expect(isObject(new RangeError())).toBe(true);
  expect(isObject(Object.create(null))).toBe(true);
  expect(isObject(Object.create({}))).toBe(true);
})

test(`类型判断: isRawObject 函数`, () => {
  // number
  expect(isRawObject(0)).toBe(false);
  expect(isRawObject(-0)).toBe(false);
  expect(isRawObject(+0)).toBe(false);
  expect(isRawObject(1)).toBe(false);
  expect(isRawObject(1.1111)).toBe(false);
  expect(isRawObject(new Number(0))).toBe(true);
  expect(isRawObject(new Number(-0))).toBe(true);
  expect(isRawObject(new Number(+0))).toBe(true);
  expect(isRawObject(new Number(1))).toBe(true);
  expect(isRawObject(new Number(1.1111))).toBe(true);
  expect(isRawObject(Infinity)).toBe(false);
  expect(isRawObject(-Infinity)).toBe(false);
  expect(isRawObject(NaN)).toBe(false);

  // 布尔值
  expect(isRawObject(false)).toBe(false);
  expect(isRawObject(true)).toBe(false);
  expect(isRawObject(new Boolean(false))).toBe(true);
  expect(isRawObject(new Boolean(true))).toBe(true);

  // 字符串
  expect(isRawObject('')).toBe(false);
  expect(isRawObject('1')).toBe(false);
  expect(isRawObject(new String(''))).toBe(true);
  expect(isRawObject(new String('1'))).toBe(true);

  // 函数
  expect(isRawObject(() => { })).toBe(false);
  expect(isRawObject(function () { })).toBe(false);
  expect(isRawObject(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isRawObject(/\d/g)).toBe(true);
  expect(isRawObject(new RegExp(/\d/g))).toBe(true);

  // 数组
  expect(isRawObject([])).toBe(true);
  expect(isRawObject([][0])).toBe(false);
  expect(isRawObject([1, 2, 3])).toBe(true);
  expect(isRawObject(new Array()[0])).toBe(false);
  expect(isRawObject(new Array(1, 2, 3))).toBe(true);
  expect(isRawObject(new Array(1, 2, 3)[0])).toBe(false);

  // 对象
  expect(isRawObject(class { })).toBe(false);
  expect(isRawObject(new (class { }))).toBe(true);
  expect(isRawObject({})).toBe(true);
  expect(isRawObject({ toString: () => 'Boolean' })).toBe(true);
  expect(isRawObject({ a: 1 })).toBe(true);
  expect(isRawObject(new Object())).toBe(true);
  expect(isRawObject(new Object()['a'])).toBe(false);

  expect(isRawObject(new Proxy({}, {}))).toBe(true);
  expect(isRawObject(new Date())).toBe(true);

  // undefined
  expect(isRawObject(void 0)).toBe(false);
  expect(isRawObject(undefined)).toBe(false);

  // null
  expect(isRawObject(null)).toBe(false);

  // promise
  expect(isRawObject(Promise.resolve())).toBe(true);
  expect(isRawObject({ then: () => { } })).toBe(true);

  // symbol
  expect(isRawObject(Symbol())).toBe(false);
  expect(isRawObject(Symbol('1'))).toBe(false);

  // bigint
  expect(isRawObject(1n)).toBe(false);
  expect(isRawObject(BigInt(42))).toBe(false);

  // 迭代器与生成器
  function* generatorFunc() { }
  async function* asyncGeneratorFunc() { }

  expect(isRawObject(generatorFunc())).toBe(true);
  expect(isRawObject(asyncGeneratorFunc())).toBe(true);

  expect(isRawObject(new Int8Array())).toBe(true);
  expect(isRawObject(new Uint8Array())).toBe(true);
  expect(isRawObject(new Float32Array())).toBe(true);
  expect(isRawObject(new ArrayBuffer(8))).toBe(true);
  expect(isRawObject(new WeakMap())).toBe(true);
  expect(isRawObject(new WeakSet())).toBe(true);
  expect(isRawObject(new Map())).toBe(true);
  expect(isRawObject(new Set())).toBe(true);
  expect(isRawObject(new Map([['a', 1]]))).toBe(true);
  expect(isRawObject(new Set([1, 2, 3]))).toBe(true);
  expect(isRawObject(new Error())).toBe(true);
  expect(isRawObject(new TypeError())).toBe(true);
  expect(isRawObject(new RangeError())).toBe(true);
  expect(isRawObject(Object.create(null))).toBe(true);
  expect(isRawObject(Object.create({}))).toBe(true);
})

test(`类型判断: isFunction 函数`, () => {
  // number
  expect(isFunction(0)).toBe(false);
  expect(isFunction(-0)).toBe(false);
  expect(isFunction(+0)).toBe(false);
  expect(isFunction(1)).toBe(false);
  expect(isFunction(1.1111)).toBe(false);
  expect(isFunction(new Number(0))).toBe(false);
  expect(isFunction(new Number(-0))).toBe(false);
  expect(isFunction(new Number(+0))).toBe(false);
  expect(isFunction(new Number(1))).toBe(false);
  expect(isFunction(new Number(1.1111))).toBe(false);
  expect(isFunction(Infinity)).toBe(false);
  expect(isFunction(-Infinity)).toBe(false);
  expect(isFunction(NaN)).toBe(false);

  // 布尔值
  expect(isFunction(false)).toBe(false);
  expect(isFunction(true)).toBe(false);
  expect(isFunction(new Boolean(false))).toBe(false);
  expect(isFunction(new Boolean(true))).toBe(false);

  // 字符串
  expect(isFunction('')).toBe(false);
  expect(isFunction('1')).toBe(false);
  expect(isFunction(new String(''))).toBe(false);
  expect(isFunction(new String('1'))).toBe(false);

  // 函数
  expect(isFunction(() => {})).toBe(true);
  expect(isFunction(function() {})).toBe(true);
  expect(isFunction(globalThis.parseInt)).toBe(true);
  expect(isFunction(class {})).toBe(true);

  // 正则
  expect(isFunction(/\d/g)).toBe(false);
  expect(isFunction(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isFunction([])).toBe(false);
  expect(isFunction([][0])).toBe(false);
  expect(isFunction([1, 2, 3])).toBe(false);
  expect(isFunction(new Array())).toBe(false);
  expect(isFunction(new Array(1, 2, 3))).toBe(false);

  // 对象
  expect(isFunction({})).toBe(false);
  expect(isFunction({ toString: () => 'Function' })).toBe(false);
  expect(isFunction(new Object())).toBe(false);
  expect(isFunction(new Proxy({}, {}))).toBe(false);
  expect(isFunction(new Date())).toBe(false);

  // undefined
  expect(isFunction(void 0)).toBe(false);
  expect(isFunction(undefined)).toBe(false);

  // null
  expect(isFunction(null)).toBe(false);

  // promise
  expect(isFunction(Promise.resolve())).toBe(false);
  expect(isFunction({ then: () => {} })).toBe(false);
})

test(`类型判断: isDate 函数`, () => {
  // number
  expect(isDate(0)).toBe(false);
  expect(isDate(-0)).toBe(false);
  expect(isDate(+0)).toBe(false);
  expect(isDate(1)).toBe(false);
  expect(isDate(1.1111)).toBe(false);
  expect(isDate(new Number(0))).toBe(false);
  expect(isDate(new Number(-0))).toBe(false);
  expect(isDate(new Number(+0))).toBe(false);
  expect(isDate(new Number(1))).toBe(false);
  expect(isDate(new Number(1.1111))).toBe(false);
  expect(isDate(Infinity)).toBe(false);
  expect(isDate(-Infinity)).toBe(false);
  expect(isDate(NaN)).toBe(false);

  // 布尔值
  expect(isDate(false)).toBe(false);
  expect(isDate(true)).toBe(false);
  expect(isDate(new Boolean(false))).toBe(false);
  expect(isDate(new Boolean(true))).toBe(false);

  // 字符串
  expect(isDate('')).toBe(false);
  expect(isDate('1')).toBe(false);
  expect(isDate(new String(''))).toBe(false);
  expect(isDate(new String('1'))).toBe(false);

  // 函数
  expect(isDate(() => {})).toBe(false);
  expect(isDate(function() {})).toBe(false);
  expect(isDate(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isDate(/\d/g)).toBe(false);
  expect(isDate(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isDate([])).toBe(false);
  expect(isDate([][0])).toBe(false);
  expect(isDate([1, 2, 3])).toBe(false);
  expect(isDate(new Array())).toBe(false);
  expect(isDate(new Array(1, 2, 3))).toBe(false);

  // 对象
  expect(isDate({})).toBe(false);
  expect(isDate({ toString: () => 'Date' })).toBe(false);
  expect(isDate(new Object())).toBe(false);
  expect(isDate(new Proxy({}, {}))).toBe(false);
  expect(isDate(new Date())).toBe(true);

  // undefined
  expect(isDate(void 0)).toBe(false);
  expect(isDate(undefined)).toBe(false);

  // null
  expect(isDate(null)).toBe(false);

  // promise
  expect(isDate(Promise.resolve())).toBe(false);
  expect(isDate({ then: () => {} })).toBe(false);
})

test(`类型判断: isPromiseLike 函数`, () => {
  // number
  expect(isPromiseLike(0 as any)).toBe(false);
  expect(isPromiseLike(-0 as any)).toBe(false);
  expect(isPromiseLike(+0 as any)).toBe(false);
  expect(isPromiseLike(1 as any)).toBe(false);
  expect(isPromiseLike(1.1111 as any)).toBe(false);

  // 布尔值
  expect(isPromiseLike(false as any)).toBe(false);
  expect(isPromiseLike(true as any)).toBe(false);

  // 字符串
  expect(isPromiseLike('' as any)).toBe(false);
  expect(isPromiseLike('1' as any)).toBe(false);

  // 函数
  expect(isPromiseLike((() => {}) as any)).toBe(false);
  expect(isPromiseLike((function() {}) as any)).toBe(false);

  // 正则
  expect(isPromiseLike(/\d/g as any)).toBe(false);
  expect(isPromiseLike(new RegExp(/\d/g) as any)).toBe(false);

  // 数组
  expect(isPromiseLike([] as any)).toBe(false);
  expect(isPromiseLike([1, 2, 3] as any)).toBe(false);

  // 对象
  expect(isPromiseLike({} as any)).toBe(false);
  expect(isPromiseLike({ then: 1 } as any)).toBe(false);
  expect(isPromiseLike({ catch: () => {} } as any)).toBe(false);
  expect(isPromiseLike({ then: () => {}, catch: 1 } as any)).toBe(false);
  expect(isPromiseLike({ then: () => {}, catch: () => {} } as any)).toBe(true);
  expect(isPromiseLike(Promise.resolve())).toBe(true);
  expect(isPromiseLike(Promise.reject().catch(() => {}))).toBe(true);

  // undefined
  expect(isPromiseLike(void 0 as any)).toBe(false);
  expect(isPromiseLike(undefined as any)).toBe(false);

  // null
  expect(isPromiseLike(null as any)).toBe(false);
})

test(`类型判断: isArray 函数`, () => {
  // number
  expect(isArray(0)).toBe(false);
  expect(isArray(-0)).toBe(false);
  expect(isArray(+0)).toBe(false);
  expect(isArray(1)).toBe(false);
  expect(isArray(1.1111)).toBe(false);
  expect(isArray(new Number(0))).toBe(false);
  expect(isArray(new Number(-0))).toBe(false);
  expect(isArray(new Number(+0))).toBe(false);
  expect(isArray(new Number(1))).toBe(false);
  expect(isArray(new Number(1.1111))).toBe(false);
  expect(isArray(Infinity)).toBe(false);
  expect(isArray(-Infinity)).toBe(false);
  expect(isArray(NaN)).toBe(false);

  // 布尔值
  expect(isArray(false)).toBe(false);
  expect(isArray(true)).toBe(false);
  expect(isArray(new Boolean(false))).toBe(false);
  expect(isArray(new Boolean(true))).toBe(false);

  // 字符串
  expect(isArray('')).toBe(false);
  expect(isArray('1')).toBe(false);
  expect(isArray(new String(''))).toBe(false);
  expect(isArray(new String('1'))).toBe(false);

  // 函数
  expect(isArray(() => {})).toBe(false);
  expect(isArray(function() {})).toBe(false);
  expect(isArray(globalThis.parseInt)).toBe(false);

  // 正则
  expect(isArray(/\d/g)).toBe(false);
  expect(isArray(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isArray([])).toBe(true);
  expect(isArray([1, 2, 3])).toBe(true);
  expect(isArray(new Array())).toBe(true);
  expect(isArray(new Array(1, 2, 3))).toBe(true);

  // 对象
  expect(isArray({})).toBe(false);
  expect(isArray({ length: 0 })).toBe(false);
  expect(isArray(new Object())).toBe(false);
  expect(isArray(new Proxy({}, {}))).toBe(false);
  expect(isArray(new Date())).toBe(false);

  // undefined
  expect(isArray(void 0)).toBe(false);
  expect(isArray(undefined)).toBe(false);

  // null
  expect(isArray(null)).toBe(false);

  // promise
  expect(isArray(Promise.resolve())).toBe(false);
  expect(isArray({ then: () => {} })).toBe(false);
})

test(`类型判断: isClass 函数`, () => {
  // number
  expect(isClass(0)).toBe(false);
  expect(isClass(-0)).toBe(false);
  expect(isClass(+0)).toBe(false);
  expect(isClass(1)).toBe(false);
  expect(isClass(1.1111)).toBe(false);
  expect(isClass(new Number(0))).toBe(false);
  expect(isClass(new Number(-0))).toBe(false);
  expect(isClass(new Number(+0))).toBe(false);
  expect(isClass(new Number(1))).toBe(false);
  expect(isClass(new Number(1.1111))).toBe(false);
  expect(isClass(Infinity)).toBe(false);
  expect(isClass(-Infinity)).toBe(false);
  expect(isClass(NaN)).toBe(false);

  // 布尔值
  expect(isClass(false)).toBe(false);
  expect(isClass(true)).toBe(false);
  expect(isClass(new Boolean(false))).toBe(false);
  expect(isClass(new Boolean(true))).toBe(false);

  // 字符串
  expect(isClass('')).toBe(false);
  expect(isClass('1')).toBe(false);
  expect(isClass(new String(''))).toBe(false);
  expect(isClass(new String('1'))).toBe(false);

  // 函数
  expect(isClass(() => {})).toBe(false);
  expect(isClass(function() {})).toBe(false);
  expect(isClass(globalThis.parseInt)).toBe(false);
  expect(isClass(class {})).toBe(true);
  expect(isClass(class Test {})).toBe(true);
  class TestClass {
    constructor() {}
    method() {}
  }
  expect(isClass(TestClass)).toBe(true);

  // 正则
  expect(isClass(/\d/g)).toBe(false);
  expect(isClass(new RegExp(/\d/g))).toBe(false);

  // 数组
  expect(isClass([])).toBe(false);
  expect(isClass([1, 2, 3])).toBe(false);
  expect(isClass(new Array())).toBe(false);
  expect(isClass(new Array(1, 2, 3))).toBe(false);

  // 对象
  expect(isClass({})).toBe(false);
  expect(isClass(new Object())).toBe(false);
  expect(isClass(new Proxy({}, {}))).toBe(false);
  expect(isClass(new Date())).toBe(false);

  // undefined
  expect(isClass(void 0)).toBe(false);
  expect(isClass(undefined)).toBe(false);

  // null
  expect(isClass(null)).toBe(false);

  // promise
  expect(isClass(Promise.resolve())).toBe(false);
  expect(isClass({ then: () => {} })).toBe(false);
})
