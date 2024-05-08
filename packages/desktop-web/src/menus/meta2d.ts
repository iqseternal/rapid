import { ref } from 'vue';
import type { DropdownDataType } from '@components/DropdownMenu';
import { hotKeys } from '@/actions';

/**
 * meta2d 右键菜单
 *
 * AutoDropMenu 准备
 *
 * @description 未来准备展示 工具, 待升级
 *
 */
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
