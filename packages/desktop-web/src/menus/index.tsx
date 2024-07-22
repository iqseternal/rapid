import { AppStoreType, useAppDispatch, useAppSelector } from '@/features';
import { useCallback, useEffect, useRef } from 'react';
import { headerMenu } from './modules/header';
import { useRefresh } from '@rapid/libs-web/hooks';
import { findArrIndex } from '@rapid/libs/common';
import { registerMenus } from '@/menus/framework';
import store from '@/features';

export { useMenuSelectorHook, useMenuSelector } from './framework';

export const menus = {
  headerMenu
} as const;


registerMenus(menus);
