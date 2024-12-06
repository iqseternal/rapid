import { AntdMenuInstanceType, convertMenuInstance, type MenuInstanceType } from '@components/AutoContextMenu';

import { setMainSideBarStatus, useDocStore, useThemeStore } from '@/features';
import { toMakeZustandHijack } from '@rapid/libs-web';

const { makeZustandHijack } = toMakeZustandHijack({
  beforeHijackCovert<T extends MenuInstanceType>(target: T) {
    return convertMenuInstance(target);
  },
})

export const headerFileMenu = makeZustandHijack<MenuInstanceType, AntdMenuInstanceType>((selector) => ({
  label: '文件',
  children: [
    {
      type: 'item',
      icon: 'WindowsOutlined',
      label: '新建窗口',
      shortcut: 'Ctrl+N'
    },

    {
      type: 'submenu',
      icon: 'FileDoneOutlined',
      label: '新建文档',
      children: [
        {
          type: 'item',
          label: '空白文档',
        },
        {
          type: 'item',
          label: '模板文档',
        }
      ]
    },
    {
      type: 'divider'
    },
    {
      type: 'item',
      icon: 'FolderOpenOutlined',
      label: '打开',
      shortcut: ['Ctrl+O'],
      disabled: selector(useDocStore, state => state.isWork),

    },
    {
      type: 'item',
      label: '打开最近文档',
      shortcut: []
    },
    {
      type: 'divider'
    },
    {
      type: 'item',
      icon: 'SaveOutlined',
      label: '保存',
      shortcut: ['Ctrl+S'],
      disabled: selector(useDocStore, state => state.isWork)
    },
    {
      type: 'item',
      icon: 'SaveOutlined',
      label: '另存为',
      shortcut: ['Ctrl+Shift+S'],
      disabled: selector(useDocStore, state => state.isWork)
    },
    {
      type: 'submenu',
      icon: 'ExportOutlined',
      label: '导出',
      children: [
        {
          type: 'item',
          icon: 'FileTextOutlined',
          label: 'JSON'
        },
        {
          type: 'item',
          icon: 'FileJpgOutlined',
          label: 'PNG'
        }
      ]
    },
    {
      type: 'divider'
    },

    {
      type: 'item',
      label: '自动保存'
    },
    {
      type: 'submenu',
      label: '首选项',

      children: [
        {
          type: 'item',
          icon: 'SettingOutlined',
          label: '设置',

        }
      ]
    },

    {
      type: 'divider'
    },
    {
      type: 'item',
      icon: 'PrinterOutlined',
      label: '打印'
    }
  ]
}));

export const headerEditMenu = makeZustandHijack<MenuInstanceType, AntdMenuInstanceType>((selector) => ({
  label: '编辑',
  children: [
    {
      type: 'item',
      icon: 'RedoOutlined',
      label: '撤销',
      disabled: selector(useDocStore, (state) => !state.isWork)
    },
    {
      type: 'item',
      label: '恢复',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      type: 'divider'
    },
    {
      type: 'item',
      label: '剪切',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      type: 'item',
      icon: 'CopyOutlined',
      label: '复制',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      type: 'item',
      icon: 'PauseOutlined',
      label: '粘贴',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      type: 'divider'
    },
    {
      type: 'item',
      icon: 'SelectOutlined',
      label: '全选',
      disabled: selector(useDocStore, state => !state.isWork),
    },
    {
      type: 'item',
      icon: 'DeleteOutlined',
      label: '删除',
      disabled: selector(useDocStore, state => !state.isWork)
    }
  ]
}));

export const headerViewMenu = makeZustandHijack<MenuInstanceType, AntdMenuInstanceType>((selector) => {

  return {
    label: '查看',

    children: [
      {
        type: 'submenu',

        icon: 'FundViewOutlined',
        label: '视图',

        children: [


        ]
      },

      {
        type: 'divider',
      },

      {
        type: 'submenu',
        icon: 'SkinOutlined',
        label: '外观',
        children: [
          {
            type: 'item',
            label: '全屏',
            onClick: () => {

            }
          },
          {
            type: 'divider'
          },
          {
            type: 'item',
            label: '菜单栏',
            onClick: () => {

            }
          },
          {
            type: 'item',
            label: '主侧边栏',
            onClick: () => {

            }
          },
          {
            type: 'divider'
          },
          {
            type: 'submenu',
            label: '主侧边栏',
            children: [
              {
                type: 'item',
                label: '展示',
                disabled: selector(useThemeStore, store => store.layout.mainSidebar !== 'none'),
                onClick: () => {
                  setMainSideBarStatus('left');
                }
              },
              {

                type: 'item',
                label: '隐藏',
                disabled: selector(useThemeStore, store => store.layout.mainSidebar === 'none'),
                onClick: () => {
                  setMainSideBarStatus('none')
                }
              },

              {
                type: 'divider',
              },

              {
                type: 'item',
                icon: 'LeftOutlined',
                label: '左侧',
                disabled: selector(useThemeStore, store => store.layout.mainSidebar === 'left'),
                onClick: () => {
                  setMainSideBarStatus('left');
                }
              },
              {
                type: 'item',
                icon: 'RightOutlined',
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
        type: 'divider'
      },
      {
        type: 'item',
        icon: 'ExceptionOutlined',

        label: '扩展'
      }



    ]
  }
})

export const headerHelpMenu = makeZustandHijack<MenuInstanceType, AntdMenuInstanceType>((selector) => {

  return {
    label: '帮助',
    icon: 'HeatMapOutlined',
    children: [
      {
        type: 'item',
        label: '欢迎',
      },
      {
        type: 'item',
        label: '官网',
        onClick: () => {

          window.open('http://rapid.oupro.cn/')
        }
      },
      {
        type: 'item',

        icon: 'DotChartOutlined',
        label: '文档',
        onClick: () => {

          window.open('http://rapid-doc.oupro.cn/')
        }
      },
      {
        type: 'divider',
      },

      {
        type: 'item',
        icon: 'DownloadOutlined',

        label: '检查更新'
      },

      {
        type: 'divider',
      },
      {
        type: 'item',
        label: '重新加载',
        onClick: () => {
          window.ipcActions.windowReload();
        }
      },

      {
        type: 'item',
        label: '打开开发人员工具',
        onClick: () => {
          window.ipcActions.windowDevtool(true, { mode: 'detach' });
        }
      },
      {
        type: 'divider',
      },

      {
        type: 'item',
        label: '关于'
      }
    ]
  }
})
