

/**
 * 快捷键定义表中的类型
 *
 */
declare interface ShortcutKey {
  key: string;

  moreKey?: string[];

  allKey?: string[];

  tip: string;

  changeAble: boolean;

  description?: string;

  evt?: BaseCb;
}
