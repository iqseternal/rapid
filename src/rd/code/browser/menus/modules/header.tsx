import type { MenuInstanceType, AntdMenuInstanceType } from '@/components/AutoMenu';
import { setMainSideBarStatus, useDocStore, useThemeStore } from '@/features';
import { useSyncNormalState } from '@rapid/libs-web/hooks/useReactive';

import AutoMenu from '@/components/AutoMenu';

export function useHeaderFileMenu(): readonly [AntdMenuInstanceType] {
  const isInDocWorkbenches = useDocStore(state => state.isWork);

  const [fileMenu] = useSyncNormalState<MenuInstanceType>(() => ({
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
        disabled: isInDocWorkbenches,
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
        disabled: isInDocWorkbenches
      },
      {
        type: 'item',
        icon: 'SaveOutlined',
        label: '另存为',
        shortcut: ['Ctrl+Shift+S'],
        disabled: isInDocWorkbenches
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
  }))

  return useSyncNormalState(() => AutoMenu.convertMenuInstance(fileMenu));
}

export function useHeaderEditMenu(): readonly [AntdMenuInstanceType] {
  const isInDocWorkbenches = useDocStore(state => state.isWork);

  const [editMenu] = useSyncNormalState<MenuInstanceType>(() => ({
    label: '编辑',
    children: [
      {
        type: 'item',
        icon: 'RedoOutlined',
        label: '撤销',
        disabled: !isInDocWorkbenches
      },
      {
        type: 'item',
        label: '恢复',
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'divider'
      },
      {
        type: 'item',
        label: '剪切',
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'item',
        icon: 'CopyOutlined',
        label: '复制',
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'item',
        icon: 'PauseOutlined',
        label: '粘贴',
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'divider'
      },
      {
        type: 'item',
        icon: 'SelectOutlined',
        label: '全选',
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'item',
        icon: 'DeleteOutlined',
        label: '删除',
        disabled: !isInDocWorkbenches
      }
    ]
  }))

  return useSyncNormalState(() => AutoMenu.convertMenuInstance(editMenu));
}

export function useHeaderViewMenu(): readonly [AntdMenuInstanceType] {
  const layout = useThemeStore(store => store.layout);

  const [viewMenu] = useSyncNormalState<MenuInstanceType>(() => ({
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
                disabled: layout.mainSidebar !== 'none',
                onClick: () => {
                  setMainSideBarStatus('left');
                }
              },
              {

                type: 'item',
                label: '隐藏',
                disabled: layout.mainSidebar === 'none',
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
                disabled: layout.mainSidebar === 'left',
                onClick: () => {
                  setMainSideBarStatus('left');
                }
              },
              {
                type: 'item',
                icon: 'RightOutlined',
                label: '右侧',
                disabled: layout.mainSidebar === 'right',
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
  }))

  return useSyncNormalState(() => AutoMenu.convertMenuInstance(viewMenu));
}

export function useHeaderHelpMenu(): readonly [AntdMenuInstanceType] {

  const [helpMenu] = useSyncNormalState<MenuInstanceType>(() => ({
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
  }))

  return useSyncNormalState(() => AutoMenu.convertMenuInstance(helpMenu));
}
