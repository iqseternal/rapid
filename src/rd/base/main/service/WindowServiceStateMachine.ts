import { isString, isNumber, isNull } from '@rapid/libs';
import { RuntimeException, TypeException } from '../exceptions';
import { WindowService } from './WindowService';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { BrowserWindow } from 'electron';

/**
 * window的状态机, 用于记录创建了那些窗口服务
 */
export class WindowServiceStateMachine {
  private static readonly keyToServiceMap = new Map<string, WindowService>();
  private static readonly idToServiceMap = new Map<number, WindowService>();

  /**
   * 通过名字或者 id 查找一个 Service
   */
  public static findWindowService(key: string | number): WindowService | null {
    let windowService: WindowService | null = null;

    if (isString(key)) windowService = WindowServiceStateMachine.keyToServiceMap.get(key) ?? null;
    else if (isNumber(key)) windowService = WindowServiceStateMachine.idToServiceMap.get(key) ?? null;
    else {
      throw new TypeException('传入了未指定类型 type', {
        label: 'WindowServiceStateMachine:findWindowService',
      })
    }

    return windowService;
  }

  /**
   * 回当前状态机中是否含有 Service
   */
  public static hasWindowService(key: string | number | WindowService) {
    if (key instanceof WindowService) key = key.window.id;
    if (isString(key)) return WindowServiceStateMachine.keyToServiceMap.has(key);
    if (isNumber(key)) return WindowServiceStateMachine.idToServiceMap.has(key);

    throw new TypeException('传入了未指定类型 type', {
      label: 'WindowServiceStateMachine:hasWindowServiceKey'
    })
  }

  /**
   * 添加一个 windowService 到状态机中
   */
  public static addWindowService(windowService: WindowService) {
    if (windowService.window.isDestroyed()) {
      throw new RuntimeException(`企图添加一个已经被销毁的 WindowService 到状态机`, {
        label: 'WindowServiceStateMachine:addWindowService'
      });
    }

    if (WindowServiceStateMachine.hasWindowService(windowService)) {
      PrinterService.printWarn(`WindowServiceStateMachine:addWindowService 当前已经存在此 windowService, 忽略添加`);
      return;
    }

    const id = windowService.window.id;
    const windowKey = windowService.options.windowKey;

    WindowServiceStateMachine.idToServiceMap.set(id, windowService);
    if (windowKey) WindowServiceStateMachine.keyToServiceMap.set(windowKey, windowService);
  }

  /**
   * 删除制定的 service 服务
   */
  public static removeWindowService(windowService: WindowService) {
    const id = windowService.window.id;
    const windowKey = windowService.options.windowKey;

    if (!WindowServiceStateMachine.hasWindowService(windowService)) {
      throw new RuntimeException(`WindowServiceStateMachine:removeWindowService 当前不存在此 windowService, 忽略删除`, {
        label: 'WindowServiceStateMachine:removeWindowService'
      });
    }

    WindowServiceStateMachine.idToServiceMap.delete(id);
    if (windowKey) WindowServiceStateMachine.keyToServiceMap.delete(windowKey);
  }
}

