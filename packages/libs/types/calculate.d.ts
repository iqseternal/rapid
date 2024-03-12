/**
 * ==========================================
 * 类型运算推导
 * ==========================================
 */


/**
 * 将对象的 key 值转换为数组
 * 例如：
 * interface A {
 *  a: number;
 *  b: {
 *    c: string;
 *    d: number;
 *  }
 * }
 *
 * const a: ObjKeyToArr<A> = ['a']; // 当为 a 的时候, 只能由一个索引, 因为 A['a'] 不是一个对象
 * const a: ObjKeyToArr<A> = ['b', 'c']; // 当为 b 的时候, 可以有第二个索引, 因为 A['b'] 是一个对象, 可以递归按层级识别
 */
export type ObjKeyToArr<
  T,
  K extends keyof T = keyof T,
  S = T[K]
> = [K, ...(S extends object ? ObjKeyToArr<S, keyof S> : [])];

/**
 * 获取 vue 组件的 props 作为一个类型
 * 例如:
 * xx.vue:
 *
 * <script lang="ts" setup>
 *
 * const props = defineProps({
 *  list: { type: Array as PropType<string[]>, default: [] }
 * })
 *
 * </script>
 *
 *
 * xx.ts:
 *
 * import Cmp from 'xx.vue';
 *
 * const props: ComponentsProps<typeof Cmp> = {
 *  list: [] // 这个类型就会被推断为 string[]
 * }
 *
 */
// @ts-ignore
export type ComponentsProps<T extends unknown> = Exclude<Required<T['__defaults']>, undefined>;

/**
 * 创建 table columns 的时候的类型转换, T 是原本的类型, K 则是 Response 对象
 * 通过联合类型让原本的类型拥有类型检测和提示
 *
 * // 先提前定义 Response
 * interface Response {
 *    id: number;
 *
 *    name: stirng;
 * }
 *
 * import type { TableColumnType } from 'ant-design-vue';
 *
 * type Column = CustomColumn<TableColumnType, Response>; // 通过类型运算获得 Reseponse 类型
 *
 * const columns: Column[] = [
 *  { title: 'id', dataIndex: 'id' } // 此时 dataIndex 将会获得 Response 的类型
 * ]
 */
export type CustomColumn<T, K> =
  (T & { dataIndex: (keyof K) | ObjKeyToArr<K> })
  |
  (T & { dataIndex: string | ObjKeyToArr<K> } )
;

/**
 * 提取对象类型, 如果一个类型类似于 type A = object; // 假设
 *
 * type C = A | A[];
 *
 * 类似于 C 类型的时候, 但是你又不能直接获取 A 类型, 需要进行类型推断的时候就可以使用这个
 *
 * 将会返回 A 类型。请注意: 如果 C 还包含了其他类型可能导致推断不正确
 */
export type ExtractObj<T> = T extends (infer U)[] ? U : T;

/**
 * 获得数组的索引
 *
 * type Arr = [1, 2]
 *
 * type Keys = ArrayKeys<Arr>; // '0' | '1' 包含两项
 *
 * 请确保数据是一个常类型,readonly
 */
export type ArrayKeys<T extends readonly any[]> = Exclude<keyof T, Exclude<keyof T, `${number}`> | symbol>;

/**
 * 反转对象键值对
 *
 * type Obj = {
 *  a: 1;
 *  b: 2;
 *  c: 3;
 * }
 *
 * type ReverseObj = ReverseObjKeyValue<Obj>;
 *
 * 那么得到的类型如下:
 * {
 *  1: 'a';
 *  2: 'b';
 *  3: 'c';
 * }
 *
 * 当然请确保传递时拥有正确的键值对
 */
export type ReverseObjKeyValue<Obj extends Record<string | number | symbol, any>> = {
  [Key in keyof Obj as Obj[Key]]: Key;
}

/**
 * 自动补全类型，当你的一个类型是另一个的子类型的时候，你编写了部分属性，但是想在你的基础上补全你所缺少的其他类型
 *
 * 例如：
 *
 * // 基类
 * interface Lib {
 *  name: string;
 *  age: number;
 *  sex: boolean;
 * }
 *
 * function make<T extends Partial<Lib>>(options: T) {
 *   return options;
 * }
 *
 * const r = make({
 *  name: '1'
 * });
 * 当然建议在传递的时候使用 as const断言，让类型获取更加准确
 * const r = make({
 *  name: '1'
 * } as const); // !
 *
 * 此时r只会有一个键值类型 name，如果你需要补全，将除开你所编写的键值外的类型添加进去，就使用这个
 *
 * function make<T extends Partial<Lib>>(options: T) {
 *  return options as ObjAutoComplete<T, Lib>;
 * }
 *
 *
 * T: 当前目标
 * R: 接口目标
 */
export type ObjAutoComplete<T extends Record<string | number | symbol, any>, R extends Record<string | number | symbol, any>> = T & Pick<R, Exclude<keyof R, keyof T>>;
