import {reactive, ref} from 'vue';
import type { UnwrapNestedRefs } from 'vue';
import type { Meta2d } from '@meta2d/core';
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
import type { ObjAutoObtainComplete } from '@rapid/libs/types';
import { refresh } from './actions';
import { isDef, isString } from '@suey/pkg-utils';
import { useMetaStateHook } from './useMetaState';

const makeState = <T extends object, V extends Partial<T>>(props: V): UnwrapNestedRefs<ObjAutoObtainComplete<V, Partial<T>>> => reactive<any>(props);

export type DataProps = Meta2d['store']['data'];
export const makeDataState = <T extends Partial<DataProps>>(props: T) => makeState<DataProps, T>(props);



export type OptionsProps = Required<Parameters<Meta2d['setOptions']>>[0];
export const makeOptionsState = <T extends OptionsProps>(props: T) => makeState<OptionsProps, T>(props);


const { metaState, onReSetup } = useMetaStateHook();


const dataState = makeDataState({
  name: '',

  penBackground: '',
  bkImage: '',

  gridRotate: 0,
})

/***
 * 更新 state 状态
 */
const updateDataState = () => {
  if (!metaState.isSetup || !window.meta2d) return;

  const data = meta2d.store.data;

  dataState.name = data.name || '';

  dataState.penBackground = data.penBackground || '';

  dataState.bkImage = data.bkImage || '';

  dataState.gridRotate = data.gridRotate || 0;
}

onReSetup(updateDataState);

const onChangeBkImage = async (e: any) => {
  if (!e.target) return;
  if (!e.target.files) return;

  const file = e.target.files[0] as File;
  if (!file) return;

  const fileUrl = URL.createObjectURL(file);
  await meta2d.setBackgroundImage(fileUrl);
  dataState.bkImage = fileUrl;
  refresh();
}

const onChangeGridRotate = () => {
  if (isDef(dataState.gridRotate)) {
    meta2d.setGrid({
      gridRotate: +dataState.gridRotate
    });
  }
  refresh();
}

const onChangePenBackground = () => {
  meta2d.store.data.penBackground = dataState.penBackground;
  meta2d.store.patchFlagsBackground = true;
  refresh();
}

const onChangeData = <DataKey extends keyof typeof dataState>(dataKey?: DataKey | ChangeEvent) => {
  if (dataKey && isString(dataKey)) Object.assign(meta2d.store.data, { [dataKey]: dataState[dataKey] });
  else Object.assign(meta2d.store.data, dataState);
  meta2d.store.patchFlagsBackground = true;
  refresh();
};

const optionsState = makeOptionsState({
  background: '',

  // 网格
  grid: false,
  gridSize: 10,
  gridColor: '',

  rule: true,
  /** 标尺颜色 */
  ruleColor: '',


  // 画笔

  /** 默认颜色 */
  color: '',
  /** 选中颜色 */
  activeColor: '',
  /** hover颜色 */
  hoverColor: '',
  /** hover背景颜色 */
  hoverBackground: '',


  // 锚点
  /** 锚点颜色 */
  anchorColor: '',
  /** 锚点半径 */
  anchorRadius: 5,
  /** 锚点背景颜色 */
  anchorBackground: '',


  // 辅助线
  /** 锚点颜色 */
  dockColor: '',
  /** 框选颜色 */
  dragColor: '',
  /** 连线动画颜色 */
  animateColor: '',


  // 文字
  /** 文字颜色 */
  textColor: '',
  /** 文字字体 */
  fontFamily: '',
  /** 文字大小 */
  fontSize: 12,
  /** 文字行高 */
  lineHeight: 1,
  /** 文字水平对齐方式 */
  textAlign: 'center',
  /** 文字垂直对齐方式 */
  textBaseline: 'middle',


  // 鼠标样式
  /** 旋转控制点的 */
  rotateCursor: '',
  /** hover样式 */
  hoverCursor: '',


  // 禁止
  /** 禁止双击弹出输入框 */
  disableInput: false,
  /** 禁止旋转 */
  disableRotate: false,
  /** 禁止显示锚点 */
  disableAnchor: false,
  /** 禁止存在两端关联缺少的连线 */
  disableEmptyLine: false,
  /** 禁止存在关联重复的连线 */
  disableRepeatLine: false,
  /** 禁止画布缩放 */
  disableScale: false,
  /** 禁止辅助线 */
  disableLineDock: false,
  /** 禁止画布移动 */
  disableTranslate: false,


  // 画布设置
  /** 画布最小缩放比例 */
  minScale: 0,
  /** 画笔最大缩放比例 */
  maxScale: 1000,


  // 其他设置
  /** 自动选中节点锚点 */
  autoAnchor: true,
  /** 绘画帧时长 */
  interval: 1,
  /** 动画帧时长 */
  animateInterval: 1,
  /** 文字是否选择 */
  textRotate: true,
  /** 文字是否镜像 */
  textFlip: true
})

/**
 * 更新 options state 状态
 */
const updateOptionsState = () => {
  if (!metaState.isSetup || !window.meta2d) return;

  const options = meta2d.getOptions();
  Object.assign(optionsState, options);
}

onReSetup(updateOptionsState);

const onChangeOptions = <OptionsKey extends keyof typeof optionsState>(optionsKey?: OptionsKey | ChangeEvent) => {
  if (optionsKey && isString(optionsKey)) meta2d.setOptions({ [optionsKey]: optionsState[optionsKey] })
  else meta2d.setOptions(optionsState);

  meta2d.store.patchFlagsTop = true;
  meta2d.store.patchFlagsBackground = true;
  meta2d.render();
};

export const useDataState = () => ({
  dataState,
  onChangeData,
  onChangeBkImage,
  onChangeGridRotate,
  onChangePenBackground,

  updateDataState
});
export const useDataStateHook = useDataState;

export const useOptionsState = () => ({
  optionsState,
  onChangeOptions,

  updateOptionsState
});
export const useOptionsStateHook = useOptionsState;
