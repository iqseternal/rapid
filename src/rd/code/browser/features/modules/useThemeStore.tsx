import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface ThemeStore {


  layout: {

    mainSidebar: 'none' | 'left' | 'right';

  }
}

export const useThemeStore = create<ThemeStore>()(persist(immer((set, get, store) => ({

  layout: {

    mainSidebar: 'left'
  }

})), {
  name: 'themeStore',
  storage: createJSONStorage(() => window.sessionStorage)
}));


export const setMainSideBarStatus = (status: ThemeStore['layout']['mainSidebar']) => {
  useThemeStore.setState((draftState => {
    draftState.layout.mainSidebar = status;
  }))
}
