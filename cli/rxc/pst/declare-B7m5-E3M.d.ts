import * as react from 'react';
import { ComponentType } from 'react';
import * as zustand_middleware from 'zustand/middleware';
import * as zustand from 'zustand';
import * as tldraw from 'tldraw';
import { TLStateNodeConstructor, TLAnyShapeUtilConstructor, TLUiOverrides, TLComponents } from 'tldraw';

interface Extension {
    /**
     * 插件的唯一标识 name
     */
    readonly name: string | symbol;
    /**
     * 插件版本
     */
    readonly version: string;
    /**
     * 插件被激活, 被使用的状态
     */
    readonly onActivated?: () => void;
    /**
     * 插件被去活, 被禁用的状态
     */
    readonly onDeactivated?: () => void;
    /**
     * 插件被注册
     */
    readonly onRegistered?: () => void;
    /**
     * 插件被卸载
     */
    readonly onUnregistered?: () => void;
    /**
     * 当前是否处于激活状态
     */
    readonly __isActivated: boolean;
    /**
     * 当前是否处于注册状态
     */
    readonly __isRegistered: boolean;
}

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
    protected useStore(): {};
    /**
     * 添加订阅函数
     */
    protected subscribe(listener: InnerStoreListener): InnerStoreDestroyListener;
    protected destroy(): void;
}

type ExtensionName = symbol | string;
declare class ExtensionManager extends InnerZustandStoreManager {
    private readonly extNameMap;
    /**
     * 某个插件
     */
    unregisterExtension(...extensions: (ExtensionName | Extension)[]): void;
    /**
     * Defines extension
     */
    defineExtension(define: Omit<Extension, '__isActivated' | '__isRegistered'>): Extension;
    /**
     * 注册插件
     */
    registerExtension(...extensions: Extension[]): void;
    /**
     * Activated extension
     */
    activatedExtension(name: string | symbol): void;
    /**
     * 去活某个插件
     */
    deactivatedExtension(name: string | symbol): void;
    /**
     * 获取扩展列表
     */
    useExtensionsList(): [{
        readonly extensions: Extension[];
    }];
    /**
     * extensions hooks,
     */
    useExtensions(): {
        readonly extensions: Extension[];
    }[];
    /**
     * 取消所有插件的注册
     */
    unregisterAllExtension(): void;
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
 *    age: number;w
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

declare namespace SKin {
    /**
     * CSS 变量的名称
     */
    type CssVariable = `--rapid-${string}`;
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
        readonly value: Value;
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
     * 从 payload 中提取出提示 tip
     */
    type ExtractCssVariableTipFromPayload<Payload extends CssVariablePayload> = Payload['tip'];
    /**
     * 表示所有 CSS 变量的负载映射
     */
    type CssVariablePayloadSheet<PayloadKey extends CssVariable> = {
        [Key in PayloadKey]: CssVariablePayload<PayloadKey>;
    };
}

/**
 * ==================================================================================
 * 该文件用于创建整个 App 中可以调整的 Css 样式列表
 * ==================================================================================
 */
declare const cssVariablesPayloadSheet: {
    readonly bodyFontSize: SKin.CssVariablePayload<"--rapid-body-font-size", "16px", "正文字体大小">;
    readonly headingFontSize: SKin.CssVariablePayload<"--rapid-heading-font-size", "24px", "标题字体大小">;
    readonly subheadingFontSize: SKin.CssVariablePayload<"--rapid-subheading-font-size", "20px", "小标题字体大小">;
    readonly buttonFontSize: SKin.CssVariablePayload<"--rapid-button-font-size", "14px", "按钮字体大小">;
    readonly formLabelFontSize: SKin.CssVariablePayload<"--rapid-form-label-font-size", "14px", "表单标签字体大小">;
    readonly tooltipFontSize: SKin.CssVariablePayload<"--rapid-tooltip-font-size", "12px", "工具提示字体大小">;
    readonly dropdownMenuItemHeight: SKin.CssVariablePayload<"--rapid-dropdown-menu-item-height", "40px", "下拉菜单项高度">;
    readonly footerHeight: SKin.CssVariablePayload<"--rapid-footer-height", "80px", "页脚高度">;
    readonly buttonPadding: SKin.CssVariablePayload<"--rapid-button-padding", "10px 20px", "按钮内边距">;
    readonly inputPadding: SKin.CssVariablePayload<"--rapid-input-padding", "10px 15px", "输入框内边距">;
    readonly tooltipPadding: SKin.CssVariablePayload<"--rapid-tooltip-padding", "8px 12px", "工具提示内边距">;
    readonly secondaryColor: SKin.CssVariablePayload<"--rapid-secondary-color", "#6c757d", "辅助色">;
    readonly linkColor: SKin.CssVariablePayload<"--rapid-link-color", "#007bff", "链接颜色">;
    readonly bodyTextColor: SKin.CssVariablePayload<"--rapid-body-text-color", "#212529", "正文文本颜色">;
    readonly headingTextColor: SKin.CssVariablePayload<"--rapid-heading-text-color", "#343a40", "标题文本颜色">;
    readonly borderColor: SKin.CssVariablePayload<"--rapid-border-color", "#dee2e6", "边框颜色">;
    readonly inputBackgroundColor: SKin.CssVariablePayload<"--rapid-input-background-color", "#ffffff", "输入框背景色">;
    readonly inputTextColor: SKin.CssVariablePayload<"--rapid-input-text-color", "#495057", "输入框文本颜色">;
    readonly placeholderTextColor: SKin.CssVariablePayload<"--rapid-placeholder-text-color", "#6c757d", "占位符文本颜色">;
    readonly disabledElementColor: SKin.CssVariablePayload<"--rapid-disabled-element-color", "#6c757d", "禁用元素颜色">;
    readonly accentColor: SKin.CssVariablePayload<"--rapid-accent-color", "#17a2b8", "强调色">;
    readonly footerBackgroundColor: SKin.CssVariablePayload<"--rapid-footer-background-color", "#343a40", "页脚背景色">;
    readonly breadcrumbColor: SKin.CssVariablePayload<"--rapid-breadcrumb-color", "#6c757d", "面包屑颜色">;
    readonly dropdownMenuBackgroundColor: SKin.CssVariablePayload<"--rapid-dropdown-menu-background-color", "#ffffff", "下拉菜单背景色">;
    readonly dropdownMenuTextColor: SKin.CssVariablePayload<"--rapid-dropdown-menu-text-color", "#212529", "下拉菜单文本颜色">;
    readonly tooltipBackgroundColor: SKin.CssVariablePayload<"--rapid-tooltip-background-color", "#343a40", "工具提示背景色">;
    readonly tooltipTextColor: SKin.CssVariablePayload<"--rapid-tooltip-text-color", "#ffffff", "工具提示文本颜色">;
    readonly formLabelColor: SKin.CssVariablePayload<"--rapid-form-label-color", "#495057", "表单标签颜色">;
    readonly cardBackgroundColor: SKin.CssVariablePayload<"--rapid-card-background-color", "#ffffff", "卡片背景色">;
    readonly cardBorderColor: SKin.CssVariablePayload<"--rapid-card-border-color", "#dee2e6", "卡片边框颜色">;
    readonly buttonHoverColor: SKin.CssVariablePayload<"--rapid-button-hover-color", "#0056b3", "按钮悬停颜色">;
    readonly buttonActiveColor: SKin.CssVariablePayload<"--rapid-button-active-color", "#004085", "按钮激活颜色">;
    readonly iconColor: SKin.CssVariablePayload<"--rapid-icon-color", "#6c757d", "图标颜色">;
    readonly menuItemHoverColor: SKin.CssVariablePayload<"--rapid-menu-item-hover-color", "#f8f9fa", "菜单项悬停颜色">;
    readonly menuItemActiveColor: SKin.CssVariablePayload<"--rapid-menu-item-active-color", "#e9ecef", "菜单项激活颜色">;
    readonly panelBackgroundColor: SKin.CssVariablePayload<"--rapid-panel-background-color", "#ffffff", "面板背景色">;
    readonly panelBorderColor: SKin.CssVariablePayload<"--rapid-panel-border-color", "#dee2e6", "面板边框颜色">;
    readonly tldrawShapeItemParentSelectedBg: SKin.CssVariablePayload<"--rapid-tldraw-shape-item-parent-selected-bg", "#f5f5f5", "tldraw 图形项父项选中背景色">;
    readonly tldrawShapeItemChildSelectedBg: SKin.CssVariablePayload<"--rapid-tldraw-shape-item-child-selected-bg", "#f5f5f5", "tldraw 图形项子项选中背景色">;
    readonly tldrawShapeItemSelectedBg: SKin.CssVariablePayload<"--rapid-tldraw-shape-item-selected-bg", "#e5e5e5", "tldraw 图形项选中背景色">;
    readonly tldrawShapeItemPaddingLeft: SKin.CssVariablePayload<"--rapid-tldraw-shape-item-padding-left", "10px", "tldraw 图形项左侧内边距">;
    readonly dropdownBackgroundColor: SKin.CssVariablePayload<"--rapid-dropdown-background-color", "#f7f7f7", "下拉菜单的背景颜色">;
    readonly dropdownTextColor: SKin.CssVariablePayload<"--rapid-dropdown-text-color", "#333333", "下拉菜单的文字颜色">;
    readonly dropdownBorderRadius: SKin.CssVariablePayload<"--rapid-dropdown-border-radius", "10px", "下拉菜单圆角大小">;
    readonly dropdownItemBorderRadius: SKin.CssVariablePayload<"--rapid-dropdown-item-border-radius", "5px", "下拉菜单项圆角大小">;
    readonly dropdownMenuBorderRadius: SKin.CssVariablePayload<"--rapid-dropdown-menu-border-radius", "8px", "下拉文件菜单圆角大小">;
    readonly dropdownMenuItemBorderRadius: SKin.CssVariablePayload<"--rapid-dropdown-menu-item-border-radius", "8px", "下拉菜单项圆角大小">;
    readonly cardBorderRadius: SKin.CssVariablePayload<"--rapid-card-border-radius", "12px", "卡片圆角">;
    readonly cardPadding: SKin.CssVariablePayload<"--rapid-card-padding", "16px", "卡片内边距">;
    readonly messageBorderRadius: SKin.CssVariablePayload<"--rapid-message-border-radius", "8px", "message圆角">;
    /** 成功按钮颜色 */
    readonly successMessageColor: SKin.CssVariablePayload<"--rapid-success-message-color", "#28a745", "成功按钮颜色">;
    /** 警告按钮颜色 */
    readonly warningMessageColor: SKin.CssVariablePayload<"--rapid-warning-message-color", "#ffc107", "警告按钮颜色">;
    /** 错误按钮颜色 */
    readonly errorMessageColor: SKin.CssVariablePayload<"--rapid-error-message-color", "#dc3545", "错误按钮颜色">;
    /** 所有按钮 */
    readonly buttonBackgroundColor: SKin.CssVariablePayload<"--rapid-button-background-color", "#ffffff", "">;
    readonly buttonTextColor: SKin.CssVariablePayload<"--rapid-button-text-color", "#333333", "按钮文字颜色">;
    readonly buttonBorderRadius: SKin.CssVariablePayload<"--rapid-button-border-radius", "10px", "按钮的圆角尺寸">;
    /** 主按钮 */
    readonly primaryButtonBackgroundColor: SKin.CssVariablePayload<"--rapid-primary-button-background-color", "#1677ff", "主要按钮颜色">;
    readonly primaryButtonTextColor: SKin.CssVariablePayload<"--rapid-primary-button-text-color", "#FFF", "主要按钮文字颜色">;
    /** 带边线的按钮 */
    readonly dashedButtonBackgroundColor: SKin.CssVariablePayload<"--rapid-dashed-button-background-color", "#ffffff", "带边框按钮背景色">;
    readonly dashedButtonTextColor: SKin.CssVariablePayload<"--rapid-dashed-button-text-color", "#333333", "带边框按钮文字颜色">;
    /** 默认的按钮 */
    readonly defaultButtonBackgroundColor: SKin.CssVariablePayload<"--rapid-default-button-background-color", "#ffffff", "带边框按钮背景色">;
    readonly defaultButtonTextColor: SKin.CssVariablePayload<"--rapid-default-button-text-color", "#333333", "带边框按钮文字颜色">;
    /** 链接按钮 */
    readonly linkButtonBackgroundColor: SKin.CssVariablePayload<"--rapid-link-button-background-color", "unset", "带边框按钮背景色">;
    readonly linkButtonTextColor: SKin.CssVariablePayload<"--rapid-link-button-text-color", "#1a73e8", "带边框按钮文字颜色">;
    /** 文本按钮 */
    readonly textButtonBackgroundColor: SKin.CssVariablePayload<"--rapid-text-button-background-color", "#ffffff", "带边框按钮背景色">;
    readonly textButtonTextColor: SKin.CssVariablePayload<"--rapid-text-button-text-color", "#333333", "带边框按钮文字颜色">;
    /** 主要背景色 */
    readonly primaryBackgroundColor: SKin.CssVariablePayload<"--rapid-primary-background-color", "#ffffff", "主要背景色">;
    /** 二级次背景色 */
    readonly secondaryBackgroundColor: SKin.CssVariablePayload<"--rapid-secondary-background-color", "#f7f7f7", "二级次背景色">;
    /** 三级次要背景色 */
    readonly thirdBackgroundColor: SKin.CssVariablePayload<"--rapid-third-background-color", "#eeeeee", "三级次要背景色">;
    /** 四级次要背景色 */
    readonly fourthBackgroundColor: SKin.CssVariablePayload<"--rapid-fourth-background-color", "#e5e5e5", "四级次要背景色">;
    /** 主题色 */
    readonly primaryColor: SKin.CssVariablePayload<"--rapid-primary-color", "#007bff", "主题色">;
    readonly primaryTextColor: SKin.CssVariablePayload<"--rapid-primary-text-color", "#333333", "主要文本颜色">;
    readonly secondaryTextColor: SKin.CssVariablePayload<"--rapid-secondary-text-color", "#666666", "次要文本颜色">;
    readonly linkTextColor: SKin.CssVariablePayload<"--rapid-link-text-color", "#1a73e8", "链接文本颜色">;
    /** 标题栏高度 */
    readonly captionBarHeight: SKin.CssVariablePayload<"--rapid-caption-bar-height", "32px", "标题栏高度">;
    /** 标题栏背景色 */
    readonly captionBarBackgroundColor: SKin.CssVariablePayload<"--rapid-caption-bar-background-color", "#f7f7f7", "标题栏背景色">;
    readonly navigationBarWidth: SKin.CssVariablePayload<"--rapid-navigation-bar-width", "32px", "纵向导航栏宽度">;
    readonly navigationBarBackgroundColor: SKin.CssVariablePayload<"--rapid-navigation-bar-background-color", "#f7f7f7", "导航栏背景色">;
    /** 控件宽度 */
    readonly widgetWidth: SKin.CssVariablePayload<"--rapid-widget-width", "26px", "控件宽度">;
    /** 控件高度 */
    readonly widgetHeight: SKin.CssVariablePayload<"--rapid-widget-height", "26px", "控件高度">;
    /** 控件颜色 */
    readonly widgetColor: SKin.CssVariablePayload<"--rapid-widget-color", "#212529", "控件颜色">;
    /** 控件Hover */
    readonly widgetHoverBackgroundColor: SKin.CssVariablePayload<"--rapid-widget-hover-background-color", "rgba(0, 0, 0, .1)", "控件悬浮背景色">;
    /** 控件圆角 */
    readonly widgetBorderRadius: SKin.CssVariablePayload<"--rapid-widget-border-radius", "4px", "控件圆角">;
};

type CssVariablesPayloadSheetType = typeof cssVariablesPayloadSheet;
declare namespace RdSKin {
    /**
     * 创建的主题变量负载映射表
     */
    type CssVariablesPayloadSheet = {
        [Key in keyof CssVariablesPayloadSheetType]: Omit<CssVariablesPayloadSheetType[Key], 'value'> & {
            value: (CssVariablesPayloadSheetType[Key]['value'] extends string ? string : (CssVariablesPayloadSheetType[Key]['value'] extends number ? number : CssVariablesPayloadSheetType[Key]['value']));
        };
    };
    /**
     * 主题变量的声明表: 例如: { '--rapid-xx-xx': '#FFF' }
     * */
    type CssVariablesDeclaration = {
        [Key in (keyof typeof cssVariablesPayloadSheet) as SKin.ExtractCssVariableFromPayload<CssVariablesPayloadSheetType[Key]>]: SKin.ExtractCssVariableValueFromPayload<CssVariablesPayloadSheetType[Key]> extends number ? number : string;
    };
    function toCssVariablesDeclaration(): CssVariablesDeclaration;
    /**
     * CSS 变量引用的字符串形式
     */
    type CssVar<Payload extends SKin.CssVariablePayload> = `var(${SKin.ExtractCssVariableFromPayload<Payload>}, ${SKin.ExtractCssVariableValueFromPayload<Payload>})`;
    /**
     * 通过预设 payload 创建 cssVar
     */
    function toCssVar<Payload extends SKin.CssVariablePayload>(selector: (sheet: CssVariablesPayloadSheetType) => Payload): CssVar<Payload>;
    /**
     * cssVars sheet
     */
    type CssVarsSheet = {
        readonly [Key in keyof CssVariablesPayloadSheetType]: CssVar<CssVariablesPayloadSheetType[Key]>;
    };
    /**
     * 通过预设创建 cssVars sheet
     */
    function toCssVars(): CssVarsSheet;
    /**
     * 安装
     */
    const install: (declaration: CssVariablesDeclaration) => void;
    /**
     * 卸载
     */
    const uninstall: () => void;
}

type EmitterKey = '*' | string | symbol | number;
type EmitterListener = (...args: unknown[]) => Promise<any> | any;
declare abstract class EmitterManager {
    private readonly eventMap;
    /**
     * 获取一个事件监听的混合存储对象
     */
    private getBusListenerHybrid;
    /**
     * 订阅
     * @returns
     */
    protected subscribe<Listener extends EmitterListener>(busName: EmitterKey, listener: Listener, options?: {
        once?: boolean;
    }): () => void;
    /**
     * 取消订阅
     * @returns
     */
    protected unsubscribe<Listener extends EmitterListener>(busName: EmitterKey, listener: Listener): void;
    /**
     * 通知处理事件
     */
    protected notice(busName: Exclude<EmitterKey, '*'>, ...args: any[]): Promise<void>;
    /**
     * 同步通知处理事件
     */
    protected noticeSync(busName: Exclude<EmitterKey, '*'>, ...args: any[]): void;
    /**
     * 删除所有事件订阅
     */
    protected clear(busName: Exclude<EmitterKey, '*'>): void;
}

declare class Emitter<BEvent extends Record<string | symbol | number, any>> extends EmitterManager {
    /**
     * 异步发射一个事件
     */
    emit<BKey extends keyof BEvent>(busName: BKey, data: BEvent[BKey]): Promise<void>;
    /**
     * 监听一个事件
     */
    on<BKey extends keyof BEvent>(busName: BKey, listener: (data: BEvent[BKey]) => (void | Promise<void>), options?: {
        once?: boolean;
    }): () => void;
    once<BKey extends keyof BEvent>(busName: BKey, listener: (data: BEvent[BKey]) => (void | Promise<void>)): () => void;
    /**
     * 移除监听某个事件
     */
    off<BKey extends keyof BEvent>(busName: BKey, listener: (data: BEvent[BKey]) => (void | Promise<void>)): void;
    /**
     * 移除所有监听
     */
    clear<BKey extends keyof BEvent>(busName: BKey): void;
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

declare namespace Bus {
    interface BusEvent {
        /**
         * 测试构建类型
         */
        'test': never;
    }
}
declare namespace Metadata {
    /**
     * 注册元数据的入口映射关系
     */
    interface MetadataEntries {
        /**
         * 功能 - 主题 - 变量 - 转换
         */
        'functional.theme.variables.transformer': ((variables: RdSKin.CssVariablesDeclaration) => RdSKin.CssVariablesDeclaration)[];
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
    }
}
declare interface RApp {
    /**
     * 插件管理器
     */
    readonly extension: ExtensionManager;
    /**
     * 元数据管理器
     */
    readonly metadata: MetadataManager<Metadata.MetadataEntries>;
    /**
     * 主题
     */
    readonly RdSKin: typeof RdSKin;
    /**
     * 事件总线
     */
    readonly emitter: Emitter<Bus.BusEvent>;
    /**
     * 全局的状态管理
     */
    readonly stores: {
        readonly useUserStore: typeof useUserStore;
        readonly useTldrawStore: typeof useTldrawStore;
        readonly useThemeStore: typeof useThemeStore;
        readonly useDocStore: typeof useDocStore;
    };
}

export { Bus as B, Metadata as M, type RApp as R, RdSKin as a };
