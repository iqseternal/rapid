// @ts-nocheck: 希望重新编写 ExtensionManager 生命周期相关逻辑
import { InnerZustandStoreManager } from '../base/InnerZustandStoreManager';
import { ExtensionErrors } from '../constants';

export type ExtensionOnActivated = (this: Extension) => (() => void) | Promise<(() => void)>;

export type ExtensionOnDeactivated = (this: Extension) => (void | Promise<void>);

export type ExtensionOnInstalled = (this: Extension) => (void | Promise<void>);

export type ExtensionOnUninstalled = (this: Extension) => (void | Promise<void>);

export interface ExtensionMeta {

}

export interface Extension {
  /**
   * 插件的唯一标识 name
   */
  readonly name: string;

  /**
   * 插件版本
   */
  readonly version: string | number;

  /**
   * 插件数据, 由项目自主决定插件附带携带的数据
   */
  meta?: ExtensionMeta;

  readonly isInstalled: boolean;
  readonly isUninstalled: boolean;

  readonly isActivated: boolean;
  readonly isDeactivated: boolean;

  readonly onInstalled?: ExtensionOnInstalled;
  readonly onUninstalled?: ExtensionOnUninstalled;

  /**
   * 插件被激活, 被使用的状态
   */
  readonly onActivated?: ExtensionOnActivated;
  readonly onDeactivated?: ExtensionOnDeactivated;
}

export interface ExtensionInnerInstance {
  readonly name: string;
  readonly version: string | number;

  isRegistered: boolean;
  isUnregistered: boolean;

  isActivated: boolean;
  isDeactivated: boolean;
}

export const ExtensionSymbolTag = Symbol('ExtensionSymbolTag');
export const ExtensionSymbolTagKey = Symbol('__TAG__');

export class ExtensionManager extends InnerZustandStoreManager {
  public defineExtension<E extends Extension>(define: E): E {
    if (!Reflect.has(define, 'name')) throw new Error(ExtensionErrors.ExtensionNameIsRequired);
    if (!(typeof define.name === 'string')) throw new Error(ExtensionErrors.ExtensionNameMustBeString);

    if (!Reflect.has(define, 'version')) throw new Error(ExtensionErrors.ExtensionVersionIsRequired);
    if (!(typeof define.version === 'string')) throw new Error(ExtensionErrors.ExtensionVersionMustBeString);

    if (!Reflect.has(define, 'onActivated')) throw new Error(ExtensionErrors.ExtensionOnActivatedIsRequired);
    if (typeof define.onActivated !== 'function') throw new Error(ExtensionErrors.ExtensionOnActivatedMustBeFunction);

    const name = define['name'];
    const version = define['version'];

    const extensionInnerInstance: ExtensionInnerInstance = {
      name: name,
      version: version,
      isRegistered: false,
      isUnregistered: false,
      isActivated: false,
      isDeactivated: false,
    };

    const that = this;

    const onInstalled: ExtensionOnInstalled = function () {

    }

    const extension: Extension = {
      get name() {
        return extensionInnerInstance.name;
      },
      get version() {
        return extensionInnerInstance.version;
      },
      get isInstalled() {
        return extensionInnerInstance.isRegistered;
      },
      get isUninstalled() {
        return extensionInnerInstance.isUnregistered;
      },
      get isActivated() {
        return extensionInnerInstance.isActivated;
      },
      get isDeactivated() {
        return extensionInnerInstance.isDeactivated;
      },
      meta: define['meta'] ?? void 0,
      get onInstalled() {
        return onInstalled;
      },
      get onUninstalled() {

        return () => {

        };
      },
      get onActivated() {

        return () => {
          return () => {

          }
        };
      },
      get onDeactivated() {

        return () => {

        };
      }
    };

    Reflect.defineProperty(extension, ExtensionSymbolTagKey, {
      enumerable: false,
      writable: false,
      value: ExtensionSymbolTag,
      configurable: false
    });

    return extension as unknown as E;
  }

  public isExtension<T>(extension: T | Extension): extension is Extension {
    if (typeof extension !== 'object' || extension === null) return false;
    if (!Reflect.has(extension, ExtensionSymbolTagKey)) return false;

    const tag = Reflect.get(extension, ExtensionSymbolTagKey);
    return tag === ExtensionSymbolTag;
  }

  public registerExtension(extensionName: string) {
    if (!(typeof extensionName === 'string')) throw new Error(ExtensionErrors.ExtensionNameMustBeString);

    if (!this.isExtension(extensionName)) throw new Error(ExtensionErrors.ExtensionIsNotExist);

    const extension = this.getExtension(extensionName);
    if (!extension) throw new Error(ExtensionErrors.ExtensionIsNotExist);

    extension.onInstalled?.();
  }

  public unregisterExtension() {

  }

  public activatedExtension() {

  }

  public deactivatedExtension() {

  }

  public getExtension(extensionName: string): Extension | null {

  }

  public getExtensions() {

  }

  public useExtensionsList() {

  }
}
0
