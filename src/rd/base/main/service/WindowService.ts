import { join } from 'path';
import { BrowserWindow, type BrowserWindowConstructorOptions, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { isString } from '@rapid/libs';
import { WindowServiceStateMachine } from './WindowServiceStateMachine';
import { RuntimeException } from '../exceptions';
import { PrinterService } from 'rd/base/common/service/PrinterService';

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
      show: false,
      autoHideMenuBar: true,
      disableAutoHideCursor: false,
      frame: false, // 是否带有边框的窗口
      alwaysOnTop: false,
      transparent: false, // 设置为 true, 窗口会变得透明
      hasShadow: true,
      ...windowOptions,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        devTools: true,
        webSecurity: true,
        ...(windowOptions.webPreferences ?? {})
      },
    });

    WindowServiceStateMachine.addWindowService(this);

    if (IS_DEV) {
      this.window.loadURL(this.options.url).then(r => r).catch(e => {
        // TODO: 处理加载错误
        PrinterService.printError('加载URL失败');
      });
    }
    else {
      this.window.loadFile(this.options.url).then(r => r).catch(e => {
        // TODO: 处理加载错误
        PrinterService.printError('加载URL失败');
      });
    }
  }

  /**
   * 打开窗口
   */
  public async show() {
    return new Promise<void>((resolve, reject) => {
      this.window.once('ready-to-show', () => {
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
    WindowServiceStateMachine.removeWindowService(this);
    this.window.close();
    this.window.destroy();
  }


  // =============================================================================================================================


  /**
   * 从事件或者窗口id获得一个创建时的 BrowserWindow 对象
   */
  public static findBrowserWindow(arg: number | IpcMainEvent | IpcMainInvokeEvent): BrowserWindow | null {
    if (typeof arg === 'number') return BrowserWindow.fromId(arg);
    return BrowserWindow.fromWebContents(arg.sender);
  }

  /**
   * 从事件或者窗口id获得一个创建时的 Service 对象
   * @example
   * // 如果是通过 windowService 创建, 并且设置了 name 属性, 那么可以通过该方法找到
   * const windowService = WindowService.findWindowService('mainWindow');
   *
   * @example
   * declare const e: IpcMainEvent;
   * const windowService = WindowService.findWindowService(e);
   *
   * @example
   * declare const id: number;
   * const windowService = WindowService.findWindowService(id);
   */
  public static findWindowService(key: string | number | IpcMainEvent | IpcMainInvokeEvent): WindowService {
    if (isString(key)) {
      const service = WindowServiceStateMachine.findWindowService(key);
      if (service) return service;
      throw new RuntimeException(`Not found WindowService.`, {
        label: 'WindowService:findWindowService'
      })
    }

    const browserWindow = WindowService.findBrowserWindow(key);
    if (!browserWindow) {
      throw new RuntimeException(`Not found browserWindow.`, {
        label: 'WindowService:findWindowService'
      })
    }

    const windowService = WindowServiceStateMachine.findWindowService(browserWindow.id);
    if (!windowService) {
      throw new RuntimeException(`Not found WindowService.`, {
        label: 'WindowService:findWindowService'
      })
    }

    return windowService;
  }

  /**
   * 判断是否是同一个 WindowService
   */
  public static isSameWindowService(tr: WindowService | null, other: WindowService | null) {
    if (!tr || !other) return false;
    if (tr === other) return true;
    return tr.window.id === other.window.id;
  }
}
