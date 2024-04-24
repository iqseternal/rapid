import type { Prop, Ref, UnwrapNestedRefs } from 'vue';
import type { PenProps } from '@/meta';

import type { Pen } from '@meta2d/core';
import { useSelections } from '@/meta';

import type { SelectOption, Switch, InputProps, InputNumberProps, SelectProps } from 'ant-design-vue';
import type { ComponentsProps } from '@rapid/libs/types';

const { selections } = useSelections();

export enum ShowTypeMode {
  InputString,
  InputNumber,
  Switch,
  Select
}

/** 基本 */
export interface PropItem<PropName extends keyof PenProps> {
  showType: ShowTypeMode;

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

  options: {
    content: number | string | JSX.IntrinsicElements;

    attrs: Partial<ComponentsProps<typeof SelectOption>>;
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

/** 组, 用于编写 ACollapsePanel */
export interface PenPropGroup {
  key: number | string;

  header: string;

  list: (
    SelectProp |
    SwitchProp |
    InputStringProp |
    InputNumberProp
  )[];
}

/** 列表, 表示一个大的 Tab */
export interface PenPropTab {
  key: number | string;

  tab: string;

  list: PenPropGroup[];
}


export function makePenProp<
  PropName extends keyof PenProps,
  Item extends (InputNumberProp<PropName> | InputStringProp<PropName> | SelectProp<PropName> | SwitchProp<PropName>)
>(value: { prop: PropName; } & Item): Required<Item> {
  const item = value as Item;

  if (!item.getValue) item.getValue = () => selections.pen?.[item.prop as keyof Pen];

  return item as unknown as Required<Item>;
}


let groupKey = 0;
export function makePenPropGroup<PenGroup extends PenPropGroup>(group: Omit<PenGroup, 'key'>): PenGroup {

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
