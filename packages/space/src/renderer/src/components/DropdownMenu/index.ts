/**
 * ==========================================
 * 快捷菜单类
 * ==========================================
 */

// 包裹一层的原因为需要定制化样式, 但是又不想污染原来的组件库
import type { DefineComponent } from 'vue';
import type { Dropdown, Menu, SubMenu, MenuItem, Divider } from 'ant-design-vue';
import DropdownMenuVue from './DropdownMenu.vue';
import ComboBoxMenuVue from './ComboBoxMenu.vue';
import SingleMenuVue from './SingleMenu.vue';
import MenuDriverVue from './MenuDriver.vue';


export const DropdownMenu: (typeof Dropdown & typeof DropdownMenuVue) = DropdownMenuVue as (typeof Dropdown & typeof DropdownMenuVue);
export const ComboBoxMenu: (typeof SubMenu & typeof ComboBoxMenuVue) = ComboBoxMenuVue as (typeof SubMenu & typeof ComboBoxMenuVue);
export const SingleMenu: ((typeof MenuItem) & (typeof SingleMenuVue)) = SingleMenuVue as ((typeof MenuItem) & (typeof SingleMenuVue));
export const MenuDriver: (typeof Divider & typeof MenuDriverVue) = MenuDriverVue as (typeof Divider & typeof MenuDriverVue);

export { default as AutoDropdownMenu } from './AutoDropdownMenu.vue';

export type {
  SingleMenuProps, SingleMenuDataType,
  ComboBoxMenuProps, ComboBoxMenuDataType,
  MenuDriverDataType,
  DropdownDataType
} from './declare';

export { isSingleMenuData, isComboBoxMenuData, isMenuDriverData, DROPDOWN_STATUS, setupDropdownOpenModel } from './declare';
