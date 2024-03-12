import { reactive } from 'vue';
import { onRedo, onUndo, onAddShape, onCopy, onCut, onDelete, onPaste, onScaleDefault, onScaleWindow } from '@renderer/meta';
import { windowAutoFullScreen } from './window';

/**
 * 这个函数的意义为让 hotKeys 拥有编写的类型提示, 并且导出的时候能够具有编写时的运行时类型
 * 如果使用 const hotKeys: Record<string, ShortcutKey> = {}; 进行编写, 那么在使用时就不会拥有 hotKeys 的子项提示
 * @param hotkeys
 * @returns
 */
function makeHotKeys<
  T extends Record<string, ShortcutKey>,
  K extends string | number | symbol = keyof T
>(hotkeys: T) {
  for (const key in hotkeys) {
    hotkeys[key].allKey = [hotkeys[key].key, ...(hotkeys[key].moreKey ?? [])].map(key => key.toLocaleLowerCase());
  }

  return reactive<T & (Record<K, { allKey: Required<ShortcutKey>['allKey']; }>)>(hotkeys as any);
}

export const hotKeys = makeHotKeys({
  createFile: {
    key: 'Ctrl+N',
    tip: '新建文件', changeAble: false,
    evt: () => {

    }
  },
  openFile: {
    key: 'Ctrl+O',
    tip: '打开文件', changeAble: false,
    evt: () => {

    }
  },
  saveFile: {
    key: 'Ctrl+S',
    tip: '保存文件', changeAble: false,
    evt: () => {

    }
  },
  saveFileTo: {
    key: 'Ctrl+Shift+S',
    tip: '文件另存为', changeAble: false,
    evt: () => {

    }
  },
  printFile: {
    key: 'Ctrl+Shift+P',
    tip: '打印文件', changeAble: false,
    evt: () => {

    }
  },


  rollback: {
    key: 'Ctrl+Z',
    tip: '撤销', changeAble: false,
    evt: onUndo
  },
  undo: {
    key: 'Ctrl+Y',
    tip: '恢复', changeAble: false,
    evt: onRedo
  },
  scissor: {
    key: 'Ctrl+X',
    tip: '剪切', changeAble: false,
    evt: () => {

    }
  },
  copy: {
    key: 'Ctrl+C',
    tip: '复制', changeAble: false,
    evt: () => {

    }
  },
  snippets: {
    key: 'Ctrl+V',
    tip: '粘贴', changeAble: false,
    evt: () => {

    }
  },

  allSelect: {
    key: 'Ctrl+A',
    tip: '全选', changeAble: false,
    evt: () => {

    }
  },
  delete: {
    key: 'Delete',
    tip: '删除', changeAble: false,
    evt: () => {

    }
  },


  reload: {
    key: 'Ctrl+R', moreKey: ['F5'],
    tip: '刷新页面', changeAble: false,
    evt: () => {

    }
  },
  fullScreen: {
    key: 'F11', moreKey: [],
    tip: '全屏展示', changeAble: false,
    description: '点击全屏',
    evt: windowAutoFullScreen
  },
  openDevTool: {
    key: 'Ctrl+Shift+I', moreKey: ['Command+Shift+I', 'F12'],
    tip: '打开开发者工具', changeAble: false,
    description: '会在生产模式的时候失效',
    evt: () => {

    }
  },
  closeWindow: {
    key: 'Alt+F4',
    tip: '关闭窗口', changeAble: false,
    evt: () => {

    }
  },
  logout: {
    key: '',
    tip: '退出登录', changeAble: true,
    evt: () => {

    }
  }
})

