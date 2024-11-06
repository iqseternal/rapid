import { AntdMenuInstance, convertMenu, type MenuInstance } from '@components/AutoDropdownMenu';

import { setMainSideBarStatus, useDocStore, useThemeStore } from '@/features';
import { toMakeZustandHijack } from '@rapid/libs-web';
import { windowDevtool } from '@/actions';

const { makeZustandHijack } = toMakeZustandHijack({
  beforeHijackCovert<T extends MenuInstance>(target: T) {
    return convertMenu(target);
  },
})

export const headerFileMenu = makeZustandHijack<MenuInstance, AntdMenuInstance>((selector) => ({
  key: 'headerFileMenu',
  label: '文件',
  iconKey: 'FileFilled',
  children: [
    {
      key: '1-1',
      type: 'item',
      iconKey: 'WindowsOutlined',
      label: '新建窗口',
      shortcut: 'Ctrl+N'
    },

    {
      key: '1-2',
      type: 'submenu',
      iconKey: 'DockerOutlined',
      label: '新建文档',
      children: [
        {
          key: '1-2-1',
          type: 'item',
          label: '空白文档',
        },
        {
          key: '1-2-2',
          type: 'item',
          label: '模板文档',
        }
      ]
    },
    {
      key: '1-3',
      type: 'divider'
    },
    {
      key: '1-4-1',
      type: 'item',
      iconKey: 'OpenAIOutlined',
      label: '打开',
      shortcut: ['Ctrl+O'],
      disabled: selector(useDocStore, state => state.isWork),

    },
    {
      key: '1-4-1-1',
      type: 'item',
      label: '打开最近文档',
      shortcut: []
    },
    {
      key: '1-3-2',
      type: 'divider'
    },
    {
      key: '1-4-2',
      type: 'item',
      iconKey: 'SaveOutlined',
      label: '保存',
      shortcut: ['Ctrl+S'],
      disabled: selector(useDocStore, state => state.isWork)
    },
    {
      key: '1-4-3',
      type: 'item',
      iconKey: 'SaveOutlined',
      label: '另存为',
      shortcut: ['Ctrl+Shift+S'],
      disabled: selector(useDocStore, state => state.isWork)
    },
    {
      key: '1-5',
      type: 'submenu',
      iconKey: 'ExportOutlined',
      label: '导出',
      children: [
        {
          key: '1-5-1',
          type: 'item',
          iconKey: 'FileTextOutlined',
          label: 'JSON'
        },
        {
          key: '1-5-2',
          type: 'item',
          iconKey: 'FileJpgOutlined',
          label: 'PNG'
        }
      ]
    },
    {
      key: '1-6',
      type: 'divider'
    },

    {
      key: '1-7',
      type: 'item',
      label: '自动保存'
    },
    {
      key: '1-8',
      type: 'submenu',
      label: '首选项',

      children: [
        {
          key: '1-8-1',
          type: 'item',
          iconKey: 'SettingOutlined',
          label: '设置',

        }
      ]
    },

    {
      key: '1-9',
      type: 'divider'
    },
    {
      key: '1-10',
      type: 'item',
      iconKey: 'PrinterOutlined',
      label: '打印'
    }
  ]
}));

export const headerEditMenu = makeZustandHijack<MenuInstance, AntdMenuInstance>((selector) => ({
  key: 'editMenu',
  label: '编辑',
  children: [
    {
      key: '1-1',
      type: 'item',
      iconKey: 'RedoOutlined',
      label: '撤销',
      disabled: selector(useDocStore, (state) => !state.isWork)
    },
    {
      key: '1-2',
      type: 'item',
      label: '恢复',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      key: '1-3',
      type: 'divider'
    },
    {
      key: '1-4',
      type: 'item',

      label: '剪切',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      key: '1-5',
      type: 'item',
      iconKey: 'CopyOutlined',
      label: '复制',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      key: '1-6',
      type: 'item',
      iconKey: 'PauseOutlined',
      label: '粘贴',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      key: '1-7',
      type: 'divider'
    },
    {
      key: '1-8',
      type: 'item',
      iconKey: 'SelectOutlined',
      label: '全选',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      key: '1-9',
      type: 'item',
      iconKey: 'DeleteOutlined',
      label: '删除',
      disabled: selector(useDocStore, state => !state.isWork)
    }
  ]
}));

export const headerViewMenu = makeZustandHijack<MenuInstance, AntdMenuInstance>((selector) => {

  return {
    key: 'viewMenu',
    label: '查看',

    children: [
      {
        key: '1-1',
        type: 'submenu',

        iconKey: 'FundViewOutlined',
        label: '视图',

        children: [


        ]
      },

      {
        key: '1-2',
        type: 'divider',
      },

      {
        key: '1-3',
        type: 'submenu',
        iconKey: 'SkinOutlined',
        label: '外观',
        children: [
          {
            key: '1-3-0-1',
            type: 'item',
            label: '全屏',
            onClick: () => {

            }
          },
          {
            key: '1-3-0-2',
            type: 'divider'
          },
          {
            key: '1-3-0-3',
            type: 'item',
            label: '菜单栏',
            onClick: () => {

            }
          },
          {
            key: '1-3-0-4',
            type: 'item',
            label: '主侧边栏',
            onClick: () => {

            }
          },
          {
            key: '1-3-0-5',
            type: 'divider'
          },
          {
            key: '1-3-1',
            type: 'submenu',
            label: '主侧边栏',
            children: [
              {
                key: '1-3-1-1',
                type: 'item',
                label: '展示',
                disabled: selector(useThemeStore, store => store.layout.mainSidebar !== 'none'),
                onClick: () => {
                  setMainSideBarStatus('left');
                }
              },
              {

                key: '1-3-1-2',
                type: 'item',
                label: '隐藏',
                disabled: selector(useThemeStore, store => store.layout.mainSidebar === 'none'),
                onClick: () => {
                  setMainSideBarStatus('none')
                }
              },

              {
                key: '1-3-1-3',
                type: 'divider',
              },

              {
                key: '1-3-1-4',
                type: 'item',
                iconKey: 'LeftOutlined',
                label: '左侧',
                disabled: selector(useThemeStore, store => store.layout.mainSidebar === 'left'),
                onClick: () => {
                  setMainSideBarStatus('left');
                }
              },
              {
                key: '1-3-1-5',
                type: 'item',
                iconKey: 'RightOutlined',
                label: '右侧',
                disabled: selector(useThemeStore, store => store.layout.mainSidebar === 'right'),
                onClick: () => {
                  setMainSideBarStatus('right');

                }
              }

            ]

          }


        ]

      },
      {
        key: '1-4',
        type: 'divider'
      },
      {
        key: '1-5',
        type: 'item',
        iconKey: 'ExceptionOutlined',

        label: '扩展'
      }



    ]
  }
})

export const headerHelpMenu = makeZustandHijack<MenuInstance, AntdMenuInstance>((selector) => {

  return {
    key: 'helpMenu',
    label: '帮助',

    children: [
      {
        key: '1-1',
        type: 'item',
        label: '欢迎',
      },
      {
        key: '1-2^',
        type: 'item',
        label: '官网',
        onClick: () => {

          window.open('http://rapid.oupro.cn/')
        }
      },
      {
        key: '1-2',
        type: 'item',

        iconKey: 'DotChartOutlined',
        label: '文档',
        onClick: () => {

          window.open('http://rapid-doc.oupro.cn/')
        }
      },
      {
        key: '1-3',
        type: 'divider',
      },

      {
        key: '1-4',
        type: 'item',
        iconKey: 'DownloadOutlined',

        label: '检查更新'
      },

      {
        key: '1-5',
        type: 'divider',
      },

      {
        key: '1-6',
        type: 'item',
        label: '打开开发人员工具',
        onClick: () => {
          windowDevtool(true, { mode: 'detach' });
        }
      },
      {
        key: '1-7',
        type: 'divider',
      },

      {
        key: '1-8',
        type: 'item',
        label: '关于'
      }
    ]
  }
})
