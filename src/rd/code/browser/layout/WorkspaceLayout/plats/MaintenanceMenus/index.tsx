import { useRef, memo, useEffect, useLayoutEffect, type RefObject, useCallback } from 'react';
import { commonStyles } from '@/scss/common';
import { classnames } from '@rapid/libs-web';
import { useStorageBox } from './hook';
import { useHeaderEditMenu, useHeaderFileMenu, useHeaderHelpMenu, useHeaderViewMenu } from '@/menus/modules/header';

import AutoMenu from '@/components/AutoMenu';
import IconFont from '@/components/IconFont';

/**
 * 左侧收纳的文件菜单
 * @returns
 */
export const MaintenanceMenus = memo(() => {
  const [headerFileMenu] = useHeaderFileMenu();
  const [headerEditMenu] = useHeaderEditMenu();
  const [headerViewMenu] = useHeaderViewMenu();
  const [headerHelpMenu] = useHeaderHelpMenu();

  // 菜单容器
  const menusContainerRef = useRef<HTMLDivElement>(null);

  const [shallowStatusState, maintenanceStack, storageStack] = useStorageBox(menusContainerRef, [
    headerFileMenu,
    headerEditMenu,
    headerViewMenu,
    headerHelpMenu
  ]);

  return (
    <div
      ref={menusContainerRef}
      className={classnames(
        'py-0.5 h-full w-full flex items-center justify-start',
        !shallowStatusState.isCalcDone && 'opacity-0'
      )}
    >
      {maintenanceStack.map((menu, index) => {
        return (
          <AutoMenu
            key={`menu.key ${index}`}
            menu={menu.children}
            dropdownAttrs={{
              className: 'h-full',
              forceRender: true,
            }}
          >
            <div
              className={classnames(
                commonStyles.appRegionNo,
                'px-2 h-full rounded-md overflow-hidden hover:bg-gray-200 flex items-center'
              )}
            >
              {menu.label}
            </div>
          </AutoMenu>
        )
      })}

      {storageStack.length > 0 && (
        <AutoMenu
          menu={storageStack.map(menu => {
            return {
              key: menu.key,
              label: (
                <AutoMenu.SubMenu
                  icon={menu.icon}
                  label={menu.label}
                />
              ),
              children: menu.children
            }
          })}
          dropdownAttrs={{
            className: 'h-full'
          }}
        >
          <div
            className={classnames(
              commonStyles.appRegionNo,
              'px-2 h-full rounded-md overflow-hidden hover:bg-gray-200 flex items-center'
            )}
          >
            <IconFont
              icon='MenuOutlined'
              className={classnames(
                commonStyles.appRegionNo
              )}
            />
          </div>
        </AutoMenu>
      )}
    </div>
  )
})
