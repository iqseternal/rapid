import { InnerZustandStoreManager } from '../base/InnerZustandStoreManager';
import { ExtensionErrors } from '../constants';

export type ExtensionName = string;

export type ExtensionOnActivated<Context = unknown> = (context?: Context) => (() => void) | Promise<(() => void)>;

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

export const ExtensionSymbolTag = Symbol('ExtensionSymbolTag');
export const ExtensionSymbolTagKey = '__TAG__';

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
    const onActivated = define['onActivated'];
    // const onDeactivated = define['onDeactivated'];

    let isActivated = false;
    let onDeactivated: () => (void | Promise<void>);

    const extension: Extension = {
      get name() {
        return name;
      },
      get version() {
        return version;
      },
      meta: define['meta'] ?? void 0,
      get onActivated() {
        return async (context: unknown) => {
          const onDeactivated = await onActivated?.call(extension, context);

          return async () => {
            if (onDeactivated && typeof onDeactivated === 'function') {
              await onDeactivated();
            }
          }
        }
      },
      get onDeactivated() {

        return () => {

        }
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

  public registerExtension() {

  }

  public unregisterExtension() {

  }

  public activatedExtension() {

  }

  public deactivatedExtension() {

  }

  public getExtension() {

  }

  public getExtensions() {

  }

  public useExtensionsList() {

  }
}
0
