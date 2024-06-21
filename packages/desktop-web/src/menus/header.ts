import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { onRedo, onUndo, getMeta2dData } from '@/meta';

import type { DropdownDataType } from '@components/DropdownMenu';
import { MenuDriverEnum } from '@components/DropdownMenu';
import { hotKeys, docImport, docExport, windowReload } from '@/actions';
import { useDocStoreHook } from '@/store/modules/doc';
import { EXPORTS_EXTENSIONS, IS_WEB } from '@rapid/config/constants';
import { useGenericStoreHook } from '@/store/modules';

const docStore = useDocStoreHook();

const genericStore = useGenericStoreHook();

export type AppNavigationMenu = {
  title: string;
  mark?: IconRealKey;
  disabled?: boolean;
  menuList: DropdownDataType | Ref<DropdownDataType>;
}


export const fileMenu: Ref<AppNavigationMenu> = ref({
  title: '文件',
  mark: 'FileOutlined',
  menuList: [
    IS_WEB || {
      title: '新建窗口',
      mark: 'WindowsOutlined', shortcut: hotKeys.createFile.key,
    },
    {
      title: '新建文档',
      children: [
        {
          title: '空白文档',
          mark: 'FileAddOutlined',
          // disabled: computed(() => !docStore.isWork),
          onClick: () => docStore.createDoc(),
        },
        {
          title: '模板文档',
          mark: 'FileAddOutlined'
        }
      ]
    },
    MenuDriverEnum.SOLID,
    {
      title: '打开',
      mark: 'FolderOpenOutlined', shortcut: hotKeys.openFile.key,
      onClick: () => docStore.openDoc()

    },
    MenuDriverEnum.SOLID,
    {
      title: '保存',
      mark: 'SaveOutlined', shortcut: hotKeys.saveFile.key,
      disabled: computed(() => !docStore.isWork),
      onClick: () => docStore.saveDoc()
    },
    IS_WEB || {
      title: '另存为',
      shortcut: hotKeys.saveFileTo.key,
      disabled: computed(() => !docStore.isWork),
      onClick: () => docStore.saveAsDoc()
    },
    MenuDriverEnum.SOLID,
    {
      title: '导入',
      mark: 'ImportOutlined',
      children: [
        {
          title: 'JSON',
          mark: 'FileJpgOutlined',
          onClick: () => docStore.importDoc()
        }
      ]
    },
    {
      title: '导出',
      mark: 'ExportOutlined',
      disabled: computed(() => !docStore.isWork),
      children: [
        {
          title: 'JSON',
          mark: 'FileJpgOutlined',
          onClick: () => docExport(EXPORTS_EXTENSIONS.JSON, {
            data: getMeta2dData(),
            options: meta2d.getOptions()
          })
        },
        MenuDriverEnum.SOLID,
        {
          title: 'PNG',
          mark: 'FileImageOutlined',
          onClick: () => docExport(EXPORTS_EXTENSIONS.PNG, meta2d.toPng())
        }
      ]
    },
    MenuDriverEnum.SOLID,
    {
      title: '发布',
      disabled: computed(() => !docStore.isWork),
      children: [
        {
          title: '模板'
        },
        {
          title: 'Web',
          mark: 'MediumWorkmarkOutlined'
        }
      ]
    },
    MenuDriverEnum.SOLID,
    {
      title: '打印',
      mark: 'PrinterOutlined', shortcut: hotKeys.printFile.key,
      disabled: computed(() => !docStore.isWork),
      onClick: () => {

      }
    }
  ]
})

export const editMenu: Ref<AppNavigationMenu> = ref({
  title: '编辑',
  mark: 'EditOutlined',
  menuList: [
    {
      title: '撤销',
      mark: 'RollbackOutlined', shortcut: hotKeys.rollback.key,
      disabled: computed(() => !docStore.isWork),
      onClick: hotKeys.rollback.evt
    },
    {
      title: '恢复',
      mark: 'UndoOutlined', shortcut: hotKeys.undo.key,
      disabled: computed(() => !docStore.isWork),
      onClick: hotKeys.undo.evt
    },
    MenuDriverEnum.SOLID,
    {
      title: '剪切',
      mark: 'ScissorOutlined', shortcut: hotKeys.scissor.key,
      disabled: computed(() => !docStore.isWork),
      onClick: hotKeys.scissor.evt
    },
    {
      title: '复制',
      mark: 'CopyOutlined', shortcut: hotKeys.copy.key,
      disabled: computed(() => !docStore.isWork),
      onClick: hotKeys.copy.evt
    },
    {
      title: '粘贴',
      mark: 'PauseOutlined', shortcut: hotKeys.snippets.key,
      disabled: computed(() => !docStore.isWork),
      onClick: hotKeys.snippets.evt
    },
    MenuDriverEnum.SOLID,
    {
      title: '全选',
      mark: 'SelectOutlined', shortcut: hotKeys.allSelect.key,
      disabled: computed(() => !docStore.isWork),
      onClick: hotKeys.allSelect.evt
    },
    {
      title: '删除',
      mark: 'DeleteOutlined', shortcut: hotKeys.delete.key,
      disabled: computed(() => !docStore.isWork),
      onClick: hotKeys.delete.evt
    }
  ]
})

export const appearanceMenu: Ref<AppNavigationMenu> = ref({
  title: '外观',
  menuList: [
    IS_WEB || {
      title: '侧边栏',
      children: [
        {
          title: '完整',
          onClick: () => genericStore.appearanceSetter.setLeftSideBarShow(true)
        },
        {
          title: '收缩',
          onClick: () => genericStore.appearanceSetter.setLeftSideBarShow(false)
        }
      ]
    },
    {
      title: '工作区',
      mark: 'MediumWorkmarkOutlined',
      children: [
        {
          title: '显示工具栏',
          mark: 'ToolOutlined'
        },
        {
          title: '显示图形栏'
        },
        {
          title: '显示属性栏'
        }
      ]
    }
  ]
})

export const helpMenu = ref<AppNavigationMenu>({
  title: '帮助',
  menuList: [
    {
      title: '快捷键',
      mark: 'KeyOutlined', shortcut: ''
    },
    {
      title: '反馈',
      mark: 'QuestionCircleOutlined'
    }
  ]
})

export const headerMenus = [
  fileMenu, editMenu,

  ref<AppNavigationMenu>({
    title: '工具',
    menuList: [
      {
        title: '重新加载',
        mark: 'ReloadOutlined', shortcut: hotKeys.reload.key,

        onClick: () => windowReload()
      }
    ]
  }),

  appearanceMenu,

  helpMenu
]
