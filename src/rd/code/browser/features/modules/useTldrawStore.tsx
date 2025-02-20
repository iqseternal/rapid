import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { StateNode, BaseBoxShapeUtil, TLBaseShape, TLUiOverrides, TLComponents, TLAnyShapeUtilConstructor, TLStateNodeConstructor } from 'tldraw';

export interface TldrawStore {
  /**
   * 工具栏
   */
  tlTools: TLStateNodeConstructor[];

  /**
   * 形状工具
   */
  tlShapeUtils: TLAnyShapeUtilConstructor[];

  /**
   * UI 覆盖
   */
  tlUiOverrides: TLUiOverrides;

  /**
   * 组件
   */
  tlComponents: Partial<TLComponents>;
}

export const useTldrawStore = create<TldrawStore>()(
  (
    immer<TldrawStore>((set, get, store) => {

      const tlStore: TldrawStore = {
        tlTools: [],
        tlShapeUtils: [],
        tlUiOverrides: {},
        tlComponents: {},
      }

      return tlStore
    })
  )
);

export const tldrawStoreMutations = {

  /**
   * 注册组件
   */
  registerComponent: <CKey extends keyof TLComponents>(key: CKey, component: TLComponents[CKey]) => {
    useTldrawStore.setState(state => {
      state.tlComponents[key] = component;
    });

    return () => {
      useTldrawStore.setState((state) => {
        state.tlComponents[key] = void 0 as TLComponents[CKey];
      });
    }
  },

  registerUiOverride: <UKey extends keyof TLUiOverrides>(key: UKey, override: TLUiOverrides[UKey]) => {
    useTldrawStore.setState(state => {
      state.tlUiOverrides[key] = override;
    });

    return () => {
      useTldrawStore.setState(state => {
        state.tlUiOverrides[key] = void 0 as TLUiOverrides[UKey];
      });
    }
  },


  registerTool: (tool: TLStateNodeConstructor) => {
    useTldrawStore.setState(state => {
      state.tlTools.push(tool);
    });

    return () => {
      useTldrawStore.setState(state => {
        state.tlTools = state.tlTools.filter(t => {
          return t && t !== tool;
        });
      });
    }
  },

  registerShapeUtil: (shapeUtil: TLAnyShapeUtilConstructor) => {
    useTldrawStore.setState(state => {
      state.tlShapeUtils.push(shapeUtil);
    });

    return () => {
      useTldrawStore.setState(state => {
        state.tlShapeUtils = state.tlShapeUtils.filter(s => {
          return s && s !== shapeUtil;
        });
      });
    }
  },


} as const;
