
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface ExtensionStore {




}

export const useExtensionStore = create<ExtensionStore>()(persist(immer((set, get, store) => ({




})), {
  name: 'ExtensionStore',
  storage: createJSONStorage(() => window.sessionStorage)
}));


