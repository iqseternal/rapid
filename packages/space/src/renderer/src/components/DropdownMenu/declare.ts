import { ref, inject, provide } from 'vue';
import { isBoolean, isUndefined } from '@suey/pkg-utils';
import type { SubMenuProps } from 'ant-design-vue';

export const DROPDOWN_STATUS = Symbol('DROPDOWN_STATUS');

export const setupDropdownOpenModel = () => {
  const open = ref(false);

  provide(DROPDOWN_STATUS, inject(DROPDOWN_STATUS, open));

  return open;
}

export type SingleMenuProps = {
  mark?: IconRealKey | `icon-${string}`;
  shortcut?: string;
};

/** 快捷菜单单项的类型 */
export type SingleMenuDataType = SingleMenuProps & {
  title: string;
  disabled?: boolean;
  onClick?: MouseOnClickCallBack;
};

export type ComboBoxMenuProps = {
  mark?: IconRealKey | `icon-${string}`;
};

/** 快捷菜单子菜单的类型 */
export type ComboBoxMenuDataType = ComboBoxMenuProps & Pick<SubMenuProps, 'title'> & {
  onClick?: MouseOnClickCallBack;
  children: (SingleMenuDataType | ComboBoxMenuDataType | MenuDriverDataType)[];
};

/** 快捷菜单分割线的类型 */
export type MenuDriverDataType = true;

/** 快捷菜单的数据类型 */
export type DropdownDataType = (SingleMenuDataType | ComboBoxMenuDataType | MenuDriverDataType)[];

/** 为判断函数做准备, 在编写时候可以需要判断 DropdownDataType 类型中的某一项是属于哪一个类型  */
type AbleAppearType = SingleMenuDataType | ComboBoxMenuDataType | MenuDriverDataType;

export const isSingleMenuData = (target: AbleAppearType): target is SingleMenuDataType => !isBoolean(target) && isUndefined((target as ComboBoxMenuDataType).children);

export const isComboBoxMenuData = (target: AbleAppearType): target is ComboBoxMenuDataType => !isBoolean(target) && Array.isArray((target as ComboBoxMenuDataType).children);

export const isMenuDriverData = (target: AbleAppearType): target is MenuDriverDataType => isBoolean(target);
