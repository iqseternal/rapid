import { join } from 'path';
import { BrowserWindow, shell, type BrowserWindowConstructorOptions } from 'electron';
import { is } from '@electron-toolkit/utils';
import { Tray, Menu, app, screen } from 'electron';
import { setWindowCross, setWindowMaxSize, setWindowMinSize, setWindowOpenHandler, setWindowCaption, setWindowDevtoolsDetach, getWindowFrom, getWindowFromId, getWindowFromIpcEvt } from '@/core/common/window';
import { PAGES_WINDOW_SETTING, PAGES_WINDOW_MAIN } from '@/config';
import { CONFIG, IS_DEV, IS_LINUX } from '@rapid/config/constants';
import { isString, isNumber } from '@suey/pkg-utils';
import { iconUrl } from '@rapid/config/electron-main';
import { RuntimeException } from '@/common/exceptions';
import { print } from '@suey/printer';
import { PrinterService } from './PrinterService';

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
  autoShow: boolean;
  windowKey?: string;
}

export class WindowService {
  public static readonly id = `WindowService`;

  public readonly window: BrowserWindow;
  private openThenCbs: BaseCb[] = [];
  private openCatchCbs: BaseCb[] = [];
  private destroyCbs: BaseCb[] = [];

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
        contextIsolation: true,
        nodeIntegrationInSubFrames: true,
        nodeIntegrationInWorker: true
      },
    });

    setWindowCross(this.window);
    setWindowMaxSize(this.window);
    setWindowCaption(this.window, iconUrl, CONFIG.PROJECT);
    setWindowOpenHandler(this.window);

    if (this.options.autoShow) this.window.on('ready-to-show', () => this.window.show());

    if (this.options.windowKey) WindowStateMachine.addKey(this.options.windowKey, this);
    else WindowStateMachine.addId(this);

    this.addDestroyCb(() => {
      if (this.options.windowKey) WindowStateMachine.removeKey(this.options.windowKey);
      else WindowStateMachine.removeId(this);
    });
  }

  /**
   * 添加一个打开窗口成功的回调函数
   * @param cb
   */
  addOpenThenCb(cb: BaseCb) { this.openThenCbs.push(cb); }
  /**
   * 添加一个打开窗口失败的回调函数
   * @param cb
   */
  addOpenCatchCb(cb: BaseCb) { this.openCatchCbs.push(cb); }

  /**
   * 打开窗口
   * @param ok 打开成功的回调函数
   * @param fail 打开失败的回调函数
   * @returns
   */
  open(ok?: BaseCb, fail?: BaseCb) {
    return new Promise<void>(async (resolve, reject) => {
      if (this.window.isVisible()) {
        this.window.focus();
        return resolve();
      }

      let p: Promise<void>;

      if (IS_DEV) p = this.window.loadURL(this.options.url);
      else p = this.window.loadFile(this.options.url);

      p.then(async () => {
        ok && ok();
        this.openThenCbs.forEach(cb => cb());
        resolve();
      }).catch(async () => {
        fail && fail();
        this.openCatchCbs.forEach(cb => cb());
        reject();
      });
    });
  }

  /**
   * 关闭某个窗口，类似于浏览器标签页关闭
   * @returns
   */
  close() {
    return new Promise<boolean>((resolve, rejecet) => {
      if (this.window.closable) {

        this.window.close();
        resolve(true);
      }
      else rejecet(false);
    });
  }

  /**
   * 添加一个销毁时回调
   * @param cb
   */
  addDestroyCb(cb: BaseCb) { this.destroyCbs.push(cb); }
  /**
   * 销毁窗口对象
   */
  destroy() {
    this.destroyCbs.forEach(cb => cb());
    this.window.close();
    this.window.destroy();
  }

  /**
   * 从事件或者窗口id获得一个创建时的 Service 对象
   * @param args
   * @returns
   */
  static findWindowService(...args: Parameters<typeof getWindowFrom>) {
    const window = getWindowFrom(...args);
    if (!window) throw new RuntimeException('not found BrowserWindow object.', {
      label: this.id
    });

    const windowService = WindowStateMachine.findWindowService(window.id);
    if (!windowService) throw new RuntimeException('not found WindowService object.', {
      label: this.id
    });

    return windowService;
  }
}



/**
 * window的状态机, 用于记录创建了那些窗口服务
 */
export class WindowStateMachine {
  private static readonly keyToServiceMap = new Map<string, WindowService>();
  private static readonly idToServiceMap = new Map<number, WindowService>();


  /**
   * 放回当前状态机中是否含有 Service
   * @param windowService
   * @returns
   */
  public static hasWindowService(windowService: WindowService) {
    const service = WindowStateMachine.findWindowService(windowService.window.id);

    if (service && isSameWindowService(service, windowService)) {
      return true;
    }

    return false;
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
    if (isString(key)) {
      return WindowStateMachine.keyToServiceMap.get(key) ?? null;
    }

    if (isNumber(key)) {
      return WindowStateMachine.idToServiceMap.get(key) ?? null;
    }

    return null;
  }

  public static desotryWindowService(windowService: WindowService) {
    if (!WindowStateMachine.hasWindowService(windowService)) {
      throw new RuntimeException('WindowStateMachine: does not have a window object that is about to be destroyedd', {
        label: 'WindowStateMachine'
      })
    }
    windowService.destroy();
  }
}

/**
 * 返回两个 windowService 是否是同一个
 * @param _1
 * @param _2
 * @returns
 */
export const isSameWindowService = (_1: WindowService, _2: WindowService) => {
  if (_1 === _2) return true;
  if (_1.window.id === _2.window.id) return true;

  return false;
}
