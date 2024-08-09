import { makeMenu, computedSelector } from '@/menus/framework';

export const headerFileMenu = makeMenu({
  key: 'headerFileMenu',
  label: '文件',
  iconKey: 'FileOutlined',
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
      key: '1-4',
      type: 'group',
      label: '操作',
      children: [
        {
          key: '1-4-1',
          type: 'item',
          iconKey: 'OpenAIOutlined',
          label: '打开',
          shortcut: ['Ctrl+O'],
          disabled: computedSelector(state => state.doc.isWork)
        },
        {
          key: '1-4-2',
          type: 'item',
          label: '保存',
          disabled: computedSelector(state => state.doc.isWork)
        },
        {
          key: '1-4-3',
          type: 'item',
          label: '另存为',
          disabled: computedSelector(state => state.doc.isWork)
        }
      ]
    },
    {
      key: '1-5',
      type: 'submenu',
      label: '导出',
      children: [
        {
          key: '1-5-1',
          type: 'item',
          label: 'JSON'
        },
        {
          key: '1-5-2',
          type: 'item',
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
      label: '打印'
    }
  ]
})

export const headerEditMenu = makeMenu({
  key: 'editMenu',
  label: '编辑',
  children: [
    {
      key: '1-1',
      type: 'item',
      label: '撤销',
      disabled: computedSelector((state) => !state.doc.isWork)
    },
    {
      key: '1-2',
      type: 'item',
      label: '恢复',
      disabled: computedSelector(state => !state.doc.isWork),
    },
    {
      key: '1-3',
      type: 'divider'
    },
    {
      key: '1-4',
      type: 'item',
      label: '剪切',
      disabled: computedSelector(state => !state.doc.isWork),
    },
    {
      key: '1-5',
      type: 'item',
      label: '复制',
      disabled: computedSelector(state => !state.doc.isWork),
    },
    {
      key: '1-6',
      type: 'item',
      label: '粘贴',
      disabled: computedSelector(state => !state.doc.isWork),
    },
    {
      key: '1-7',
      type: 'divider'
    },
    {
      key: '1-8',
      type: 'item',
      label: '全选',
      disabled: computedSelector(state => !state.doc.isWork),
    },
    {
      key: '1-9',
      type: 'item',
      label: '删除',
      disabled: computedSelector(state => !state.doc.isWork)
    }
  ]
});
