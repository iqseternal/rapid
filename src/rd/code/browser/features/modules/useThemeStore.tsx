import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const enum SidebarStatus {
  None = 'none',
  Left = 'left',
  Right = 'right'
}

export interface ThemeStore {
  layout: {
    mainSidebar: SidebarStatus;
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    immer((set, get, store) => ({
      layout: {
        mainSidebar: SidebarStatus.Left
      }
    })
  ),
  {
    name: 'themeStore',
    storage: createJSONStorage(() => window.sessionStorage)
  }
));


export const setMainSideBarStatus = (status: SidebarStatus) => {
  useThemeStore.setState((draftState => {
    draftState.layout.mainSidebar = status;
  }))
}
