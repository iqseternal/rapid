import type { MenuInstanceType, AntdMenuInstanceType } from '@/components/AutoMenu';
import { setMainSideBarStatus, useDocStore, useThemeStore } from '@/features';
import { useSyncNormalState } from '@rapid/libs-web/hooks/useReactive';
import { useTranslation } from 'react-i18next';

import AutoMenu from '@/components/AutoMenu';

export function useHeaderFileMenu(): readonly [AntdMenuInstanceType] {
  const { t } = useTranslation();

  const isInDocWorkbenches = useDocStore(state => state.isWork);

  const [fileMenu] = useSyncNormalState<MenuInstanceType>(() => ({
    label: t('menus.header.filemenu.filelabel', '文件'),
    children: [
      {
        type: 'item',
        icon: 'WindowsOutlined',
        label: t('menus.header.filemenu.newwindow', '新建窗口'),
        shortcut: 'Ctrl+N'
      },
      {
        type: 'submenu',
        icon: 'FileDoneOutlined',
        label: t('menus.header.filemenu.newdoc', '新建文档'),
        children: [
          {
            type: 'item',
            label: t('menus.header.filemenu.blankdoc', '空白文档'),
          },
          {
            type: 'item',
            label: t('menus.header.filemenu.templatedoc', '模板文档'),
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'item',
        icon: 'FolderOpenOutlined',
        label: t('menus.header.filemenu.open', '打开'),
        shortcut: ['Ctrl+O'],
        disabled: isInDocWorkbenches,
      },
      {
        type: 'item',
        label: t('menus.header.filemenu.recent', '打开最近文档'),
        shortcut: []
      },
      {
        type: 'divider'
      },
      {
        type: 'item',
        icon: 'SaveOutlined',
        label: t('menus.header.filemenu.save', '保存'),
        shortcut: ['Ctrl+S'],
        disabled: isInDocWorkbenches
      },
      {
        type: 'item',
        icon: 'SaveOutlined',
        label: t('menus.header.filemenu.saveas', '另存为'),
        shortcut: ['Ctrl+Shift+S'],
        disabled: isInDocWorkbenches
      },
      {
        type: 'submenu',
        icon: 'ExportOutlined',
        label: t('menus.header.filemenu.export', '导出'),
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
        label: t('menus.header.filemenu.autosave', '自动保存')
      },
      {
        type: 'submenu',
        label: t('menus.header.filemenu.option', '首选项'),
        children: [
          {
            type: 'item',
            icon: 'SettingOutlined',
            label: t('menus.header.filemenu.settings', '设置'),
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'item',
        icon: 'PrinterOutlined',
        label: t('menus.header.filemenu.print', '打印')
      }
    ]
  } as const))

  return useSyncNormalState(() => AutoMenu.convertMenuInstance(fileMenu));
}

export function useHeaderEditMenu(): readonly [AntdMenuInstanceType] {
  const { t } = useTranslation();

  const isInDocWorkbenches = useDocStore(state => state.isWork);

  const [editMenu] = useSyncNormalState<MenuInstanceType>(() => ({
    label: t('menus.header.editmenu.editlabel', '编辑'),
    children: [
      {
        type: 'item',
        icon: 'RedoOutlined',
        label: t('menus.header.editmenu.undo', '撤销'),
        disabled: !isInDocWorkbenches
      },
      {
        type: 'item',
        label: t('menus.header.editmenu.redo', '恢复'),
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'divider'
      },
      {
        type: 'item',
        label: t('menus.header.editmenu.cut', '剪切'),
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'item',
        icon: 'CopyOutlined',
        label: t('menus.header.editmenu.copy', '复制'),
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'item',
        icon: 'PauseOutlined',
        label: t('menus.header.editmenu.paste', '粘贴'),
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'divider'
      },
      {
        type: 'item',
        icon: 'SelectOutlined',
        label: t('menus.header.editmenu.selectall', '全选'),
        disabled: !isInDocWorkbenches,
      },
      {
        type: 'item',
        icon: 'DeleteOutlined',
        label: t('menus.header.editmenu.delete', '删除'),
        disabled: !isInDocWorkbenches
      }
    ]
  } as const));

  return useSyncNormalState(() => AutoMenu.convertMenuInstance(editMenu));
}

export function useHeaderViewMenu(): readonly [AntdMenuInstanceType] {
  const { t } = useTranslation();

  const layout = useThemeStore(store => store.layout);

  const [viewMenu] = useSyncNormalState<MenuInstanceType>(() => ({
    label: t('menus.header.viewmenu.viewlabel', '查看'),
    children: [
      {
        type: 'submenu',
        icon: 'FundViewOutlined',
        label: t('menus.header.viewmenu.view', '视图'),
        children: [

        ]
      },
      {
        type: 'divider',
      },
      {
        type: 'submenu',
        icon: 'SkinOutlined',
        label: t('menus.header.viewmenu.appearance', '外观'),
        children: [
          {
            type: 'item',
            label: t('menus.header.viewmenu.fullscreen', '全屏'),
            onClick: () => {

            }
          },
          {
            type: 'divider'
          },
          {
            type: 'item',
            label: t('menus.header.viewmenu.menubar', '菜单栏'),
            onClick: () => {

            }
          },
          {
            type: 'item',
            label: t('menus.header.viewmenu.sidebars', '侧边栏'),
            onClick: () => {

            }
          },
          {
            type: 'divider'
          },
          {
            type: 'submenu',
            label: t('menus.header.viewmenu.mainsidebar', '主侧边栏'),
            children: [
              {
                type: 'item',
                label: t('menus.header.viewmenu.show', '展示'),
                disabled: layout.mainSidebar !== 'none',
                onClick: () => {
                  setMainSideBarStatus('left');
                }
              },
              {

                type: 'item',
                label: t('menus.header.viewmenu.hide', '隐藏'),
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
                label: t('menus.header.viewmenu.left', '左侧'),
                disabled: layout.mainSidebar === 'left',
                onClick: () => {
                  setMainSideBarStatus('left');
                }
              },
              {
                type: 'item',
                icon: 'RightOutlined',
                label: t('menus.header.viewmenu.right', '右侧'),
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
    ]
  } as const));

  return useSyncNormalState(() => AutoMenu.convertMenuInstance(viewMenu));
}

export function useHeaderHelpMenu(): readonly [AntdMenuInstanceType] {
  const { t } = useTranslation();

  const [helpMenu] = useSyncNormalState<MenuInstanceType>(() => ({
    label: t('menus.header.helpmenu.helplabel', '帮助'),
    icon: 'HeatMapOutlined',
    children: [
      {
        type: 'item',
        label: t('menus.header.helpmenu.welcome', '欢迎'),
      },
      {
        type: 'item',
        label: t('menus.header.helpmenu.website', '官网'),
        onClick: () => {
          window.open('http://rapid.oupro.cn/')
        }
      },
      {
        type: 'item',
        icon: 'DotChartOutlined',
        label: t('menus.header.helpmenu.document', '文档'),
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
        label: t('menus.header.helpmenu.checkupdate', '检查更新')
      },
      {
        type: 'divider',
      },
      {
        type: 'item',
        label: t('menus.header.helpmenu.reload', '重新加载'),
        onClick: () => {
          window.ipcActions.windowReload();
        }
      },
      {
        type: 'item',
        label: t('menus.header.helpmenu.devtool', '打开开发人员工具'),
        onClick: () => {
          window.ipcActions.windowDevtool(true, { mode: 'detach' });
        }
      },
      {
        type: 'divider',
      },
      {
        type: 'item',
        label: t('menus.header.helpmenu.about', '关于')
      }
    ]
  } as const));

  return useSyncNormalState(() => AutoMenu.convertMenuInstance(helpMenu));
}
