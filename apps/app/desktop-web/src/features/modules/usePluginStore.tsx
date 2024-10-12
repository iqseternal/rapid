import { produce } from 'immer';
import type { ReactNode } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface PluginContext {

}

export interface Plugin {

  render(context: PluginContext): ReactNode;
}

export interface InstrumentPlugin extends Plugin {
  name: string;

  renderInstrument(context: PluginContext): ReactNode;

  renderPanel(context: PluginContext): ReactNode;
}

export interface PluginStore {
  workbenches: {
    instrumentPlugins: InstrumentPlugin[];

  }
}

export const usePluginStore = create<PluginStore>()(persist(immer((set, get, store) => ({

  workbenches: {
    instrumentPlugins: [],

  }
})), {
  name: 'themeStore',
  storage: createJSONStorage(() => window.sessionStorage)
}));

export const initPlugins = (...plugins: Plugin[]) => {


}
