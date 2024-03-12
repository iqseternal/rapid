import { join } from 'path';
import { BrowserWindow, shell, type BrowserWindowConstructorOptions } from 'electron';
import { is } from '@electron-toolkit/utils';
import { Tray, Menu, app, screen } from 'electron';
import { setWindowCross, setWindowMaxSize, setWindowMinSize, setWindowOpenHandler, setWindowCaption, setWindowDevtoolsDetach, getWindowFrom, getWindowFromId, getWindowFromIpcEvt } from '../core/common/window';
import { PAGES_WINDOW_SETTING, PAGES_WINDOW_MAIN } from '#/config';
import { CONFIG, IS_DEV, IS_LINUX } from '#/constants';
import { isString, isNumber } from '@suey/pkg-utils';
import icon from '#/../resources/icon.png?asset';

const DEFAILT_OPTIONS: Partial<BrowserWindowConstructorOptions> = {
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
      ...DEFAILT_OPTIONS,
      ...windowOptions,
      ...(IS_LINUX ? { icon } : {}),
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
    setWindowCaption(this.window, icon, CONFIG.PROJECT);
    setWindowOpenHandler(this.window);

    if (this.options.autoShow) this.window.on('ready-to-show', () => this.window.show());

    if (this.options.windowKey) WindowStateMachine.addKey(this.options.windowKey, this);
    else WindowStateMachine.addId(this);

    this.addDestroyCb(() => {
      if (this.options.windowKey) WindowStateMachine.removeKey(this.options.windowKey);
      else WindowStateMachine.removeId(this);
    });
  }

  addOpenThenCb(cb: BaseCb) { this.openThenCbs.push(cb); }
  addOpenCatchCb(cb: BaseCb) { this.openCatchCbs.push(cb); }

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

  close() {
    return new Promise<boolean>((resolve, rejecet) => {
      if (this.window.closable) {

        this.window.close();
        resolve(true);
      }
      else rejecet(false);
    });
  }

  addDestroyCb(cb: BaseCb) { this.destroyCbs.push(cb); }
  destroy() {
    this.destroyCbs.forEach(cb => cb());
    this.window.close();
    this.window.destroy();
  }

  static findWindowService(...args: Parameters<typeof getWindowFrom>) {

    const window = getWindowFrom(...args);

    if (!window) return null;

    const windowService = WindowStateMachine.findWindowService(window.id);

    if (!windowService) return null;

    return windowService;
  }
}



/**
 * window的状态机, 用于记录创建了那些窗口服务
 */
export class WindowStateMachine {
  public static readonly keyToServiceMap = new Map<string, WindowService>();
  public static readonly idToServiceMap = new Map<number, WindowService>();

  public static addKey(key: string, windowService: WindowService) {
    WindowStateMachine.keyToServiceMap.set(key, windowService);
    WindowStateMachine.addId(windowService);
  }
  public static removeKey(key: string) {
    const windowService = WindowStateMachine.keyToServiceMap.get(key);
    WindowStateMachine.keyToServiceMap.delete(key);
    if (windowService) WindowStateMachine.removeId(windowService);
  }

  public static addId(windowService: WindowService) {
    WindowStateMachine.idToServiceMap.set(windowService.window.id, windowService);
  }
  public static removeId(windowService: WindowService) {
    WindowStateMachine.idToServiceMap.delete(windowService.window.id);
  }

  public static findWindowService(key: string): WindowService | null;
  public static findWindowService(id: number): WindowService | null;
  public static findWindowService(key: string | number): WindowService | null {

    if (isString(key)) {
      return WindowStateMachine.keyToServiceMap.get(key) || null;
    }

    if (isNumber(key)) {
      return WindowStateMachine.idToServiceMap.get(key) || null;
    }

    return null;
  }
}
