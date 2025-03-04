import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useAsyncLayoutEffect, useNormalState } from '@rapid/libs-web/hooks';
import type { Extension } from './declare';
import { InnerZustandStoreManager } from '../base/InnerZustandStoreManager';

export type ExtensionName = symbol | string;

export class ExtensionManager extends InnerZustandStoreManager {
  private readonly extNameMap = new Map<ExtensionName, Extension>();
  // private readonly extNameSet = new Set<string | symbol>();

  /**
   * 某个插件
   */
  public unregisterExtension(...extensions: (ExtensionName | Extension)[]) {
    let unregisterSuccess = false;

    const extractExtensionName = (item: ExtensionName | Extension) => {
      if ((typeof item === 'symbol') || (typeof item === 'string')) return item;
      return item.name;
    }

    extensions.forEach(item => {
      const extensionName = extractExtensionName(item);
      if (!this.extNameMap.has(extensionName)) return;

      const extension = this.extNameMap.get(extensionName);
      if (!extension) return;

      if (extension.__isRegistered) {
        if (extension.__isActivated) extension.onDeactivated?.();
        extension.onUnregistered?.();
        this.extNameMap.delete(extension.name);
        if (!unregisterSuccess) unregisterSuccess = true;
      }
    })

    if (unregisterSuccess) super.updateStore();
  }

  /**
   * Defines extension
   */
  public defineExtension(define: Omit<Extension, '__isActivated' | '__isRegistered'>): Extension {
    if (!define.name) throw new Error('Extension name is required');
    if (!define.version) throw new Error('Extension version is required');
    if (Reflect.has(define, '__isActivated')) throw new Error(`Extension '__isActivated' is not allow defined`);
    if (Reflect.has(define, '__isRegistered')) throw new Error(`Extension '__isRegistered' is not allow defined`);

    const extension: Extension = {
      ...define,

      __isActivated: false,
      __isRegistered: false,

      onActivated: () => {
        if (extension.__isActivated) return;
        define.onActivated?.call(extension);
        Reflect.set(extension, '__isActivated', true);
      },
      onDeactivated: () => {
        if (!extension.__isActivated) return;
        define.onDeactivated?.call(extension);
        Reflect.set(extension, '__isActivated', false);
      },
      onRegistered: () => {
        if (extension.__isRegistered) return;
        define.onRegistered?.call(extension);
        Reflect.set(extension, '__isRegistered', true);
      },
      onUnregistered: () => {
        if (!extension.__isRegistered) return;
        define.onUnregistered?.call(extension);
        Reflect.set(extension, '__isRegistered', false);
      },
    } as const;

    return extension;
  }

  /**
   * 注册插件
   */
  public registerExtension(...extensions: Extension[]) {
    if (extensions.length === 0) return;

    extensions.forEach(extension => {
      extension.onRegistered?.();
      this.extNameMap.set(extension.name, extension);
    });
    super.updateStore();
  }

  /**
   * Activated extension
   */
  public activatedExtension(name: string | symbol) {
    const extension = this.extNameMap.get(name);
    if (!extension) {
      return;
    }

    extension.onActivated?.();
  }

  /**
   * 去活某个插件
   */
  public deactivatedExtension(name: string | symbol) {
    const extension = this.extNameMap.get(name);
    if (!extension) {
      return;
    }
    extension.onDeactivated?.();
  }

  /**
   * 获取扩展列表
   */
  public useExtensionsList(): [{ readonly extensions: Extension[] }] {
    const value = this.useStore();

    const [statusState] = useNormalState(() => ({
      value: void 0 as (undefined | typeof value)
    }))

    const [normalState] = useNormalState({
      extensions: [] as Extension[],
    })

    if (statusState.value !== value) {
      statusState.value = value;

      // 如果 store 被更新了, 那么替换最新的 extension
      const extensions: Extension[] = [];

      for (const ext of this.extNameMap.values()) {
        extensions.push(ext);
      }

      normalState.extensions = extensions;
    }

    return [normalState];
  }

  /**
   * extensions hooks,
   */
  public useExtensions() {
    const [normalState] = this.useExtensionsList();

    // 激活扩展
    useAsyncLayoutEffect(async () => {
      for (const extension of normalState.extensions) extension?.onActivated?.();
    }, [normalState.extensions.length]);

    return [normalState];
  }

  /**
   * 取消所有插件的注册
   */
  public unregisterAllExtension() {
    if (this.extNameMap.size === 0) return;

    this.extNameMap.clear();
    super.useStore();
  }
}
