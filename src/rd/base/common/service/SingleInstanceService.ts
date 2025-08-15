
/**
 * 单实例抽象基类
 */
export class SingleInstanceService {
  private static instanceMap = new WeakMap<Function, SingleInstanceService>();
  private static isCanNew = false;

  public constructor() {
    if (!SingleInstanceService.isCanNew) {
      throw new Error(
        `请不要使用 new 操作符手动实例化 ${this.constructor.name} 对象, 请使用 ${this.constructor.name}.getInstance()。`
      );
    }
  }

  /**
   * 获取单例实例
   * @returns {T}
   */
  public static getInstance<T extends SingleInstanceService>(this: { new(): T }): T {
    if (!SingleInstanceService.instanceMap.has(this)) {
      SingleInstanceService.isCanNew = true;
      SingleInstanceService.instanceMap.set(this, new this());
      SingleInstanceService.isCanNew = false;
    }

    return SingleInstanceService.instanceMap.get(this) as T;
  }

  /**
   * 单一实例在应用程序即将退出时做的事情
   */
  protected destroy(): void { }
}
