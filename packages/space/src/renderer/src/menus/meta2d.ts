import { ref } from 'vue';
import type { DropdownDataType } from '@components/DropdownMenu';
import { hotKeys } from '@renderer/actions';

export const meta2dViewMenu = ref<DropdownDataType>([
  {
    title: hotKeys.copy.tip,
    mark: 'CopyOutlined', shortcut: hotKeys.copy.key,
    onClick: hotKeys.copy.evt
  },
  {
    title: hotKeys.snippets.tip,
    mark: 'SnippetsOutlined', shortcut: hotKeys.snippets.key,
    onClick: hotKeys.snippets.evt
  },
  {
    title: hotKeys.scissor.tip,
    mark: 'ScissorOutlined', shortcut: hotKeys.scissor.key,
    onClick: hotKeys.scissor.evt
  }
]);
