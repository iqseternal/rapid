import type { ComponentType } from 'react';
import { useSyncExternalStore, useCallback } from 'react';
import { DoubleLinkedList } from '@rapid/libs';
import { useRefresh } from '@rapid/libs-web/hooks';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface MetadataManagerInnerStore {
  update: {}
}

export class MetadataInnerZustandStoreManager {
  private readonly store = create<MetadataManagerInnerStore>()(
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

export class MetadataManager<MetadataEntries> extends MetadataInnerZustandStoreManager {
  private readonly metadataMap = new Map<string | number | symbol, any>();

  public defineMetadata<MetadataKey extends keyof MetadataEntries, Metadata extends MetadataEntries[MetadataKey]>(metadataKey: MetadataKey, metadata: Metadata) {
    super.__setStore(() => {
      this.metadataMap.set(metadataKey, metadata);
    })
  }

  public getMetadata<MetadataKey extends keyof MetadataEntries, Metadata extends MetadataEntries[MetadataKey]>(metadataKey: MetadataKey): Metadata | null {
    return this.metadataMap.get(metadataKey) ?? null;
  }

  public useMetadata<MetadataKey extends keyof MetadataEntries, Metadata extends MetadataEntries[MetadataKey]>(metadataKey: MetadataKey): Metadata | null {
    this.__useStore();
    return this.getMetadata(metadataKey) ?? null;
  }
}
