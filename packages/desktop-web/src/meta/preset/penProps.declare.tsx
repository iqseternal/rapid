import type { Prop, Ref, UnwrapNestedRefs } from 'vue';
import type { PenProps } from '@/meta';
import type { JSX } from 'vue/jsx-runtime';

import type { Pen } from '@meta2d/core';
import { useSelections } from '@/meta';

import type { SelectOption, Switch, InputProps, InputNumberProps, SelectProps } from 'ant-design-vue';
import type { ComponentsProps, ObjAutoComplete } from '@rapid/libs/types';

import type { PickColorsProps } from '@hooks/usePickColors';

const { selections } = useSelections();

/**
 * 展示类型的枚举
 */
export enum ShowTypeMode {
  InputString,
  InputNumber,
  Switch,
  Select,
  Color
}

/** 基本 */
export interface PropItem<PropName extends keyof PenProps> {
  showType: ShowTypeMode;

  /** 解释 label */
  label: string;

  /** 某个属性 */
  prop: PropName;

  /** 当属性发生变化时如何处理 */
  onChange: (value: Required<PenProps>[PropName]) => void;

  /** 获取当前 Prop 得最新值 */
  getValue?: () => PenProps[PropName];
}

/** 选择类型 */
export interface SelectProp<PropName extends keyof PenProps = keyof PenProps> extends PropItem<PropName> {
  showType: ShowTypeMode.Select;

  attrs?: SelectProps;

  options?: {
    content: JSX.Element;

    attrs: Partial<ComponentsProps<typeof SelectOption>> & {
      value: Required<PenProps>[PropName];
    };
  }[]
}

/** bool 类型 */
export interface SwitchProp<PropName extends keyof PenProps = keyof PenProps> extends PropItem<PropName> {
  showType: ShowTypeMode.Switch;
  attrs?: Partial<ComponentsProps<typeof Switch>>;
}

/** 字符串类型 */
export interface InputStringProp<PropName extends keyof PenProps = keyof PenProps> extends PropItem<PropName> {
  showType: ShowTypeMode.InputString;
  attrs?: InputProps;
}

/** 数字类型 */
export interface InputNumberProp<PropName extends keyof PenProps = keyof PenProps> extends PropItem<PropName> {
  showType: ShowTypeMode.InputNumber;

  attrs?: InputProps & InputNumberProps;
}

export interface ColorProp<PropName extends keyof PenProps = keyof PenProps> extends PropItem<PropName> {
  showType: ShowTypeMode.Color;

  attrs?: PickColorsProps;
}

/** 组, 用于编写 ACollapsePanel */
export interface PenPropGroup {
  key: number | string;

  header: string;

  list: (
    SelectProp |
    SwitchProp |
    InputStringProp |
    InputNumberProp |
    ColorProp
  )[];
}

/** 列表, 表示一个大的 Tab */
export interface PenPropTab {
  key: number | string;

  tab: string;

  list: PenPropGroup[];
}

/**
 * make 一个 pen 的 属性
 * @param value
 */
export function makePenProp<
  PropName extends keyof PenProps,
  Item extends (InputNumberProp<PropName> | InputStringProp<PropName> | SelectProp<PropName> | SwitchProp<PropName> | ColorProp<PropName>)
>(value: { prop: PropName; } & Item): Required<Item> & Required<PropItem<PropName>> {
  const item = value as Required<Item> & Required<PropItem<PropName>>;

  if (!item.getValue) item.getValue = () => selections.pen?.[item.prop as keyof Pen];

  return item;
}


let groupKey = 0;
export function makePenPropGroup<PenGroup extends PenPropGroup>(group: Omit<PenGroup, 'key'>): PenPropGroup {

  const penGroup = group as PenGroup;

  penGroup.key = groupKey ++;

  return penGroup;
}

let tabKey = 0.1;
export function makePenPropTab<PenTab extends PenPropTab>(tab: Omit<PenPropTab, 'key'>): PenPropTab {

  const penTab = tab as PenTab;

  penTab.key = tabKey ++;

  return penTab;
}
