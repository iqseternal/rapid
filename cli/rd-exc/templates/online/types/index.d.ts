import * as _suey_pkg_utils from '@suey/pkg-utils';
import { AxiosError, RequestConfig, ApiPromiseResultTypeBuilder, AxiosResponse, Ansi, CutHead } from '@suey/pkg-utils';
import * as _meta2d_core from '@meta2d/core';
import * as react from 'react';
import { ComponentType, HTMLAttributes, ReactNode, Component, FC, LazyExoticComponent, ForwardRefExoticComponent, MemoExoticComponent, ReactElement } from 'react';
import * as _vue_reactivity from '@vue/reactivity';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as antd from 'antd';
import { TooltipProps, PopoverProps } from 'antd';
import * as iconInstance from '@ant-design/icons';
import iconInstance__default from '@ant-design/icons';
import { Property } from 'csstype';
import * as react_i18next from 'react-i18next';
import i18n from 'i18next';
import * as zustand_middleware from 'zustand/middleware';
import * as zustand from 'zustand';
import * as moment from 'moment';
import * as react_transition_group from 'react-transition-group';
import * as _react_spring_web from '@react-spring/web';
import { ElectronAPI } from '@electron-toolkit/preload';
import { IpcMainInvokeEvent, IpcMainEvent, OpenDevToolsOptions, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

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

declare global {

  /**
   * 事件总线相关的类型定义
   */
  export namespace Rapid.Bus {
    /**
     * 事件总线 Emitter 的入口映射关系
     */
    export type BusEmitterEntries = {
      'react-app-first-rendered': void;
    }

    /**
     * 事件总线 Invoker 的入口映射关系
     */
    export type BusInvokerEntries = {
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
    }
  }
}

type ExtensionName = string;
type ExtensionOnActivated<Context = unknown> = (context?: Context) => ((() => void) | Promise<(() => void)> | void | Promise<void>);
type ExtensionOnDeactivated<Context = unknown> = (context?: Context) => (void | Promise<void>);
interface ExtensionOptions<Context = unknown> {
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
    readonly onActivated: ExtensionOnActivated<Context>;
    readonly onDeactivated?: ExtensionOnDeactivated<Context>;
}
declare class Extension {
    /**
     * 插件对象标识符
     */
    private readonly __TAG__;
    private isActivated;
    readonly name: ExtensionName;
    readonly version: string | number;
    readonly meta?: any;
    readonly onActivated: ExtensionOnActivated;
    readonly onDeactivated?: ExtensionOnDeactivated;
    constructor(options: ExtensionOptions);
    getIsActivated(): boolean;
    activated(): Promise<void>;
    deactivated(): Promise<void>;
    static isExtension(extension: any): extension is Extension;
}
/**
 * 定义一个插件, 这里所抽象得插件只是一个携带数据得对象、以及具有特殊时机执行得函数
 *
 * 1. 插件件可以有自己的生命周期函数, 例如 onActivated, onDeactivated
 * 2. 插件可以调动 metadataManager 从而实现插件化开发
 * 3. 调动 emitter 实现事件触发
 */
declare class ExtensionManager<Ext extends Extension> {
    private readonly rxpInnerStore;
    private readonly extNameMapStore;
    /**
     * Define extension, 定义插件, 那么插件会被存储到 Map 中.
     */
    defineExtension(define: ExtensionOptions): Extension;
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
    getExtension(extensionName: ExtensionName): Extension;
    /**
     * 注册一个扩展
     */
    registerExtension<DExt extends Ext>(extension: DExt): void;
    /**
     * Activated extension
     */
    activatedExtension(name: ExtensionName): Promise<void>;
    /**
     * 去活某个插件
     */
    deactivatedExtension(name: ExtensionName): Promise<void>;
    /**w
     * 删除扩展
     */
    delExtension(name: ExtensionName): Promise<void>;
    /**
     * 获取扩展列表
     */
    useExtensionsList(): readonly [Extension[]];
    /**
     * 获得所有的插件
     */
    getExtensions(): readonly Extension[];
}

type IsAny<T, SuccessReturnType, FailReturnType> = (T extends never ? 'yes' : 'no') extends 'no' ? FailReturnType : SuccessReturnType;
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
/**
 * 元数据, 在页面中组件的变化可能相距甚远
 * 进入到某一个页面, 可能其他大组件下的某处地方可能发生元素更改, 那么使用本 store 进行连携
 *
 * 1. 在可能变化的地方获取槽点数据, 可能是字符也有可能是其他的
 *
 * 2. 在特殊时机, 注册槽点数据, 从而响应式自动更新到子孙或者兄弟级甚远的组件进行渲染
 *
 */
declare class MetadataManager<MetadataEntries extends Record<string, any>> {
    private readonly rxpInnerStore;
    private readonly metadataMap;
    constructor();
    /**
     * 定义 store 元数据, 元数据可以是任何东西
     * @example
     * metadata.defineMetadata('example-key', 1);
     * metadata.defineMetadata('example-key', 'a');
     * metadata.defineMetadata('example-key', {});
     * metadata.defineMetadata('example-key', () => { return (<div />) });
     */
    defineMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): () => void;
    /**
     * 获取定义的元数据
     * @example
     * metadata.getMetadata('example-key');
     */
    getMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): MetadataEntries[MetadataKey] | null;
    /**
     * 获取元数据列表中最新注册的元数据
     */
    getMetadataLatestInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null;
    /**
     * 获取元数据列表中最旧注册的元数据
     */
    getMetadataOldestInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null;
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
    defineMetadataInSingle<MetadataKey extends keyof ExtractSingleEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): () => void;
    /**
     * 定义多个元数据组合的容器型元数据列表, 顾名思义, 也就是某个元数据的定义是数组时使用, 能够自动从数组中添加单个该元数据, 而不是全部覆盖
     * @example
     * metadata.defineMetadataInVector('example-key', 1);
     * metadata.defineMetadataInVector('example-key', 'a');
     * metadata.defineMetadataInVector('example-key', {});
     * metadata.defineMetadataInVector('example-key', () => { return (<div />) });
     */
    defineMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): (() => void);
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
    /**
     * 在组件中注册元数据, 跟随当前组件生命周期, 组件卸载时自动删除
     */
    useFollowMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): void;
    /**
     * 在组件中注册元数据, 跟随当前组件生命周期, 组件卸载时自动删除
     */
    useFollowMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): void;
    /**
     * 在组件中注册元数据, 跟随当前组件生命周期, 组件卸载时自动删除
     */
    useFollowMetadataInSingle<MetadataKey extends keyof ExtractSingleEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): void;
}

// ==================================================================================================
// ===== WHY TO THIS
// ===== 对已有的类型进行别名定义 - 如果不别名定义会导致 Rapid 域中具有重复的标识符, 会导致 tsup 解析声明出现冲突错误
// ==================================================================================================
interface RdExtension extends Extension {
  meta?: {
    extension_id: number;
    extension_name: string;
    extension_uuid: string;
    extension_version_id: number;
    script_hash: string;
  }
}

declare global {

  /**
   * 扩展相关的类型定义
   */
  export namespace Rapid.Extend {
    /**
     * 扩展的元数据
     */
    export namespace Metadata {

      /**
       * 注册元数据的入口映射关系
       */
      export interface MetadataEntries {
        'test': any;
        'tests': any[];

        /**
         * 功能 - meta2d - 注册
         */
        'functional.meta2d.lifecycle.registered': ((meta2d: _meta2d_core.Meta2d) => void)[];

        /**
         * 功能 - meta2d - 卸载
         */
        'functional.meta2d.lifecycle.unregistered': ((meta2d: _meta2d_core.Meta2d) => void)[];

        // =====================================================================================================
        // =====================================================================================================
        // =====================================================================================================

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
    export interface ExtensionContext { }

    /**
     * 扩展
     */
    export interface Extension extends RdExtension { }
  }
}

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
    readonly hoverStyleBackground?: Property.Background;
    readonly hasInnerPadding?: boolean;
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
declare const classnames: (...args: (string | undefined | boolean | null | number | Record<string, boolean | undefined>)[]) => string;
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
declare const isReactComponent: <Target extends FC<any> | LazyExoticComponent<FC<any>> | ForwardRefExoticComponent<any> | Component<any, {}, any>>(target: any) => target is Target;

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
    Month29 = 2505600000,
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
 * 对接扩展心跳机制的凭证
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
        mainSidebar: SidebarStatus | 'left' | 'right' | 'none';
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
            mainSidebar: SidebarStatus | 'left' | 'right' | 'none';
        };
    }) => void), shouldReplace?: boolean): void;
}>;

type EmitterListener<T> = (data?: T) => void | Promise<void>;
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
declare const printerService: PrinterService;
/**
 * renderer 线程打印器类型
 */
interface PrinterType {
    /**
     * 打印日志
     */
    readonly print: typeof printerService.print;
    /**
     * 打印日志
     */
    readonly printInfo: typeof printerService.printInfo;
    /**
     * 打印一条警告信息
     */
    readonly printWarn: typeof printerService.printWarn;
    /**
     * 打印一条错误信息
     */
    readonly printError: typeof printerService.printError;
    /**
     * 打印一条成功信息
     */
    readonly printSuccess: typeof printerService.printSuccess;
}

/**
 * 应用的 store 类型
 */
interface IpcStore<StoreSheet extends Record<string | number, any>> {
    /**
     * 获取应用的 store
     */
    getStore: () => Promise<StoreSheet>;
    /**
     *
     */
    get: <Key extends keyof StoreSheet>(key: Key, defaultValue?: StoreSheet[Key]) => Promise<StoreSheet[Key]>;
    /**
     *
     */
    set: <Key extends keyof StoreSheet>(key: Key, value: StoreSheet[Key]) => Promise<void>;
    /**
     *
     */
    delete: <Key extends keyof StoreSheet>(key: Key) => Promise<void>;
    /**
     *
     */
    has: <Key extends keyof StoreSheet>(key: Key) => Promise<boolean>;
    /**
     *
     */
    reset: <Key extends keyof StoreSheet>(...keys: Key[]) => Promise<void>;
    /**
     *
     */
    clear: () => Promise<void>;
}

interface AppStoreType {
    refreshToken: string;
    accessToken: string;
    test: number;
}

/**
 * @rapid/m-ipc-core - Common Types
 *
 * 通用类型定义（所有环境可用）
 */

/**
 * IPC 类型：handle（双向通信，有返回值）
 */
type IpcTypeHandle = 'handle';
/**
 * IPC 类型：on（单向通知，无返回值）
 */
type IpcTypeOn = 'on';
/**
 * IPC 类型：both（兼容态，可用于 handle 或 on）
 */
type IpcTypeBoth = 'both';
/**
 * IPC 完整类型（所有类型的联合）
 */
type IpcType = IpcTypeHandle | IpcTypeOn | IpcTypeBoth;
/**
 * 根据 IPC 类型推导默认事件对象
 * - handle: IpcMainInvokeEvent
 * - on: IpcMainEvent
 * - both: IpcMainInvokeEvent | IpcMainEvent
 */
type IpcDefaultEvent<T extends IpcType> = (T extends IpcTypeBoth ? IpcMainInvokeEvent | IpcMainEvent : (T extends IpcTypeHandle ? IpcMainInvokeEvent : IpcMainEvent));
/**
 * IPC 处理器接口（未注册的处理器）
 *
 * 通用处理器抽象，注册时决定作为 Handle 还是 On
 *
 * @template Type - 注册类型（默认 'both'，兼容态）
 * @template FirstArg - 第一个参数类型（可自定义，如 WindowService）
 * @template Channel - 通道名称
 * @template ProcessorHandler - 处理函数类型
 */
interface IpcProcessor<Type extends IpcType = IpcTypeBoth, FirstArg extends unknown = unknown, Channel extends string = string, ProcessorHandler extends ((...args: [any, ...(any[])]) => any) = ((...args: [FirstArg, ...(any[])]) => any)> {
    /**
     * 通道名称
     */
    readonly channel: Channel;
    /**
     * IPC 类型（'handle' | 'on' | 'both'）
     */
    readonly type: Type;
    /**
     * 中间件列表（只读）
     */
    get middlewares(): IpcMiddleware[];
    /**
     * 业务处理函数
     *
     * @description 不直接使用 ProcessorHandler 标注，避免泛型函数第一个参数推导为 any
     */
    readonly handler: ProcessorHandler;
    /**
     * 监听器函数（带中间件包装的实际执行函数）
     */
    readonly listener: (event: IpcDefaultEvent<Type>, ...args: CutHead<Parameters<ProcessorHandler>>) => Promise<Awaited<ReturnType<ProcessorHandler>>>;
    /**
     * 添加中间件（支持链式调用）
     *
     * @example
     * ```ts
     * processor.useMiddleware(loggerMiddleware, authMiddleware);
     * ```
     */
    useMiddleware: (...middlewares: IpcMiddleware[]) => this;
    /**
     * 移除中间件（支持链式调用）
     */
    revokeMiddleware: (...middlewares: IpcMiddleware[]) => this;
}
/**
 * 兼容的 IpcProcessor 类型（涵盖所有子类型）
 */
type IpcCompatibleProcessor = IpcProcessor<IpcType, any, string, (...args: any[]) => any>;
/**
 * IPC 中间件上下文（传递给中间件的生命周期钩子）
 */
interface IpcMiddlewareContext {
    /**
     * 通道名称
     */
    readonly channel: string;
    /**
     * IPC 类型
     */
    readonly type: IpcType;
    /**
     * 原始事件对象
     */
    readonly event: IpcMainInvokeEvent | IpcMainEvent;
    /**
     * 执行开始时间戳（毫秒）
     */
    readonly startTime: number;
    /**
     * 中间件间共享的元数据存储
     */
    readonly metadata: Map<string, any>;
}
/**
 * IPC 中间件接口（洋葱模型）
 *
 * 中间件按注册顺序形成洋葱结构：
 * - 请求阶段：从外层到内层（onBeforeEach → transformArgs）
 * - 响应阶段：从内层到外层（onSuccess/onError → onAfterEach）
 */
interface IpcMiddleware {
    /**
     * 中间件名称（唯一标识符）
     */
    readonly name: string;
    /**
     * 前置钩子（请求阶段，洋葱外层）
     *
     * 在下一个中间件或 handler 执行之前调用
     * 可访问原始事件和参数，但不可修改
     */
    readonly onBeforeEach?: (ctx: IpcMiddlewareContext, ...args: unknown[]) => Promise<void> | void;
    /**
     * 参数转换函数（请求阶段，洋葱外层）
     *
     * 用于转换参数（如将 Event 转换为 WindowService）
     * 返回新的参数数组，传递给下一个中间件或 handler
     */
    readonly transformArgs?: (ctx: IpcMiddlewareContext, ...args: [unknown, ...unknown[]]) => Promise<[any, ...any[]]> | [any, ...any[]];
    /**
     * 错误回调（响应阶段，洋葱内层）
     *
     * 仅在 handler 或前置中间件抛出错误时调用
     *
     * @returns
     * - true: 错误已处理，停止向外冒泡
     * - false/void: 继续向外层中间件冒泡
     */
    readonly onError?: (ctx: IpcMiddlewareContext, error: Error) => Promise<boolean | void> | boolean | void;
    /**
     * 响应转换器
     *
     * 用于统一转换响应数据格式
     */
    readonly transformResponse?: <Data extends any>(ctx: IpcMiddlewareContext, response: Data) => Promise<any>;
    /**
     * 后置钩子（响应阶段，洋葱内层）
     *
     * 在 handler 执行之后调用（无论成功或失败）
     * 可访问处理结果，但不可修改
     */
    readonly onAfterEach?: (ctx: IpcMiddlewareContext, result?: any, response?: any) => Promise<void> | void;
}
/**
 * 渲染进程 IPC 调用选项
 */
interface IpcCallerConfig {
    /**
     * 超时时间（毫秒），0 表示不超时
     */
    timeout?: number;
    /**
     * 重试次数
     */
    retry?: number;
    /**
     * 重试间隔（毫秒）
     */
    retryDelay?: number;
}

/**
 * 处理器转换类型
 * @description 将 IPC 处理器转换为包含通道、类型、参数、返回值和自定义处理器的完整结构
 * @template T - 要转换的 IPC 兼容处理器类型
 */
type MutateProcessor<T extends IpcCompatibleProcessor> = {
    /** IPC 通信通道名称 */
    channel: T['channel'];
    /** IPC 类型（handle/on/both） */
    type: T['type'];
    /**
     * 处理器参数列表（去除第一个事件参数）
     * @description 使用 CutHead 工具类型移除 listener 的第一个参数（通常是事件对象）
     */
    args: CutHead<Parameters<T['listener']>>;
    /**
     * 处理器返回值类型
     * @description 等待 handler 返回值的 Promise 解析后的类型
     */
    return: Awaited<ReturnType<T['handler']>>;
    /**
     * 自定义处理器函数
     * @description 接收去除第一个参数后的 handler 参数，返回 listener 的完整返回值类型
     */
    handler: (...args: CutHead<Parameters<T['handler']>>) => ReturnType<T['listener']>;
};
/**
 * 处理器记录转换映射表
 * @description 将处理器记录对象转换为以通道名称为键的 MutateProcessor 映射表
 * @template PRecord - 处理器记录对象，键为任意字符串，值为 IPC 兼容处理器
 */
type MutateProcessorSheet<PRecord extends Record<string, IpcCompatibleProcessor>> = {
    [Key in keyof PRecord as PRecord[Key]['channel']]: MutateProcessor<PRecord[Key]>;
};
/**
 * 提取指定类型的处理器映射表
 * @description 从完整的处理器映射表中筛选出符合指定 IPC 类型的处理器
 * @template PRecord - 已转换的处理器映射表
 * @template PType - 要筛选的目标 IPC 类型
 */
type ExtractMutateProcessorSheet<PRecord extends MutateProcessorSheet<Record<string, IpcCompatibleProcessor>>, PType extends IpcType> = {
    [Key in keyof PRecord as (PRecord[Key]['type'] extends (PType | IpcTypeBoth) ? Key : never)]: PRecord[Key];
};

/**
 * 渲染进程 IPC 调用器类
 *
 * 提供面向对象的渲染进程 IPC 调用方式
 */
declare class IpcAbstractCaller<IpcProcessorSheet extends MutateProcessorSheet<Record<string, IpcCompatibleProcessor>>> {
    protected readonly ipcCallerConfig: IpcCallerConfig;
    /**
     * 创建 IPC 调用器实例
     *
     * @param ipcCallerConfig
     */
    constructor(ipcCallerConfig?: IpcCallerConfig);
    /**
     * 解析 ipc 拒绝信息字符串为可用 Error
     */
    private extractIpcRefusedReason;
    /**
     * 调用 IPC 句柄
     *
     * @param channel - 句柄名称
     * @param args - 参数列表
     * @returns 响应结果
     */
    invoke: <Key extends keyof ExtractMutateProcessorSheet<IpcProcessorSheet, "handle">>(channel: Key, ...args: IpcProcessorSheet[Key]["args"]) => Promise<IpcProcessorSheet[Key]["return"]>;
    /**
     * 创建 IPC 句柄调用器
     *
     * @param channel - 句柄名称
     * @returns 句柄调用器
     * @description 用于快速创建 IPC 句柄调用器
     * @example
     * ```ts
     * const get = ipcCaller.makeInvoker('get');
     * const result = await get(...args);
     * ```
     */
    makeInvoker: <Key extends keyof ExtractMutateProcessorSheet<IpcProcessorSheet, "handle">>(channel: Key) => (...args: IpcProcessorSheet[Key]["args"]) => Promise<IpcProcessorSheet[Key]["return"]>;
    /**
     * 发送 IPC 消息
     *
     * @param channel - 通道名称
     * @param args - 参数列表
     */
    send: <Key extends keyof ExtractMutateProcessorSheet<IpcProcessorSheet, "on">>(channel: Key, ...args: IpcProcessorSheet[Key]["args"]) => void;
}

/**
 * 浏览器进程 IPC 调用器类
 */
declare class IpcBCaller<IpcProcessorSheet extends MutateProcessorSheet<Record<string, IpcCompatibleProcessor>>> extends IpcAbstractCaller<IpcProcessorSheet> {
}

/**
 * ====================================================================================
 * ipc 广播, 渲染进程发射事件, 携带 事件名和数据, 向其他窗口广播, 事件名由渲染进程决定, 由渲染进程监听是否处理
 * 此做法免去主进程的多事件注册, 由渲染进程进行处理解决.
 * ====================================================================================
 */
/**
 * 接收 IpcBroadcast 事件, 并且向其他窗口广播, 携带 事件名、参数
 */
declare const ipcOnBroadcast: IpcProcessor<"on", unknown, "IpcBroadcast", (e: Electron.IpcMainEvent, evtName: string, data: any) => Promise<void>>;

/**
 * 渲染进程打开开发者检查工具
 */
declare const ipcOpenDevTool: IpcProcessor<"handle", unknown, "IpcDevTool/openDevTool", (e: Electron.IpcMainInvokeEvent, status: boolean, options?: OpenDevToolsOptions) => void>;

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

declare namespace DepositService {
    /**
     * 存放数据时的函数的 options
     */
    interface TakeInOptions {
    }
    /**
     * 取回数据的函数的 options
     */
    interface TakeOutOptions {
        /**
         * 是否取回数据后, 但是依旧保留
         * @default false
         */
        persist?: boolean;
    }
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
declare const ipcForwardDataTakeIn: IpcProcessor<"handle", WindowService, "IpcForwardData/takeIn", (windowService: WindowService, key: string, data: any) => Promise<void>>;
/**
 * 渲染进程取回数据
 */
declare const ipcForwardDataTakeOut: IpcProcessor<"handle", WindowService, "IpcForwardData/takeOut", (windowService: WindowService, key: string, options?: DepositService.TakeOutOptions) => Promise<any>>;

/**
 * 为渲染进程提供获得 appStore 的能力
 */
declare const ipcAppStoreGetStore: IpcProcessor<"handle", Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, "IpcStore/appStore/getStore", () => Promise<AppStoreType>>;
/**
 * 渲染进程通过 key 获得一个存储在 appStore 中的数据
 */
declare const ipcAppStoreGet: IpcProcessor<"handle", Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, "IpcStore/appStore/get", <Key extends keyof AppStoreType, V extends Required<AppStoreType>[Key]>(_: unknown, key: Key, defaultValue?: V) => Promise<Required<AppStoreType>[Key]>>;
/**
 * 渲染进程通过 key 设置存储在 appStore 中的数据
 */
declare const ipcAppStoreSet: IpcProcessor<"handle", Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, "IpcStore/appStore/set", <Key extends keyof AppStoreType, V extends AppStoreType[Key]>(_: unknown, key: Key, value: V) => Promise<void>>;
/**
 * 渲染进程通过 key 重置某些 appStore 中的数据
 */
declare const ipcAppStoreReset: IpcProcessor<"handle", Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, "IpcStore/appStore/reset", <Key extends keyof AppStoreType>(_: unknown, ...keys: Key[]) => Promise<void>>;
/**
 * 渲染进程通过 key 判断 appStore 中是否含有某个 key
 */
declare const ipcAppStoreHas: IpcProcessor<"handle", Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, "IpcStore/appStore/has", <Key extends keyof AppStoreType>(_: unknown, key: Key) => Promise<boolean>>;
/**
 * 渲染进程通过 key 删除 appStore 中的数据
 */
declare const ipcAppStoreDelete: IpcProcessor<"handle", Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, "IpcStore/appStore/delete", <Key extends keyof AppStoreType>(_: unknown, key: Key) => Promise<void>>;
/**
 * 清空 appStore
 */
declare const ipcAppStoreClear: IpcProcessor<"handle", Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, "IpcStore/appStore/clear", (_: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent) => Promise<void>>;

/**
 * 窗口最大化, 可以在 options 中传递制定 id 来控制某个窗口
 */
declare const ipcWindowMaximize: IpcProcessor<"handle", WindowService, "IpcWindow/maxSize", (windowService: WindowService, options?: {
    id?: number;
    windowKey?: string;
}) => Promise<void>>;
/**
 * 窗口最小化, 可以在 options 中传递制定 id 来控制某个窗口
 */
declare const ipcWindowMinimize: IpcProcessor<"handle", WindowService, "IpcWindow/minSize", (windowService: WindowService, options?: {
    id?: number;
    windowKey?: string;
}) => Promise<void>>;
/**
 * 窗口还原指令, 还原窗口大小
 */
declare const ipcWindowReductionSize: IpcProcessor<"handle", WindowService, "IpcWindow/reduction", (windowService: WindowService, options?: {
    id?: number;
    windowKey?: string;
}) => Promise<void>>;
/**
 * 设置窗口是否可以调整大小尺寸
 */
declare const ipcWindowResizeAble: IpcProcessor<"handle", WindowService, "IpcWindow/resizeAble", (windowService: WindowService, options?: {
    id?: number;
    windowKey?: string;
    resizeAble: boolean;
}) => Promise<void>>;
/**
 * 重新加载某个窗口页面
 */
declare const ipcWindowRelaunch: IpcProcessor<"handle", WindowService, "IpcWindow/relaunch", (windowService: WindowService, options?: {
    id?: number;
    windowKey?: string;
}) => Promise<void>>;
/**
 * 设置窗口的最小尺寸大小
 */
declare const ipcWindowSetMinimumSize: IpcProcessor<"handle", WindowService, "IpcWindow/setMinimumSize", (windowService: WindowService, options: {
    id?: number;
    windowKey?: string;
    width: number;
    height: number;
}) => Promise<void>>;
/**
 * 设置窗口的当前尺寸
 */
declare const ipcWindowSetSize: IpcProcessor<"handle", WindowService, "IpcWindow/setSize", (windowService: WindowService, options: {
    id?: number;
    windowKey?: string;
    width: number;
    height: number;
}) => Promise<void>>;
/**
 * 重置窗口为制定大小, 用于记忆化窗口尺寸
 */
declare const ipcWindowResetCustomSize: IpcProcessor<"handle", WindowService, "IpcWindow/resetCustomSize", (windowService: WindowService, options: {
    id?: number;
    windowKey?: string;
    type: 'mainWindow';
}) => Promise<boolean>>;
/**
 * 设置窗口的位置
 */
declare const ipcWindowSetPosition: IpcProcessor<"handle", WindowService, "IpcWindow/setPosition", (windowService: WindowService, options: {
    id?: number;
    windowKey?: string;
    x: 'center' | 'left' | 'right' | number;
    y: 'center' | 'top' | 'bottom' | number;
}) => Promise<void>>;
/**
 * TODO: 需要改进
 */
declare const ipcOpenWindow: IpcProcessor<"handle", WindowService, "IpcWindow/openWindow", (_: WindowService, options: {
    windowKey?: string;
    subUrl: string;
}, browserWindowOptions: Partial<BrowserWindowConstructorOptions>) => Promise<void>>;
/**
 * 关闭窗口
 */
declare const ipcWindowClose: IpcProcessor<"handle", WindowService, "IpcWindow/closeWindow", (windowService: WindowService, options?: {
    windowKey?: string;
    id?: number;
    /**
     * 遮掩的。为 true, 那么窗口不会正常地销毁, 而只是隐藏掉
     */
    fictitious?: boolean;
}) => Promise<void>>;
/**
 * 显示窗口, 如果窗口存在, 并且是隐藏地情况下
 */
declare const ipcWindowShow: IpcProcessor<"handle", WindowService, "IpcWindow/showWindow", (windowService: WindowService, options: {
    id?: number;
    windowKey?: string;
    show: boolean;
}) => Promise<void>>;
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
declare const ipcWindowProperties: IpcProcessor<"handle", WindowService, "IpcWindow/properties", (windowService: WindowService, selectedOptions: {
    windowKey?: string;
}, properties: Partial<WindowProperties>) => Promise<void>>;
/**
 * 获取展示窗口的尺寸
 */
declare const ipcWindowWorkAreaSize: IpcProcessor<"handle", WindowService, "IpcWindow/workAreaSize", () => Promise<{
    readonly width: number;
    readonly height: number;
}>>;

type AllIpcProcessors_WindowProperties = WindowProperties;
declare const AllIpcProcessors_ipcAppStoreClear: typeof ipcAppStoreClear;
declare const AllIpcProcessors_ipcAppStoreDelete: typeof ipcAppStoreDelete;
declare const AllIpcProcessors_ipcAppStoreGet: typeof ipcAppStoreGet;
declare const AllIpcProcessors_ipcAppStoreGetStore: typeof ipcAppStoreGetStore;
declare const AllIpcProcessors_ipcAppStoreHas: typeof ipcAppStoreHas;
declare const AllIpcProcessors_ipcAppStoreReset: typeof ipcAppStoreReset;
declare const AllIpcProcessors_ipcAppStoreSet: typeof ipcAppStoreSet;
declare const AllIpcProcessors_ipcForwardDataTakeIn: typeof ipcForwardDataTakeIn;
declare const AllIpcProcessors_ipcForwardDataTakeOut: typeof ipcForwardDataTakeOut;
declare const AllIpcProcessors_ipcOnBroadcast: typeof ipcOnBroadcast;
declare const AllIpcProcessors_ipcOpenDevTool: typeof ipcOpenDevTool;
declare const AllIpcProcessors_ipcOpenWindow: typeof ipcOpenWindow;
declare const AllIpcProcessors_ipcWindowClose: typeof ipcWindowClose;
declare const AllIpcProcessors_ipcWindowMaximize: typeof ipcWindowMaximize;
declare const AllIpcProcessors_ipcWindowMinimize: typeof ipcWindowMinimize;
declare const AllIpcProcessors_ipcWindowProperties: typeof ipcWindowProperties;
declare const AllIpcProcessors_ipcWindowReductionSize: typeof ipcWindowReductionSize;
declare const AllIpcProcessors_ipcWindowRelaunch: typeof ipcWindowRelaunch;
declare const AllIpcProcessors_ipcWindowResetCustomSize: typeof ipcWindowResetCustomSize;
declare const AllIpcProcessors_ipcWindowResizeAble: typeof ipcWindowResizeAble;
declare const AllIpcProcessors_ipcWindowSetMinimumSize: typeof ipcWindowSetMinimumSize;
declare const AllIpcProcessors_ipcWindowSetPosition: typeof ipcWindowSetPosition;
declare const AllIpcProcessors_ipcWindowSetSize: typeof ipcWindowSetSize;
declare const AllIpcProcessors_ipcWindowShow: typeof ipcWindowShow;
declare const AllIpcProcessors_ipcWindowWorkAreaSize: typeof ipcWindowWorkAreaSize;
declare namespace AllIpcProcessors {
  export { type AllIpcProcessors_WindowProperties as WindowProperties, AllIpcProcessors_ipcAppStoreClear as ipcAppStoreClear, AllIpcProcessors_ipcAppStoreDelete as ipcAppStoreDelete, AllIpcProcessors_ipcAppStoreGet as ipcAppStoreGet, AllIpcProcessors_ipcAppStoreGetStore as ipcAppStoreGetStore, AllIpcProcessors_ipcAppStoreHas as ipcAppStoreHas, AllIpcProcessors_ipcAppStoreReset as ipcAppStoreReset, AllIpcProcessors_ipcAppStoreSet as ipcAppStoreSet, AllIpcProcessors_ipcForwardDataTakeIn as ipcForwardDataTakeIn, AllIpcProcessors_ipcForwardDataTakeOut as ipcForwardDataTakeOut, AllIpcProcessors_ipcOnBroadcast as ipcOnBroadcast, AllIpcProcessors_ipcOpenDevTool as ipcOpenDevTool, AllIpcProcessors_ipcOpenWindow as ipcOpenWindow, AllIpcProcessors_ipcWindowClose as ipcWindowClose, AllIpcProcessors_ipcWindowMaximize as ipcWindowMaximize, AllIpcProcessors_ipcWindowMinimize as ipcWindowMinimize, AllIpcProcessors_ipcWindowProperties as ipcWindowProperties, AllIpcProcessors_ipcWindowReductionSize as ipcWindowReductionSize, AllIpcProcessors_ipcWindowRelaunch as ipcWindowRelaunch, AllIpcProcessors_ipcWindowResetCustomSize as ipcWindowResetCustomSize, AllIpcProcessors_ipcWindowResizeAble as ipcWindowResizeAble, AllIpcProcessors_ipcWindowSetMinimumSize as ipcWindowSetMinimumSize, AllIpcProcessors_ipcWindowSetPosition as ipcWindowSetPosition, AllIpcProcessors_ipcWindowSetSize as ipcWindowSetSize, AllIpcProcessors_ipcWindowShow as ipcWindowShow, AllIpcProcessors_ipcWindowWorkAreaSize as ipcWindowWorkAreaSize };
}

type IpcProcessorsCompileSheet = {
    readonly [Key in keyof typeof AllIpcProcessors]: (typeof AllIpcProcessors)[Key] extends IpcCompatibleProcessor ? (typeof AllIpcProcessors)[Key] : never;
};
type IpcProcessorSheet = MutateProcessorSheet<IpcProcessorsCompileSheet>;

/**
 * 打开页面
 * @return
 */
declare const openPage: (options: {
    windowKey?: string;
    subUrl: string;
}, browserWindowOptions: Partial<Electron.BrowserWindowConstructorOptions>) => Promise<void>;
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
}) => Promise<void>;
/**
 * 窗口是否可以调整大小
 */
declare const windowResizeAble: (options?: {
    id?: number;
    windowKey?: string;
    resizeAble: boolean;
}) => Promise<void>;
/**
 * 设置窗口的大小
 * @returns
 */
declare const windowSetSize: (options: {
    id?: number;
    windowKey?: string;
    width: number;
    height: number;
}) => Promise<void>;
/**
 * 设置窗口的位置
 * @returns
 */
declare const windowSetPosition: (options: {
    id?: number;
    windowKey?: string;
    x: number | "center" | "left" | "right";
    y: number | "top" | "center" | "bottom";
}) => Promise<void>;
/**
 * 重启应用
 * @returns
 */
declare const windowRelaunch: (options?: {
    id?: number;
    windowKey?: string;
}) => Promise<void>;
/**
 * 恢复窗口为定制化大小
 * @returns
 */
declare const windowResetCustomSize: (options: {
    id?: number;
    windowKey?: string;
    type: "mainWindow";
}) => Promise<boolean>;
/**
 * 最大化窗口
 * @returns
 */
declare const windowMax: (options?: {
    id?: number;
    windowKey?: string;
}) => Promise<void>;
/**
 * 最小化窗口
 * @returns
 */
declare const windowMin: (options?: {
    id?: number;
    windowKey?: string;
}) => Promise<void>;
/**
 * 还原窗口
 * @returns
 */
declare const windowReduction: (options?: {
    id?: number;
    windowKey?: string;
}) => Promise<void>;
/**
 * 关闭窗口
 * @returns
 */
declare const windowClose: (options?: {
    windowKey?: string;
    id?: number;
    fictitious?: boolean;
}) => Promise<void>;
/**
 * 打开窗口开发者工具
 * @param args
 * @returns
 */
declare const windowDevtool: (status: boolean, options?: Electron.OpenDevToolsOptions) => Promise<void>;
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
declare const windowWorkAreaSize: () => Promise<{
    readonly width: number;
    readonly height: number;
}>;
/**
 * 打开一个子窗口
 * @returns
 */
declare const windowOpen: (options: {
    windowKey?: string;
    subUrl: string;
}, browserWindowOptions: Partial<Electron.BrowserWindowConstructorOptions>) => Promise<void>;
declare const windowForwardDataTakeIn: (key: string, data: any) => Promise<void>;
declare const windowForWardDataTakeOut: (key: string, options?: DepositService.TakeOutOptions) => Promise<any>;

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
    readonly printer: PrinterType;
    readonly ipcBCaller: IpcBCaller<IpcProcessorSheet>;
    /**
     * IPC 事件
     */
    readonly ipcActions: IpcActions;
    /**
     * 应用的 store
     */
    readonly stores: Exclude<{
        readonly appStore: IpcStore<AppStoreType>;
    }, 'features'>;
}

declare global {
  export namespace Rapid {
    export interface Native {
      meta2d?: _meta2d_core.Meta2d;

      readonly Antd: typeof antd;
      readonly AntdIcons: typeof iconInstance;
      readonly spring: typeof _react_spring_web;
      readonly transitionGroup: typeof react_transition_group;
      readonly moment: typeof moment;

      readonly ipcActions: undefined;
      readonly electron: undefined;
      readonly printer: undefined;

      readonly extension: ExtensionManager<Rapid.Extend.Extension>;
      readonly metadata: MetadataManager<Rapid.Extend.Metadata.MetadataEntries>;
      readonly emitter: Emitter<Rapid.Bus.BusEmitterEntries>;
      readonly invoker: Invoker<Bus.BusInvokerEntries>;
      readonly threads: {}

      readonly stores: ExposeApi['stores'] & Omit<{
        readonly features: {
          readonly useUserStore: typeof useUserStore;
          readonly useThemeStore: typeof useThemeStore;
          readonly useDocStore: typeof useDocStore;
        }
      }, keyof ExposeApi['stores']>;

      readonly i18n: {
        readonly i18n: typeof i18n;
        readonly useTranslation: typeof react_i18next.useTranslation;
      }

      readonly constants: {
        readonly Timestamp: typeof Timestamp;
      }

      readonly components: {
        readonly Ellipsis: typeof Ellipsis;
        readonly IconFont: typeof IconFont;
        readonly Widget: typeof Widget;
        readonly Empty: typeof REmpty;
      }

      readonly services: {
        readonly Emitter: typeof Emitter;
        readonly Invoker: typeof Invoker;

        readonly ExtensionManager: typeof ExtensionManager;
        readonly MetadataManager: typeof MetadataManager;
      }

      readonly libs: {
        readonly injectReadonlyVariable: typeof _suey_pkg_utils.injectReadonlyVariable;

        readonly reactive: typeof _vue_reactivity.reactive;
        readonly watch: typeof _vue_reactivity.watch;
        readonly effect: typeof _vue_reactivity.effect;
        readonly computed: typeof _vue_reactivity.computed;
        readonly ref: typeof _vue_reactivity.ref;
        readonly shallowRef: typeof _vue_reactivity.shallowRef;
        readonly reactiveReadArray: typeof _vue_reactivity.reactiveReadArray;
        readonly readonly: typeof _vue_reactivity.readonly;
        readonly shallowReactive: typeof _vue_reactivity.shallowReactive;
        readonly shallowReadonly: typeof _vue_reactivity.shallowReadonly;
        readonly toRaw: typeof _vue_reactivity.toRaw;
        readonly toReactive: typeof _vue_reactivity.toReactive;
        readonly toReadonly: typeof _vue_reactivity.toReadonly;
        readonly toRef: typeof _vue_reactivity.toRef;
        readonly toRefs: typeof _vue_reactivity.toRefs;
        readonly toValue: typeof _vue_reactivity.toValue;
        readonly unref: typeof _vue_reactivity.unref;
        readonly isRef: typeof _vue_reactivity.isRef;
        readonly isReactive: typeof _vue_reactivity.isReactive;
        readonly isReadonly: typeof _vue_reactivity.isReadonly;
        readonly isShallow: typeof _vue_reactivity.isShallow;
        readonly isProxy: typeof _vue_reactivity.isProxy;

        readonly rApiGet: typeof rApiGet;
        readonly rApiPost: typeof rApiPost;
        readonly rApiPut: typeof rApiPut;
        readonly rApiDelete: typeof rApiDelete;
        readonly rRequest: typeof rRequest;
        readonly rApiPatch: typeof rApiPatch;
        readonly rCreateApi: typeof rCreateApi;

        readonly apiGet: typeof _suey_pkg_utils.apiGet;
        readonly apiPost: typeof _suey_pkg_utils.apiPost;
        readonly apiPut: typeof _suey_pkg_utils.apiPut;
        readonly apiDelete: typeof _suey_pkg_utils.apiDelete;
        readonly request: typeof _suey_pkg_utils.request;
        readonly createApiRequest: typeof _suey_pkg_utils.createApiRequest;
        readonly createRequest: typeof _suey_pkg_utils.createRequest;

        readonly aesEncrypt: typeof _suey_pkg_utils.aesEncrypt;
        readonly aesDecrypt: typeof _suey_pkg_utils.aesDecrypt;
        readonly aesEncryptAlgorithm: typeof _suey_pkg_utils.aesEncryptAlgorithm;
        readonly aesDecryptAlgorithm: typeof _suey_pkg_utils.aesDecryptAlgorithm;

        readonly jose: typeof _suey_pkg_utils.jose;
        readonly cryptoTs: typeof _suey_pkg_utils.cryptoTs;
        readonly jsr: typeof _suey_pkg_utils.jsr;

        readonly toNil: typeof _suey_pkg_utils.toNil;
        readonly toNils: typeof _suey_pkg_utils.toNils;
        readonly toWaitPromise: typeof _suey_pkg_utils.toWaitPromise;

        readonly Ansi: typeof _suey_pkg_utils.Ansi;

        readonly classnames: typeof classnames;

        readonly isReactClassComponent: typeof isReactClassComponent;
        readonly isReactComponent: typeof isReactComponent;
        readonly isReactForwardFC: typeof isReactForwardFC;
        readonly isReactMemoFC: typeof isReactMemoFC;
        readonly isReactFC: typeof isReactFC;
        readonly isReactLazyFC: typeof isReactLazyFC;

        readonly defineCompleteType: typeof _suey_pkg_utils.defineCompleteType;
        readonly defineRawType: typeof _suey_pkg_utils.defineRawType;
      }
    }
  }
}

declare global {
  export namespace Rapid.Reactivity {
    export type Reactive<T> = _vue_reactivity.Reactive<T>;
    export type WatchSource<T> = _vue_reactivity.WatchSource<T>;
    export type WatchHandle = _vue_reactivity.WatchHandle;
    export type EffectScope = _vue_reactivity.EffectScope;
    export type OnCleanup = _vue_reactivity.OnCleanup;
    export type ReactiveEffect = _vue_reactivity.ReactiveEffect;
    export type ReactiveEffectOptions = _vue_reactivity.ReactiveEffectOptions;
    export type ReactiveEffectRunner = _vue_reactivity.ReactiveEffectRunner;
    export type Ref = _vue_reactivity.Ref;
    export type ShallowRef = _vue_reactivity.ShallowRef;
    export type UnwrapNestedRefs<T> = _vue_reactivity.UnwrapNestedRefs<T>;
    export type UnwrapRef<T> = _vue_reactivity.UnwrapRef<T>;
    export type UnwrapRefSimple<T> = _vue_reactivity.UnwrapRefSimple<T>;
    export type ComputedRef = _vue_reactivity.ComputedRef;
    export type WritableComputedRef<T, S> = _vue_reactivity.WritableComputedRef<T, S>;
    export type ReactiveMarker = _vue_reactivity.ReactiveMarker;
    export type DeepReadonly<T> = _vue_reactivity.DeepReadonly<T>;
  }
}

declare global {

  export namespace Rapid.Thread {


    export type MainThreadEntries = {
      'rxc:extension-changed': (data: number[]) => void;
    }

    export type ExtensionThreadEntries = {
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
    }
  }
}

declare global {
  export namespace Rapid.Types {
    /**
     * 获取一个 Promise then函数的类型
     */
    export type PromiseThenCallback<Pr extends Promise<unknown>> = Parameters<Pr['then']>[0];
    /**
     * 获取一个 Promise then函数回调参数 res 的类型
     */
    export type PromiseResolvedType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseThenCallback<Pr>, null | undefined>>[0];
    /**
     * 获取一个 Promise数据 then函数回调参数 res 数组的类型
     */
    export type PromiseArrayResolvedType<PrArr extends readonly Promise<unknown>[]> = {
      readonly [Index in keyof PrArr]: PromiseResolvedType<PrArr[Index]>;
    };
    /**
     * 获取一个 Promise catch函数回调参数 res 的类型
     */
    export type PromiseCatchCallback<Pr extends Promise<unknown>> = Parameters<Pr['catch']>[0];
    /**
     * 获取一个 Promise catch函数回调参数 reason 的类型
     */
    export type PromiseCatchReasonType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseCatchCallback<Pr>, null | undefined>>[0];
    /**
     * 获取一个 Promise数据 then函数回调参数 reason 数组的类型
     */
    export type PromiseArrayCatchReasonType<PrArr extends readonly Promise<unknown>[]> = {
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
    export type IsNever<T, SuccessReturnType, FailReturnType> = T extends never ? SuccessReturnType : FailReturnType;
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
    export type IsAny<T, SuccessReturnType, FailReturnType> = IsNever<T, 'yes', 'no'> extends 'no' ? FailReturnType : SuccessReturnType;
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
    export type IsUnknown<T, SuccessReturnType, FailReturnType> = unknown extends T ? (T extends unknown ? SuccessReturnType : FailReturnType) : FailReturnType;
  }
}

declare global {
  /**
   * 应用程序的命名空间 - 此命名空间将为 rapid 程序 提供编写 TS 地基础
   */
  export namespace Rapid {}
}

declare global {

  interface Window {
    readonly native: Rapid.Native;
  }

  /**
   * 全局的 native 实例
   */
  const native: Rapid.Native;
}
