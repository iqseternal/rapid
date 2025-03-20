export type ExtensionName = string | symbol;

export interface Extension<Context = any> {
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
  readonly meta?: any;

  /**
   * 插件被激活, 被使用的状态
   */
  readonly onActivated?: (this: this, context: Context) => (void | Promise<void>);

  /**
   * 插件被去活, 被禁用的状态
   */
  readonly onDeactivated?: (this: this, context: Context) => (void | Promise<void>);
}

export interface ExtensionWithLifecycle {
  readonly extension: Extension;

  /**
   * 插件是否被激活
   */
  isActivated: boolean;
}

export type ExtractExtensionContext<Ext extends Extension> = Parameters<Exclude<Ext['onActivated'], undefined>>[1];
