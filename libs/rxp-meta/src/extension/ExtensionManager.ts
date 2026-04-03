import { InnerZustandStoreManager } from '../base/InnerZustandStoreManager';
import { useEffect, useState, Ref } from 'react';
import { RxpInnerStore } from '../base/index';

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

const ExtensionSymbolTag = Symbol('ExtensionSymbolTag');

export class Extension {
  /**
   * 插件对象标识符
   */
  private readonly __TAG__ = ExtensionSymbolTag;
  private isActivated = false;

  public readonly name: ExtensionName;
  public readonly version: string | number;
  public readonly meta?: any;

  public readonly onActivated: ExtensionOnActivated;
  public readonly onDeactivated?: ExtensionOnDeactivated;

  public constructor(options: ExtensionOptions) {
    const { name, version, meta, onActivated, onDeactivated } = options;

    this.name = name;
    this.version = version;
    this.meta = meta;
    this.onActivated = onActivated;
    this.onDeactivated = onDeactivated;
  }

  public activated() {
    this.onActivated();
  }

  public deactivated() {
    this.onDeactivated?.();
  }

  public static isExtension(extension: any): extension is Extension {
    if (typeof extension !== 'object') return false;
    const hasTAG = Reflect.has(extension, '__TAG__');

    if (!hasTAG) return false;

    const tag = Reflect.get(extension, '__TAG__');
    return tag === ExtensionSymbolTag;
  }
}



/**
 * 定义一个插件, 这里所抽象得插件只是一个携带数据得对象、以及具有特殊时机执行得函数
 *
 * 1. 插件件可以有自己的生命周期函数, 例如 onActivated, onDeactivated
 * 2. 插件可以调动 metadataManager 从而实现插件化开发
 * 3. 调动 emitter 实现事件触发
 */
export class ExtensionManager<Ext extends Extension> {
  private readonly rxpInnerStore = new RxpInnerStore();

  private readonly extNameMapStore = new Map<ExtensionName, Extension>();

  /**
   * Define extension, 定义插件, 那么插件会被存储到 Map 中.
   */
  public defineExtension(define: ExtensionOptions): Extension {
    return new Extension(define);
  }

  /**
   * 判断一个对象是否是一个 扩展对象
   */
  public isExtension<DExt extends Ext>(extension: DExt | any): extension is DExt {
    return Extension.isExtension(extension);
  }

  /**
   * 判断是否含有当前扩展：即是否已经注册
   */
  public hasExtension(extensionName: ExtensionName) {
    const has = this.extNameMapStore.has(extensionName);
    const lifecycle = this.extNameMapStore.get(extensionName);

    if (has && !lifecycle) throw new Error(`数据状态异常`);
    return has;
  }

  /**
   * 获取一个扩展
   */
  public getExtension(extensionName: ExtensionName) {
    if (!this.hasExtension(extensionName)) return null;
    return this.extNameMapStore.get(extensionName) ?? null;
  }

  /**
   * 注册一个扩展
   */
  public registerExtension<DExt extends Ext>(extension: DExt) {
    if (!this.isExtension(extension)) throw new Error(`参数非法, 不是一个有效的扩展`);

    const name = extension.name;
    if (this.hasExtension(name)) {
      console.error(`试图重新注册一个已存在得扩展：应该先移除再注册`);
      return;
    }

    this.extNameMapStore.set(name, extension);

    this.rxpInnerStore.update();
  }

  /**
   * Activated extension
   */
  public async activatedExtension(name: ExtensionName) {
    const extension = this.extNameMapStore.get(name);
    if (!extension) throw new Error(`试图激活一个不存在得扩展`);
    return extension.activated();
  }

  /**
   * 去活某个插件
   */
  public async deactivatedExtension(name: ExtensionName) {
    const extension = this.extNameMapStore.get(name);
    if (!extension) throw new Error(`试图去活一个不存在得扩展`);
    return extension.deactivated();
  }

  /**w
   * 删除扩展
   */
  public async delExtension(name: ExtensionName) {
    const extension = this.extNameMapStore.get(name);
    if (!extension) throw new Error(`试图删除一个不存在得扩展`);

    extension.deactivated();

    this.extNameMapStore.delete(name);

    this.rxpInnerStore.update();
  }

  /**
   * 获取扩展列表
   */
  public useExtensionsList(): readonly [Extension[]] {
    const value = this.rxpInnerStore.useValueToRenderReactComponent();

    const [statusState] = useState(() => ({
      value: void 0 as (undefined | typeof value)
    }))

    const [normalState] = useState({
      extensions: [] as Extension[],
    })

    if (statusState.value !== value) {
      statusState.value = value;
      normalState.extensions = [...this.extNameMapStore.values()];
    }

    return [normalState.extensions];
  }

  /**
   * 获得所有的插件
   */
  public getExtensions(): readonly Extension[] {
    return [...this.extNameMapStore.values()];
  }
}
