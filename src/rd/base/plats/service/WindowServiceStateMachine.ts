import { isString, isNumber, isNull } from '@rapid/libs';
import { RuntimeException } from 'rd/base/plats/exceptions';
import type { WindowService } from './WindowService';

/**
 * window的状态机, 用于记录创建了那些窗口服务
 */
export class WindowServiceStateMachine {
  private static readonly keyToServiceMap = new Map<string, WindowService>();
  private static readonly idToServiceMap = new Map<number, WindowService>();

  /**
   * 返回当前状态机中是否含有 Service
   * @param windowService
   * @returns
   */
  public static hasWindowService(windowService: WindowService) {
    const service = WindowServiceStateMachine.findWindowService(windowService.window.id);
    if (!service) return false;

    if (service === windowService) return true;
    if (service.window.id === windowService.window.id) return true;
    return false;
  }

  /**
   * 放回当前状态机中是否含有当前 key
   */
  public static hasWindowServiceKey(key: string | number | WindowService) {
    if (isString(key)) return this.hasKey(key);
    if (isNumber(key)) return this.hasId(key);
    const windowKey = key.options.windowKey;
    const id = key.window.id;
    return (windowKey && this.hasKey(windowKey)) || this.hasId(id);
  }

  /**
   * 添加一个 windowService 到状态机中
   */
  public static addWindowService(windowService: WindowService) {
    if (windowService.window.isDestroyed()) {
      throw new RuntimeException(`企图添加一个已经被销毁的 WindowService`, {
        label: 'WindowServiceStateMachine:addWindowService'
      });
    }
    if (WindowServiceStateMachine.hasWindowService(windowService)) {
      console.error(`WindowServiceStateMachine:addWindowService 当前已经存在此 windowService, 重复的的添加`);
    }
    this.addId(windowService.window.id, windowService);
    if (windowService.options.windowKey) this.addKey(windowService.options.windowKey, windowService);
  }

  /**
   * 删除制定的 service 服务
   */
  public static removeService(windowService: WindowService) {
    this.removeId(windowService.window.id);
    if (windowService.options.windowKey) this.removeKey(windowService.options.windowKey);
  }

  /**
   * 通过名字或者 id 查找一个 Service
   */
  public static findWindowService(key: string | number): WindowService | null {
    let windowService: WindowService | undefined = void 0;

    if (isString(key)) windowService = WindowServiceStateMachine.keyToServiceMap.get(key);
    else if (isNumber(key)) windowService = WindowServiceStateMachine.idToServiceMap.get(key);

    if (!windowService) return null;
    return windowService;
  }

  /**
   * 销毁一个 windowService 对象
   */
  public static destroyWindowService(windowService: WindowService) {
    if (!WindowServiceStateMachine.hasWindowService(windowService)) {
      throw new RuntimeException('无法从状态机中找到该对象, 销毁失败', {
        label: 'WindowServiceStateMachine'
      })
    }

    this.removeService(windowService);
    windowService.destroy();
  }


  /**
   * 通过名字添加一个 Service 到状态机中
   */
  private static addKey(key: string, windowService: WindowService) {
    WindowServiceStateMachine.keyToServiceMap.set(key, windowService);
    WindowServiceStateMachine.addId(windowService.window.id, windowService);
  }

  /**
   * 通过名字删除一个 Service
   */
  private static removeKey(key: string) {
    const windowService = WindowServiceStateMachine.keyToServiceMap.get(key);
    WindowServiceStateMachine.keyToServiceMap.delete(key);
    if (windowService) WindowServiceStateMachine.removeId(windowService.window.id);
  }

  /**
   * 查看当前状态机中是否含有 key
   */
  private static hasKey(key: string) {
    return this.keyToServiceMap.has(key);
  }

  /**
   * 通过 id 添加一个 Service
   */
  private static addId(id: number, windowService: WindowService) {
    WindowServiceStateMachine.idToServiceMap.set(id, windowService);
  }

  /**
   * 通过 id 删除一个 Service
   */
  private static removeId(id: number) {
    WindowServiceStateMachine.idToServiceMap.delete(id);
  }

  /**
   * 返回当前状态机中是否含有特定 id
   */
  private static hasId(key: number) {
    return this.idToServiceMap.has(key);
  }
}

