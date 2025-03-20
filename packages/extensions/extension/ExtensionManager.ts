import type { Extension, ExtensionWithLifecycle, ExtensionName, ExtractExtensionContext } from './declare';
import { InnerZustandStoreManager } from '../base/InnerZustandStoreManager';
import { useEffect, useState, Ref } from 'react';

const ExtensionSymbolTag = Symbol('ExtensionSymbolTag');

export class ExtensionManager<Ext extends Extension> extends InnerZustandStoreManager {
  private readonly extNameMapStore = new Map<ExtensionName, ExtensionWithLifecycle>();

  /**
   * Define extension, 定义插件, 那么插件会被存储到 Map 中.
   */
  public defineExtension<DExt extends Ext>(define: DExt): DExt {
    if (!Reflect.has(define, 'name')) throw new Error(`Extension name is required`);
    if (
      !(typeof define.name === 'symbol') &&
      !(typeof define.name === 'string')
    ) throw new Error(`Extension name must be symbol or string`);
    if (!Reflect.has(define, 'version')) throw new Error(`Extension version is required`);

    if (Reflect.has(define, 'onActivated') && !Reflect.has(define, 'onDeactivated')) throw new Error(`Extension lifecycle: onActivated and onDeactivated must be set at same time`);
    if (Reflect.has(define, 'onDeactivated') && !Reflect.has(define, 'onActivated')) throw new Error(`Extension lifecycle: onActivated and onDeactivated must be set at same time`);

    const name = define.name;
    const version = define.version;
    const onActivated = define.onActivated;
    const onDeactivated = define.onDeactivated;

    const extension: DExt = {
      ...define,
      onActivated: async (...args) => {
        if (!this.extNameMapStore.has(name)) {
          console.error(`当前扩展还未注册加载, 但却错误得试图激活`);
          return;
        }

        const lifecycle = this.extNameMapStore.get(name);
        if (!lifecycle) return;
        if (lifecycle.isActivated) {
          console.error(`当前扩展已被激活, 但却错误得试图再次激活`);
          return;
        }

        await onActivated?.call(extension, ...args);
        lifecycle.isActivated = true;
      },
      onDeactivated: async (...args) => {
        if (!this.extNameMapStore.has(name)) {
          console.error(`当前扩展还未注册加载, 但却错误得试图去活`);
          return;
        }
        const lifecycle = this.extNameMapStore.get(name);
        if (!lifecycle) return;
        if (!lifecycle.isActivated) {
          console.error(`当前扩展未被激活, 但却错误得试图去活`);
          return;
        }
        await onDeactivated?.call(extension, ...args);
        lifecycle.isActivated = false;
      }
    } as const;

    Reflect.defineProperty(extension, '__TAG__', {
      enumerable: false,
      writable: false,
      value: ExtensionSymbolTag,
      configurable: false
    });

    return extension;
  }

  /**
   * 判断一个对象是否是一个 扩展对象
   */
  public isExtension<DExt extends Ext>(extension: DExt | any): extension is DExt {
    if (typeof extension !== 'object') return false;
    const hasTAG = Reflect.has(extension, '__TAG__');
    return hasTAG;
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
   * 注册一个扩展
   */
  public registerExtension<DExt extends Ext>(extension: DExt) {
    if (!this.isExtension(extension)) throw new Error(`参数非法, 不是一个有效的扩展`);

    const name = extension.name;
    if (this.hasExtension(name)) {
      console.error(`试图重新注册一个已存在得扩展：应该先移除再注册`);
      return;
    }
    const extensionLifecycle: ExtensionWithLifecycle = {
      extension: extension,
      isActivated: false,
    };
    this.extNameMapStore.set(name, extensionLifecycle);
  }

  /**
   * Activated extension
   */
  public async activatedExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context: Context) {
    const lifecycle = this.extNameMapStore.get(name);
    if (!lifecycle) throw new Error(`试图激活一个不存在得扩展`);

    if (lifecycle.isActivated) {
      console.error(`试图已激活一个已激活得扩展`);
      return;
    }

    if (lifecycle.extension.onActivated) await lifecycle.extension.onActivated(context);
  }

  /**
   * 去活某个插件
   */
  public async deactivatedExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context: Context) {
    const lifecycle = this.extNameMapStore.get(name);
    if (!lifecycle) throw new Error(`试图去活一个不存在得扩展`);

    if (!lifecycle.isActivated) {
      console.error(`试图去活一个未被激活得扩展`);
      return;
    }

    if (lifecycle.extension.onDeactivated) await lifecycle.extension.onDeactivated(context);
  }

  /**
   * 删除扩展
   */
  public async delExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context: Context) {
    const lifecycle = this.extNameMapStore.get(name);
    if (!lifecycle) throw new Error(`试图删除一个不存在得扩展`);

    if (lifecycle.isActivated) {
      if (lifecycle.extension.onDeactivated) {
        await lifecycle.extension.onDeactivated(context);
      }
    }

    this.extNameMapStore.delete(name);
  }

  /**
   * 获取扩展列表
   */
  public useExtensionsList(): readonly [Extension[]] {
    const value = this.useStoreValue();

    const [statusState] = useState(() => ({
      value: void 0 as (undefined | typeof value)
    }))

    const [normalState] = useState({
      extensions: [] as Extension[],
    })

    if (statusState.value !== value) {
      statusState.value = value;

      // 如果 store 被更新了, 那么替换最新的 extension
      const extensions: Extension[] = [];

      for (const ext of this.extNameMapStore.values()) {
        extensions.push(ext.extension);
      }

      normalState.extensions = extensions;
    }

    return [normalState.extensions];
  }
}
