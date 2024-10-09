import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface ThemeStore {



}

export const useThemeStore = create<ThemeStore>()(persist(immer((set, get, store) => ({


})), {
  name: 'themeStore',
  storage: createJSONStorage(() => window.sessionStorage)
}));


