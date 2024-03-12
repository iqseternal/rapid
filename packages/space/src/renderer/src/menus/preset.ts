

import { ref } from 'vue';
import { onRedo, onUndo } from '@renderer/meta';
import type { DropdownDataType } from '@components/DropdownMenu';
import { hotKeys, windowClose, windowDevtool, windowMax, windowMin, windowReload, windowReduction } from '@renderer/actions';
import { canCopyText } from '@rapid/libs/common';


export const presetMenu = ref<DropdownDataType>([
  {
    title: '查看',
    mark: 'FolderViewOutlined',
    disabled: true
  },
  {
    title: '排序方式',
    disabled: true
  },
  {
    title: '复制', mark: 'CopyOutlined',
    disabled: !canCopyText()

  },
  {
    title: '粘贴',
    shortcut: hotKeys.snippets.key
  },
  {
    title: '重新加载',
    mark: 'ReloadOutlined', shortcut: hotKeys.reload.key,
    onClick: windowReload
  },
  {
    title: '打开开发者工具',
    mark: 'BugOutlined', shortcut: hotKeys.openDevTool.key,
    onClick: () => windowDevtool(true, { mode: 'detach' })
  },
  true,
  {
    title: '窗口',
    mark: 'WindowsOutlined',
    children: [
      {
        title: '最大化',
        mark: 'FullscreenOutlined',
        onClick: () => windowMax()
      },
      {
        title: '最小化',
        mark: 'MinusOutlined',
        onClick: () => windowMin()
      },
      {
        title: '还原窗口',
        onClick: () => windowReduction()
      },
      {
        title: '关闭窗口',
        mark: 'CloseOutlined', shortcut: hotKeys.closeWindow.key,
        onClick: () => windowClose()
      }
    ]
  },
  true,
  {
    title: '转到设置',
    mark: 'TrophyOutlined',
    disabled: true
  }
])

