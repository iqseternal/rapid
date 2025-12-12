export type ExtensionName = string;

export type ExtensionOnActivated<Context = unknown> = (context?: Context) => ((() => void) | Promise<(() => void)> | void | Promise<void>);

export type ExtensionOnDeactivated<Context = unknown> = (context?: Context) => (void | Promise<void>);

export interface Extension<Context = unknown> {
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
  readonly onActivated?: ExtensionOnActivated<Context>;

  readonly onDeactivated?: ExtensionOnDeactivated<Context>;
}

export interface ExtensionWithLifecycle {
  readonly extension: Extension;

  /**
   * 插件是否被激活
   */
  isActivated: boolean;

  onActivated?: () => void;

  onDeactivated?: () => void;
}

export type ExtractExtensionContext<Ext extends Extension> = Parameters<Exclude<Ext['onActivated'], undefined>>[0];
