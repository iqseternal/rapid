import * as _suey_pkg_utils from '@suey/pkg-utils';
import { AxiosError, RequestConfig, ApiPromiseResultTypeBuilder, ExtractNever, CutHead, RPromiseLike, Ansi, AxiosResponse, apiGet, apiPost, apiPut, apiDelete, request, createApiRequest, createRequest, aesEncrypt, aesDecrypt, aesEncryptAlgorithm, aesDecryptAlgorithm, AES_DEFAULT_KEY, jose, cryptoTs, jsr, toNil, toNils, toWaitPromise } from '@suey/pkg-utils';
import * as react from 'react';
import { HTMLAttributes, ReactNode, Component, FC, ForwardRefExoticComponent, LazyExoticComponent, MemoExoticComponent, ReactElement, ComponentType } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as antd from 'antd';
import { TooltipProps, PopoverProps } from 'antd';
import * as iconInstance from '@ant-design/icons';
import iconInstance__default from '@ant-design/icons';
import * as react_i18next from 'react-i18next';
import i18n from 'i18next';
import * as zustand_middleware from 'zustand/middleware';
import * as zustand from 'zustand';
import * as moment from 'moment';
import * as react_transition_group from 'react-transition-group';
import * as _react_spring_web from '@react-spring/web';
import * as _meta2d_core from '@meta2d/core';
import { IpcRenderer as IpcRenderer$1, WebFrame, NodeProcess } from '@electron-toolkit/preload';
import { IpcMainInvokeEvent, IpcMainEvent, BrowserWindow, BrowserWindowConstructorOptions, OpenDevToolsOptions } from 'electron';

/**
 * 请求 hConfig 配置
 */
interface RApiHConfig {
    /**
     * 默认都需要认证
     * @default true
     */
    readonly needAuth?: boolean;
}
/**
 * 基本响应结构体的内容
 */
interface RApiBasicResponse {
    /**
     * 状态码
     */
    readonly code: 0 | number;
    /**
     * 响应描述
     */
    readonly message: string;
    /**
     * 返回数据, 具有 data 定义
     */
    readonly data: any;
    /**
     * 更多的响应体修饰
     */
    readonly more?: {
        /**
         * 响应数据是否被压缩了
         */
        readonly pako?: boolean;
    };
}
interface RApiSuccessResponse extends RApiBasicResponse {
}
interface RApiFailResponse extends RApiBasicResponse {
    /**
     * 更多的错误信息
     */
    readonly INNER: {
        /**
         * 栈信息
         */
        readonly stack: string;
        readonly name: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['name'];
        readonly config: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['config'];
        readonly request: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['request'];
        readonly response: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['response'];
    };
}
declare const rApiGet: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rApiPost: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rRequest: _suey_pkg_utils.RequestFunction<RApiHConfig, RApiSuccessResponse, RApiFailResponse, "data">;
declare const rCreateApi: (method: _suey_pkg_utils.Method) => <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rApiPut: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rApiDelete: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rApiPatch: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;

declare const NotHasAnyData: react.MemoExoticComponent<() => react_jsx_runtime.JSX.Element>;

declare const Wrong: react.MemoExoticComponent<() => react_jsx_runtime.JSX.Element>;

declare const REmptyInstance: {};
type EmptyType = (typeof REmptyInstance) & {
    readonly NotHasAnyData: typeof NotHasAnyData;
    readonly Wrong: typeof Wrong;
};
declare const REmpty: EmptyType;

type IconInstance = typeof iconInstance__default;
type IconProps = Parameters<IconInstance>[0];
/**
 * 使用 ant-design 的图标库
 * @see https://ant.design/components/icon-cn
 */
type IconRealKey = Exclude<keyof typeof iconInstance, 'createFromIconfontCN' | 'default' | 'IconProvider' | 'setTwoToneColor' | 'getTwoToneColor'>;
/**
 * 自定义解析的图标库,
 * TODO: 如果添加了自定义解析图标库, 可将 string 替换为具体的类型定义
 */
type IconCustomKey = `icon-${string}`;
type IconKey = IconRealKey | IconCustomKey;
interface IconFontProps extends IconProps {
    /**
     * 图标
     */
    readonly icon: IconKey;
}
/**
 * antd icon font
 * @param props
 * @returns
 */
declare const IconFont: react.MemoExoticComponent<(props: IconFontProps) => react_jsx_runtime.JSX.Element>;

interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * 内部的 className
     */
    readonly innerClassName?: string;
    /**
     * 当前控件是否具有 hover 背景特性
     */
    readonly hasHoverStyle?: boolean;
    /**
     * 当前控件展示的图标元素
     */
    readonly icon?: IconKey;
    /**
     * 当前控件是否处于 loading 状态
     */
    readonly loading?: boolean;
    /**
     * 处于 loading 状态时自定义展示 loading 元素
     */
    readonly loadingContent?: ReactNode;
    /**
     * @default 'base'
     */
    readonly size?: 'base' | 'small' | 'large';
    /**
     * 控件 Hover 之后展示的提示文本
     */
    readonly tipText?: string;
    /**
     * 展示提示文本的 tooltip 的 attrs
     */
    readonly tipAttrs?: TooltipProps;
    /**
     * 是否禁用当前控件
     */
    readonly disabled?: boolean;
}
/**
 * 展示一个控件, 控件: 图标, 附带功能提示信息和事件
 */
declare const Widget: react.MemoExoticComponent<react.ForwardRefExoticComponent<WidgetProps & react.RefAttributes<HTMLDivElement>>>;

/**
 * 合并多个 className 类名,
 *
 * @param args
 * @see https://www.npmjs.com/package/classnames
 *
 * @example
 * <div
 *    className={
 *      classnames(
 *        类名1,
 *        类名2,
 *        {
 *          [类名3]: 布尔值,
 *          [类名4]: 布尔值
 *        },
 *        .....
 *       )
 *    }
 * ></div>
 */
declare const classnames: (...args: (string | undefined | boolean | null | number | Record<string, any | boolean | undefined>)[]) => string;
/**
 * 判断一个对象是否是一个被 lazy 包裹的 FC 组件
 * @param target
 * @returns
 */
declare const isReactLazyFC: <Target extends LazyExoticComponent<FC<any>>>(target: any) => target is Target;
/**
 * 判断一个对象是否是一个 forwardRef FC
 * @param target
 * @returns
 */
declare const isReactForwardFC: <Target extends ForwardRefExoticComponent<any>>(target: any) => target is Target;
/**
 * 判断一个对象是否是一个 memo FC
 * @param target
 * @returns
 */
declare const isReactMemoFC: <Target extends MemoExoticComponent<any>>(target: any) => target is Target;
/**
 * 判断是否是 FC
 */
declare const isReactFC: <Target extends FC<any>>(target: any) => target is Target;
/**
 * 判断是否是一个 类组件
 * @param target
 * @returns
 */
declare const isReactClassComponent: <Target extends Component<any, {}, any>>(target: any) => target is Target;
/**
 * 判断一个对象是否可能是 一个可用的 React 组件
 * @param target
 * @returns
 */
declare const isReactComponent: <Target extends Component<any, {}, any> | FC<any> | ForwardRefExoticComponent<any> | LazyExoticComponent<FC<any>>>(target: any) => target is Target;

/**
 * Ellipsis props
 */
interface EllipsisProps {
    readonly children?: ReactNode;
    readonly className?: string;
    /**
     * 如果传递的 children 展示为空时, 展示的默认字符串
     */
    readonly defaultContent?: string;
    /**
     * 如果 children 字符串的内容超过了父容器, 那么就因该显示省略号, 同时 hover 应该展示完全内容
     *
     * 这个函数就是当超出父容器之后, 应该如何展示当前元素. 一般情况下：
     *
     * 使用 Tooltip 或者 Popover 来包裹 children 即可.
     *
     * 默认是: Tooltip
     */
    readonly overlayRender?: (children: ReactNode) => ReactElement;
    /**
     * tooltip 的 attrs, 默认为 tooltip
     */
    readonly tipAttrs?: TooltipProps;
}
/**
 * 自动检测内容是否溢出, 如果溢出展示 Tooltip
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis>
 *     hello world ....................
 *   </Ellipsis>
 * </div>
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis.Tooltip>
 *     hello world ....................
 *   </Ellipsis.Tooltip>
 * </div>
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis.Popover>
 *     hello world ....................
 *   </Ellipsis.Popover>
 * </div>
 */
declare const EllipsisBase: react.MemoExoticComponent<(props: EllipsisProps) => react_jsx_runtime.JSX.Element>;

/**
 * Ellipsis 以 tooltip 为展示容器的 props
 *
 */
interface EllipsisTooltipProps extends Omit<EllipsisProps, 'overlayRender'> {
    /**
     * tooltip 的 attrs
     */
    readonly tipAttrs?: TooltipProps;
}
/**
 * 自动检测内容是否溢出, 如果溢出展示 Tooltip
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis.Tooltip>
 *     hello world ....................
 *   </Ellipsis.Tooltip>
 * </div>
 */
declare const EllipsisTooltip: react.MemoExoticComponent<(props: EllipsisTooltipProps) => react_jsx_runtime.JSX.Element>;

/**
 * Ellipsis 以 popover 为展示容器的 props
 */
interface EllipsisPopoverProps extends Omit<EllipsisProps, 'overlayRender'> {
    /**
     * popover 的 attrs
     */
    readonly tipAttrs?: PopoverProps;
}
/**
 * 自动检测内容是否溢出, 如果溢出展示 Popover
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis.Popover>
 *     hello world ....................
 *   </Ellipsis.Popover>
 * </div>
 */
declare const EllipsisPopover: react.MemoExoticComponent<(props: EllipsisPopoverProps) => react_jsx_runtime.JSX.Element>;

type EllipsisType = typeof EllipsisBase & {
    readonly Tooltip: typeof EllipsisTooltip;
    readonly Popover: typeof EllipsisPopover;
};
declare const Ellipsis: EllipsisType;

/**
 * 时间戳
 */
declare enum Timestamp {
    /**
     * 时间戳单位
     */
    Millisecond = 1,
    /**
     * 1 秒
     */
    Second = 1000,
    /**
     * 1 分钟
     */
    Minute = 60000,
    HalfMinute = 30000,
    /**
     * 1 小时
     */
    Hour = 3600000,
    HalfHour = 1800000,
    /**
     * 1 天
     */
    Day = 86400000,
    HalfDay = 43200000,
    /**
     * 1 周
     */
    Week = 604800000,
    HalfWeek = 302400000,
    /**
     * 1 月 - 30 天
     */
    Month = 2592000000,
    HalfMonth = 1296000000,
    Month28 = 2419200000,
    Month30 = 2592000000,
    Month31 = 2678400000,
    /**
     * 1 年 - 365 天
     */
    Year = 31536000000,
    HalfYear = 15768000000,
    /**
     * 1 年 - 366 天
     */
    LeapYear = 31622400000
}

/**
 * Object.defineProperty, 向对象注入变量, 默认不可修改不可配置不可删除不可枚举
 * @description 为什么需要它？当对象生命为 readonly, 但是需要初始化赋值
 */
declare function injectReadonlyVariable<T extends {}, Key extends keyof T, Value>(target: T, propertyKey: Key, value: Value, attributes?: PropertyDescriptor & ThisType<any>): void;

type EmitterListener<T> = (data: T) => void | Promise<void>;
/**
 * 停止监听事件的函数回调
 */
type EmitterListenerOffCallback = () => void;
/**
 * 总线事件管理
 */
declare abstract class EmitterManager<Entries extends Record<string | symbol, any>> {
    private readonly effectManager;
    constructor();
    /**
     * 订阅
     * @returns
     */
    protected subscribe<K extends keyof Entries>(busName: K, listener: EmitterListener<Entries[K]>, options?: {
        once?: boolean;
    }): EmitterListenerOffCallback;
    /**
     * 取消订阅
     * @returns
     */
    protected unsubscribe<K extends keyof Entries>(busName: K, listener: EmitterListener<Entries[K]>): void;
    /**
     * 通知处理事件
     */
    protected notice<K extends keyof Entries>(busName: K, data?: Entries[K]): Promise<void>;
    /**
     * 清空所有事件
     */
    protected clear(): void;
}

declare class Emitter<Entries extends Record<string | symbol, any>> extends EmitterManager<Entries> {
    /**
     * 异步发射一个事件
     */
    emit<K extends keyof Entries>(busName: K, data?: Entries[K]): Promise<void>;
    /**
     * 监听一个事件
     */
    on<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>, options?: {
        once?: boolean;
    }): EmitterListenerOffCallback;
    /**
     * 监听一个事件（只触发一次）
     */
    once<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>): EmitterListenerOffCallback;
    /**
     * 移除监听某个事件
     */
    off<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>): void;
    /**
     * 移除所有监听
     */
    clear(): void;
}

type InvokerKey = '*' | string | symbol | number;
type InvokerHandler = (...args: any[]) => any;
type ExtractParameters<T> = T extends (...args: infer P) => any ? P : never;
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type ExtractInvokerHandler<T extends (...args: any[]) => any> = (...args: ExtractParameters<T>) => ExtractReturnType<T>;
/**
 * 总线事件管理 (等待函数执行获得返回结果
 */
declare abstract class InvokerManager<Entries extends Record<InvokerKey, InvokerHandler>> {
    private readonly effectManager;
    /**
     * 注册一个事件的执行函数
     */
    protected handle<K extends keyof Entries>(key: K, handler: ExtractInvokerHandler<Entries[K]>): void;
    /**
     * 发送事件, 并获取执行的返回结果
     */
    protected invoke<K extends keyof Entries>(key: K, ...args: ExtractParameters<Entries[K]>): ExtractReturnType<Entries[K]>;
}

/**
 * 总线事件管理 (等待函数执行获得返回结果
 */
declare class Invoker<Entries extends Record<InvokerKey, InvokerHandler>> extends InvokerManager<Entries> {
    /**
     * 注册一个事件的执行函数
     */
    handle<K extends keyof Entries>(key: K, handler: ExtractInvokerHandler<Entries[K]>): void;
    /**
     * 发送事件, 并获取执行的返回结果
     */
    invoke<K extends keyof Entries>(key: K, ...args: ExtractParameters<Entries[K]>): ExtractReturnType<Entries[K]>;
}

/**
 * 将一个对象浅层劫持, 并在 调用 setter 时, 执行特定的回调函数
 */
declare function createShallowProxy<T extends {}>(target: T, setterCallback?: () => void): T;

/**
 * 对接扩展心跳机制地凭证
 */
interface UseExtensionHeartbeatVoucher {
    readonly extension_id: number;
    readonly extension_uuid: string;
    /**
     * 扩展内容 hash 值
     */
    readonly script_hash: string;
}

interface UserStore {
    userinfo?: {
        roles?: string[];
        id?: number;
        username?: string;
    };
    accessToken: string;
}
declare const useUserStore: zustand.UseBoundStore<Omit<Omit<zustand.StoreApi<UserStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<UserStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: UserStore) => void) => () => void;
        onFinishHydration: (fn: (state: UserStore) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<UserStore, unknown>>;
    };
}, "setState"> & {
    setState(nextStateOrUpdater: UserStore | Partial<UserStore> | ((state: {
        userinfo?: {
            roles?: string[];
            id?: number;
            username?: string;
        };
        accessToken: string;
    }) => void), shouldReplace?: boolean): void;
}>;

interface DocStore {
    isWork: boolean;
}
declare const useDocStore: zustand.UseBoundStore<Omit<Omit<zustand.StoreApi<DocStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<DocStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: DocStore) => void) => () => void;
        onFinishHydration: (fn: (state: DocStore) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<DocStore, unknown>>;
    };
}, "setState"> & {
    setState(nextStateOrUpdater: DocStore | Partial<DocStore> | ((state: {
        isWork: boolean;
    }) => void), shouldReplace?: boolean): void;
}>;

declare const enum SidebarStatus {
    None = "none",
    Left = "left",
    Right = "right"
}
interface ThemeStore {
    layout: {
        mainSidebar: SidebarStatus;
    };
}
declare const useThemeStore: zustand.UseBoundStore<Omit<Omit<zustand.StoreApi<ThemeStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<ThemeStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ThemeStore) => void) => () => void;
        onFinishHydration: (fn: (state: ThemeStore) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<ThemeStore, unknown>>;
    };
}, "setState"> & {
    setState(nextStateOrUpdater: ThemeStore | Partial<ThemeStore> | ((state: {
        layout: {
            mainSidebar: SidebarStatus;
        };
    }) => void), shouldReplace?: boolean): void;
}>;

type ExtensionName = string | symbol;
interface Extension<Context = any> {
    /**
     * 插件的唯一标识 name
     */
    readonly name: ExtensionName;
    /**
     * 插件版本
     */
    readonly version: string | number;
    /**
     * 插件数据, 由项目自主决定插件附带携带的数据
     */
    meta?: any;
    /**
     * 插件被激活, 被使用的状态
     */
    readonly onActivated?: (this: this, context?: Context) => (void | Promise<void>);
    /**
     * 插件被去活, 被禁用的状态
     */
    readonly onDeactivated?: (this: this, context?: Context) => (void | Promise<void>);
}
type ExtractExtensionContext<Ext extends Extension> = Parameters<Exclude<Ext['onActivated'], undefined>>[0];

/**
 * 监听 store 的触发回调函数
 */
type InnerStoreListener = () => void;
/**
 * 销毁 store 的触发回调函数
 */
type InnerStoreDestroyListener = () => void;
/**
 * 内部 store manager
 */
declare abstract class InnerZustandStoreManager {
    /**
     * zustand
     */
    private readonly store;
    private readonly listeners;
    private readonly unsubscribe;
    /**
     * 更新当前的 store, 会导致状态库的组件更新触发
     */
    protected updateStore(): void;
    /**
     * store hook, 只要元数据发生改变, 就会触发 zustand 的状态更新
     */
    protected useStoreValue(): {};
    /**
     * 添加订阅函数
     */
    protected subscribe(listener: InnerStoreListener): InnerStoreDestroyListener;
    protected destroy(): void;
}

/**
 * 定义一个插件, 这里所抽象得插件只是一个携带数据得对象、以及具有特殊时机执行得函数
 *
 * 1. 插件件可以有自己的生命周期函数, 例如 onActivated, onDeactivated
 * 2. 插件可以调动 metadataManager 从而实现插件化开发
 * 3. 调动 emitter 实现事件触发
 */
declare class ExtensionManager<Ext extends Extension> extends InnerZustandStoreManager {
    private readonly extNameMapStore;
    /**
     * Define extension, 定义插件, 那么插件会被存储到 Map 中.
     */
    defineExtension<DExt extends Ext>(define: DExt): DExt;
    /**
     * 判断一个对象是否是一个 扩展对象
     */
    isExtension<DExt extends Ext>(extension: DExt | any): extension is DExt;
    /**
     * 判断是否含有当前扩展：即是否已经注册
     */
    hasExtension(extensionName: ExtensionName): boolean;
    /**
     * 获取一个扩展
     */
    getExtension(extensionName: ExtensionName): Ext | null;
    /**
     * 注册一个扩展
     */
    registerExtension<DExt extends Ext>(extension: DExt): void;
    /**
     * Activated extension
     */
    activatedExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context): Promise<void>;
    /**
     * 去活某个插件
     */
    deactivatedExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context): Promise<void>;
    /**
     * 删除扩展
     */
    delExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context): Promise<void>;
    /**
     * 获取扩展列表
     */
    useExtensionsList(): readonly [Ext[]];
    /**
     * 获得所有的插件
     */
    getExtensions(): readonly Ext[];
}

type IsNever<T, SuccessReturnType, FailReturnType> = T extends never ? SuccessReturnType : FailReturnType;
type IsAny<T, SuccessReturnType, FailReturnType> = IsNever<T, 'yes', 'no'> extends 'no' ? FailReturnType : SuccessReturnType;
/**
 * 从数组中提取出元素的类型
 * @example
 * type A = number[];
 * type B = ExtractElInArray<A>; // number
 */
type ExtractElInArray<T> = IsAny<T, never, T extends (infer U)[] ? U : never>;
/**
 * 提取列表的 entries, 在 interface {} 中, 只有值为数组类型 U[], 时会被保留, 否则不在此类型中
 * @example
 * type A = {
 *    name: string;
 *    age: number;
 *    friends: any[];
 * }
 *
 * type B = ExtractVectorEntries<A>; // { friends: any[]; }
 */
type ExtractVectorEntries<Entries> = {
    [Key in keyof Entries as (IsAny<Entries[Key], never, Entries[Key] extends unknown[] ? Key : never>)]: Entries[Key];
};
/**
 * 提取列表的 entries, 在 interface {} 中, 只有值不为数组类型 U[], 时会被保留, 否则不在此类型中
 * @description 与上一个 `ExtractVectorEntries` 相反
 * @example
 * type A = {
 *    name: string;
 *    age: number;
 *    friends: any[];
 * }
 *
 * type B = ExtractSingleEntries<A>; // { name: string;age: number; }
 */
type ExtractSingleEntries<Entries> = {
    [Key in keyof Entries as Entries[Key] extends unknown[] ? never : Key]: Entries[Key];
};
type MetadataAction = 'Define' | 'Remove';
type MetadataType = 'Vector' | 'Single' | 'All';
interface MetadataStoreListenerPayload {
    action: MetadataAction;
    type: MetadataType;
    metadataKey: number | string | symbol;
    metadata: unknown;
}
type MetadataStoreChangeListener = (payload: MetadataStoreListenerPayload) => void;

/**
 * 元数据, 在页面中组件的变化可能相距甚远
 * 进入到某一个页面, 可能其他大组件下的某处地方可能发生元素更改, 那么使用本 store 进行连携
 *
 * 1. 在可能变化的地方获取槽点数据, 可能是字符也有可能是其他的
 *
 * 2. 在特殊时机, 注册槽点数据, 从而响应式自动更新到子孙或者兄弟级甚远的组件进行渲染
 *
 */
declare class MetadataManager<MetadataEntries extends Record<string, any>> extends InnerZustandStoreManager {
    private readonly metadataMap;
    private readonly metadataChangeListeners;
    /**
     * 触发元数据更改监听函数
     */
    protected triggerMetadataChangeListeners(payload: MetadataStoreListenerPayload): void;
    /**
     * 订阅元数据更改
     */
    subscribeMetadataStoreChanged(listener: MetadataStoreChangeListener): () => void;
    /**
     * 定义 store 元数据, 元数据可以是任何东西
     * @example
     * metadata.defineMetadata('example-key', 1);
     * metadata.defineMetadata('example-key', 'a');
     * metadata.defineMetadata('example-key', {});
     * metadata.defineMetadata('example-key', () => { return (<div />) });
     */
    defineMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): void;
    /**
     * 获取定义的元数据
     * @example
     * metadata.getMetadata('example-key');
     */
    getMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): MetadataEntries[MetadataKey] | null;
    /**
     * 删除定义的元数据
     * @example
     * metadata.delMetadata('example-key');
     */
    delMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): void;
    /**
     * 语义化方法, 作用与 defineMetadata 一致. 但是在此基础上排除了数据值类型
     * @description 意为: 定义覆盖式的元数据
     */
    defineMetadataInSingle<MetadataKey extends keyof ExtractSingleEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): void;
    /**
     * 定义多个元数据组合的容器型元数据列表, 顾名思义, 也就是某个元数据的定义是数组时使用, 能够自动从数组中添加单个该元数据, 而不是全部覆盖
     * @example
     * metadata.defineMetadataInVector('example-key', 1);
     * metadata.defineMetadataInVector('example-key', 'a');
     * metadata.defineMetadataInVector('example-key', {});
     * metadata.defineMetadataInVector('example-key', () => { return (<div />) });
     */
    defineMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): void;
    /**
     * 在一组元数据集合列表中删除具体的某一个, 通常与 `defineMetadataInVector` 配套使用
     * @example
     * const data = {};
     * metadata.defineMetadataInVector('example-key', data);
     *
     * metadata.delMetadataInVector('example-key', data);
     */
    delMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): void;
    /**
     * 组件 hook, 观察元数据变化
     * @description 返回数据是注册的元数据, 如果是非 react 组件, 而是普通数据, 所以外部要监听使用变化时应当加入 effect 副作用列表
     * @example
     * const Fc = () => {
     *   const data = metadata.useMetadata('example-key');
     *   useEffect(() => {
     *     // use data
     *     // some code...
     *     return () => {
     *        // clear data use.
     *        // some code...
     *     }
     *   }, [data]);
     *   return (<div />)
     * }
     *
     * @description 使用的元数据也有可能是 react 组件
     * @example
     * const Fc = () => {
     *   const Component = metadata.useMetadata('example-key');
     *
     *   return (
     *    <div>
     *      {Component && (<Component />)}
     *    </div>
     *   )
     * }
     *
     */
    useMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): MetadataEntries[MetadataKey] | null;
    /**
     * 使用最先注册的元数据
     */
    useOldestMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null;
    /**
     * 使用最后一次注册的元数据
     */
    useLatestMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null;
    /**
     * 获取到所有定义的元数据
     */
    useAllMetadata(): Map<string | number | symbol, any>;
    /**
     * 查看是否定义了元数据
     */
    hasMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): boolean;
}

type ThreadHandler = (data: any) => (void | any);
type ExtractThreadHandlerData<Handler extends ThreadHandler> = Parameters<Handler>[0];
declare class Thread<TThreadEntries extends Record<string, ThreadHandler>, SThreadEntries extends Record<string, ThreadHandler> = {}> {
    /**
     * 自身线程事件句柄
     */
    private readonly selfHandlers;
    private readonly isInWebWorker;
    readonly worker?: Worker;
    constructor(worker?: Worker);
    init(): void;
    /**
     * 结束、终止 worker 的运行
     */
    terminate(): void;
    send<Channel extends keyof TThreadEntries>(channel: Channel, data: ExtractThreadHandlerData<TThreadEntries[Channel]>): void;
    /**
     * 添加事件句柄
     */
    handle<Channel extends keyof SThreadEntries>(channel: Channel, handler: SThreadEntries[Channel]): void;
    /**
     * 删除事件句柄
     */
    offHandle<Channel extends keyof SThreadEntries>(channel: Channel): void;
}

/**
 * CSS 变量的名称
 */
type CssVariable = `--rd-${string}`;
/**
 * CSS 变量的值
 */
type CssVariableValue = string;
/**
 * CSS 变量提示标签
 */
type CssVariableTip = string;
/**
 * 单个 CSS 变量的描述性负载
 */
interface CssVariablePayload<Variable extends CssVariable = CssVariable, Value extends CssVariableValue = CssVariableValue, Tip extends CssVariableTip = CssVariableTip> {
    /**
     * 变量名
     */
    readonly variable: Variable;
    /**
     * 变量值
     */
    value: Value;
    /**
     * 提示，说明变量用途
     */
    readonly tip: Tip;
}
/**
 * 从 payload 中提取出变量名
 */
type ExtractCssVariableFromPayload<Payload extends CssVariablePayload> = Payload['variable'];
/**
 * 从 payload 中提取出默认值
 */
type ExtractCssVariableValueFromPayload<Payload extends CssVariablePayload> = Payload['value'];
/**
 * 表示所有 CSS 变量的负载映射
 */
type CssVariablePayloadSheet = Record<string, CssVariablePayload>;
type CssVar<Payload extends CssVariablePayload> = `var(${ExtractCssVariableFromPayload<Payload>}, ${ExtractCssVariableValueFromPayload<Payload>})`;
type CssVars<Sheet extends CssVariablePayloadSheet> = {
    readonly [Key in keyof Sheet]: CssVar<Sheet[Key]>;
};
/**
 * 主题变量的声明表: 例如: { '--rapid-xx-xx': '#FFF' }
 */
type CssVariablesDeclaration<PayloadSheet extends CssVariablePayloadSheet> = {
    [Key in (keyof PayloadSheet) as ExtractCssVariableFromPayload<PayloadSheet[Key]>]: (ExtractCssVariableValueFromPayload<PayloadSheet[Key]> extends number ? number : string);
};
/**
 * 创建一个预设的 Css 样式
 *
 * @example
 * const primaryBackgroundColor = makeRapidCssVarPayload('--rapid-primary-background-color', '#ffffff', '主要背景色'),
 */
declare const makeRdCssVarPayload: <CssVar_1 extends `--rd-${string}`, CssVarValue extends string, CssTip extends string>(cssVariableName: CssVar_1, cssVariableValue: CssVarValue, cssVariableTip: CssTip) => CssVariablePayload<CssVar_1, CssVarValue, CssTip>;
/**
 * 创建一个预设的 Css 样式, 别名：makeRdCssVarPayload
 * @alias makeRdCssVarPayload
 */
declare const mrcvp: <CssVar_1 extends `--rd-${string}`, CssVarValue extends string, CssTip extends string>(cssVariableName: CssVar_1, cssVariableValue: CssVarValue, cssVariableTip: CssTip) => CssVariablePayload<CssVar_1, CssVarValue, CssTip>;
declare class Skin<PayloadSheet extends CssVariablePayloadSheet> {
    private readonly runtimeContext;
    private readonly presetCssVariablesPayloadSheet;
    cssVariablesPayloadSheet: PayloadSheet;
    constructor(cssVariablesPayloadSheet: PayloadSheet);
    /**
     * 克隆 CSS 变量样式
     */
    private cloneCssVariablesPayloadSheet;
    /**
     * 重置当前皮肤的 CSS 变量样式
     */
    resetCssVariablesPayloadSheet(): void;
    /**
     * 生成当前皮肤的 CSS 变量声明
     */
    toCssVariablesDeclaration(): CssVariablesDeclaration<PayloadSheet>;
    /**
     * 将 CssVariablePayload 转换为 CSS 变量字符串
     * @param selector 用于选择 CssVariablePayload 的函数
     */
    toCssVar<Payload extends CssVariablePayload>(selector: (sheet: CssVariablePayloadSheet) => Payload): CssVar<Payload>;
    /**
     * 将当前皮肤的 CSS 变量转换为 CssVars 类型
     * @returns CssVars<PayloadSheet>
     */
    toCssVars(): CssVars<PayloadSheet>;
    /**
     * 安装当前皮肤，将 CSS 变量注入到页面中
     */
    install(): void;
    /**
     * 卸载当前皮肤，移除 CSS 变量样式
     */
    uninstall(): void;
}

/**
 * ==================================================================================
 * 该文件用于创建整个 App 中可以调整的 Css 样式列表
 * ==================================================================================
 */
declare const colorPrimary: CssVariablePayload<"--rd-global-color-primary", "#3498db", "全局主题色">;
declare const colorSuccess: CssVariablePayload<"--rd-global-color-success", "#2ecc71", "全局成功色">;
declare const colorWarning: CssVariablePayload<"--rd-global-color-warning", "#f1c40f", "全局警告色">;
declare const colorError: CssVariablePayload<"--rd-global-color-danger", "#e74c3c", "全局危险色">;
declare const colorNeutral0: CssVariablePayload<"--rd-global-color-neutral-0", "#ffffff", "全局中性色">;
declare const colorNeutral50: CssVariablePayload<"--rd-global-color-neutral-50", "#fafafa", "全局中性色">;
declare const colorNeutral100: CssVariablePayload<"--rd-global-color-neutral-100", "#f5f5f5", "全局中性色">;
declare const colorNeutral200: CssVariablePayload<"--rd-global-color-neutral-200", "#eeeeee", "全局中性色">;
declare const colorNeutral300: CssVariablePayload<"--rd-global-color-neutral-300", "#e0e0e0", "全局中性色">;
declare const colorNeutral400: CssVariablePayload<"--rd-global-color-neutral-400", "#bdbdbd", "全局中性色">;
declare const colorNeutral500: CssVariablePayload<"--rd-global-color-neutral-500", "#9e9e9e", "全局中性色">;
declare const colorNeutral600: CssVariablePayload<"--rd-global-color-neutral-600", "#757575", "全局中性色">;
declare const colorNeutral700: CssVariablePayload<"--rd-global-color-neutral-700", "#616161", "全局中性色">;
declare const colorNeutral800: CssVariablePayload<"--rd-global-color-neutral-800", "#424242", "全局中性色">;
declare const colorNeutral900: CssVariablePayload<"--rd-global-color-neutral-900", "#212121", "全局中性色">;
declare const spacingUnit: CssVariablePayload<"--rd-global-spacing-unit", "2px", "全局间距单位">;
declare const spacingXs: CssVariablePayload<"--rd-global-spacing-xs-unit", "calc(1 * var(--rd-global-spacing-unit))", "全局超小间距">;
declare const spacingSm: CssVariablePayload<"--rd-global-spacing-sm-unit", "calc(2 * var(--rd-global-spacing-unit))", "全局小间距">;
declare const spacingMd: CssVariablePayload<"--rd-global-spacing-md-unit", "calc(4 * var(--rd-global-spacing-unit))", "全局中等间距">;
declare const spacingLg: CssVariablePayload<"--rd-global-spacing-lg-unit", "calc(5 * var(--rd-global-spacing-unit))", "全局大间距">;
declare const spacingXl: CssVariablePayload<"--rd-global-spacing-xl-unit", "calc(6 * var(--rd-global-spacing-unit))", "全局超大间距">;
declare const borderRadiusUnit: CssVariablePayload<"--rd-global-border-radius-unit", "4px", "全局圆角单位">;
declare const borderRadiusXs: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(0.5 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusSm: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(1 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusMd: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(2 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusLg: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(3 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusXl: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(4 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusFull: CssVariablePayload<"--rd-global-border-radius-full", "9999px", "全局圆角单位">;
declare const shadowXs: CssVariablePayload<"--rd-global-shadow-xs", "0 1px 2px rgba(0,0,0,0.05)", "全局阴影">;
declare const shadowSm: CssVariablePayload<"--rd-global-shadow-sm", "0 2px 4px rgba(0,0,0,0.05)", "全局阴影">;
declare const shadowMd: CssVariablePayload<"--rd-global-shadow-md", "0 4px 8px rgba(0,0,0,0.05)", "全局阴影">;
declare const shadowLg: CssVariablePayload<"--rd-global-shadow-lg", "0 8px 16px rgba(0,0,0,0.05)", "全局阴影">;
declare const shadowXl: CssVariablePayload<"--rd-global-shadow-xl", "0 16px 32px rgba(0,0,0,0.05)", "全局阴影">;
declare const fontSizeXs: CssVariablePayload<"--rd-global-font-size-xs", "0.75rem", "全局字体大小">;
declare const fontSizeSm: CssVariablePayload<"--rd-global-font-size-sm", "0.875rem", "全局字体大小">;
declare const fontSizeMd: CssVariablePayload<"--rd-global-font-size-md", "1rem", "全局字体大小">;
declare const fontSizeLg: CssVariablePayload<"--rd-global-font-size-lg", "1.125rem", "全局字体大小">;
declare const fontSizeXl: CssVariablePayload<"--rd-global-font-size-xl", "1.25rem", "全局字体大小">;
declare const fontSize2Xl: CssVariablePayload<"--rd-global-font-size-xxl", "1.5rem", "全局字体大小">;
declare const fontWeightLight: CssVariablePayload<"--rd-global-font-weight-light", "300", "全局细体字重">;
declare const fontWeightRegular: CssVariablePayload<"--rd-global-font-weight-regular", "400", "全局常规字重">;
declare const fontWeightMedium: CssVariablePayload<"--rd-global-font-weight-medium", "500", "全局中等字重">;
declare const fontWeightBold: CssVariablePayload<"--rd-global-font-weight-bold", "700", "全局粗体字重">;
declare const colorTextPrimary: CssVariablePayload<"--rd-global-color-text-primary", "var(--rd-global-color-neutral-900)", "全局主要文本色">;
declare const colorTextSecondary: CssVariablePayload<"--rd-global-color-text-secondary", "var(--rd-global-color-neutral-700)", "全局次要文本色">;
declare const colorTextTertiary: CssVariablePayload<"--rd-global-color-text-tertiary", "var(--rd-global-color-neutral-500)", "全局第三文本色">;
declare const colorTextDisabled: CssVariablePayload<"--rd-global-color-text-disabled", "var(--rd-global-color-neutral-400)", "全局禁用文本色">;
declare const colorTextInverse: CssVariablePayload<"--rd-global-color-text-inverse", "var(--rd-global-color-neutral-50)", "全局反色文本">;
declare const colorTextLink: CssVariablePayload<"--rd-global-color-text-link", "var(--rd-global-color-primary)", "全局链接文本色">;
declare const colorTextSuccess: CssVariablePayload<"--rd-global-color-text-success", "var(--rd-global-color-success)", "全局成功文本色">;
declare const colorTextWarning: CssVariablePayload<"--rd-global-color-text-warning", "var(--rd-global-color-warning)", "全局警告文本色">;
declare const colorTextError: CssVariablePayload<"--rd-global-color-text-danger", "var(--rd-global-color-danger)", "全局错误文本色">;
declare const surfacePrimary: CssVariablePayload<"--rd-global-surface-primary", "var(--rd-global-color-neutral-100)", "全局主要表面色">;
declare const surfaceSecondary: CssVariablePayload<"--rd-global-surface-secondary", "var(--rd-global-color-neutral-50)", "全局次要表面色">;
declare const surfaceTertiary: CssVariablePayload<"--rd-global-surface-tertiary", "var(--rd-global-color-neutral-200)", "全局第三表面色">;
declare const borderPrimary: CssVariablePayload<"--rd-global-border-primary", "1px solid var(--rd-global-color-neutral-300)", "全局主要边框">;
declare const borderSecondary: CssVariablePayload<"--rd-global-border-secondary", "1px solid var(--rd-global-color-neutral-200)", "全局次要边框">;
declare const borderTertiary: CssVariablePayload<"--rd-global-border-tertiary", "1px solid var(--rd-global-color-neutral-100)", "全局第三边框">;
declare const borderFocus: CssVariablePayload<"--rd-global-border-focus", "1px solid var(--rd-global-color-primary)", "全局聚焦边框">;
declare const borderError: CssVariablePayload<"--rd-global-border-error", "1px solid var(--rd-global-color-danger)", "全局错误边框">;
declare const interactivePrimary: CssVariablePayload<"--rd-global-interactive-primary", "var(--rd-global-color-primary)", "全局主要交互色">;
declare const interactivePrimaryHover: CssVariablePayload<"--rd-global-interactive-primary-hover", "#2980b9", "全局主要交互悬停色">;
declare const interactivePrimaryActive: CssVariablePayload<"--rd-global-interactive-primary-active", "#1d6fa5", "全局主要交互激活色">;
declare const interactivePrimaryDisabled: CssVariablePayload<"--rd-global-interactive-primary-disabled", "var(--rd-global-color-neutral-300)", "全局主要交互禁用色">;
declare const interactiveSecondary: CssVariablePayload<"--rd-global-interactive-secondary", "var(--rd-global-color-neutral-400)", "全局次要交互色">;
declare const interactiveSecondaryHover: CssVariablePayload<"--rd-global-interactive-secondary-hover", "var(--rd-global-color-neutral-500)", "全局次要交互悬停色">;
declare const interactiveSecondaryActive: CssVariablePayload<"--rd-global-interactive-secondary-active", "var(--rd-global-color-neutral-600)", "全局次要交互激活色">;
declare const interactiveSecondaryDisabled: CssVariablePayload<"--rd-global-interactive-secondary-disabled", "var(--rd-global-color-neutral-200)", "全局次要交互禁用色">;
declare const uiWidgetWidth: CssVariablePayload<"--rd-ui-widget-width", "26px", "控件宽度">;
declare const uiWidgetHeight: CssVariablePayload<"--rd-ui-widget-height", "26px", "控件高度">;
declare const uiWidgetColorPrimary: CssVariablePayload<"--rd-ui-widget-color-primary", "var(--rd-global-color-neutral-700)", "控件颜色">;
declare const uiWidgetBackgroundPrimary: CssVariablePayload<"--rd-ui-widget-background-primary", "var(--rd-global-color-neutral-50)", "控件颜色">;
declare const uiWidgetHoverBackgroundPrimary: CssVariablePayload<"--rd-ui-widget-hover-background-primary", "var(--rd-global-color-neutral-100)", "控件颜色">;
declare const uiWidgetBorderRadius: CssVariablePayload<"--rd-ui-widget-border-radius", "4px", "控件圆角半径">;
declare const uiDefaultButtonBackground: CssVariablePayload<"--rd-ui-default-button-background", "var(--rd-global-color-neutral-50)", "默认按钮背景色">;
declare const uiDefaultButtonTextColor: CssVariablePayload<"--rd-ui-default-button-text-color", "var(--rd-global-color-neutral-700)", "默认按钮文本色">;
declare const uiDefaultButtonRadius: CssVariablePayload<"--rd-ui-default-button-radius", "10px", "默认按钮圆角半径">;
declare const uiCaptionBarHeight: CssVariablePayload<"--rd-ui-caption-bar-height", "32px", "标题栏高度">;
declare const uiCaptionBarBackground: CssVariablePayload<"--rd-ui-caption-bar-background", "var(--rd-global-color-neutral-0)", "标题栏背景色">;
declare const uiNavigationBarWidth: CssVariablePayload<"--rd-ui-navigation-bar-width", "32px", "纵向导航栏宽度">;
declare const uiNavigationBarBackground: CssVariablePayload<"--rd-ui-navigation-bar-background", "var(--rd-global-color-neutral-0)", "导航栏背景色">;
declare const uiAutoMenuBackground: CssVariablePayload<"--rd-ui-auto-menu-background", "var(--rd-global-color-neutral-0)", "自动菜单背景色">;
declare const uiAutoMenuTextColor: CssVariablePayload<"--rd-ui-auto-menu-text-color", "var(--rd-global-color-neutral-700)", "自动菜单文本色">;
declare const uiAutoMenuRadius: CssVariablePayload<"--rd-ui-auto-menu-radius", "10px", "自动菜单圆角半径">;

declare const cssVariablePayloadSheet_borderError: typeof borderError;
declare const cssVariablePayloadSheet_borderFocus: typeof borderFocus;
declare const cssVariablePayloadSheet_borderPrimary: typeof borderPrimary;
declare const cssVariablePayloadSheet_borderRadiusFull: typeof borderRadiusFull;
declare const cssVariablePayloadSheet_borderRadiusLg: typeof borderRadiusLg;
declare const cssVariablePayloadSheet_borderRadiusMd: typeof borderRadiusMd;
declare const cssVariablePayloadSheet_borderRadiusSm: typeof borderRadiusSm;
declare const cssVariablePayloadSheet_borderRadiusUnit: typeof borderRadiusUnit;
declare const cssVariablePayloadSheet_borderRadiusXl: typeof borderRadiusXl;
declare const cssVariablePayloadSheet_borderRadiusXs: typeof borderRadiusXs;
declare const cssVariablePayloadSheet_borderSecondary: typeof borderSecondary;
declare const cssVariablePayloadSheet_borderTertiary: typeof borderTertiary;
declare const cssVariablePayloadSheet_colorError: typeof colorError;
declare const cssVariablePayloadSheet_colorNeutral0: typeof colorNeutral0;
declare const cssVariablePayloadSheet_colorNeutral100: typeof colorNeutral100;
declare const cssVariablePayloadSheet_colorNeutral200: typeof colorNeutral200;
declare const cssVariablePayloadSheet_colorNeutral300: typeof colorNeutral300;
declare const cssVariablePayloadSheet_colorNeutral400: typeof colorNeutral400;
declare const cssVariablePayloadSheet_colorNeutral50: typeof colorNeutral50;
declare const cssVariablePayloadSheet_colorNeutral500: typeof colorNeutral500;
declare const cssVariablePayloadSheet_colorNeutral600: typeof colorNeutral600;
declare const cssVariablePayloadSheet_colorNeutral700: typeof colorNeutral700;
declare const cssVariablePayloadSheet_colorNeutral800: typeof colorNeutral800;
declare const cssVariablePayloadSheet_colorNeutral900: typeof colorNeutral900;
declare const cssVariablePayloadSheet_colorPrimary: typeof colorPrimary;
declare const cssVariablePayloadSheet_colorSuccess: typeof colorSuccess;
declare const cssVariablePayloadSheet_colorTextDisabled: typeof colorTextDisabled;
declare const cssVariablePayloadSheet_colorTextError: typeof colorTextError;
declare const cssVariablePayloadSheet_colorTextInverse: typeof colorTextInverse;
declare const cssVariablePayloadSheet_colorTextLink: typeof colorTextLink;
declare const cssVariablePayloadSheet_colorTextPrimary: typeof colorTextPrimary;
declare const cssVariablePayloadSheet_colorTextSecondary: typeof colorTextSecondary;
declare const cssVariablePayloadSheet_colorTextSuccess: typeof colorTextSuccess;
declare const cssVariablePayloadSheet_colorTextTertiary: typeof colorTextTertiary;
declare const cssVariablePayloadSheet_colorTextWarning: typeof colorTextWarning;
declare const cssVariablePayloadSheet_colorWarning: typeof colorWarning;
declare const cssVariablePayloadSheet_fontSize2Xl: typeof fontSize2Xl;
declare const cssVariablePayloadSheet_fontSizeLg: typeof fontSizeLg;
declare const cssVariablePayloadSheet_fontSizeMd: typeof fontSizeMd;
declare const cssVariablePayloadSheet_fontSizeSm: typeof fontSizeSm;
declare const cssVariablePayloadSheet_fontSizeXl: typeof fontSizeXl;
declare const cssVariablePayloadSheet_fontSizeXs: typeof fontSizeXs;
declare const cssVariablePayloadSheet_fontWeightBold: typeof fontWeightBold;
declare const cssVariablePayloadSheet_fontWeightLight: typeof fontWeightLight;
declare const cssVariablePayloadSheet_fontWeightMedium: typeof fontWeightMedium;
declare const cssVariablePayloadSheet_fontWeightRegular: typeof fontWeightRegular;
declare const cssVariablePayloadSheet_interactivePrimary: typeof interactivePrimary;
declare const cssVariablePayloadSheet_interactivePrimaryActive: typeof interactivePrimaryActive;
declare const cssVariablePayloadSheet_interactivePrimaryDisabled: typeof interactivePrimaryDisabled;
declare const cssVariablePayloadSheet_interactivePrimaryHover: typeof interactivePrimaryHover;
declare const cssVariablePayloadSheet_interactiveSecondary: typeof interactiveSecondary;
declare const cssVariablePayloadSheet_interactiveSecondaryActive: typeof interactiveSecondaryActive;
declare const cssVariablePayloadSheet_interactiveSecondaryDisabled: typeof interactiveSecondaryDisabled;
declare const cssVariablePayloadSheet_interactiveSecondaryHover: typeof interactiveSecondaryHover;
declare const cssVariablePayloadSheet_shadowLg: typeof shadowLg;
declare const cssVariablePayloadSheet_shadowMd: typeof shadowMd;
declare const cssVariablePayloadSheet_shadowSm: typeof shadowSm;
declare const cssVariablePayloadSheet_shadowXl: typeof shadowXl;
declare const cssVariablePayloadSheet_shadowXs: typeof shadowXs;
declare const cssVariablePayloadSheet_spacingLg: typeof spacingLg;
declare const cssVariablePayloadSheet_spacingMd: typeof spacingMd;
declare const cssVariablePayloadSheet_spacingSm: typeof spacingSm;
declare const cssVariablePayloadSheet_spacingUnit: typeof spacingUnit;
declare const cssVariablePayloadSheet_spacingXl: typeof spacingXl;
declare const cssVariablePayloadSheet_spacingXs: typeof spacingXs;
declare const cssVariablePayloadSheet_surfacePrimary: typeof surfacePrimary;
declare const cssVariablePayloadSheet_surfaceSecondary: typeof surfaceSecondary;
declare const cssVariablePayloadSheet_surfaceTertiary: typeof surfaceTertiary;
declare const cssVariablePayloadSheet_uiAutoMenuBackground: typeof uiAutoMenuBackground;
declare const cssVariablePayloadSheet_uiAutoMenuRadius: typeof uiAutoMenuRadius;
declare const cssVariablePayloadSheet_uiAutoMenuTextColor: typeof uiAutoMenuTextColor;
declare const cssVariablePayloadSheet_uiCaptionBarBackground: typeof uiCaptionBarBackground;
declare const cssVariablePayloadSheet_uiCaptionBarHeight: typeof uiCaptionBarHeight;
declare const cssVariablePayloadSheet_uiDefaultButtonBackground: typeof uiDefaultButtonBackground;
declare const cssVariablePayloadSheet_uiDefaultButtonRadius: typeof uiDefaultButtonRadius;
declare const cssVariablePayloadSheet_uiDefaultButtonTextColor: typeof uiDefaultButtonTextColor;
declare const cssVariablePayloadSheet_uiNavigationBarBackground: typeof uiNavigationBarBackground;
declare const cssVariablePayloadSheet_uiNavigationBarWidth: typeof uiNavigationBarWidth;
declare const cssVariablePayloadSheet_uiWidgetBackgroundPrimary: typeof uiWidgetBackgroundPrimary;
declare const cssVariablePayloadSheet_uiWidgetBorderRadius: typeof uiWidgetBorderRadius;
declare const cssVariablePayloadSheet_uiWidgetColorPrimary: typeof uiWidgetColorPrimary;
declare const cssVariablePayloadSheet_uiWidgetHeight: typeof uiWidgetHeight;
declare const cssVariablePayloadSheet_uiWidgetHoverBackgroundPrimary: typeof uiWidgetHoverBackgroundPrimary;
declare const cssVariablePayloadSheet_uiWidgetWidth: typeof uiWidgetWidth;
declare namespace cssVariablePayloadSheet {
  export { cssVariablePayloadSheet_borderError as borderError, cssVariablePayloadSheet_borderFocus as borderFocus, cssVariablePayloadSheet_borderPrimary as borderPrimary, cssVariablePayloadSheet_borderRadiusFull as borderRadiusFull, cssVariablePayloadSheet_borderRadiusLg as borderRadiusLg, cssVariablePayloadSheet_borderRadiusMd as borderRadiusMd, cssVariablePayloadSheet_borderRadiusSm as borderRadiusSm, cssVariablePayloadSheet_borderRadiusUnit as borderRadiusUnit, cssVariablePayloadSheet_borderRadiusXl as borderRadiusXl, cssVariablePayloadSheet_borderRadiusXs as borderRadiusXs, cssVariablePayloadSheet_borderSecondary as borderSecondary, cssVariablePayloadSheet_borderTertiary as borderTertiary, cssVariablePayloadSheet_colorError as colorError, cssVariablePayloadSheet_colorNeutral0 as colorNeutral0, cssVariablePayloadSheet_colorNeutral100 as colorNeutral100, cssVariablePayloadSheet_colorNeutral200 as colorNeutral200, cssVariablePayloadSheet_colorNeutral300 as colorNeutral300, cssVariablePayloadSheet_colorNeutral400 as colorNeutral400, cssVariablePayloadSheet_colorNeutral50 as colorNeutral50, cssVariablePayloadSheet_colorNeutral500 as colorNeutral500, cssVariablePayloadSheet_colorNeutral600 as colorNeutral600, cssVariablePayloadSheet_colorNeutral700 as colorNeutral700, cssVariablePayloadSheet_colorNeutral800 as colorNeutral800, cssVariablePayloadSheet_colorNeutral900 as colorNeutral900, cssVariablePayloadSheet_colorPrimary as colorPrimary, cssVariablePayloadSheet_colorSuccess as colorSuccess, cssVariablePayloadSheet_colorTextDisabled as colorTextDisabled, cssVariablePayloadSheet_colorTextError as colorTextError, cssVariablePayloadSheet_colorTextInverse as colorTextInverse, cssVariablePayloadSheet_colorTextLink as colorTextLink, cssVariablePayloadSheet_colorTextPrimary as colorTextPrimary, cssVariablePayloadSheet_colorTextSecondary as colorTextSecondary, cssVariablePayloadSheet_colorTextSuccess as colorTextSuccess, cssVariablePayloadSheet_colorTextTertiary as colorTextTertiary, cssVariablePayloadSheet_colorTextWarning as colorTextWarning, cssVariablePayloadSheet_colorWarning as colorWarning, cssVariablePayloadSheet_fontSize2Xl as fontSize2Xl, cssVariablePayloadSheet_fontSizeLg as fontSizeLg, cssVariablePayloadSheet_fontSizeMd as fontSizeMd, cssVariablePayloadSheet_fontSizeSm as fontSizeSm, cssVariablePayloadSheet_fontSizeXl as fontSizeXl, cssVariablePayloadSheet_fontSizeXs as fontSizeXs, cssVariablePayloadSheet_fontWeightBold as fontWeightBold, cssVariablePayloadSheet_fontWeightLight as fontWeightLight, cssVariablePayloadSheet_fontWeightMedium as fontWeightMedium, cssVariablePayloadSheet_fontWeightRegular as fontWeightRegular, cssVariablePayloadSheet_interactivePrimary as interactivePrimary, cssVariablePayloadSheet_interactivePrimaryActive as interactivePrimaryActive, cssVariablePayloadSheet_interactivePrimaryDisabled as interactivePrimaryDisabled, cssVariablePayloadSheet_interactivePrimaryHover as interactivePrimaryHover, cssVariablePayloadSheet_interactiveSecondary as interactiveSecondary, cssVariablePayloadSheet_interactiveSecondaryActive as interactiveSecondaryActive, cssVariablePayloadSheet_interactiveSecondaryDisabled as interactiveSecondaryDisabled, cssVariablePayloadSheet_interactiveSecondaryHover as interactiveSecondaryHover, cssVariablePayloadSheet_shadowLg as shadowLg, cssVariablePayloadSheet_shadowMd as shadowMd, cssVariablePayloadSheet_shadowSm as shadowSm, cssVariablePayloadSheet_shadowXl as shadowXl, cssVariablePayloadSheet_shadowXs as shadowXs, cssVariablePayloadSheet_spacingLg as spacingLg, cssVariablePayloadSheet_spacingMd as spacingMd, cssVariablePayloadSheet_spacingSm as spacingSm, cssVariablePayloadSheet_spacingUnit as spacingUnit, cssVariablePayloadSheet_spacingXl as spacingXl, cssVariablePayloadSheet_spacingXs as spacingXs, cssVariablePayloadSheet_surfacePrimary as surfacePrimary, cssVariablePayloadSheet_surfaceSecondary as surfaceSecondary, cssVariablePayloadSheet_surfaceTertiary as surfaceTertiary, cssVariablePayloadSheet_uiAutoMenuBackground as uiAutoMenuBackground, cssVariablePayloadSheet_uiAutoMenuRadius as uiAutoMenuRadius, cssVariablePayloadSheet_uiAutoMenuTextColor as uiAutoMenuTextColor, cssVariablePayloadSheet_uiCaptionBarBackground as uiCaptionBarBackground, cssVariablePayloadSheet_uiCaptionBarHeight as uiCaptionBarHeight, cssVariablePayloadSheet_uiDefaultButtonBackground as uiDefaultButtonBackground, cssVariablePayloadSheet_uiDefaultButtonRadius as uiDefaultButtonRadius, cssVariablePayloadSheet_uiDefaultButtonTextColor as uiDefaultButtonTextColor, cssVariablePayloadSheet_uiNavigationBarBackground as uiNavigationBarBackground, cssVariablePayloadSheet_uiNavigationBarWidth as uiNavigationBarWidth, cssVariablePayloadSheet_uiWidgetBackgroundPrimary as uiWidgetBackgroundPrimary, cssVariablePayloadSheet_uiWidgetBorderRadius as uiWidgetBorderRadius, cssVariablePayloadSheet_uiWidgetColorPrimary as uiWidgetColorPrimary, cssVariablePayloadSheet_uiWidgetHeight as uiWidgetHeight, cssVariablePayloadSheet_uiWidgetHoverBackgroundPrimary as uiWidgetHoverBackgroundPrimary, cssVariablePayloadSheet_uiWidgetWidth as uiWidgetWidth };
}

type RdCssVariablePayloadSheet = {
    [Key in keyof typeof cssVariablePayloadSheet]: Omit<(typeof cssVariablePayloadSheet)[Key], 'value'> & {
        value: string;
    };
};

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
    static findWindowService(key: string | number | IpcMainEvent | IpcMainInvokeEvent): WindowService;
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
         * @default false
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

interface AppStoreType {
    refreshToken: string;
    accessToken: string;
}

/**
 * 为渲染进程提供获得 appStore 的能力
 */
declare const ipcAppStoreGetStore: {
    readonly channel: "IpcStore/appStore/getStore";
    readonly action: () => Promise<AppStoreType>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 获得一个存储在 appStore 中的数据
 */
declare const ipcAppStoreGet: {
    readonly channel: "IpcStore/appStore/get";
    readonly action: <Key extends keyof AppStoreType, V extends Required<AppStoreType>[Key]>(_: WindowService, key: Key, defaultValue?: V) => Promise<Required<AppStoreType>[Key]>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 设置存储在 appStore 中的数据
 */
declare const ipcAppStoreSet: {
    readonly channel: "IpcStore/appStore/set";
    readonly action: <Key extends keyof AppStoreType, V extends AppStoreType[Key]>(_: WindowService, key: Key, value: V) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 重置某些 appStore 中的数据
 */
declare const ipcAppStoreReset: {
    readonly channel: "IpcStore/appStore/reset";
    readonly action: <Key extends keyof AppStoreType>(_: WindowService, ...keys: Key[]) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 判断 appStore 中是否含有某个 key
 */
declare const ipcAppStoreHas: {
    readonly channel: "IpcStore/appStore/has";
    readonly action: <Key extends keyof AppStoreType>(_: WindowService, key: Key) => Promise<boolean>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
/**
 * 渲染进程通过 key 删除 appStore 中的数据
 */
declare const ipcAppStoreDelete: {
    readonly channel: "IpcStore/appStore/delete";
    readonly action: <Key extends keyof AppStoreType>(_: WindowService, key: Key) => Promise<void>;
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
    x: number | "center" | "left" | "right";
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

interface RdExtension extends Extension<never> {
    meta?: {
        extension_id: number;
        extension_name: string;
        extension_uuid: string;
        extension_version_id: number;
        script_hash: string;
    };
}
type RdCssVariablesDeclaration = CssVariablesDeclaration<RdCssVariablePayloadSheet>;
type RdCssVars = CssVars<RdCssVariablePayloadSheet>;
type RdThread<TThreadEntries extends Record<string, ThreadHandler>, SThreadEntries extends Record<string, ThreadHandler> = {}> = Thread<TThreadEntries, SThreadEntries>;
declare global {
    interface Window {
        readonly rApp: Rapid.RApp;
        readonly cssVars: Rapid.SKin.CssVars;
    }
    /**
     * 全局的 RApp 实例
     */
    const rApp: Rapid.RApp;
    /**
     * 全局的皮肤变量
     */
    const cssVars: Rapid.SKin.CssVars;
    /**
     * 应用程序的命名空间 - 此命名空间将为其他扩展环境提供编写 TS 地基础
     * 其中 RApp 为全局对象实例 - 为其他扩展环境提供功能性编写基础
     */
    export namespace Rapid {
        /**
         * Web worker 线程相关的类型定义
         */
        namespace Thread {
            type MainThreadEntries = {
                'rxc:extension-changed': (data: number[]) => void;
            };
            type ExtensionThreadEntries = {
                /**
                 * 启动线程任务、开启插件的心跳检查
                 */
                'rxc-thread-start-extension-heartbeat': () => void;
                /**
                 * 终止线程任务、关闭插件的心跳检查
                 */
                'rxc-thread-terminate-extension-heartbeat': () => void;
                /**
                 * 向线程中同步插件的信息
                 */
                'rxc-thread-sync-extensions-info': (voucher: UseExtensionHeartbeatVoucher[]) => void;
            };
        }
        /**
         * 事件总线相关的类型定义
         */
        namespace Bus {
            /**
             * 事件总线 Emitter 的入口映射关系
             */
            type BusEmitterEntries = {
                /**
                 * 启动任务 - rxc 插件心跳检查
                 */
                'task:start-rxc-extension-heartbeat': () => void;
                /**
                 * 终止任务 - rxc 插件心跳检查
                 */
                'task:terminate-rxc-extension-heartbeat': () => void;
            };
            /**
             * 事件总线 Invoker 的入口映射关系
             */
            type BusInvokerEntries = {
                /**
                 * api-err 分发器
                 */
                'r-api-err-distributor': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;
                /**
                 * rx-api-err: 资源访问没有权限
                 */
                'r-api-err:unauthorized-resource': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;
                /**
                 * rx-api-err: 用户凭证访问没有权限
                 */
                'r-api-err:unauthorized-credential': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;
                /**
                 * invoker: 获取 store access_token
                 */
                'data-getter:from-store:access-token': () => Promise<string | null>;
                /**
                 * invoker: 获取 store refresh_token
                 */
                'data-getter:from-store:refresh-token': () => Promise<string | null>;
            };
        }
        /**
         * 皮肤相关的类型定义
         */
        namespace SKin {
            /**
             * 当前定义地 payload sheet
             */
            type CssVariablePayloadSheet = RdCssVariablePayloadSheet;
            /**
             * 皮肤变量声明
             */
            type CssVariablesDeclaration = RdCssVariablesDeclaration;
            /**
             * 皮肤变量
             */
            type CssVars = RdCssVars;
        }
        /**
         * 扩展相关的类型定义
         */
        namespace Extend {
            /**
             * 扩展的元数据
             */
            namespace Metadata {
                /**
                 * 注册元数据的入口映射关系
                 */
                interface MetadataEntries {
                    /**
                     * 功能 - 主题 - 变量 - 转换
                     */
                    'functional.theme.variables.transformer': ((variables: RdCssVariablePayloadSheet) => void)[];
                    /**
                     * ui-header 图标展示
                     */
                    'ui.layout.header.icon': ComponentType[];
                    /**
                     * ui-header-menu 菜单前展示
                     */
                    'ui.layout.header.menu.before': ComponentType[];
                    /**
                     * ui-header-menu 菜单展示
                     */
                    'ui.layout.header.menu.content': ComponentType[];
                    /**
                     * ui-header-menu 菜单后展示
                     */
                    'ui.layout.header.menu.after': ComponentType[];
                    /**
                     * ui-header 中间的核心展示
                     */
                    'ui.layout.header.main.content': ComponentType[];
                    /**
                     * ui-header控件前插槽
                     */
                    'ui.layout.header.controller.before': ComponentType[];
                    /**
                     * ui - 布局-header-控制 控件
                     */
                    'ui.layout.header.controller.widgets.others': ComponentType[];
                    /**
                     * ui-header最小化控件
                     */
                    'ui.layout.header.controller.widgets.min': ComponentType[];
                    /**
                     * ui-header还原控件
                     */
                    'ui.layout.header.controller.widgets.reduction': ComponentType[];
                    /**
                     * ui-header关闭控件
                     */
                    'ui.layout.header.controller.widgets.close': ComponentType[];
                    /**
                     * ui-header控件后插槽
                     */
                    'ui.layout.header.controller.after': ComponentType[];
                    /**
                     * ui-navigation 导航条
                     */
                    'ui.layout.navigation.bar.content': ComponentType[];
                }
            }
            /**
             * 扩展的上下文
             */
            interface ExtensionContext {
            }
            /**
             * 扩展
             */
            interface Extension extends RdExtension {
            }
        }
        /**
         * 应用程序的命名空间 - 此命名空间将为其他扩展环境提供编写 TS 地基础
         */
        namespace Types {
            /**
             * 获取一个 Promise then函数的类型
             */
            type PromiseThenCallback<Pr extends Promise<unknown>> = Parameters<Pr['then']>[0];
            /**
             * 获取一个 Promise then函数回调参数 res 的类型
             */
            type PromiseResolvedType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseThenCallback<Pr>, null | undefined>>[0];
            /**
             * 获取一个 Promise数据 then函数回调参数 res 数组的类型
             */
            type PromiseArrayResolvedType<PrArr extends readonly Promise<unknown>[]> = {
                readonly [Index in keyof PrArr]: PromiseResolvedType<PrArr[Index]>;
            };
            /**
             * 获取一个 Promise catch函数回调参数 res 的类型
             */
            type PromiseCatchCallback<Pr extends Promise<unknown>> = Parameters<Pr['catch']>[0];
            /**
             * 获取一个 Promise catch函数回调参数 reason 的类型
             */
            type PromiseCatchReasonType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseCatchCallback<Pr>, null | undefined>>[0];
            /**
             * 获取一个 Promise数据 then函数回调参数 reason 数组的类型
             */
            type PromiseArrayCatchReasonType<PrArr extends readonly Promise<unknown>[]> = {
                readonly [Index in keyof PrArr]: PromiseCatchReasonType<PrArr[Index]>;
            };
            /**
             * 判断这个类型是否是一个 never 类型, 如果是返回第一个泛型参数, 否则返回第二个
             * @example
             *
             * type C = never;
             *
             * type TResult = IsNever<C, true, false>; // true
             *
             */
            type IsNever<T, SuccessReturnType, FailReturnType> = T extends never ? SuccessReturnType : FailReturnType;
            /**
             * 判断这个类型是否是一个 any 类型, 如果是返回第一个泛型参数, 否则返回第二个
             *
             * @example
             * type c = any;
             * type TResult = IsAny<C, true, false>; // true
             *
             * type d = true;
             * type TResult2 = IsAny<d, true, false>; // false
             */
            type IsAny<T, SuccessReturnType, FailReturnType> = IsNever<T, 'yes', 'no'> extends 'no' ? FailReturnType : SuccessReturnType;
            /**
             * 判断这个类型是否是一个 unknown 类型, 如果是返回第一个泛型参数, 否则返回第二个
             *
             * @example
             * type c = unknown;
             * type TResult = IsUnknown<C, true, false>; // true
             *
             * type d = true;
             * type TResult2 = IsUnknown<d, true, false>; // false
             */
            type IsUnknown<T, SuccessReturnType, FailReturnType> = unknown extends T ? (T extends unknown ? SuccessReturnType : FailReturnType) : FailReturnType;
        }
        /**
         * RApp
         */
        interface RApp {
            meta2d?: _meta2d_core.Meta2d;
            readonly Antd: typeof antd;
            readonly spring: typeof _react_spring_web;
            readonly transitionGroup: typeof react_transition_group;
            readonly moment: typeof moment;
            readonly ipcActions: IpcActions;
            readonly electron: ElectronAPI;
            readonly printer: PrinterServer;
            /**
             * 插件管理器
             */
            readonly extension: ExtensionManager<Extend.Extension>;
            /**
             * 元数据管理器
             */
            readonly metadata: MetadataManager<Extend.Metadata.MetadataEntries>;
            /**
             * 事件总线
             */
            readonly emitter: Emitter<Rapid.Bus.BusEmitterEntries>;
            /**
             * 带有函数返回值的事件总线功能
             */
            readonly invoker: Invoker<Bus.BusInvokerEntries>;
            /**
             * 全局的线程管理
             */
            readonly threads: {
                /**
                 * 插件的线程化版本管理
                 */
                readonly rxcThread: RdThread<Rapid.Thread.ExtensionThreadEntries, Rapid.Thread.MainThreadEntries>;
            };
            /**
             * 全局的状态管理
             */
            readonly stores: {
                readonly useUserStore: typeof useUserStore;
                readonly useThemeStore: typeof useThemeStore;
                readonly useDocStore: typeof useDocStore;
            };
            /**
             * 皮肤
             */
            readonly skin: {
                readonly skin: Skin<RdCssVariablePayloadSheet>;
                readonly makeRdCssVarPayload: typeof makeRdCssVarPayload;
                readonly mrcvp: typeof mrcvp;
                readonly Skin: typeof Skin;
            };
            /**
             * 国际化
             */
            readonly i18n: {
                readonly i18n: typeof i18n;
                readonly useTranslation: typeof react_i18next.useTranslation;
            };
            /**
             * 内置常量
             */
            readonly constants: {
                readonly Timestamp: typeof Timestamp;
            };
            /**
             * 提供可以公用的组件
             */
            readonly components: {
                /**
                 * 文本溢出隐藏省略的组件, 当文本长度超出容器的时候, 自动展示省略号
                 */
                readonly Ellipsis: typeof Ellipsis;
                /**
                 * antd 与 自定义 icon 的结合组件
                 */
                readonly IconFont: typeof IconFont;
                /**
                 * 通用的 widget - 控件, 用于展示一个图标, 附带功能提示信息 作为系统功能图标
                 */
                readonly Widget: typeof Widget;
                /**
                 * 展示 -空-
                 */
                readonly Empty: typeof REmpty;
            };
            /**
             * 部分 service 能力
             */
            readonly services: {
                readonly Skin: typeof Skin;
                readonly Emitter: typeof Emitter;
                readonly Invoker: typeof Invoker;
                readonly ExtensionManager: typeof ExtensionManager;
                readonly MetadataManager: typeof MetadataManager;
            };
            /**
             * 提供基础 API-Service
             */
            readonly libs: {
                readonly injectReadonlyVariable: typeof injectReadonlyVariable;
                readonly createShallowProxy: typeof createShallowProxy;
                readonly rApiGet: typeof rApiGet;
                readonly rApiPost: typeof rApiPost;
                readonly rApiPut: typeof rApiPut;
                readonly rApiDelete: typeof rApiDelete;
                readonly rRequest: typeof rRequest;
                readonly rApiPatch: typeof rApiPatch;
                readonly rCreateApi: typeof rCreateApi;
                readonly apiGet: typeof apiGet;
                readonly apiPost: typeof apiPost;
                readonly apiPut: typeof apiPut;
                readonly apiDelete: typeof apiDelete;
                readonly request: typeof request;
                readonly createApiRequest: typeof createApiRequest;
                readonly createRequest: typeof createRequest;
                readonly aesEncrypt: typeof aesEncrypt;
                readonly aesDecrypt: typeof aesDecrypt;
                readonly aesEncryptAlgorithm: typeof aesEncryptAlgorithm;
                readonly aesDecryptAlgorithm: typeof aesDecryptAlgorithm;
                readonly AES_DEFAULT_KEY: typeof AES_DEFAULT_KEY;
                readonly jose: typeof jose;
                readonly cryptoTs: typeof cryptoTs;
                readonly jsr: typeof jsr;
                readonly toNil: typeof toNil;
                readonly toNils: typeof toNils;
                readonly toWaitPromise: typeof toWaitPromise;
                readonly Ansi: typeof Ansi;
                readonly classnames: typeof classnames;
                readonly isReactClassComponent: typeof isReactClassComponent;
                readonly isReactComponent: typeof isReactComponent;
                readonly isReactForwardFC: typeof isReactForwardFC;
                readonly isReactMemoFC: typeof isReactMemoFC;
                readonly isReactFC: typeof isReactFC;
                readonly isReactLazyFC: typeof isReactLazyFC;
                readonly defineCompleteType: typeof _suey_pkg_utils.defineCompleteType;
                readonly defineRawType: typeof _suey_pkg_utils.defineRawType;
            };
        }
    }
}
