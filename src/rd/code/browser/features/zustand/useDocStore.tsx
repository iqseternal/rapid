import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface DocStore {
  isWork: boolean;
}

export const useDocStore = create<DocStore>()(
  persist(
    immer((set, get, store) => ({

      isWork: false

    }
  )
), {
  name: 'docStore',
  storage: createJSONStorage(() => window.sessionStorage)
}));


