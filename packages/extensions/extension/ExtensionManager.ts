import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useAsyncLayoutEffect, useNormalState } from '@rapid/libs-web/hooks';
import type { Extension } from './declare';
import { InnerZustandStoreManager } from '../base/InnerZustandStoreManager';

export class ExtensionManager extends InnerZustandStoreManager {
  private readonly extNameMap = new Map<string | symbol, Extension>();
  // private readonly extNameSet = new Set<string | symbol>();

  /**
   * 某个插件
   */
  public unregisterExtension(...extensions: Extension[]) {
    let unregisterSuccess = false;

    extensions.forEach(extension => {
      if (this.extNameMap.has(extension.name)) {
        // 记录有扩展被卸载了, 然后更新 store
        if (!unregisterSuccess) unregisterSuccess = true;

        if (extension.__isActivated) {
          // 卸载前先去活
          extension.onDeactivated?.();
        }

        extension.onUnregistered?.();
        this.extNameMap.delete(extension.name);
      }
    })

    if (unregisterSuccess) super.updateStore();
  }

  /**
   * Defines extension
   */
  public defineExtension(define: Omit<Extension, '__isActivated' | '__isRegistered'>): Extension {
    if (!define.name) {
      throw new Error('Extension name is required');
    }
    if (!define.version) {
      throw new Error('Extension version is required');
    }
    // @ts-ignore: 禁用 readonly __isActivated 的改变检查
    if (define.__isActivated) {
      throw new Error('Extension __isActivated is not allow defined');
    }

    const extension: Extension = {
      ...define,

      __isActivated: false,
      __isRegistered: false,

      onActivated: () => {
        if (extension.__isActivated) return;

        define.onActivated?.();
        // @ts-ignore: 禁用 readonly __isActivated 的改变检查
        extension.__isActivated = true;
      },
      onDeactivated: () => {
        if (!extension.__isActivated) return;

        define.onDeactivated?.();
        // @ts-ignore: 禁用 readonly __isActivated 的改变检查
        extension.__isActivated = false;
      },

      onRegistered: () => {
        if (extension.__isRegistered) return;
        define.onRegistered?.();
        // @ts-ignore: 禁用 readonly __isRegistered 的改变检查
        extension.__isRegistered = true;
      },
      onUnregistered: () => {
        if (!extension.__isRegistered) return;
        define.onUnregistered?.();
        // @ts-ignore: 禁用 readonly __isRegistered 的改变检查
        extension.__isRegistered = false;
      },
    } as const;

    return extension;
  }

  /**
   * 注册插件
   */
  public registerExtension(...extensions: Extension[]) {
    if (extensions.length === 0) return;

    super.setStore(() => {
      extensions.forEach(extension => {
        extension.onRegistered?.();
        this.extNameMap.set(extension.name, extension);
      });
    });
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
      for (const extension of normalState.extensions) {
        extension?.onActivated?.();
      }
    }, [normalState.extensions.length]);

    return [normalState];
  }

  /**
   * 取消所有插件的注册
   */
  public unregisterAllExtension() {
    if (this.extNameMap.size === 0) return;

    super.setStore(() => {
      this.extNameMap.clear();
    });
  }
}
