import { copySelectionText, copySpecifiedText, pasteSpecifiedText, pasteSelectionText } from '@rapid/libs-web/common';

/**
 * 复制文字, 指定参数则复制指定文本, 否则复制当前选中的文本
 * @param text
 * @returns
 */
export const copyText = (text?: string) => {
  if (text) copySpecifiedText(text);
  else copySelectionText();
}

/**
 * 粘贴文字, 指定参数则粘贴指定文本, 否则粘贴剪贴板中的文本
 * @param text
 */
export const pasteText = (text?: string) => {
  if (text) pasteSpecifiedText(text);
  else pasteSelectionText();
}
