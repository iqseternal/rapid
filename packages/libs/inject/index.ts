/**
 * Object.defineProperty, 向对象注入变量, 默认不可修改不可配置不可删除不可枚举
 * @description 为什么需要它？当对象生命为 readonly, 但是需要初始化赋值
 */
export function inject<T extends {}, Key extends keyof T, Value>(target: T, propertyKey: Key, value: Value, attributes: PropertyDescriptor & ThisType<any> = {}): void {
  const propertyDescriptor = {
    value: value,
    enumerable: false,
    configurable: false,
    writable: false,
    ...attributes,
  };

  const r = Reflect.defineProperty(target, propertyKey, propertyDescriptor);

  if (!r) throw new Error(`Failed to define property ${String(propertyKey)}`);
}
