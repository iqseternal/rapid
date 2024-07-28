import { combinationCName } from '@rapid/libs-web/common';
import { windowClose, windowDevtool, windowMin, windowReduction, windowRelaunch } from '@/actions';
import { Subfield, SubfieldFixed } from '@rapid/libs-web/components/Subfield';
import { IS_WEB, IS_DEV } from '@rapid/config/constants';
import { makeVar, themeCssVarsSheet } from '@/themes';
import {useMemo, ReactNode} from 'react';
import { useMenuSelector } from '@/menus';
import { MaxContent } from '@rapid/libs-web/styled';

import Widget from '@components/Widget';

import AutoDropdownMenu from '@components/AutoDropdownMenu';
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
  const menus = useMemo(() => {
    return [headerFileMenu, headerEditMenu];
  }, [headerFileMenu, headerEditMenu]);

  return <Subfield
    className={combinationCName(styles.header, commonStyles.appRegion, props.className)}
  >

    <Subfield
      className={combinationCName(styles.menuContainer, commonStyles.appRegionNo)}
    >
      <SubfieldFixed
        className={styles.logo}
      >
        <Logo />
      </SubfieldFixed>

      <Subfield
        className={combinationCName(styles.menu, commonStyles.userSelectNone)}
      >
        {slots.menu
          ? slots.menu
          : (
            !isDialog && !isPane && menus.map(menu => <AutoDropdownMenu key={menu.key} menu={menu} />)
          )
        }
      </Subfield>
      <Subfield>

      </Subfield>
    </Subfield>

    <Subfield
      className={combinationCName(commonStyles.appRegionNo)}
    >

    </Subfield>

    <Subfield>
      <div />
      <div />

      <SubfieldFixed className={commonStyles.appRegionNo} gap={1}>
        {!IS_WEB &&
          <>
            {IS_DEV && <Widget icon='BugOutlined' tipText='开发者工具' onClick={() => windowDevtool(true)} />}
            <Widget icon='LineOutlined' tipText='最小化' onClick={() => windowMin()} />
            {!isDialog && !isPane && <Widget icon='BorderOutlined' tipText='还原' onClick={() => windowReduction()} />}
            <Widget icon='CloseOutlined' tipText='关闭' onClick={() => windowClose()} />
          </>
        }
      </SubfieldFixed>
    </Subfield>
  </Subfield>
}
