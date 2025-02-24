import { app } from 'electron';
import { SingleInstanceService } from 'rd/base/common/service/SingleInstanceService';

/**
 * 单实例基类, 与 CustomSingleInstanceService 区别:
 *
 * 只允许返回当前类的实例
 */
export class RdAppSingleInstanceService extends SingleInstanceService {
  public constructor() {
    super();
    app.on('will-quit', () => this.destroy());
  }

  /**
   * 单一实例才应用程序即将退出时做的事情
   */
  protected override destroy(): void {

  }
}
