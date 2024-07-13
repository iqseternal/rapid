import { join } from 'path';
import { BrowserWindow, type BrowserWindowConstructorOptions } from 'electron';
import { setWindowCross, setWindowMaxSize, setWindowOpenHandler, setWindowCaption, getWindowFrom } from '@/core/common/window';
import { CONFIG, IS_DEV, IS_LINUX } from '@rapid/config/constants';
import { isString, isNumber, isNull } from '@suey/pkg-utils';
import { iconUrl } from '@rapid/config/electron-main';
import { RuntimeException } from '@/core';

const DEFAULT_OPTIONS: Partial<BrowserWindowConstructorOptions> = {
  show: false,
  autoHideMenuBar: true,
  disableAutoHideCursor: false,
  frame: false, // 是否带有边框的窗口
  alwaysOnTop: false,
  transparent: false, // 设置为 true, 窗口会变得透明
  hasShadow: true
};

export interface WindowServiceOptions {
  url: string;
  autoLoad: boolean;
  windowKey?: string;
}

export class WindowService {
  public static readonly id = `WindowService`;

  public readonly window: BrowserWindow;
  private loadThenCbs: (() => void)[] = [];
  private loadCatchCbs: (() => void)[] = [];
  private destroyCbs: (() => void)[] = [];

  constructor(
    windowOptions: Partial<BrowserWindowConstructorOptions>,
    public readonly options: WindowServiceOptions
  ) {
    this.window = new BrowserWindow({
      width: 1650,
      height: 780,
      ...DEFAULT_OPTIONS,
      ...windowOptions,
      ...(IS_LINUX ? { icon: iconUrl } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        devTools: true,
        webSecurity: true,
        nodeIntegration: true,
      },
    });

    // setWindowCross(this.window);
    // setWindowMaxSize(this.window);
    setWindowCaption(this.window, iconUrl, CONFIG.PROJECT);


    if (this.options.windowKey) WindowStateMachine.addKey(this.options.windowKey, this);
    else WindowStateMachine.addId(this);

    this.addDestroyCb(() => {
      if (this.options.windowKey) WindowStateMachine.removeKey(this.options.windowKey);
      else WindowStateMachine.removeId(this);
    });

    if (options.autoLoad) this.load();
  }

  /**
   * 添加一个打开窗口成功地回调函数
   * @param cb
   */
  addOpenThenCb(cb: () => void) { this.loadThenCbs.push(cb); }
  /**
   * 添加一个打开窗口失败的回调函数
   * @param cb
   */
  addOpenCatchCb(cb: () => void) { this.loadCatchCbs.push(cb); }

  private load() {
    let p: Promise<void>;

    if (IS_DEV) p = this.window.loadURL(this.options.url);
    else p = this.window.loadFile(this.options.url);

    p.then(() => {
      this.loadThenCbs.forEach(cb => cb());
    }).catch(() => {
      this.loadCatchCbs.forEach(cb => cb());
    })
  }

  /**
   * 打开窗口
   * @param ok 打开成功地回调函数
   * @param fail 打开失败的回调函数
   * @returns
   */
  show(ok?: () => void, fail?: () => void) {
    return new Promise<void>((resolve, reject) => {
      let isResolved = false;

      setTimeout(() => {
        if (isResolved) return;

        fail && fail();
        reject();
      }, 1000);

      this.window.once('ready-to-show', () => {
        ok && ok();
        isResolved = true;
        this.window.show();
        resolve();
      })
    })
  }

  /**
   * 关闭某个窗口，类似于浏览器标签页关闭
   * @returns
   */
  close() {
    return new Promise<boolean>((resolve, reject) => {
      if (this.window.closable) {

        this.window.close();
        resolve(true);
      }
      else reject(false);
    });
  }

  /**
   * 添加一个销毁时回调
   * @param cb
   */
  addDestroyCb(cb: () => void) { this.destroyCbs.push(cb); }

  /**
   * 销毁窗口对象
   */
  destroy() {
    if (this.window.isDestroyed()) return;

    this.destroyCbs.forEach(cb => cb());
    this.window.close();
    this.window.destroy();
  }

  /**
   * 从事件或者窗口id获得一个创建时的 Service 对象
   * @returns
   * @param name
   */
  static findWindowService(name: string): WindowService;
  static findWindowService(name: string, init?: () => WindowService | Promise<WindowService>): Promise<WindowService>;
  static findWindowService(...args: Parameters<typeof getWindowFrom>): WindowService;
  static findWindowService(...args: [string] | [string, (() => WindowService | Promise<WindowService>)?] | Parameters<typeof getWindowFrom>) {
    if (isString(args[0])) {

      const service = WindowStateMachine.findWindowService(args[0]);


      if (!service) {
        if (args[1]) return Promise.resolve(args[1]());

        throw new RuntimeException(`not found BrowserWindow object in ${args[0]}.`, {
          label: `WindowService:findWindowService`
        })
      }
      else return service;
    }

    const window = getWindowFrom(...(args as Parameters<typeof getWindowFrom>));
    if (!window) throw new RuntimeException(`not found WindowService object in ${args}.`, {
      label: this.id
    });

    return WindowStateMachine.findWindowService(window.id);
  }
}

/**
 * window的状态机, 用于记录创建了那些窗口服务
 */
export class WindowStateMachine {
  private static readonly keyToServiceMap = new Map<string, WindowService>();
  private static readonly idToServiceMap = new Map<number, WindowService>();

  /**
   * 返回当前状态机中是否含有 Service
   * @param windowService
   * @returns
   */
  public static hasWindowService(windowService: WindowService) {
    const service = WindowStateMachine.findWindowService(windowService.window.id);

    return service && isSameWindowService(service, windowService);
  }

  /**
   * 通过名字添加一个 Service 到状态机中
   * @param key
   * @param windowService
   */
  public static addKey(key: string, windowService: WindowService) {
    WindowStateMachine.keyToServiceMap.set(key, windowService);
    WindowStateMachine.addId(windowService);
  }

  /**
   * 通过名字删除一个 Service
   * @param key
   */
  public static removeKey(key: string) {
    const windowService = WindowStateMachine.keyToServiceMap.get(key);
    WindowStateMachine.keyToServiceMap.delete(key);
    if (windowService) WindowStateMachine.removeId(windowService);
  }

  /**
   * 通过 id 添加一个 Service
   * @param windowService
   */
  public static addId(windowService: WindowService) {
    WindowStateMachine.idToServiceMap.set(windowService.window.id, windowService);
  }

  /**
   * 通过 id 删除一个 Service
   * @param windowService
   */
  public static removeId(windowService: WindowService) {
    WindowStateMachine.idToServiceMap.delete(windowService.window.id);
  }

  /**
   * 通过名字或者 id 查找一个 Service
   * @param key
   */
  public static findWindowService(key: string): WindowService | null;
  public static findWindowService(id: number): WindowService | null;
  public static findWindowService(key: string | number): WindowService | null {
    let windowService: WindowService | undefined = void 0;

    if (isString(key)) windowService = WindowStateMachine.keyToServiceMap.get(key);
    else if (isNumber(key)) windowService = WindowStateMachine.idToServiceMap.get(key);

    if (!windowService) return null;

    return windowService;
  }

  public static destoryWindowService(windowService: WindowService) {
    if (!WindowStateMachine.hasWindowService(windowService)) {
      throw new RuntimeException('WindowStateMachine: does not have a window object that is about to be destroyed', {
        label: 'WindowStateMachine'
      })
    }
    windowService.destroy();
  }

  /**
   * 返回所有的窗口对象
   */
  public static getAllWindowService() {

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
