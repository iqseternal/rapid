import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { StateNode, BaseBoxShapeUtil, TLBaseShape, TLUiOverrides, TLComponents, TLAnyShapeUtilConstructor, TLStateNodeConstructor } from 'tldraw';
import { DefaultSizeStyle, Editor, TLShapeId, TldrawUiIcon, track, useEditor, useValue } from 'tldraw';

export interface PolotnoStore {
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

export const usePolotnoStore = create<PolotnoStore>()(
  persist(
    immer<PolotnoStore>((set, get, store) => {

      const tlStore: PolotnoStore = {
        tlTools: [],
        tlShapeUtils: [],
        tlUiOverrides: {},
        tlComponents: {},
      }

      return tlStore
    }), {
      name: 'polotnoStore'
    }
  )
);

export const polotnoMutations = {

  /**
   * 注册组件
   */
  registerComponent: <CKey extends keyof TLComponents>(key: CKey, component: TLComponents[CKey]) => {
    usePolotnoStore.setState(state => {
      state.tlComponents[key] = component;
    });

    return () => {
      usePolotnoStore.setState((state) => {
        state.tlComponents[key] = void 0 as TLComponents[CKey];
      });
    }
  },

  registerUiOverride: <UKey extends keyof TLUiOverrides>(key: UKey, override: TLUiOverrides[UKey]) => {
    usePolotnoStore.setState(state => {
      state.tlUiOverrides[key] = override;
    });

    return () => {
      usePolotnoStore.setState(state => {
        state.tlUiOverrides[key] = void 0 as TLUiOverrides[UKey];
      });
    }
  },


  registerTool: (tool: TLStateNodeConstructor) => {
    usePolotnoStore.setState(state => {
      state.tlTools.push(tool);
    });

    return () => {
      usePolotnoStore.setState(state => {
        state.tlTools = state.tlTools.filter(t => {
          return t && t !== tool;
        });
      });
    }
  },

  registerShapeUtil: (shapeUtil: TLAnyShapeUtilConstructor) => {
    usePolotnoStore.setState(state => {
      state.tlShapeUtils.push(shapeUtil);
    });

    return () => {
      usePolotnoStore.setState(state => {
        state.tlShapeUtils = state.tlShapeUtils.filter(s => {
          return s && s !== shapeUtil;
        });
      });
    }
  },


} as const;
