import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { PropsWithChildren, ReactNode } from 'react';

export interface Extension {
  /**
   * 插件的唯一标识 name
   */
  readonly name: string | symbol;

  /**
   * 插件被注册
   */
  readonly onRegistered?: () => void;

  /**
   * 插件被激活, 被使用的状态
   */
  readonly onActivate?: () => void;

  /**
   * 插件被去活, 被禁用的状态
   */
  readonly onDeactivated?: () => void;

  /**
   * 插件更新
   */
  readonly onUpdated?: () => void;

  /**
   * 插件被禁用
   */
  readonly onDisabled?: () => void;

  /**
   * 插件被卸载
   */
  readonly onUnregistered?: () => void;
}

export interface ExtensionManagerInnerStore {
  update: {}
}

export class ExtensionManager<SlotsInterface extends Record<string | number | symbol, Extension>> {
  private readonly mapper = new Map<keyof SlotsInterface, SlotsInterface[keyof SlotsInterface][]>();

  private readonly store = create<ExtensionManagerInnerStore>()(
    immer(() => {
      return {
        update: {}
      }
    })
  )

  /**
   * 更新 store
   */
  private updateStore() {
    this.store.setState({ update: {} });
  }

  /**
   * store hook
   */
  private useStore() {
    this.store(store => store.update);
  }

  /**
   * 某个插件
   */
  public unregisterExtension<SlotKey extends keyof SlotsInterface>(slotKey: SlotKey, ...extensions: SlotsInterface[SlotKey][]) {
    if (!this.mapper.has(slotKey)) return;
    const list = this.mapper.get(slotKey)!;
    const targetList = list.filter(li => {
      return !extensions.some(extension => extension === li || extension.name === li.name);
    })
    this.mapper.set(slotKey, targetList);
    this.updateStore();
  }

  /**
   * 移除一组插件
   */
  public removeExtension<SlotKey extends keyof SlotsInterface>(slotKey: SlotKey) {
    this.mapper.delete(slotKey);
    this.updateStore();
  }

  /**
   * 注册插件
   */
  public registerExtension<SlotKey extends keyof SlotsInterface>(slotKey: SlotKey, ...extensions: SlotsInterface[SlotKey][]) {
    if (!this.mapper.has(slotKey)) this.mapper.set(slotKey, []);

    const list = this.mapper.get(slotKey)!;
    extensions = extensions.filter(extension => {
      return !list.some(li => li === extension || li.name === extension.name);
    })

    list.push(...extensions);

    this.mapper.set(slotKey, list);
    this.updateStore();
    return () => this.unregisterExtension(slotKey, ...extensions);
  }

  /**
   * 使用某个插件
   */
  public useExtension<SlotKey extends keyof SlotsInterface>(slotKey: SlotKey): SlotsInterface[SlotKey] | undefined | null {
    this.useStore();
    if (!this.mapper.has(slotKey)) return void 0;

    const list = this.mapper.get(slotKey)!;
    if (list.length === 0) return null;

    return list[list.length - 1] as SlotsInterface[SlotKey];
  }

  /**
   * 使用某组插件
   */
  public useExtensions<SlotKey extends keyof SlotsInterface>(slotKey: SlotKey): SlotsInterface[SlotKey][] | undefined {
    this.useStore();
    if (!this.mapper.has(slotKey)) return void 0;

    const list = this.mapper.get(slotKey)!;
    return list as SlotsInterface[SlotKey][];
  }
}
