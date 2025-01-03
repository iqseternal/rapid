import type { ComponentType } from 'react';
import { useSyncExternalStore, useCallback } from 'react';
import { DoubleLinkedList } from '@rapid/libs';
import { useRefresh } from '@rapid/libs-web/hooks';

export type SlotPointKey = string | number | symbol;
export type SlotPointSubscribe = () => void;

export class SlotPoint {
  private readonly slotPointListenerMap = new Map<SlotPointKey, DoubleLinkedList<SlotPointSubscribe>>();
  private readonly slotPointInstanceMap = new Map<SlotPointKey, ComponentType<any> | ComponentType<any>[]>();

  private initSubscribeLinkedList(slotPointKey: SlotPointKey) {
    if (this.slotPointListenerMap.has(slotPointKey)) {
      return this.slotPointListenerMap.get(slotPointKey)!;
    }

    const linkedList = new DoubleLinkedList<SlotPointSubscribe>();
    this.slotPointListenerMap.set(slotPointKey, linkedList);
    return linkedList;
  }

  subscribe(slotPointKey: SlotPointKey, subscribe: SlotPointSubscribe) {
    const linkedList = this.initSubscribeLinkedList(slotPointKey);
    linkedList.insert(subscribe);
    return () => linkedList.delete(subscribe);
  }

  unsubscribe(slotPointKey: SlotPointKey, subscribe: SlotPointSubscribe) {
    const linkedList = this.initSubscribeLinkedList(slotPointKey);
    linkedList.deleteWhere((value) => value === subscribe);
  }

  private setSlotPointInstanceMapValue(slotPointKey: SlotPointKey, data: ComponentType<any> | ComponentType<any>[]): void {
    const linkedList = this.initSubscribeLinkedList(slotPointKey);

    this.slotPointInstanceMap.set(slotPointKey, data);
    linkedList.forEach(callback => callback());
  }

  registerSlotPoint(slotPointKey: SlotPointKey, data: ComponentType<any> | ComponentType<any>[]) {
    if (this.slotPointInstanceMap.has(slotPointKey)) {
      if (Array.isArray(data)) {
        const arr = (this.slotPointInstanceMap.get(slotPointKey) ?? []);
        if (!Array.isArray(arr)) {
          console.error('registerPoint data is not array.');
          return;
        }

        data.forEach(component => {
          if (arr.some(li => li === component)) {
            return;
          }

          arr.push(component);
        })

        this.setSlotPointInstanceMapValue(slotPointKey, arr);
        return;
      }

      return;
    }

    this.setSlotPointInstanceMapValue(slotPointKey, data);
  }

  /**
   * hook 使用槽点
   */
  useSlotPoint(slotPointKey: SlotPointKey) {
    const refresh = useRefresh();

    const subscribe = useCallback((onStorageChange: () => void) => {
      const unsubscribe = this.subscribe(slotPointKey, () => {
        // onStorageChange();
        refresh();
      });

      return () => {
        unsubscribe();
      }
    }, []);

    const getSnapshot = useCallback(() => {
      return this.slotPointInstanceMap.get(slotPointKey);
    }, []);

    return useSyncExternalStore(subscribe, getSnapshot);
  }
}
