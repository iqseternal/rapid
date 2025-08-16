import type { Extension, ExtensionWithLifecycle, ExtensionName, ExtractExtensionContext } from './declare';
import { InnerZustandStoreManager } from '../base/InnerZustandStoreManager';
import { useEffect, useState, Ref } from 'react';

const ExtensionSymbolTag = Symbol('ExtensionSymbolTag');

/**
 * 定义一个插件, 这里所抽象得插件只是一个携带数据得对象、以及具有特殊时机执行得函数
 *
 * 1. 插件件可以有自己的生命周期函数, 例如 onActivated, onDeactivated
 * 2. 插件可以调动 metadataManager 从而实现插件化开发
 * 3. 调动 emitter 实现事件触发
 */
export class ExtensionManager<Ext extends Extension> extends InnerZustandStoreManager {
  private readonly extNameMapStore = new Map<ExtensionName, ExtensionWithLifecycle<Ext>>();

  /**
   * Define extension, 定义插件, 那么插件会被存储到 Map 中.
   */
  public defineExtension<DExt extends Ext>(define: DExt): DExt {
    if (!Reflect.has(define, 'name')) throw new Error(`Extension name is required`);
    if (!(typeof define.name === 'string')) throw new Error(`Extension name must be string`);
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
    if (!hasTAG) return false;

    const tag = Reflect.get(extension, '__TAG__');
    return tag === ExtensionSymbolTag;
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
    return this.extNameMapStore.get(extensionName)?.extension ?? null;
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
    const extensionLifecycle: ExtensionWithLifecycle<Ext> = {
      extension: extension,
      isActivated: false,
    };
    this.extNameMapStore.set(name, extensionLifecycle);
  }

  /**
   * Activated extension
   */
  public async activatedExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context) {
    const lifecycle = this.extNameMapStore.get(name);
    if (!lifecycle) throw new Error(`试图激活一个不存在得扩展`);

    if (lifecycle.isActivated) return;
    if (lifecycle.extension.onActivated) await lifecycle.extension.onActivated(context);
    lifecycle.isActivated = true;
  }

  /**
   * 去活某个插件
   */
  public async deactivatedExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context) {
    const lifecycle = this.extNameMapStore.get(name);
    if (!lifecycle) throw new Error(`试图去活一个不存在得扩展`);

    if (!lifecycle.isActivated) return;
    if (lifecycle.extension.onDeactivated) await lifecycle.extension.onDeactivated(context);
    lifecycle.isActivated = false;
  }

  /**
   * 删除扩展
   */
  public async delExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context) {
    const lifecycle = this.extNameMapStore.get(name);
    if (!lifecycle) throw new Error(`试图删除一个不存在得扩展`);

    if (lifecycle.isActivated) {
      if (lifecycle.extension.onDeactivated) {
        await lifecycle.extension.onDeactivated(context);
      }
    }

    if (!lifecycle.isActivated) {
      this.extNameMapStore.delete(name);
    }
  }

  /**
   * 获取扩展列表
   */
  public useExtensionsList(): readonly [Ext[]] {
    const value = this.useStoreValue();

    const [statusState] = useState(() => ({
      value: void 0 as (undefined | typeof value)
    }))

    const [normalState] = useState({
      extensions: [] as Ext[],
    })

    if (statusState.value !== value) {
      statusState.value = value;

      // 如果 store 被更新了, 那么替换最新的 extension
      const extensions: Ext[] = [];

      for (const ext of this.extNameMapStore.values()) {
        extensions.push(ext.extension);
      }

      normalState.extensions = extensions;
    }

    return [normalState.extensions];
  }

  /**
   * 获得所有的插件
   */
  public getExtensions(): readonly Ext[] {
    const extensions: Ext[] = [];

    for (const ext of this.extNameMapStore.values()) {
      extensions.push(ext.extension);
    }

    return extensions;
  }
}
