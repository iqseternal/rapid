import { join } from 'path';
import { BrowserWindow, type BrowserWindowConstructorOptions, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { CONFIG, IS_DEV, IS_LINUX } from '@rapid/config/constants';
import { isString, isNumber, isNull } from '@rapid/libs';
import { Catch, Exception, RuntimeException } from 'rd/base/plats/exceptions';

/**
 * 通过ipc事件获得一个window对象
 * @param evt
 * @returns
 */
function getWindowFromIpcEvt(evt: IpcMainEvent | IpcMainInvokeEvent) {
  return BrowserWindow.fromWebContents(evt.sender);
}

/**
 * 通过ID获得一个window对象
 * @param id
 * @returns
 */
function getWindowFromId(id: number) {
  return BrowserWindow.fromId(id);
}

/**
 * 获得一个window对象
 * @param arg
 * @returns
 */
function getWindowFrom(arg: number | IpcMainEvent | IpcMainInvokeEvent): BrowserWindow | null {
  if (isNumber(arg)) return getWindowFromId(arg);
  else return getWindowFromIpcEvt(arg);
}

/**
 * 默认构造窗口的属性
 */
const DefaultBrowserWindowConstructorOptions: Partial<BrowserWindowConstructorOptions> = {
  show: false,
  autoHideMenuBar: true,

  disableAutoHideCursor: false,
  frame: false, // 是否带有边框的窗口
  alwaysOnTop: false,
  transparent: false, // 设置为 true, 窗口会变得透明
  hasShadow: true
} as const;

/**
 * 创建 windowService 的选项
 */
export interface WindowServiceOptions {
  url: string;
  autoLoad: boolean;
  windowKey?: string;
}

/**
 * 窗口服务对象
 */
export class WindowService {
  public readonly window: BrowserWindow;

  public constructor(windowOptions: Partial<BrowserWindowConstructorOptions>, public readonly options: WindowServiceOptions) {
    this.window = new BrowserWindow({
      width: 1650,
      height: 780,
      ...DefaultBrowserWindowConstructorOptions,
      ...windowOptions,
      ...(IS_LINUX ? { } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        devTools: true,
        webSecurity: true,
        ...(windowOptions.webPreferences ?? {})
      },
    });

    WindowServiceStateMachine.addWindowService(this);
    if (options.autoLoad) this.load();
  }

  /**
   * 加载标签页
   */
  private load(): void {
    if (IS_DEV) this.window.loadURL(this.options.url);
    else this.window.loadFile(this.options.url);
  }

  /**
   * 打开窗口
   */
  public async show() {
    return new Promise<void>((resolve, reject) => {
      let isResolved = false;

      setTimeout(() => {
        if (isResolved) return;
        // 1 秒钟之内没有加载完成, 那么就失败
        reject();
      }, 1000);

      this.window.once('ready-to-show', () => {
        isResolved = true;
        this.window.show();
        resolve();
      })
    })
  }

  /**
   * 销毁窗口对象
   */
  public destroy(): void {
    if (this.window.isDestroyed()) return;
    WindowServiceStateMachine.removeService(this);
    // this.beforeDestroyCallbacks.forEach(callback => callback());
    this.window.close();
    this.window.destroy();
  }

  /**
   * 从事件或者窗口id获得一个创建时的 Service 对象
   *
   * @example
   * // 如果是通过 windowService 创建, 并且设置了 name 属性, 那么可以通过该方法找到
   * const windowService = WindowService.findWindowService('mainWindow');
   *
   * @example
   * declare const e: IpcMainEvent;
   * const windowService = WindowService.findWindowService(e);
   *
   * declare const id: number;
   * const windowService = WindowService.findWindowService(id);
   *
   */
  public static findWindowService(...args: [string | number | IpcMainEvent | IpcMainInvokeEvent] | [string, (() => WindowService)?]) {
    if (isString(args[0])) {
      const service = WindowServiceStateMachine.findWindowService(args[0]);

      if (service) return service;
      if (args[1]) return args[1]();

      throw new RuntimeException(`not found BrowserWindow object in ${args[0]}.`, {
        label: `WindowService:findWindowService`
      })
    }

    const window = getWindowFrom(...(args as Parameters<typeof getWindowFrom>));

    if (!window) {
      throw new RuntimeException(`not found WindowService object in ${args}.`, {
        label: 'WindowService'
      });
    }

    return WindowServiceStateMachine.findWindowService(window.id)!;
  }
}

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
    return service && isSameWindowService(service, windowService);
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
   * 通过名字添加一个 Service 到状态机中
   */
  public static addKey(key: string, windowService: WindowService) {
    WindowServiceStateMachine.keyToServiceMap.set(key, windowService);
    WindowServiceStateMachine.addId(windowService.window.id, windowService);
  }

  /**
   * 通过名字删除一个 Service
   */
  public static removeKey(key: string) {
    const windowService = WindowServiceStateMachine.keyToServiceMap.get(key);
    WindowServiceStateMachine.keyToServiceMap.delete(key);
    if (windowService) WindowServiceStateMachine.removeId(windowService.window.id);
  }

  /**
   * 查看当前状态机中是否含有 key
   */
  public static hasKey(key: string) {
    return this.keyToServiceMap.has(key);
  }

  /**
   * 通过 id 添加一个 Service
   */
  public static addId(id: number, windowService: WindowService) {
    WindowServiceStateMachine.idToServiceMap.set(id, windowService);
  }

  /**
   * 通过 id 删除一个 Service
   */
  public static removeId(id: number) {
    WindowServiceStateMachine.idToServiceMap.delete(id);
  }

  /**
   * 返回当前状态机中是否含有特定 id
   */
  public static hasId(key: number) {
    return this.idToServiceMap.has(key);
  }

  /**
   * 添加一个 windowService 到状态机中
   */
  public static addWindowService(windowService: WindowService) {
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
  public static findWindowService(key: string): WindowService | null;
  public static findWindowService(id: number): WindowService | null;
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
}

/**
 * 返回两个 windowService 是否是同一个
 * @param _1
 * @param _2
 * @returns
 */
export const isSameWindowService = (_1: WindowService | null, _2: WindowService | null) => {
  if (isNull(_1) || isNull(_2)) return false;
  if (_1 === _2) return true;
  return _1.window.id === _2.window.id;
}
