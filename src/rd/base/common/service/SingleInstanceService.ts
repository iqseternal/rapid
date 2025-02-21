

/**
 * 单实例基类, 与 CustomSingleInstanceService 区别:
 *
 * 只允许返回当前类的实例
 */
export class SingleInstanceService<T extends SingleInstanceService<T>> {
  private static instanceMap: Record<string, SingleInstanceService<any>> = {};
  private static isCanNew = false;

  public constructor() {
    if (!SingleInstanceService.isCanNew) {
      throw new Error(`请不要使用 New 操作符手动实例化 SingleInstanceService 对象, 请使用 SingleInstanceService 对象.getInstance().`);
    }
  }

  /**
   * 采用单实例做法, 这样可以保持应用程序数据的统一, 保持数据的一致性
   * @returns
   */
  public static getInstance<T>(): T {
    const className = this.name;

    if (!SingleInstanceService.instanceMap[className]) {
      SingleInstanceService.isCanNew = true;
      SingleInstanceService.instanceMap[className] = new this();
      SingleInstanceService.isCanNew = false;
    }

    return SingleInstanceService.instanceMap[className] as T;
  }

  /**
   * 单一实例才应用程序即将退出时做的事情
   */
  protected destroy(): void {

  }
}
