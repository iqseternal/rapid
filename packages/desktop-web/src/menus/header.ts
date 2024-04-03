import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { onRedo, onUndo, getMeta2dData } from '@/meta';
import type { DropdownDataType } from '@components/DropdownMenu';
import { hotKeys, docImport, docExport } from '@/actions';
import { useDocStoreHook } from '@/store/modules/doc';
import { EXPORTS_EXTENSIONS } from '@rapid/config/constants';

const docStore = useDocStoreHook();

export const fileMenu: Ref<DropdownDataType> = ref([
  // {
  //   title: '新建窗口',
  //   mark: 'WindowsOutlined', shortcut: hotKeys.createFile.key,

  // },
  {
    title: '新建文档',

    mark: 'FileAddOutlined',

    onClick: () => docStore.createDoc()
  },
  true,
  {
    title: '打开',
    mark: 'FolderOpenOutlined', shortcut: hotKeys.openFile.key,
    onClick: () => docStore.openDoc()

  },

  true,
  {
    title: '保存',
    mark: 'SaveOutlined', shortcut: hotKeys.saveFile.key,
    onClick: () => docStore.saveDoc()
  },
  {
    title: '另存为',
    shortcut: hotKeys.saveFileTo.key,
    onClick: () => docStore.saveAsDoc()
  },
  true,
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
    children: [
      {
        title: 'JSON',
        mark: 'FileJpgOutlined',
        onClick: () => docExport(EXPORTS_EXTENSIONS.JSON, getMeta2dData())
      },
      true,
      {
        title: 'PNG',
        mark: 'FileImageOutlined',
        onClick: () => docExport(EXPORTS_EXTENSIONS.PNG, meta2d.toPng())
      }
    ]
  },
  true,
  {
    title: '打印',
    mark: 'PrinterOutlined', shortcut: hotKeys.printFile.key
  }
])

export const editMenu: Ref<DropdownDataType> = ref([
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
  true,
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
  true,
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
])

export const helpMenu = ref<DropdownDataType>([
  {
    title: '快捷键',
    mark: 'KeyOutlined'
  }
])
