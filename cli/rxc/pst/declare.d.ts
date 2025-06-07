import * as react from 'react';
import { Component, FC, ForwardRefExoticComponent, LazyExoticComponent, MemoExoticComponent, ComponentType } from 'react';
import { AxiosError, AxiosResponse, apiGet, apiPost, apiPut, apiDelete, request, createApiRequest, createRequest, aesEncrypt, aesDecrypt, aesEncryptAlgorithm, aesDecryptAlgorithm, AES_DEFAULT_KEY, jose, cryptoTs, jsr, toNil, toNils, toWaitPromise, Ansi } from '@suey/pkg-utils';
import * as zustand_middleware from 'zustand/middleware';
import * as zustand from 'zustand';
import * as tldraw from 'tldraw';
import { TLStateNodeConstructor, TLAnyShapeUtilConstructor, TLUiOverrides, TLComponents } from 'tldraw';
import { Meta2d } from '@meta2d/core';

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
    protected notice<K extends keyof Entries>(busName: K, data: Entries[K]): Promise<void>;
    /**
     * 清空所有事件
     */
    protected clear(): void;
}

declare class Emitter<Entries extends Record<string | symbol, any>> extends EmitterManager<Entries> {
    /**
     * 异步发射一个事件
     */
    emit<K extends keyof Entries>(busName: K, data: Entries[K]): Promise<void>;
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
 * Object.defineProperty, 向对象注入变量, 默认不可修改不可配置不可删除不可枚举
 * @description 为什么需要它？当对象生命为 readonly, 但是需要初始化赋值
 */
declare function injectReadonlyVariable<T extends {}, Key extends keyof T, Value>(target: T, propertyKey: Key, value: Value, attributes?: PropertyDescriptor & ThisType<any>): void;

/**
 * 将一个对象浅层劫持, 并在 调用 setter 时, 执行特定的回调函数
 */
declare function createSallowProxy<T extends {}>(target: T, setterCallback?: () => void): T;

/**
import { Key } from 'react';
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
declare class Skin<PayloadSheet extends CssVariablePayloadSheet> {
    readonly cssVariablesPayloadSheet: PayloadSheet;
    private readonly runtimeContext;
    constructor(cssVariablesPayloadSheet: PayloadSheet);
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

/**
 * 对接扩展心跳机制地凭证
 */
interface UseExtensionHeartbeatVoucher {
    extension_id: number;
    extension_uuid: string;
    /**
     * 扩展内容 hash 值
     */
    script_hash: string;
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
        rehydrate: () => void | Promise<void>; /**
         * 用户退出登录
         */
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

interface TldrawStore {
    /**
     * 工具栏
     */
    tlTools: TLStateNodeConstructor[];
    /**
     * 形状工具
     */
    tlShapeUtils: TLAnyShapeUtilConstructor[];
    /**
     * UI 覆盖
     */
    tlUiOverrides: TLUiOverrides;
    /**
     * 组件
     */
    tlComponents: Partial<TLComponents>;
}
declare const useTldrawStore: zustand.UseBoundStore<Omit<zustand.StoreApi<TldrawStore>, "setState"> & {
    setState(nextStateOrUpdater: TldrawStore | Partial<TldrawStore> | ((state: {
        tlTools: TLStateNodeConstructor[];
        tlShapeUtils: TLAnyShapeUtilConstructor[];
        tlUiOverrides: {
            actions?: (editor: tldraw.Editor, actions: tldraw.TLUiActionsContextType, helpers: {
                addDialog: (dialog: Omit<tldraw.TLUiDialog, "id"> & {
                    id?: string;
                }) => string;
                addToast: (toast: Omit<tldraw.TLUiToast, "id"> & {
                    id?: string;
                }) => string;
                clearDialogs: () => void;
                clearToasts: () => void;
                isMobile: boolean;
                msg: (id?: string) => string;
                removeDialog: (id: string) => string;
                removeToast: (id: string) => string;
            }) => tldraw.TLUiActionsContextType;
            tools?: (editor: tldraw.Editor, tools: tldraw.TLUiToolsContextType, helpers: {
                insertMedia(): void;
            } & {
                addDialog: (dialog: Omit<tldraw.TLUiDialog, "id"> & {
                    id?: string;
                }) => string;
                addToast: (toast: Omit<tldraw.TLUiToast, "id"> & {
                    id?: string;
                }) => string;
                clearDialogs: () => void;
                clearToasts: () => void;
                isMobile: boolean;
                msg: (id?: string) => string;
                removeDialog: (id: string) => string;
                removeToast: (id: string) => string;
            }) => tldraw.TLUiToolsContextType;
            translations?: {
                [x: string]: {
                    [x: string]: string;
                };
            };
        };
        tlComponents: {
            Background?: react.ComponentType;
            SvgDefs?: react.ComponentType;
            Brush?: react.ComponentType<tldraw.TLBrushProps>;
            ZoomBrush?: react.ComponentType<tldraw.TLBrushProps>;
            ShapeIndicators?: react.ComponentType;
            ShapeIndicator?: react.ComponentType<tldraw.TLShapeIndicatorProps>;
            Cursor?: react.ComponentType<tldraw.TLCursorProps>;
            Canvas?: react.ComponentType<tldraw.TLCanvasComponentProps>;
            CollaboratorBrush?: react.ComponentType<tldraw.TLBrushProps>;
            CollaboratorCursor?: react.ComponentType<tldraw.TLCursorProps>;
            CollaboratorHint?: react.ComponentType<tldraw.TLCollaboratorHintProps>;
            CollaboratorShapeIndicator?: react.ComponentType<tldraw.TLShapeIndicatorProps>;
            Grid?: react.ComponentType<tldraw.TLGridProps>;
            Scribble?: react.ComponentType<tldraw.TLScribbleProps>;
            CollaboratorScribble?: react.ComponentType<tldraw.TLScribbleProps>;
            SnapIndicator?: react.ComponentType<tldraw.TLSnapIndicatorProps>;
            Handles?: react.ComponentType<tldraw.TLHandlesProps>;
            Handle?: react.ComponentType<tldraw.TLHandleProps>;
            Spinner?: react.ComponentType;
            SelectionForeground?: react.ComponentType<tldraw.TLSelectionForegroundProps>;
            SelectionBackground?: react.ComponentType<tldraw.TLSelectionBackgroundProps>;
            OnTheCanvas?: react.ComponentType;
            InFrontOfTheCanvas?: react.ComponentType;
            LoadingScreen?: react.ComponentType;
            ErrorFallback?: tldraw.TLErrorFallbackComponent;
            ShapeErrorFallback?: tldraw.TLShapeErrorFallbackComponent;
            ShapeIndicatorErrorFallback?: tldraw.TLShapeIndicatorErrorFallbackComponent;
            ContextMenu?: react.ComponentType<tldraw.TLUiContextMenuProps>;
            ActionsMenu?: react.ComponentType<tldraw.TLUiActionsMenuProps>;
            HelpMenu?: react.ComponentType<tldraw.TLUiHelpMenuProps>;
            ZoomMenu?: react.ComponentType<tldraw.TLUiZoomMenuProps>;
            MainMenu?: react.ComponentType<tldraw.TLUiMainMenuProps>;
            Minimap?: react.ComponentType;
            StylePanel?: react.ComponentType<tldraw.TLUiStylePanelProps>;
            PageMenu?: react.ComponentType;
            NavigationPanel?: react.ComponentType;
            Toolbar?: react.ComponentType;
            KeyboardShortcutsDialog?: react.ComponentType<tldraw.TLUiKeyboardShortcutsDialogProps>;
            QuickActions?: react.ComponentType<tldraw.TLUiQuickActionsProps>;
            HelperButtons?: react.ComponentType<tldraw.TLUiHelperButtonsProps>;
            DebugPanel?: react.ComponentType;
            DebugMenu?: react.ComponentType;
            MenuPanel?: react.ComponentType;
            TopPanel?: react.ComponentType;
            SharePanel?: react.ComponentType;
            CursorChatBubble?: react.ComponentType;
        };
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

interface ThemeStore {
    layout: {
        mainSidebar: 'none' | 'left' | 'right';
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
            mainSidebar: 'none' | 'left' | 'right';
        };
    }) => void), shouldReplace?: boolean): void;
}>;

/**
 * ==================================================================================
 * 该文件用于创建整个 App 中可以调整的 Css 样式列表
 * ==================================================================================
 */
declare const cssVariablesPayloadSheet: {
    readonly bodyFontSize: CssVariablePayload<"--rd-body-font-size", "16px", "正文字体大小">;
    readonly headingFontSize: CssVariablePayload<"--rd-heading-font-size", "24px", "标题字体大小">;
    readonly subheadingFontSize: CssVariablePayload<"--rd-subheading-font-size", "20px", "小标题字体大小">;
    readonly buttonFontSize: CssVariablePayload<"--rd-button-font-size", "14px", "按钮字体大小">;
    readonly formLabelFontSize: CssVariablePayload<"--rd-form-label-font-size", "14px", "表单标签字体大小">;
    readonly tooltipFontSize: CssVariablePayload<"--rd-tooltip-font-size", "12px", "工具提示字体大小">;
    readonly dropdownMenuItemHeight: CssVariablePayload<"--rd-dropdown-menu-item-height", "40px", "下拉菜单项高度">;
    readonly footerHeight: CssVariablePayload<"--rd-footer-height", "80px", "页脚高度">;
    readonly buttonPadding: CssVariablePayload<"--rd-button-padding", "10px 20px", "按钮内边距">;
    readonly inputPadding: CssVariablePayload<"--rd-input-padding", "10px 15px", "输入框内边距">;
    readonly tooltipPadding: CssVariablePayload<"--rd-tooltip-padding", "8px 12px", "工具提示内边距">;
    readonly secondaryColor: CssVariablePayload<"--rd-secondary-color", "#6c757d", "辅助色">;
    readonly linkColor: CssVariablePayload<"--rd-link-color", "#007bff", "链接颜色">;
    readonly bodyTextColor: CssVariablePayload<"--rd-body-text-color", "#212529", "正文文本颜色">;
    readonly headingTextColor: CssVariablePayload<"--rd-heading-text-color", "#343a40", "标题文本颜色">;
    readonly borderColor: CssVariablePayload<"--rd-border-color", "#dee2e6", "边框颜色">;
    readonly inputBackgroundColor: CssVariablePayload<"--rd-input-background-color", "#ffffff", "输入框背景色">;
    readonly inputTextColor: CssVariablePayload<"--rd-input-text-color", "#495057", "输入框文本颜色">;
    readonly placeholderTextColor: CssVariablePayload<"--rd-placeholder-text-color", "#6c757d", "占位符文本颜色">;
    readonly disabledElementColor: CssVariablePayload<"--rd-disabled-element-color", "#6c757d", "禁用元素颜色">;
    readonly accentColor: CssVariablePayload<"--rd-accent-color", "#17a2b8", "强调色">;
    readonly footerBackgroundColor: CssVariablePayload<"--rd-footer-background-color", "#343a40", "页脚背景色">;
    readonly breadcrumbColor: CssVariablePayload<"--rd-breadcrumb-color", "#6c757d", "面包屑颜色">;
    readonly dropdownMenuBackgroundColor: CssVariablePayload<"--rd-dropdown-menu-background-color", "#ffffff", "下拉菜单背景色">;
    readonly dropdownMenuTextColor: CssVariablePayload<"--rd-dropdown-menu-text-color", "#212529", "下拉菜单文本颜色">;
    readonly tooltipBackgroundColor: CssVariablePayload<"--rd-tooltip-background-color", "#343a40", "工具提示背景色">;
    readonly tooltipTextColor: CssVariablePayload<"--rd-tooltip-text-color", "#ffffff", "工具提示文本颜色">;
    readonly formLabelColor: CssVariablePayload<"--rd-form-label-color", "#495057", "表单标签颜色">;
    readonly cardBackgroundColor: CssVariablePayload<"--rd-card-background-color", "#ffffff", "卡片背景色">;
    readonly cardBorderColor: CssVariablePayload<"--rd-card-border-color", "#dee2e6", "卡片边框颜色">;
    readonly buttonHoverColor: CssVariablePayload<"--rd-button-hover-color", "#0056b3", "按钮悬停颜色">;
    readonly buttonActiveColor: CssVariablePayload<"--rd-button-active-color", "#004085", "按钮激活颜色">;
    readonly iconColor: CssVariablePayload<"--rd-icon-color", "#6c757d", "图标颜色">;
    readonly menuItemHoverColor: CssVariablePayload<"--rd-menu-item-hover-color", "#f8f9fa", "菜单项悬停颜色">;
    readonly menuItemActiveColor: CssVariablePayload<"--rd-menu-item-active-color", "#e9ecef", "菜单项激活颜色">;
    readonly panelBackgroundColor: CssVariablePayload<"--rd-panel-background-color", "#ffffff", "面板背景色">;
    readonly panelBorderColor: CssVariablePayload<"--rd-panel-border-color", "#dee2e6", "面板边框颜色">;
    readonly tldrawShapeItemParentSelectedBg: CssVariablePayload<"--rd-tldraw-shape-item-parent-selected-bg", "#f5f5f5", "tldraw 图形项父项选中背景色">;
    readonly tldrawShapeItemChildSelectedBg: CssVariablePayload<"--rd-tldraw-shape-item-child-selected-bg", "#f5f5f5", "tldraw 图形项子项选中背景色">;
    readonly tldrawShapeItemSelectedBg: CssVariablePayload<"--rd-tldraw-shape-item-selected-bg", "#e5e5e5", "tldraw 图形项选中背景色">;
    readonly tldrawShapeItemPaddingLeft: CssVariablePayload<"--rd-tldraw-shape-item-padding-left", "10px", "tldraw 图形项左侧内边距">;
    readonly dropdownBackgroundColor: CssVariablePayload<"--rd-dropdown-background-color", "#f7f7f7", "下拉菜单的背景颜色">;
    readonly dropdownTextColor: CssVariablePayload<"--rd-dropdown-text-color", "#333333", "下拉菜单的文字颜色">;
    readonly dropdownBorderRadius: CssVariablePayload<"--rd-dropdown-border-radius", "10px", "下拉菜单圆角大小">;
    readonly dropdownItemBorderRadius: CssVariablePayload<"--rd-dropdown-item-border-radius", "5px", "下拉菜单项圆角大小">;
    readonly dropdownMenuBorderRadius: CssVariablePayload<"--rd-dropdown-menu-border-radius", "8px", "下拉文件菜单圆角大小">;
    readonly dropdownMenuItemBorderRadius: CssVariablePayload<"--rd-dropdown-menu-item-border-radius", "8px", "下拉菜单项圆角大小">;
    readonly cardBorderRadius: CssVariablePayload<"--rd-card-border-radius", "12px", "卡片圆角">;
    readonly cardPadding: CssVariablePayload<"--rd-card-padding", "16px", "卡片内边距">;
    readonly messageBorderRadius: CssVariablePayload<"--rd-message-border-radius", "8px", "message圆角">;
    /** 成功按钮颜色 */
    readonly successMessageColor: CssVariablePayload<"--rd-success-message-color", "#28a745", "成功按钮颜色">;
    /** 警告按钮颜色 */
    readonly warningMessageColor: CssVariablePayload<"--rd-warning-message-color", "#ffc107", "警告按钮颜色">;
    /** 错误按钮颜色 */
    readonly errorMessageColor: CssVariablePayload<"--rd-error-message-color", "#dc3545", "错误按钮颜色">;
    /** 所有按钮 */
    readonly buttonBackgroundColor: CssVariablePayload<"--rd-button-background-color", "#ffffff", "">;
    readonly buttonTextColor: CssVariablePayload<"--rd-button-text-color", "#333333", "按钮文字颜色">;
    readonly buttonBorderRadius: CssVariablePayload<"--rd-button-border-radius", "10px", "按钮的圆角尺寸">;
    /** 主按钮 */
    readonly primaryButtonBackgroundColor: CssVariablePayload<"--rd-primary-button-background-color", "#1677ff", "主要按钮颜色">;
    readonly primaryButtonTextColor: CssVariablePayload<"--rd-primary-button-text-color", "#FFF", "主要按钮文字颜色">;
    /** 带边线的按钮 */
    readonly dashedButtonBackgroundColor: CssVariablePayload<"--rd-dashed-button-background-color", "#ffffff", "带边框按钮背景色">;
    readonly dashedButtonTextColor: CssVariablePayload<"--rd-dashed-button-text-color", "#333333", "带边框按钮文字颜色">;
    /** 默认的按钮 */
    readonly defaultButtonBackgroundColor: CssVariablePayload<"--rd-default-button-background-color", "#ffffff", "带边框按钮背景色">;
    readonly defaultButtonTextColor: CssVariablePayload<"--rd-default-button-text-color", "#333333", "带边框按钮文字颜色">;
    /** 链接按钮 */
    readonly linkButtonBackgroundColor: CssVariablePayload<"--rd-link-button-background-color", "unset", "带边框按钮背景色">;
    readonly linkButtonTextColor: CssVariablePayload<"--rd-link-button-text-color", "#1a73e8", "带边框按钮文字颜色">;
    /** 文本按钮 */
    readonly textButtonBackgroundColor: CssVariablePayload<"--rd-text-button-background-color", "#ffffff", "带边框按钮背景色">;
    readonly textButtonTextColor: CssVariablePayload<"--rd-text-button-text-color", "#333333", "带边框按钮文字颜色">;
    /** 主要背景色 */
    readonly primaryBackgroundColor: CssVariablePayload<"--rd-primary-background-color", "#ffffff", "主要背景色">;
    /** 二级次背景色 */
    readonly secondaryBackgroundColor: CssVariablePayload<"--rd-secondary-background-color", "#f7f7f7", "二级次背景色">;
    /** 三级次要背景色 */
    readonly thirdBackgroundColor: CssVariablePayload<"--rd-third-background-color", "#eeeeee", "三级次要背景色">;
    /** 四级次要背景色 */
    readonly fourthBackgroundColor: CssVariablePayload<"--rd-fourth-background-color", "#e5e5e5", "四级次要背景色">;
    /** 主题色 */
    readonly primaryColor: CssVariablePayload<"--rd-primary-color", "#007bff", "主题色">;
    readonly primaryTextColor: CssVariablePayload<"--rd-primary-text-color", "#333333", "主要文本颜色">;
    readonly secondaryTextColor: CssVariablePayload<"--rd-secondary-text-color", "#666666", "次要文本颜色">;
    readonly linkTextColor: CssVariablePayload<"--rd-link-text-color", "#1a73e8", "链接文本颜色">;
    /** 标题栏高度 */
    readonly captionBarHeight: CssVariablePayload<"--rd-caption-bar-height", "32px", "标题栏高度">;
    /** 标题栏背景色 */
    readonly captionBarBackgroundColor: CssVariablePayload<"--rd-caption-bar-background-color", "#f7f7f7", "标题栏背景色">;
    readonly navigationBarWidth: CssVariablePayload<"--rd-navigation-bar-width", "32px", "纵向导航栏宽度">;
    readonly navigationBarBackgroundColor: CssVariablePayload<"--rd-navigation-bar-background-color", "#f7f7f7", "导航栏背景色">;
    /** 控件宽度 */
    readonly widgetWidth: CssVariablePayload<"--rd-widget-width", "26px", "控件宽度">;
    /** 控件高度 */
    readonly widgetHeight: CssVariablePayload<"--rd-widget-height", "26px", "控件高度">;
    /** 控件颜色 */
    readonly widgetColor: CssVariablePayload<"--rd-widget-color", "#212529", "控件颜色">;
    /** 控件Hover */
    readonly widgetHoverBackgroundColor: CssVariablePayload<"--rd-widget-hover-background-color", "rgba(0, 0, 0, .1)", "控件悬浮背景色">;
    /** 控件圆角 */
    readonly widgetBorderRadius: CssVariablePayload<"--rd-widget-border-radius", "4px", "控件圆角">;
};

type RdCssVariablePayloadSheet = typeof cssVariablesPayloadSheet;

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
            type CssVariablesDeclaration = CssVariablesDeclaration<RdCssVariablePayloadSheet>;
            /**
             * 皮肤变量
             */
            type CssVars = CssVars<RdCssVariablePayloadSheet>;
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
                    'functional.theme.variables.transformer': ((variables: CssVariablesDeclaration<RdCssVariablePayloadSheet>) => CssVariablesDeclaration<RdCssVariablePayloadSheet>)[];
                    /**
                     * ui-header 图标展示
                     */
                    'ui.layout.header.icon': ComponentType;
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
                    'ui.layout.header.controller.widgets.min': ComponentType;
                    /**
                     * ui-header还原控件
                     */
                    'ui.layout.header.controller.widgets.reduction': ComponentType;
                    /**
                     * ui-header关闭控件
                     */
                    'ui.layout.header.controller.widgets.close': ComponentType;
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
            interface Extension extends Extension<never> {
                meta?: {
                    extension_id: number;
                    extension_name: string;
                    extension_uuid: string;
                    extension_version_id: number;
                    script_hash: string;
                };
            }
        }
        /**
         * RApp
         */
        interface RApp {
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
            readonly emitter: Emitter<Bus.BusEmitterEntries>;
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
                readonly rxcThread: Thread<Thread.ExtensionThreadEntries, Thread.MainThreadEntries>;
            };
            meta2d?: Meta2d;
            /**
             * 全局的状态管理
             */
            readonly stores: {
                readonly useUserStore: typeof useUserStore;
                readonly useTldrawStore: typeof useTldrawStore;
                readonly useThemeStore: typeof useThemeStore;
                readonly useDocStore: typeof useDocStore;
            };
            /**
             * 皮肤
             */
            readonly skin: Skin<RdCssVariablePayloadSheet>;
            readonly libs: {
                readonly injectReadonlyVariable: typeof injectReadonlyVariable;
                readonly createSallowProxy: typeof createSallowProxy;
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
                readonly Skin: typeof Skin;
                readonly Emitter: typeof Emitter;
                readonly Invoker: typeof Invoker;
                readonly ExtensionManager: typeof ExtensionManager;
                readonly MetadataManager: typeof MetadataManager;
            };
        }
    }
}
