import { ref } from 'vue';
import { onRedo, onUndo } from '@renderer/meta';
import type { DropdownDataType } from '@components/DropdownMenu';
import { hotKeys } from '@renderer/actions';

export const fileMenu = ref<DropdownDataType>([
  {
    title: '新建',
    mark: 'FileAddOutlined', shortcut: hotKeys.createFile.key,
    onClick: hotKeys.createFile.evt
  },
  {
    title: '打开',
    mark: 'FolderOpenOutlined', shortcut: hotKeys.openFile.key,
    onClick: hotKeys.openFile.evt
  },
  {
    title: '导入',
    mark: 'ImportOutlined',
    onClick: () => {

    }
  },
  true,
  {
    title: '保存',
    mark: 'SaveOutlined', shortcut: hotKeys.saveFile.key,
    onClick: hotKeys.saveFile.evt
  },
  {
    title: '另存为',
    shortcut: hotKeys.saveFileTo.key,
    onClick: hotKeys.saveFileTo.evt
  },
  {
    title: '导出',
    mark: 'ExportOutlined',
    children: [
      {
        title: 'JSON',
        mark: 'FileJpgOutlined',
        onClick: () => {

        }
      },
      true,
      {
        title: 'PNG',
        mark: 'FileImageOutlined',
        onClick: () => {

        }
      },
      {
        title: 'SVG',
        onClick: () => {

        }
      },
      true,
      {
        title: 'Pdf',
        mark: 'FilePdfOutlined'
      },
      {
        title: 'Html',
        mark: 'Html5Outlined'
      },
      {
        title: 'Markdown',
        mark: 'FileMarkdownFilled'
      }
    ]
  },
  {
    title: '打印',
    mark: 'PrinterOutlined', shortcut: hotKeys.printFile.key
  }
])

export const editMenu = ref<DropdownDataType>([
  {
    title: '撤销',
    mark: 'RollbackOutlined', shortcut: hotKeys.rollback.key,
    onClick: hotKeys.rollback.evt
  },
  {
    title: '恢复',
    mark: 'UndoOutlined', shortcut: hotKeys.undo.key,
    onClick: hotKeys.undo.evt
  },
  true,
  {
    title: '剪切',
    mark: 'ScissorOutlined', shortcut: hotKeys.scissor.key,
    onClick: hotKeys.scissor.evt
  },
  {
    title: '复制',
    mark: 'CopyOutlined', shortcut: hotKeys.copy.key,
    onClick: hotKeys.copy.evt
  },
  {
    title: '粘贴',
    mark: 'PauseOutlined', shortcut: hotKeys.snippets.key,
    onClick: hotKeys.snippets.evt
  },
  true,
  {
    title: '全选',
    mark: 'SelectOutlined', shortcut: hotKeys.allSelect.key,
    onClick: hotKeys.allSelect.evt
  },
  {
    title: '删除',
    mark: 'DeleteOutlined', shortcut: hotKeys.delete.key,
    onClick: hotKeys.delete.evt
  }
])

export const helpMenu = ref<DropdownDataType>([
  {
    title: '快捷键',
    mark: 'KeyOutlined'
  }
])
