import { app } from 'electron';

/**
 * 单实例基类
 */
export class SingleInstanceService<T extends SingleInstanceService<T>> {
  private static instanceMap: Record<string, SingleInstanceService<any>> = {};
  private static isCanNew = false;

  constructor() {
    if (!SingleInstanceService.isCanNew) {
      throw new Error(`请不要使用 New 操作符手动实例化 SingleInstanceService 对象, 请使用 SingleInstanceService 对象.getInstance().`);
    }

    app.on('will-quit', () => this.destory());
  }

  /**
   * 采用单实例做法, 这样可以保持应用程序数据的统一, 保持数据的一致性
   * @returns
   */
  static getInstance<T>(): T {
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
  destory(): void {

  }
}
