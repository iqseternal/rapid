import { IpcRenderer as IpcRenderer$1, WebFrame, NodeProcess } from '@electron-toolkit/preload';
import * as _suey_pkg_utils from '@suey/pkg-utils';
import { ExtractNever, CutHead, RPromiseLike, Ansi } from '@suey/pkg-utils';
import { IpcMainInvokeEvent, IpcMainEvent, BrowserWindow, BrowserWindowConstructorOptions, OpenDevToolsOptions } from 'electron';

/**
 * 产生自定义异常时，所需要携带的参数类型，可以做日志操作等等
 */
interface ExceptionErrorMsgData {
    /**
     * 异常标签, 通常用于打印服务
     */
    readonly label: string;
    /**
     * 异常等级
     */
    readonly level: 'ERROR' | 'SUCCESS' | 'INFO' | 'WARN';
    /**
     * 异常产生时间
     */
    readonly time: number;
    readonly other: Record<string, any>;
}
/**
 * 异常基类
 */
declare class Exception<ErrMessageData extends ExceptionErrorMsgData> {
    message: string;
    readonly errMessage: ErrMessageData;
    constructor(message: string, errMessage?: Pick<Partial<ErrMessageData>, 'level' | 'label'>);
}

/** Ipc 事件类型 */
declare const enum IpcActionEvent {
    Handle = 0,
    On = 1
}
/** 自定义 ipc action 对象 */
type IpcActionType<EvtActionType extends IpcActionEvent, Channel extends string = string, Action extends (...args: any[]) => any = (...args: any[]) => any> = {
    /**
     * 句柄名称
     */
    readonly channel: Channel;
    /**
     * 编写的 Action 回调, 可以让其他 Action 进行调用
     */
    readonly action: Action;
    /**
     * Action Type
     */
    readonly actionType: EvtActionType;
    /**
     * 中间件列表
     */
    readonly middlewares: IpcActionMiddleware<EvtActionType>[];
    /**
     * ipc 句柄的处理函数, 该函数会走中间件, 调用 action 对象的 action 方法作为返回值
     */
    readonly listener: (e: IpcMainInvokeEvent | IpcMainEvent, ...args: any[]) => Promise<any>;
};
/** 在中间件中 onSuccess 或者 onError 中获取当前的 action 信息的类型 */
type IpcActionMessageType<EvtActionType extends IpcActionEvent> = Omit<IpcActionType<EvtActionType>, 'middlewares'> & {
    readonly event: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent;
};
/**
 * Ipc Action 中间件
 */
type IpcActionMiddleware<EvtActionType extends IpcActionEvent> = {
    /**
     * 中间件名称
     */
    readonly name: string;
    /**
     * 转换参数, 可以利用本函数为每个子项的 action 函数提供统一的参数前缀, 因为默认情况下 electron ipc 第一个参数为 事件 e: IpcMainInvokeEvent | IpcMainEvent
     * 可能需要转换自定义对象或者 已有的 窗口对象
     *
     * @example
     * export const convertWindowService: IpcActionMiddleware<IpcActionEvent.Handle> = {
     *   name: 'convertWindowService',
     *   transformArgs(e, ...args) {
     *     const windowService = WindowService.findWindowService(e);
     *     return [windowService, ...args];
     *   }
     * }
     */
    readonly transformArgs?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<any[]>;
    /**
     * 转换响应
     */
    readonly transformResponse?: <Data>(response: Promise<Data>) => Promise<any>;
    /**
     * 在 action 正式处理之前的回调函数
     */
    readonly onBeforeEach?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<void>;
    /**
     * 在 action 处理之后的回调函数
     */
    readonly onAfterEach?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<void>;
    /**
     * 在 action 正确处理 ipc 句柄的成功回调函数
     * @param res 正确处理的返回数据
     * @param message 返回处理当前 ipc 句柄的信息
     */
    readonly onSuccess?: (res: any, message: IpcActionMessageType<EvtActionType>) => Promise<void>;
    /**
     * 在 action 错误处理 ipc 句柄的回调函数, 改回调会产出一个异常对象, 可以中间件处理, 也可以继续往上抛, 让外面的中间件处理,
     * 如果不处理, 那么会在主进程产出一个错误.
     * @param res 错误处理时产生的异常对象
     * @param message 返回处理当前 ipc 句柄的信息
     */
    readonly onError?: (err: Exception<ExceptionErrorMsgData>, message: IpcActionMessageType<EvtActionType>) => Promise<void | Exception<ExceptionErrorMsgData>>;
};

/**
 * 创建 windowService 的选项
 */
interface WindowServiceOptions {
    url: string;
    autoLoad: boolean;
    windowKey?: string;
}
/**
 * 窗口服务对象
 */
declare class WindowService {
    readonly options: WindowServiceOptions;
    readonly window: BrowserWindow;
    constructor(windowOptions: Partial<BrowserWindowConstructorOptions>, options: WindowServiceOptions);
    /**
     * 打开窗口
     */
    show(): Promise<void>;
    /**
     * 销毁窗口对象
     */
    destroy(): void;
    /**
     * 从事件或者窗口id获得一个创建时的 BrowserWindow 对象
     */
    static findBrowserWindow(arg: number | IpcMainEvent | IpcMainInvokeEvent): BrowserWindow | null;
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
    static findWindowService(...args: [string | number | IpcMainEvent | IpcMainInvokeEvent] | [string, (() => WindowService)?]): WindowService;
    /**
     * 判断是否是同一个 WindowService
     */
    static isSameWindowService(tr: WindowService | null, other: WindowService | null): boolean;
}

/**
 * 接收 IpcBroadcast 事件, 并且向其他窗口广播, 携带 事件名、参数
 */
declare const ipcOnBroadcast: {
    readonly channel: "IpcBroadcast";
    readonly action: (windowService: WindowService, evtName: string, data: any) => Promise<void>;
    readonly actionType: IpcActionEvent.On;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.On>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

/**
 * 渲染进程打开开发者检查工具
 */
declare const ipcOpenDevTool: {
    readonly channel: "IpcDevTool/openDevTool";
    readonly action: (e: Electron.IpcMainInvokeEvent, status: boolean, options?: OpenDevToolsOptions) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

declare namespace DepositService {
    /**
     * 存放数据时的函数的 options
     */
    type TakeInOptions = {};
    /**
     * 取回数据的函数的 options
     */
    type TakeOutOptions = {
        /**
         * 是否取回数据后, 但是依旧保留
         */
        persist?: boolean;
    };
}
/**
 * 转发数据的寄存器中转站
 * @example
 * const depositService = new DepositService<Record<string, any>>();
 *
 * // xx.ts
 * depositService.takeIn('foo', 'bar');
 *
 * // xxx.ts 在某个事件中
 * const value = depositService.takeOut('foo');
 */
declare class DepositService<DepositEntries = unknown> {
    private readonly depositData;
    /**
     * 存放数据
     */
    takeIn<Key extends keyof DepositEntries, Data extends DepositEntries[Key]>(key: Key, data: Data, _?: DepositService.TakeInOptions): void;
    /**
     * 取回数据
     */
    takeOut<Key extends keyof DepositEntries, Data extends DepositEntries[Key]>(key: Key, options?: DepositService.TakeOutOptions): Data | null;
}

/**
 * ipc 接口, 渲染进程存放转发数据
 */
declare const ipcForwardDataTakeIn: {
    readonly channel: "IpcForwardData/takeIn";
    readonly action: (_: WindowService, key: string, data: any) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程取回数据
 */
declare const ipcForwardDataTakeOut: {
    readonly channel: "IpcForwardData/takeOut";
    readonly action: (_: WindowService, key: string, options?: DepositService.TakeOutOptions) => Promise<any>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

interface AppStoreType$1 {
    refreshToken: string;
    accessToken: string;
}

/**
 * 为渲染进程提供获得 appStore 的能力
 */
declare const ipcAppStoreGetStore: {
    readonly channel: "IpcStore/appStore/getStore";
    readonly action: () => Promise<AppStoreType$1>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 获得一个存储在 appStore 中的数据
 */
declare const ipcAppStoreGet: {
    readonly channel: "IpcStore/appStore/get";
    readonly action: <Key extends keyof AppStoreType$1, V extends Required<AppStoreType$1>[Key]>(_: WindowService, key: Key, defaultValue?: V) => Promise<Required<AppStoreType$1>[Key]>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 设置存储在 appStore 中的数据
 */
declare const ipcAppStoreSet: {
    readonly channel: "IpcStore/appStore/set";
    readonly action: <Key extends keyof AppStoreType$1, V extends AppStoreType$1[Key]>(_: WindowService, key: Key, value: V) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 重置某些 appStore 中的数据
 */
declare const ipcAppStoreReset: {
    readonly channel: "IpcStore/appStore/reset";
    readonly action: <Key extends keyof AppStoreType$1>(_: WindowService, ...keys: Key[]) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 判断 appStore 中是否含有某个 key
 */
declare const ipcAppStoreHas: {
    readonly channel: "IpcStore/appStore/has";
    readonly action: <Key extends keyof AppStoreType$1>(_: WindowService, key: Key) => Promise<boolean>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 删除 appStore 中的数据
 */
declare const ipcAppStoreDelete: {
    readonly channel: "IpcStore/appStore/delete";
    readonly action: <Key extends keyof AppStoreType$1>(_: WindowService, key: Key) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 清空 appStore
 */
declare const ipcAppStoreClear: {
    readonly channel: "IpcStore/appStore/clear";
    readonly action: (_: WindowService) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

/**
 * 窗口最大化, 可以在 options 中传递制定 id 来控制某个窗口
 */
declare const ipcWindowMaximize: {
    readonly channel: "IpcWindow/maxSize";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 窗口最小化, 可以在 options 中传递制定 id 来控制某个窗口
 */
declare const ipcWindowMinimize: {
    readonly channel: "IpcWindow/minSize";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 窗口还原指令, 还原窗口大小
 */
declare const ipcWindowReductionSize: {
    readonly channel: "IpcWindow/reduction";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 设置窗口是否可以调整大小尺寸
 */
declare const ipcWindowResizeAble: {
    readonly channel: "IpcWindow/resizeAble";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
        resizeAble: boolean;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 重新加载某个窗口页面
 */
declare const ipcWindowRelaunch: {
    readonly channel: "IpcWindow/relaunch";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 设置窗口的最小尺寸大小
 */
declare const ipcWindowSetMinimumSize: {
    readonly channel: "IpcWindow/setMinimumSize";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        width: number;
        height: number;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 设置窗口的当前尺寸
 */
declare const ipcWindowSetSize: {
    readonly channel: "IpcWindow/setSize";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        width: number;
        height: number;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 重置窗口为制定大小, 用于记忆化窗口尺寸
 */
declare const ipcWindowResetCustomSize: {
    readonly channel: "IpcWindow/resetCustomSize";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        type: 'mainWindow';
    }) => Promise<boolean>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 设置窗口的位置
 */
declare const ipcWindowSetPosition: {
    readonly channel: "IpcWindow/setPosition";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        x: 'center' | 'left' | 'right' | number;
        y: 'center' | 'top' | 'bottom' | number;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * TODO: 需要改进
 */
declare const ipcOpenWindow: {
    readonly channel: "IpcWindow/openWindow";
    readonly action: (_: WindowService, options: {
        windowKey?: string;
        subUrl: string;
    }, browserWindowOptions: Partial<BrowserWindowConstructorOptions>) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 关闭窗口
 */
declare const ipcWindowClose: {
    readonly channel: "IpcWindow/closeWindow";
    readonly action: (windowService: WindowService, options?: {
        windowKey?: string;
        id?: number;
        /**
         * 遮掩的。为 true, 那么窗口不会正常地销毁, 而只是隐藏掉
         */
        fictitious?: boolean;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 显示窗口, 如果窗口存在, 并且是隐藏地情况下
 */
declare const ipcWindowShow: {
    readonly channel: "IpcWindow/showWindow";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        show: boolean;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * TODO:
 */
declare interface WindowProperties {
    width: number;
    height: number;
    x: number;
    y: number;
}
/**
 * TODO: 需要改进, 理想作用是通过一个 ipc 设置多个 window 属性
 */
declare const ipcWindowProperties: {
    readonly channel: "IpcWindow/properties";
    readonly action: (windowService: WindowService, selectedOptions: {
        windowKey?: string;
    }, properties: Partial<WindowProperties>) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 获取展示窗口的尺寸
 */
declare const ipcWindowWorkAreaSize: {
    readonly channel: "IpcWindow/workAreaSize";
    readonly action: () => Promise<{
        readonly width: number;
        readonly height: number;
    }>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

type actions_WindowProperties = WindowProperties;
declare const actions_ipcAppStoreClear: typeof ipcAppStoreClear;
declare const actions_ipcAppStoreDelete: typeof ipcAppStoreDelete;
declare const actions_ipcAppStoreGet: typeof ipcAppStoreGet;
declare const actions_ipcAppStoreGetStore: typeof ipcAppStoreGetStore;
declare const actions_ipcAppStoreHas: typeof ipcAppStoreHas;
declare const actions_ipcAppStoreReset: typeof ipcAppStoreReset;
declare const actions_ipcAppStoreSet: typeof ipcAppStoreSet;
declare const actions_ipcForwardDataTakeIn: typeof ipcForwardDataTakeIn;
declare const actions_ipcForwardDataTakeOut: typeof ipcForwardDataTakeOut;
declare const actions_ipcOnBroadcast: typeof ipcOnBroadcast;
declare const actions_ipcOpenDevTool: typeof ipcOpenDevTool;
declare const actions_ipcOpenWindow: typeof ipcOpenWindow;
declare const actions_ipcWindowClose: typeof ipcWindowClose;
declare const actions_ipcWindowMaximize: typeof ipcWindowMaximize;
declare const actions_ipcWindowMinimize: typeof ipcWindowMinimize;
declare const actions_ipcWindowProperties: typeof ipcWindowProperties;
declare const actions_ipcWindowReductionSize: typeof ipcWindowReductionSize;
declare const actions_ipcWindowRelaunch: typeof ipcWindowRelaunch;
declare const actions_ipcWindowResetCustomSize: typeof ipcWindowResetCustomSize;
declare const actions_ipcWindowResizeAble: typeof ipcWindowResizeAble;
declare const actions_ipcWindowSetMinimumSize: typeof ipcWindowSetMinimumSize;
declare const actions_ipcWindowSetPosition: typeof ipcWindowSetPosition;
declare const actions_ipcWindowSetSize: typeof ipcWindowSetSize;
declare const actions_ipcWindowShow: typeof ipcWindowShow;
declare const actions_ipcWindowWorkAreaSize: typeof ipcWindowWorkAreaSize;
declare namespace actions {
  export { type actions_WindowProperties as WindowProperties, actions_ipcAppStoreClear as ipcAppStoreClear, actions_ipcAppStoreDelete as ipcAppStoreDelete, actions_ipcAppStoreGet as ipcAppStoreGet, actions_ipcAppStoreGetStore as ipcAppStoreGetStore, actions_ipcAppStoreHas as ipcAppStoreHas, actions_ipcAppStoreReset as ipcAppStoreReset, actions_ipcAppStoreSet as ipcAppStoreSet, actions_ipcForwardDataTakeIn as ipcForwardDataTakeIn, actions_ipcForwardDataTakeOut as ipcForwardDataTakeOut, actions_ipcOnBroadcast as ipcOnBroadcast, actions_ipcOpenDevTool as ipcOpenDevTool, actions_ipcOpenWindow as ipcOpenWindow, actions_ipcWindowClose as ipcWindowClose, actions_ipcWindowMaximize as ipcWindowMaximize, actions_ipcWindowMinimize as ipcWindowMinimize, actions_ipcWindowProperties as ipcWindowProperties, actions_ipcWindowReductionSize as ipcWindowReductionSize, actions_ipcWindowRelaunch as ipcWindowRelaunch, actions_ipcWindowResetCustomSize as ipcWindowResetCustomSize, actions_ipcWindowResizeAble as ipcWindowResizeAble, actions_ipcWindowSetMinimumSize as ipcWindowSetMinimumSize, actions_ipcWindowSetPosition as ipcWindowSetPosition, actions_ipcWindowSetSize as ipcWindowSetSize, actions_ipcWindowShow as ipcWindowShow, actions_ipcWindowWorkAreaSize as ipcWindowWorkAreaSize };
}

/**
 * ==========================================
 * preload 需要的类型声明
 * ==========================================
 */

/**
 * 将一个值转换为 Promise 值
 */
type PromiseWithValue<Value> = Value extends Promise<any> ? Value : Promise<Value>;
/**
 * 获取所有的 ipcAction
 */
type AllAction = {
    readonly [Key in keyof typeof actions]: (typeof actions)[Key] extends IpcActionType<IpcActionEvent> ? (typeof actions)[Key] : never;
};
/**
 * 转换 ipcAction, 获取 key -> handler 的类型.
 * 传递 IpcActionEventType 以获得 HandleHandlers 或者 OnHandlers
 */
type AllHandlers<IpcActionEventType extends IpcActionEvent> = {
    readonly [Key in keyof AllAction as AllAction[Key]['channel']]: AllAction[Key]['actionType'] extends IpcActionEventType ? (...args: CutHead<Parameters<AllAction[Key]['action']>>) => RPromiseLike<Awaited<PromiseWithValue<ReturnType<AllAction[Key]['action']>>>, Exception<ExceptionErrorMsgData>> : never;
};
type HandleHandlers = ExtractNever<AllHandlers<IpcActionEvent.Handle>>;
type OnHandlers = ExtractNever<AllHandlers<IpcActionEvent.On>>;
/**
 * 原本的 IcpRenderer 返回类型为 Promise<any>, 所需需要自己重新修改一下返回值
 * 需要先 Omit 排除, 然后再编写自己的类型, 否则会覆盖失败
 */
type IpcRenderer = Omit<IpcRenderer$1, 'invoke' | 'send' | 'sendSync'> & {
    /**
     * 向主进程发送事件, 并等待回复
     */
    invoke<T extends keyof HandleHandlers>(channel: T, ...args: Parameters<HandleHandlers[T]>): ReturnType<HandleHandlers[T]>;
    send<T extends keyof OnHandlers>(channel: T, ...args: Parameters<OnHandlers[T]>): void;
    sendSync<T extends keyof OnHandlers>(channel: T, ...args: Parameters<OnHandlers[T]>): void;
};
/**
 * 重新创建 ElectronAPI, 来覆盖 window.electron 的类型
 */
interface ElectronAPI {
    readonly ipcRenderer: IpcRenderer;
    readonly webFrame: WebFrame;
    readonly process: NodeProcess;
}

type PrintMessagesTypeArr = Parameters<typeof Ansi.print>;
declare class PrinterService {
    private static readonly printer;
    /**
     * 格式化文本
     */
    format(...messages: PrintMessagesTypeArr): string;
    /**
     * print
     */
    print(...messages: PrintMessagesTypeArr): void;
    /**
     * 日志信息
     */
    printInfo(...messages: PrintMessagesTypeArr): void;
    /**
     * 错误信息
     */
    printError(...messages: PrintMessagesTypeArr): void;
    /**
     * 警告信息
     */
    printWarn(...messages: PrintMessagesTypeArr): void;
    /**
     * 成功信息
     */
    printSuccess(...messages: PrintMessagesTypeArr): void;
    /**
     * 格式化文本
     */
    static format(...messages: PrintMessagesTypeArr): string;
    /**
     * 日志信息静态打印
     */
    static printInfo(...messages: PrintMessagesTypeArr): void;
    /**
     * 警告信息静态打印
     */
    static printWarn(...messages: PrintMessagesTypeArr): void;
    /**
     * 成功信息静态打印
     */
    static printSuccess(...messages: PrintMessagesTypeArr): void;
    /**
     * 错误信息静态打印
     */
    static printError(...messages: PrintMessagesTypeArr): void;
}

/**
 * renderer 线程打印器
 */
declare const printer: PrinterService;
/**
 * renderer 线程打印器类型
 */
interface PrinterServer {
    /**
     * 打印日志
     */
    readonly print: typeof printer.print;
    /**
     * 打印日志
     */
    readonly printInfo: typeof printer.printInfo;
    /**
     * 打印一条警告信息
     */
    readonly printWarn: typeof printer.printWarn;
    /**
     * 打印一条错误信息
     */
    readonly printError: typeof printer.printError;
    /**
     * 打印一条成功信息
     */
    readonly printSuccess: typeof printer.printSuccess;
}

/**
 * 应用的 store 类型
 */
interface AppStoreType {
    /**
     * 获取所有的 store
     */
    readonly getStore: () => ReturnType<HandleHandlers['IpcStore/appStore/getStore']>;
    /**
     * 获取 store 的值
     */
    readonly get: <Key extends keyof AppStoreType$1>(key: Key, defaultValue?: AppStoreType$1[Key]) => ReturnType<HandleHandlers['IpcStore/appStore/get']>;
    /**
     * 设置 store 的值
     */
    readonly set: <Key extends keyof AppStoreType$1>(key: Key, value: AppStoreType$1[Key]) => ReturnType<HandleHandlers['IpcStore/appStore/set']>;
    /**
     * 删除 store 的值
     */
    readonly delete: <Key extends keyof AppStoreType$1>(key: Key) => ReturnType<HandleHandlers['IpcStore/appStore/delete']>;
    /**
     * 判断 store 是否存在
     */
    readonly has: <Key extends keyof AppStoreType$1>(key: Key) => ReturnType<HandleHandlers['IpcStore/appStore/has']>;
    /**
     * 重置 store 的值
     */
    readonly reset: <Key extends keyof AppStoreType$1>(...keys: Key[]) => ReturnType<HandleHandlers['IpcStore/appStore/reset']>;
    /**
     * 清空 store
     */
    readonly clear: () => ReturnType<HandleHandlers['IpcStore/appStore/clear']>;
}

/**
 * 打开页面
 * @return
 */
declare const openPage: (options: {
    windowKey?: string;
    subUrl: string;
}, browserWindowOptions: Partial<Electron.BrowserWindowConstructorOptions>) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 刷新页面
 * @returns
 */
declare const windowReload: () => void;
/**
 * 是否展示页面
 * @returns
 */
declare const windowShow: (options: {
    id?: number;
    windowKey?: string;
    show: boolean;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 窗口是否可以调整大小
 */
declare const windowResizeAble: (options?: {
    id?: number;
    windowKey?: string;
    resizeAble: boolean;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 设置窗口的大小
 * @returns
 */
declare const windowSetSize: (options: {
    id?: number;
    windowKey?: string;
    width: number;
    height: number;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 设置窗口的位置
 * @returns
 */
declare const windowSetPosition: (options: {
    id?: number;
    windowKey?: string;
    x: number | "left" | "right" | "center";
    y: number | "top" | "center" | "bottom";
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 重启应用
 * @returns
 */
declare const windowRelaunch: (options?: {
    id?: number;
    windowKey?: string;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 恢复窗口为定制化大小
 * @returns
 */
declare const windowResetCustomSize: (options: {
    id?: number;
    windowKey?: string;
    type: "mainWindow";
}) => _suey_pkg_utils.RPromiseLike<boolean, Exception<ExceptionErrorMsgData>>;
/**
 * 最大化窗口
 * @returns
 */
declare const windowMax: (options?: {
    /**
     * 恢复窗口为定制化大小
     * @returns
     */
    id?: number;
    windowKey?: string;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 最小化窗口
 * @returns
 */
declare const windowMin: (options?: {
    id?: number;
    windowKey?: string;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 还原窗口
 * @returns
 */
declare const windowReduction: (options?: {
    id?: number;
    windowKey?: string;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 关闭窗口
 * @returns
 */
declare const windowClose: (options?: {
    windowKey?: string;
    id?: number;
    fictitious?: boolean;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 打开窗口开发者工具
 * @param args
 * @returns
 */
declare const windowDevtool: (status: boolean, options?: Electron.OpenDevToolsOptions) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
/**
 * 全屏
 * @param el
 * @returns
 */
declare const windowEnableFullScreen: (el?: HTMLElement) => Promise<void>;
/**
 * 退出全屏
 * @returns
 */
declare const windowExitFullScreen: () => Promise<void>;
declare const windowWorkAreaSize: () => _suey_pkg_utils.RPromiseLike<{
    readonly width: number;
    readonly height: number;
}, Exception<ExceptionErrorMsgData>>;
/**
 * 打开一个子窗口
 * @returns
 */
declare const windowOpen: (options: {
    windowKey?: string;
    subUrl: string;
}, browserWindowOptions: Partial<Electron.BrowserWindowConstructorOptions>) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowForwardDataTakeIn: (key: string, data: any) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowForWardDataTakeOut: (key: string, options?: DepositService.TakeOutOptions) => _suey_pkg_utils.RPromiseLike<any, Exception<ExceptionErrorMsgData>>;

declare const ipcActions_openPage: typeof openPage;
declare const ipcActions_windowClose: typeof windowClose;
declare const ipcActions_windowDevtool: typeof windowDevtool;
declare const ipcActions_windowEnableFullScreen: typeof windowEnableFullScreen;
declare const ipcActions_windowExitFullScreen: typeof windowExitFullScreen;
declare const ipcActions_windowForWardDataTakeOut: typeof windowForWardDataTakeOut;
declare const ipcActions_windowForwardDataTakeIn: typeof windowForwardDataTakeIn;
declare const ipcActions_windowMax: typeof windowMax;
declare const ipcActions_windowMin: typeof windowMin;
declare const ipcActions_windowOpen: typeof windowOpen;
declare const ipcActions_windowReduction: typeof windowReduction;
declare const ipcActions_windowRelaunch: typeof windowRelaunch;
declare const ipcActions_windowReload: typeof windowReload;
declare const ipcActions_windowResetCustomSize: typeof windowResetCustomSize;
declare const ipcActions_windowResizeAble: typeof windowResizeAble;
declare const ipcActions_windowSetPosition: typeof windowSetPosition;
declare const ipcActions_windowSetSize: typeof windowSetSize;
declare const ipcActions_windowShow: typeof windowShow;
declare const ipcActions_windowWorkAreaSize: typeof windowWorkAreaSize;
declare namespace ipcActions {
  export { ipcActions_openPage as openPage, ipcActions_windowClose as windowClose, ipcActions_windowDevtool as windowDevtool, ipcActions_windowEnableFullScreen as windowEnableFullScreen, ipcActions_windowExitFullScreen as windowExitFullScreen, ipcActions_windowForWardDataTakeOut as windowForWardDataTakeOut, ipcActions_windowForwardDataTakeIn as windowForwardDataTakeIn, ipcActions_windowMax as windowMax, ipcActions_windowMin as windowMin, ipcActions_windowOpen as windowOpen, ipcActions_windowReduction as windowReduction, ipcActions_windowRelaunch as windowRelaunch, ipcActions_windowReload as windowReload, ipcActions_windowResetCustomSize as windowResetCustomSize, ipcActions_windowResizeAble as windowResizeAble, ipcActions_windowSetPosition as windowSetPosition, ipcActions_windowSetSize as windowSetSize, ipcActions_windowShow as windowShow, ipcActions_windowWorkAreaSize as windowWorkAreaSize };
}

type IpcActions = typeof ipcActions;
/**
 * 实际上是可以直接 autoExpose 暴露 api, 但是 Web 项目需要扩展类型才能够拥有很好的 TS 支持
 */
interface ExposeApi {
    readonly electron: ElectronAPI;
    /**
     * 打印器对象
     */
    readonly printer: PrinterServer;
    /**
     * IPC 事件
     */
    readonly ipcActions: IpcActions;
    /**
     * 应用的 store
     */
    readonly stores: {
        readonly appStore: AppStoreType;
    };
}

// Sandbox
declare global {
  /**
   * 扩展 Window 含有 Electron Api 声明规则
   *
   * ```tsx
   * window.electron.ipcRenderer.invoke('xxx');
   * ```
   */
  interface Window extends ExposeApi { }

  /**
   * 注入的 electron 对象
   */
  const electron: ElectronAPI;

  /**
   * 注入的 printer 打印日志对象
   */
  const printer: PrinterServer;

  /**
   * 注入的 ipc 对象
   */
  const ipcActions: IpcActions;
}
