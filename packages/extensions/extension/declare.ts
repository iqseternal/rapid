

export interface Extension {
  /**
   * 插件的唯一标识 name
   */
  readonly name: string | symbol;

  /**
   * 插件版本
   */
  readonly version: string;

  /**
   * 当前是否处于激活状态
   */
  readonly __isActivated: boolean;
  /**
   * 当前是否处于注册状态
   */
  readonly __isRegistered: boolean;

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
}
