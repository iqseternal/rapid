import { combinationCName } from '@rapid/libs-web/common';
import { windowClose, windowDevtool, windowMin, windowReduction, windowRelaunch } from '@/actions';
import { Subfield, SubfieldFixed } from '@rapid/libs-web/components/Subfield';
import { IS_WEB, IS_DEV } from '@rapid/config/constants';
import { useMemo, ReactNode, useEffect, useRef, useCallback } from 'react';
import { useMenuSelector } from '@/menus';
import { FlexRowStart, MaxContent, useMaintenanceStack, useResizeObserver, useShallowReactive } from '@rapid/libs-web';
import { randomRegionForInt } from '@suey/pkg-utils';
import { Menu } from 'antd';

import Widget from '@components/Widget';
import AutoDropdownMenu from '@components/AutoDropdownMenu';
import IconFont from '@components/IconFont';
import Logo from '@components/Logo';

import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

export interface HeaderProps extends BaseProps {
  // 是否是一个面板
  isPane?: boolean;
  // 是否是一个弹窗
  isDialog?: boolean;

  slots?: {
    menu?: ReactNode;
  }
}

export default function Header(props: HeaderProps) {
  const {
    isDialog = false,
    isPane = false,
    slots = {}
  } = props;

  const headerFileMenu = useMenuSelector(menus => menus.headerFileMenu);
  const headerEditMenu = useMenuSelector(menus => menus.headerEditMenu);

  const { maintenanceStack, storageStack, otherStack, pushMaintenanceStack, popMaintenanceStack } = useMaintenanceStack({
    maintenanceStack: [
      headerFileMenu, headerEditMenu,


    ],
    otherStack: [] as { sourceWidth: number;calcWidth: number; }[],


    storageStack: [
      headerFileMenu, headerEditMenu,
      headerFileMenu, headerEditMenu,
      headerFileMenu, headerEditMenu,
      headerFileMenu, headerEditMenu,
      headerFileMenu, headerEditMenu,
      headerFileMenu, headerEditMenu,
      headerFileMenu, headerEditMenu,
      headerFileMenu, headerEditMenu
    ]
  });

  const menusContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menusContainerRef.current) return;

    for (let i = 0;i < maintenanceStack.length;i ++) {
      if (!otherStack[i]) {
        otherStack[i] = {
          sourceWidth: 24,
          calcWidth: 0
        }
      }
    }
    for (let i = 0;i < storageStack.length;i ++) {
      if (!otherStack[maintenanceStack.length + i]) {
        otherStack[maintenanceStack.length + i] = {
          sourceWidth: 24,
          calcWidth: 0
        }
      }
    }

    otherStack[0].calcWidth = otherStack[0].sourceWidth + 50;

    for (let i = 1;i < otherStack.length;i ++) {
      otherStack[i].calcWidth = otherStack[i - 1].calcWidth + 10 + otherStack[i].sourceWidth;
    }

    return () => {
      otherStack.fill(void 0);
    }
  }, []);

  // useResizeObserver(menusContainerRef, () => {
  //   const menusContainer = menusContainerRef.current;
  //   if (!menusContainer) return;

  //   pushMaintenanceStack((menu, other, index) => {
  //     if (!other) return false;
  //     return menusContainer.clientWidth >= other.calcWidth;
  //   });

  //   popMaintenanceStack((menu, other, index) => {
  //     if (!other) return false;
  //     return menusContainer.clientWidth < other.calcWidth;
  //   });
  // });

  return <Subfield
    className={combinationCName(
      styles.header,
      commonStyles.appRegion,
      props.className
    )}
  >

    <Subfield
      className={combinationCName(styles.menuContainer)}
    >
      <SubfieldFixed
        className={styles.logo}
      >
        <Logo />
      </SubfieldFixed>

      <FlexRowStart
        ref={menusContainerRef}
        className={combinationCName(
          styles.menu,
          commonStyles.userSelectNone,
          commonStyles.appRegionNo
        )}
      >
        <Menu mode='horizontal' items={maintenanceStack.concat(storageStack).map((item, index) => {
          item.key = `headerMenu${index}`;

          return item;
        })} />

        {/* {slots.menu
          ? slots.menu
          : (
            !isDialog && !isPane && maintenanceStack.map(menu => <AutoDropdownMenu key={`menu.key ${randomRegionForInt(0, 1112023)}`} menu={menu} />)
          )
        }

        {storageStack.length > 0 && <AutoDropdownMenu menu={{ label: 'header-storage-stack', key: 'header-storage-stack', children: storageStack }}>

          <IconFont icon='MenuOutlined' />

        </AutoDropdownMenu>} */}

      </FlexRowStart>

      <SubfieldFixed>
        1111
      </SubfieldFixed>
    </Subfield>

    <Subfield
      className={styles.functionContainer}
    >
      22222
    </Subfield>

    <Subfield
      className={styles.operatorContainer}
    >
      <div />
      <div />

      <SubfieldFixed
        className={commonStyles.appRegionNo}
        gap={1}
      >
        {!IS_WEB &&
          <>
            {IS_DEV && <Widget icon='BugOutlined' tipText='开发者工具' onClick={() => windowDevtool(true, { mode: 'detach' })} />}
            <Widget icon='LineOutlined' tipText='最小化' onClick={() => windowMin()} />
            {!isDialog && !isPane && <Widget icon='BorderOutlined' tipText='还原' onClick={() => windowReduction()} />}
            <Widget icon='CloseOutlined' tipText='关闭' onClick={() => windowClose()} />
          </>
        }
      </SubfieldFixed>
    </Subfield>
  </Subfield>
}
