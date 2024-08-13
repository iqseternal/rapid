import { headerFileMenu, headerEditMenu } from './modules/header';
import { registerMenus, makeMenu } from '@/menus/framework';

export { useMenuSelectorHook, useMenuSelector } from './framework';

export const menus = {
  headerFileMenu,
  headerEditMenu
} as const;


registerMenus(menus);
