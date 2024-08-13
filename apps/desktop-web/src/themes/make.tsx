import { CONFIG } from '@rapid/config/constants';

/**
 * 创建一个预设的 Css 样式
 * @param varName Css 变量名
 * @param value Css 值
 * @param label 该属性的描述
 * @example
 * const primaryBackgroundColor = mRapidC('--rapid-primary-background-color', '#ffffff', '主要背景色'),
 */
export function mRapidC<
  VarName extends `--${Lowercase<typeof CONFIG['PROJECT']>}-${string}`,
  // Value extends string,
  Label extends string
>(varName: VarName, value: string, label: Label) {
  return {
    varName,
    value,
    label
  };
}

