/**
 * =============================================================================================================
 *
 * 类型辅助文件, 通过编写函数或者其他东西来辅助类型的合适预期推导 (类型体操)
 *
 * =============================================================================================================
 */

// ===================

import type { IsNever, MergeWithParent, CompleteWithDefaults } from './calculate';

/**
 * 定义原始数据类型。
 *
 * @description 某个数据的类型定义可能很复杂, 但是再具体的使用过程中往往只会使用一部分类型, 对于这种情况, 需要一个辅助函数
 * 在提供目标类型的情况下，既能够在编写时获得类型补全, 又能够动态推导返回所定义的具体类型, 而非全目标类型属性
 *
 * @description 为什么需要 defineRawType<T>()({}), 因为创建时只希望传递一个泛型, 动态推导编写类型
 *
 * @description 这种无意义的函数, 是可以由打包工具优化掉的
 *
 * @description 如果你的编辑器在进行推导后, 部分函数参数为 any, 请使用 vscode
 *
 * @example
 * interface Target {
 *   name?: string;
 *   age?: number;
 * }
 *
 * const obj = defineRawType<Target>()({
 *   name: 'sa'
 * });
 *
 * // obj: { name: string }
 */
export const defineRawType = <TargetType extends {}>() => {
  return <T extends TargetType>(payload: T): T => payload
}

/**
 * 定义泛化的补全合并类型
 *
 * @description 定义的原始类型和目标类型合并, 保留原始类型, 剔除目标类型键
 *
 * @example
 *
 * interface Options {
 *   a?: number;
 *   b?: number;
 *   c?: string;
 * }
 *
 * const obj = defineCompleteType<Options>()({ // extends Options
 *   a: 1
 * })
 *
 * // obj: { a: number;b?: number;c?: number; }
 */
export const defineCompleteType = <TargetType extends {}>() => {
  return <T extends TargetType>(payload: T): CompleteWithDefaults<T, TargetType> => payload
}

