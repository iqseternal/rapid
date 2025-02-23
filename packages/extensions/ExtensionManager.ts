import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useLayoutEffect, type PropsWithChildren, type ReactNode } from 'react';
import { DoubleLinkedList } from '@rapid/libs';
import { useAsyncLayoutEffect, useNormalState, useUnmount } from '@rapid/libs-web/hooks';

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

export interface ExtensionManagerInnerStore {
  update: {}
}

export abstract class ExtensionInnerZustandStoreManager {
  private readonly store = create<ExtensionManagerInnerStore>()(
    immer(() => {
      return {
        update: {}
      }
    })
  )

  protected __updateStore() {
    this.store.setState({ update: {} });
  }

  /**
   * store hook
   */
  protected __useStore() {
    return this.store(store => store.update);
  }

  protected __setStore(setStoreFunction: () => void) {
    setStoreFunction();
    this.__updateStore();
  }
}


export class ExtensionManager extends ExtensionInnerZustandStoreManager {
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

    if (unregisterSuccess) super.__updateStore();
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
    // @ts-ignore
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
        // @ts-ignore
        extension.__isActivated = true;
      },
      onDeactivated: () => {
        if (!extension.__isActivated) return;

        define.onDeactivated?.();
        // @ts-ignore
        extension.__isActivated = false;
      },

      onRegistered: () => {
        if (extension.__isRegistered) return;
        define.onRegistered?.();
        // @ts-ignore
        extension.__isRegistered = true;
      },
      onUnregistered: () => {
        if (!extension.__isRegistered) return;
        define.onUnregistered?.();
        // @ts-ignore
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

    super.__setStore(() => {
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
    const value = this.__useStore();

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

    super.__setStore(() => {
      this.extNameMap.clear();
    });
  }
}
