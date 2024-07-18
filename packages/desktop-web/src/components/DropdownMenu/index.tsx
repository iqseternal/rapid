import type { IconKey } from '@components/IconFont';
import { combinationCName } from '@rapid/libs-web/common';
import { useEventListener, useReactive, useShallowReactive, useThrottleHook } from '@rapid/libs-web/hooks';
import { Dropdown, Menu, Divider } from 'antd';
import type { DropDownProps, SubMenuProps, MenuItemProps, DividerProps } from 'antd';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import Subfield from '@rapid/libs-web/components/Subfield';
import IconFont from '@components/IconFont';
import styles from './index.module.scss';

const menus = [
  {
    key: '1-1',
    label: <>
      测试
      {'Ctrl+C'}
    </>,
    icon: <IconFont icon='GithubOutlined'></IconFont>,
    children: [
      {
        key: '1-1-1',
        label: <>
          测试
          {'Ctrl+C'}
        </>,

        icon: <IconFont icon='GithubOutlined'></IconFont>,
      },
      {
        key: '1-1-2',
        label: <>
          测试
          {'Ctrl+C'}
        </>,
        icon: <IconFont icon='GithubOutlined'></IconFont>,
      },
      {
        key: '1-1-3'
      },
      {
        key: '1-1-4',
        label: <>
          测试
          {'Ctrl+C'}
        </>,
        icon: <IconFont icon='GithubOutlined'></IconFont>,
        children: [
          {
            key: '1-1-4-1',
            label: <>
              测试
              {'Ctrl+C'}
            </>,
            icon: <IconFont icon='GithubOutlined'></IconFont>,
          }
        ]
      }
    ]
  },
  {
    key: '21-1',
    label: <>
      测试
      {'Ctrl+C'}
    </>,
    icon: <IconFont icon='GithubOutlined'></IconFont>,

    children: [
      {
        key: '21-1-1',
        label: <>
          测试
          {'Ctrl+C'}
        </>,
        icon: <IconFont icon='GithubOutlined'></IconFont>,
      },
      {
        key: '21-1-2',
        label: <>
          测试
          {'Ctrl+C'}
        </>,
        icon: <IconFont icon='GithubOutlined'></IconFont>,
      },
      {
        key: '21-1-3'
      },
      {
        key: '21-1-4',
        label: <>
          测试
          {'Ctrl+C'}
        </>,
        icon: <IconFont icon='GithubOutlined'></IconFont>,
        children: [
          {
            key: '21-1-4-1',
            label: <>
              测试
              {'Ctrl+C'}
            </>,
            icon: <IconFont icon='GithubOutlined'></IconFont>,
          }
        ]
      }
    ]
  }
];


export interface DropdownMenuProps extends DropDownProps {

}
export function DropdownMenu(props: DropdownMenuProps) {
  const {
    className,
    children,
    ...realProps
  } = props;

  const [state] = useShallowReactive({
    open: false,
    openKeys: [] as string[]
  })

  useEventListener(window, 'resize', useThrottleHook(() => {
    if (!state.open) return;

    state.openKeys = [];
    state.open = false;
  }), []);

  return <Dropdown
      {...realProps}
      open={state.open}
      arrow={false}
      trigger={['click']}
      rootClassName={combinationCName(className, styles.dropdownMenuRootWrapper)}
      autoAdjustOverflow
      // destroyPopupOnHide
      // autoFocus
      forceRender
      mouseEnterDelay={0}
      mouseLeaveDelay={0}
      getPopupContainer={() => document.body}
      onOpenChange={(value, info) => {

        state.openKeys = [];
        state.open = value;

        console.log('dropdown: ', { ...state });

      }}
      dropdownRender={(originNode) => {

        console.log(originNode);


        return <>
          <Menu
            subMenuOpenDelay={0}
            subMenuCloseDelay={0}
            selectable={false}

            triggerSubMenuAction={'click'}
            rootClassName={combinationCName(styles.dropdownMenuRootWrapper)}
            openKeys={state.openKeys}
            defaultOpenKeys={[]}
            // forceSubMenuRender={true,}
            onOpenChange={(openKeys) => {
              if (!state.open) return;
              state.openKeys = openKeys;
              console.log('openChange', { ...state });
              // if (openKeys.length === 0) state.open = false;
            }}
            onClick={(info) => {
              // state.openKeys = [];
              // state.open = false;

              console.log('click', { ...state });

            }}
            onSelect={(info) => {
              // state.openKeys = [];
              // state.open = false;

              console.log('select', { ...state });

            }}
            // onDeselect: (info) => {
            //   state.open = false;
            // },
            // items={menus}
          >
            <Menu.SubMenu title='aaaa'>
              <Menu.Item title='asdddddddd'>

              </Menu.Item>
            </Menu.SubMenu>

          </Menu>



        </>
      }}
    >
      {children}
    </Dropdown>
}

export interface AutoDropdownMenuProps {

}
export default function AutoDropdownMenu() {

}

